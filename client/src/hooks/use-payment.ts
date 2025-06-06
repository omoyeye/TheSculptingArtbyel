
// Payment session interfaces (kept for potential future use)
interface PaymentSession {
  id: number;
  orderId?: number;
  bookingId?: number;
  stripeSessionId: string;
  stripePaymentUrl: string;
  status: string;
  amount: number;
  createdAt: string;
  expiresAt: string;
}

// Utility function to open Stripe payment URL in new tab
export function openStripePayment(paymentUrl: string) {
  window.open(paymentUrl, '_blank', 'noopener,noreferrer');
}
