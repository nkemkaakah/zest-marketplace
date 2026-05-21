import { supabase } from "../config/supabase.js";
import type { CreateOrderInput, Order } from "../types/order.js";
import { clearCart, getCart } from "./cartService.js";
import { processPayment } from "./paymentService.js";

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const cart = await getCart(input.sessionId);
  if (cart.lines.length === 0) {
    throw new Error("Cart is empty");
  }

  const currency = input.currency ?? "USD";
  const subtotal = cart.lines.reduce(
    (sum, l) => sum + l.product.price * l.quantity,
    0,
  );
  const shippingTotal = 0;
  const total = subtotal + shippingTotal;

  const payment = await processPayment({
    amount: total,
    currency,
    method: input.paymentMethod,
    customerEmail: input.email,
  });

  if (!payment.success) {
    throw new Error("Payment failed");
  }

  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .insert({
      session_id: input.sessionId,
      user_id: input.userId ?? null,
      status: "paid",
      subtotal,
      shipping_total: shippingTotal,
      total,
      currency,
      payment_method: payment.method,
      payment_reference: payment.reference,
      customer_first_name: input.firstName,
      customer_company: input.company ?? null,
      customer_street: input.street,
      customer_apartment: input.apartment ?? null,
      customer_city: input.city,
      customer_phone: input.phone,
      customer_email: input.email,
    })
    .select("id, created_at")
    .single<{ id: string; created_at: string }>();

  if (orderError || !orderRow) {
    throw new Error(
      `Failed to create order: ${orderError?.message ?? "unknown"}`,
    );
  }

  const orderItems = cart.lines.map((line) => ({
    order_id: orderRow.id,
    product_id: line.productId,
    quantity: line.quantity,
    unit_price: line.product.price,
    line_total: line.product.price * line.quantity,
    product_name: line.product.name,
    product_image_url: line.product.imageUrl,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    throw new Error(`Failed to save order items: ${itemsError.message}`);
  }

  await clearCart(input.sessionId);

  return {
    id: orderRow.id,
    status: "paid",
    subtotal,
    shippingTotal,
    total,
    currency,
    paymentMethod: payment.method,
    paymentReference: payment.reference,
    customerFirstName: input.firstName,
    customerCompany: input.company ?? null,
    customerStreet: input.street,
    customerApartment: input.apartment ?? null,
    customerCity: input.city,
    customerPhone: input.phone,
    customerEmail: input.email,
    items: cart.lines.map((line) => ({
      productId: line.productId,
      productName: line.product.name,
      productImageUrl: line.product.imageUrl,
      quantity: line.quantity,
      unitPrice: line.product.price,
      lineTotal: line.product.price * line.quantity,
    })),
    createdAt: orderRow.created_at,
  };
}
