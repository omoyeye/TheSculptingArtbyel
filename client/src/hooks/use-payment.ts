
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

interface CreatePaymentSessionData {
  orderId?: number;
  bookingId?: number;
  stripeSessionId: string;
  stripePaymentUrl: string;
  amount: number;
  expiresAt: string;
}

export function usePaymentSession(id: number) {
  return useQuery({
    queryKey: ["payment-session", id],
    queryFn: async (): Promise<PaymentSession> => {
      const response = await fetch(`/api/payment-sessions/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch payment session");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function usePaymentSessionByOrderId(orderId: number) {
  return useQuery({
    queryKey: ["payment-session", "order", orderId],
    queryFn: async (): Promise<PaymentSession> => {
      const response = await fetch(`/api/orders/${orderId}/payment-session`);
      if (!response.ok) {
        throw new Error("Failed to fetch payment session for order");
      }
      return response.json();
    },
    enabled: !!orderId,
  });
}

export function usePaymentSessionByBookingId(bookingId: number) {
  return useQuery({
    queryKey: ["payment-session", "booking", bookingId],
    queryFn: async (): Promise<PaymentSession> => {
      const response = await fetch(`/api/bookings/${bookingId}/payment-session`);
      if (!response.ok) {
        throw new Error("Failed to fetch payment session for booking");
      }
      return response.json();
    },
    enabled: !!bookingId,
  });
}

export function useCreatePaymentSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePaymentSessionData): Promise<PaymentSession> => {
      const response = await fetch("/api/payment-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment session");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["payment-session"] });
      if (data.orderId) {
        queryClient.invalidateQueries({ queryKey: ["payment-session", "order", data.orderId] });
      }
      if (data.bookingId) {
        queryClient.invalidateQueries({ queryKey: ["payment-session", "booking", data.bookingId] });
      }
    },
  });
}

export function useUpdatePaymentSessionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }): Promise<PaymentSession> => {
      const response = await fetch(`/api/payment-sessions/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment session status");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["payment-session", data.id] });
      if (data.orderId) {
        queryClient.invalidateQueries({ queryKey: ["payment-session", "order", data.orderId] });
      }
      if (data.bookingId) {
        queryClient.invalidateQueries({ queryKey: ["payment-session", "booking", data.bookingId] });
      }
    },
  });
}

// Utility function to open Stripe payment URL in new tab
export function openStripePayment(paymentUrl: string) {
  window.open(paymentUrl, '_blank', 'noopener,noreferrer');
}
