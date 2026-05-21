export interface PaymentInput {
  amount: number;
  currency: string;
  method: "bank" | "cod";
  customerEmail: string;
}

export interface PaymentResult {
  success: boolean;
  reference: string;
  method: string;
}

/**
 * Stub — replace with Zest SDK call once credentials are available.
 * Initialize SDK with process.env.ZEST_SECRET_KEY, invoke charge API,
 * then return the real reference from the response.
 */
export async function processPayment(input: PaymentInput): Promise<PaymentResult> {
  // Simulate async SDK latency
  await new Promise<void>((resolve) => setTimeout(resolve, 150));

  return {
    success: true,
    reference: `stub_${input.method}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    method: input.method,
  };
}
