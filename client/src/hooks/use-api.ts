import { 
  useQuery, 
  useMutation, 
  UseQueryResult, 
  UseMutationResult
} from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { 
  Treatment, 
  Product, 
  Booking, 
  Order, 
  Testimonial, 
  GalleryItem, 
  InstagramPost
} from '../types/schema';

// Treatments
export function useTreatments(): UseQueryResult<Treatment[], Error> {
  return useQuery<Treatment[], Error>({
    queryKey: ['/api/treatments'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useTreatment(slug: string): UseQueryResult<Treatment, Error> {
  return useQuery<Treatment, Error>({
    queryKey: ['/api/treatments', slug],
    enabled: !!slug,
  });
}

export function useCreateTreatment(): UseMutationResult<Treatment, Error, Omit<Treatment, 'id'>> {
  return useMutation({
    mutationFn: (treatment) => 
      apiRequest('POST', '/api/treatments', treatment)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
    },
  });
}

export function useUpdateTreatment(): UseMutationResult<Treatment, Error, { id: number; data: Partial<Omit<Treatment, 'id'>> }> {
  return useMutation({
    mutationFn: ({ id, data }) => 
      apiRequest('PUT', `/api/treatments/${id}`, data)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
    },
  });
}

export function useDeleteTreatment(): UseMutationResult<void, Error, number> {
  return useMutation({
    mutationFn: (id) => 
      apiRequest('DELETE', `/api/treatments/${id}`)
        .then(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
    },
  });
}

// Products
export function useProducts(): UseQueryResult<Product[], Error> {
  return useQuery<Product[], Error>({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(slug: string): UseQueryResult<Product, Error> {
  return useQuery<Product, Error>({
    queryKey: ['/api/products', slug],
    enabled: !!slug,
  });
}

export function useCreateProduct(): UseMutationResult<Product, Error, Omit<Product, 'id'>> {
  return useMutation({
    mutationFn: (product) => 
      apiRequest('POST', '/api/products', product)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
  });
}

export function useUpdateProduct(): UseMutationResult<Product, Error, { id: number; data: Partial<Omit<Product, 'id'>> }> {
  return useMutation({
    mutationFn: ({ id, data }) => 
      apiRequest('PUT', `/api/products/${id}`, data)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
  });
}

export function useDeleteProduct(): UseMutationResult<void, Error, number> {
  return useMutation({
    mutationFn: (id) => 
      apiRequest('DELETE', `/api/products/${id}`)
        .then(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
  });
}

// Bookings
export function useBookings(): UseQueryResult<Booking[]> {
  return useQuery({
    queryKey: ['/api/bookings'],
    staleTime: 1000 * 60 * 1, // 1 minute (more frequent updates for bookings)
  });
}

export function useBooking(id: number): UseQueryResult<Booking> {
  return useQuery({
    queryKey: ['/api/bookings', id],
    enabled: !!id,
  });
}

export function useCreateBooking(): UseMutationResult<Booking, Error, Omit<Booking, 'id' | 'createdAt'>> {
  return useMutation({
    mutationFn: (booking) => 
      apiRequest('POST', '/api/bookings', booking)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
  });
}

export function useUpdateBookingStatus(): UseMutationResult<Booking, Error, { id: number; status: string }> {
  return useMutation({
    mutationFn: ({ id, status }) => 
      apiRequest('PUT', `/api/bookings/${id}/status`, { status })
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
  });
}

export function useDeleteBooking(): UseMutationResult<void, Error, number> {
  return useMutation({
    mutationFn: (id) => 
      apiRequest('DELETE', `/api/bookings/${id}`)
        .then(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
  });
}

// Orders
export function useOrders(): UseQueryResult<Order[]> {
  return useQuery({
    queryKey: ['/api/orders'],
    staleTime: 1000 * 60 * 1, // 1 minute
  });
}

export function useOrder(id: number): UseQueryResult<Order> {
  return useQuery({
    queryKey: ['/api/orders', id],
    enabled: !!id,
  });
}

export function useUpdateOrderStatus(): UseMutationResult<Order, Error, { id: number; status: string }> {
  return useMutation({
    mutationFn: ({ id, status }) => 
      apiRequest('PUT', `/api/orders/${id}/status`, { status })
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
    },
  });
}

// Testimonials
export function useTestimonials(): UseQueryResult<Testimonial[]> {
  return useQuery({
    queryKey: ['/api/testimonials'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateTestimonial(): UseMutationResult<Testimonial, Error, Omit<Testimonial, 'id'>> {
  return useMutation({
    mutationFn: (testimonial) => 
      apiRequest('POST', '/api/testimonials', testimonial)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
  });
}

export function useUpdateTestimonial(): UseMutationResult<Testimonial, Error, { id: number; data: Partial<Omit<Testimonial, 'id'>> }> {
  return useMutation({
    mutationFn: ({ id, data }) => 
      apiRequest('PUT', `/api/testimonials/${id}`, data)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
  });
}

export function useDeleteTestimonial(): UseMutationResult<void, Error, number> {
  return useMutation({
    mutationFn: (id) => 
      apiRequest('DELETE', `/api/testimonials/${id}`)
        .then(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
  });
}

// Gallery Items
export function useGalleryItems(category?: string): UseQueryResult<GalleryItem[]> {
  return useQuery({
    queryKey: category ? ['/api/gallery', { category }] : ['/api/gallery'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateGalleryItem(): UseMutationResult<GalleryItem, Error, Omit<GalleryItem, 'id'>> {
  return useMutation({
    mutationFn: (galleryItem) => 
      apiRequest('POST', '/api/gallery', galleryItem)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
    },
  });
}

export function useUpdateGalleryItem(): UseMutationResult<GalleryItem, Error, { id: number; data: Partial<Omit<GalleryItem, 'id'>> }> {
  return useMutation({
    mutationFn: ({ id, data }) => 
      apiRequest('PUT', `/api/gallery/${id}`, data)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
    },
  });
}

export function useDeleteGalleryItem(): UseMutationResult<void, Error, number> {
  return useMutation({
    mutationFn: (id) => 
      apiRequest('DELETE', `/api/gallery/${id}`)
        .then(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
    },
  });
}

// Instagram Posts
export function useInstagramPosts(): UseQueryResult<InstagramPost[]> {
  return useQuery({
    queryKey: ['/api/instagram'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateInstagramPost(): UseMutationResult<InstagramPost, Error, Omit<InstagramPost, 'id'>> {
  return useMutation({
    mutationFn: (post) => 
      apiRequest('POST', '/api/instagram', post)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/instagram'] });
    },
  });
}

export function useUpdateInstagramPost(): UseMutationResult<InstagramPost, Error, { id: number; data: Partial<Omit<InstagramPost, 'id'>> }> {
  return useMutation({
    mutationFn: ({ id, data }) => 
      apiRequest('PUT', `/api/instagram/${id}`, data)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/instagram'] });
    },
  });
}

export function useDeleteInstagramPost(): UseMutationResult<void, Error, number> {
  return useMutation({
    mutationFn: (id) => 
      apiRequest('DELETE', `/api/instagram/${id}`)
        .then(() => undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/instagram'] });
    },
  });
}