// Utility function to open Stripe payment URL in new tab
export function openStripePayment(paymentUrl: string) {
  window.open(paymentUrl, '_blank', 'noopener,noreferrer');
}