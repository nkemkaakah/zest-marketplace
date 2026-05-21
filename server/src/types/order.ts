export interface OrderItem {
  productId: string;
  productName: string;
  productImageUrl: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  status: string;
  subtotal: number;
  shippingTotal: number;
  total: number;
  currency: string;
  paymentMethod: string | null;
  paymentReference: string | null;
  customerFirstName: string;
  customerCompany: string | null;
  customerStreet: string;
  customerApartment: string | null;
  customerCity: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  createdAt: string;
}

export interface CreateOrderInput {
  sessionId: string;
  userId?: string;
  firstName: string;
  company?: string;
  street: string;
  apartment?: string;
  city: string;
  phone: string;
  email: string;
  paymentMethod: "bank" | "cod";
  currency?: string;
}
