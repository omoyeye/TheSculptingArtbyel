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
          id: 'wood-therapy-30',
          title: 'Wood Therapy (30 min)',
          description: 'Natural technique using wooden tools to break down cellulite and aid in lymphatic drainage.',
          price: 40,
          duration: 30,
          image: 'Wood-Therapy.jpg',
        },
        {
          id: 'wood-therapy-60',
          title: 'Wood Therapy (1 hour)',
          description: 'Extended wood therapy session for deeper treatment and more comprehensive results.',
          price: 56.99,
          duration: 60,
          image: 'Wood-Therapy.jpg',
        },
        {
          id: 'lymphatic-drainage-30',
          title: 'Lymphatic Drainage (30 min)',
          description: 'Gentle massage technique that stimulates the lymphatic system to reduce water retention and enhance circulation.',
          price: 39,
          duration: 30,
          image: 'IMG_3362.jpeg',
        },
        {
          id: 'lymphatic-drainage-45',
          title: 'Lymphatic Drainage (45 min)',
          description: 'Extended lymphatic drainage session for deeper detoxification and improved circulation.',
          price: 47,
          duration: 45,
          image: 'IMG_3362.jpeg',
        },
        {
          id: 'recovery-boost-30',
          title: 'Recovery Boost (30 min)',
          description: 'Personalized post-op drainage massage designed specifically for post-operative recovery.',
          price: 45,
          duration: 30,
          image: 'recovery boost.jpeg',
        },
        {
          id: 'recovery-boost-60',
          title: 'Recovery Boost (1 hour)',
          description: 'Extended post-op drainage massage for comprehensive recovery support.',
          price: 55.90,
          duration: 60,
          image: 'recovery boost.jpeg',
        },
        {
          id: 'laser-lipo-45',
          title: 'Laser Lipo (45 min)',
          description: 'Non-invasive treatment that uses advanced laser technology to break down stubborn fat cells.',
          price: 77,
          duration: 45,
          image: 'laser lipo.jpeg',
        },
        {
          id: 'cavitation-45',
          title: 'Cavitation (45 min)',
          description: 'Advanced ultrasound treatment that targets and reduces stubborn fat deposits.',
          price: 77,
          duration: 45,
          image: 'cavitation.jpeg',
        },
        {
          id: 'cavitation-vacuum-60',
          title: 'Cavitation & Vacuum (1 hour)',
          description: 'Combined treatment using ultrasound cavitation with vacuum therapy for enhanced fat reduction and skin tightening.',
          price: 90,
          duration: 60,
          image: 'cavitation.jpeg',
        },
        {
          id: 'deep-tissue-45',
          title: 'Deep Tissue Massage (45 min)',
          description: 'Focused massage that targets deeper layers of muscle and connective tissue for relief from chronic tension.',
          price: 39,
          duration: 45,
          image: 'Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png',
        },
        {
          id: 'relaxing-massage-45',
          title: 'Relaxing Massage (45 min)',
          description: 'Gentle, soothing massage designed to relieve stress and promote overall relaxation.',
          price: 39,
          duration: 45,
          image: 'Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png',
        },
        {
          id: 'package-one',
          title: 'Package One - 3 Sessions',
          description: 'Experience the benefits of body sculpting with our package of three appointments targeting one specific area. Each session is 2 hours.',
          price: 245,
          duration: 120,
          image: 'Before After Beauty Skincare Minimlasit Instagram Post.png',
        },
        {
          id: 'package-two',
          title: 'Package Two - 6 Sessions',
          description: 'Transform with six targeted sessions, reducing stubborn fat and tightening skin for noticeable body sculpting results. Each session is 2 hours targeting one area.',
          price: 420,
          duration: 120,
          image: 'IMG_3361.jpeg',
        },
        {
          id: 'package-three',
          title: 'Package Three - 9 Sessions',
          description: 'Transform your body with eight targeted sessions, sculpting and toning one area for exceptional, lasting results. Each session is 2 hours.',
          price: 620,
          duration: 120,
          image: 'FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg',
        },
      ],
      products: [
        {
          id: 'waist-trainer-1',
          title: 'Waist Trainer',
          description: 'Premium quality waist trainer designed for body sculpting and support during workouts.',
          price: 25,
          image: '1.jpg',
          category: 'Body Shapers',
          badge: 'BEST SELLER',
        },
        {
          id: 'waist-trainer-2',
          title: 'Waist Trainer',
          description: 'Professional-grade waist trainer with advanced compression technology for optimal results.',
          price: 29.12,
          image: '2.jpg',
          category: 'Body Shapers',
        },
      ],
      testimonials: [
        {
          id: '1',
          name: 'Jessica M.',
          treatment: 'Wood Therapy Client',
          rating: 5,
          content: 'Had an amazing experience with El she is very delicate she explained everything to me and she is very delicate. I recommend 100% and will definitely go back for other treatments.',
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
          image: 'IMG_3361.jpeg',
          likes: 89,
        },
        {
          id: '3',
          image: 'IMG_3362.jpeg',
          likes: 203,
        },
        {
          id: '4',
          image: 'DE40158A-B168-46C1-B082-94E9F91478C5.jpeg',
          likes: 134,
        },
        {
          id: '5',
          image: 'FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg',
          likes: 178,
        },
        {
          id: '6',
          image: 'Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png',
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