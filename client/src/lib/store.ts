import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Treatment {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

export interface Booking {
  id: string;
  treatmentId: string;
  date: string;
  time: string;
  price: number;
}

export interface CartItem {
  id: string;
  type: 'product' | 'booking';
  itemId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  date?: string;
  time?: string;
  duration?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  content: string;
  initials: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
}

interface StoreState {
  cartOpen: boolean;
  cart: CartItem[];
  treatments: Treatment[];
  products: Product[];
  testimonials: Testimonial[];
  instagramPosts: InstagramPost[];
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  initializeCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cartOpen: false,
      cart: [],
      treatments: [
        {
          id: 'wood-therapy',
          title: 'Wood Therapy',
          description: 'Non-invasive technique using wooden tools to sculpt the body, break down fat, and stimulate the lymphatic system.',
          price: 120,
          duration: 60,
          image: 'Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png',
        },
        {
          id: 'cavitation-vacuum',
          title: 'Cavitation & Vacuum',
          description: 'Powerful, non-invasive treatment using sound waves to break down stubborn fat cells and enhance circulation.',
          price: 150,
          duration: 75,
          image: 'Screenshot 2025-05-04 154211.png',
        },
        {
          id: 'lymphatic-drainage',
          title: 'Lymphatic Drainage',
          description: 'Gentle massage technique that stimulates the lymphatic system to reduce water retention and enhance circulation.',
          price: 135,
          duration: 60,
          image: 'Screenshot 2025-05-04 160111.png',
        },
        {
          id: 'recovery-boost',
          title: 'RecoveryBoost',
          description: 'Personalized post-op drainage massage designed specifically for post-operative recovery.',
          price: 160,
          duration: 90,
          image: 'Screenshot 2025-05-04 160111.png',
        },
        {
          id: 'laser-lipo',
          title: 'Laser Lipo',
          description: 'Non-invasive treatment that uses advanced laser technology to break down stubborn fat cells.',
          price: 180,
          duration: 90,
          image: 'Screenshot 2025-05-04 154211.png',
        },
      ],
      products: [
        {
          id: 'sculpting-oil',
          title: 'Sculpting Body Oil',
          description: 'Firming & Toning formula that enhances the results of your treatments.',
          price: 42,
          image: 'Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png',
          category: 'Body Oils',
          badge: 'NEW',
        },
        {
          id: 'detox-scrub',
          title: 'Detox Body Scrub',
          description: 'Exfoliating & Smoothing scrub that removes dead skin cells and improves circulation.',
          price: 38,
          image: 'Screenshot 2025-05-04 160111.png',
          category: 'Scrubs',
        },
        {
          id: 'massage-kit',
          title: 'Home Massage Kit',
          description: 'Self-Care Essentials to maintain your results between professional treatments.',
          price: 75,
          image: 'Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png',
          category: 'Tools',
          badge: 'BEST SELLER',
        },
        {
          id: 'firming-cream',
          title: 'Firming Body Cream',
          description: 'Hydrating & Tightening cream that improves skin elasticity and firmness.',
          price: 48,
          image: 'Screenshot 2025-05-04 154211.png',
          category: 'Body Creams',
        },
      ],
      testimonials: [
        {
          id: '1',
          name: 'Jessica M.',
          treatment: 'Wood Therapy Client',
          rating: 5,
          content: 'After just 4 sessions of wood therapy, the difference in my body is incredible. Not only do I look better, but I feel more confident and energized. The staff is professional, knowledgeable, and truly caring.',
          initials: 'JM',
        },
        {
          id: '2',
          name: 'Robert K.',
          treatment: 'RecoveryBoost Client',
          rating: 5,
          content: 'The lymphatic drainage massage completely transformed my recovery after surgery. The therapist was incredibly attentive to my needs and made the experience comfortable. I\'m so grateful for finding this place!',
          initials: 'RK',
        },
        {
          id: '3',
          name: 'Tanya S.',
          treatment: 'Cavitation Client',
          rating: 4.5,
          content: 'I\'ve tried many treatments for my stubborn belly fat, but nothing worked until I discovered Cavitation & Vacuum therapy at The Sculpting Art. The results are amazing, and the spa environment makes every visit a treat.',
          initials: 'TS',
        },
        {
          id: '4',
          name: 'David L.',
          treatment: 'Custom Treatment Plan',
          rating: 5,
          content: 'The combination of treatments in my custom package has given me results I never thought possible. I\'ve lost inches and gained confidence. The team is amazing at what they do and the environment is so calming.',
          initials: 'DL',
        },
      ],
      instagramPosts: [
        {
          id: '1',
          image: 'Before After Beauty Skincare Minimlasit Instagram Post.png',
          likes: 156,
        },
        {
          id: '2',
          image: 'Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png',
          likes: 89,
        },
        {
          id: '3',
          image: 'Beige Nude Aesthetic Feminine Modern Gynecology Health Clinic Branding Logo.png',
          likes: 203,
        },
        {
          id: '4',
          image: 'Screenshot 2025-05-04 154211.png',
          likes: 134,
        },
        {
          id: '5',
          image: 'Before After Beauty Skincare Minimlasit Instagram Post.png',
          likes: 178,
        },
        {
          id: '6',
          image: 'Screenshot 2025-05-04 160111.png',
          likes: 112,
        },
      ],
      setCartOpen: (open) => set({ cartOpen: open }),
      addToCart: (item) => {
        const cart = get().cart;
        const cartItemId = `${item.type}-${item.itemId}-${Date.now()}`;
        
        // For products, check if it already exists and update quantity
        if (item.type === 'product') {
          const existingItem = cart.find(
            (cartItem) => cartItem.type === 'product' && cartItem.itemId === item.itemId
          );
          
          if (existingItem) {
            return get().updateQuantity(existingItem.id, existingItem.quantity + (item.quantity || 1));
          }
        }
        
        // Add new item to cart
        set({ 
          cart: [...cart, { ...item, id: cartItemId, quantity: item.quantity || 1 }],
          cartOpen: true,
        });
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          return get().removeFromCart(id);
        }
        
        set({
          cart: get().cart.map((item) => 
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      initializeCart: () => {
        // This is just a placeholder - persist middleware will handle restoring state
      },
    }),
    {
      name: 'sculpting-art-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
