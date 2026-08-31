export type ServiceCategory = 'todos' | 'cabelo' | 'barba' | 'combos' | 'visagismo' | 'vip';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMin: number;
  price: number;
  description: string;
  highlights?: string[];
  popular?: boolean;
  vip?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  specialties: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  service: Service;
  additionalServices?: Service[];
  barber: Barber;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  totalPrice: number;
  paymentMethod: 'pix' | 'cartao' | 'local';
  paymentStatus: 'pago' | 'pendente_local';
  status: 'confirmado' | 'concluido' | 'cancelado';
  createdAt: string;
}

export type ProductCategory = 'TODOS' | 'STYLING' | 'BARBA' | 'CABELO' | 'VESTUARIO' | 'KITS';

export interface Product {
  id: string;
  name: string;
  category: 'STYLING' | 'BARBA' | 'CABELO' | 'VESTUARIO' | 'KITS';
  price: number;
  originalPrice?: number;
  description: string;
  benefits?: string[];
  howToUse?: string;
  volume?: string;
  image: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: 'retirada' | 'entrega';
  address?: CustomerAddress;
  paymentMethod: 'pix' | 'cartao';
  paymentStatus: 'pago' | 'processando';
  status: 'confirmado' | 'em_separacao' | 'pronto_retirada' | 'enviado' | 'entregue';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  likes: number;
  tags: string[];
  serviceReferenceName: string;
  serviceId?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  postUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrTitle?: string;
  avatar: string;
  rating: number;
  service: string;
  barberName: string;
  date: string;
  highlight: string;
  comment: string;
  category: 'visagismo' | 'corte' | 'barba' | 'vip';
  verified: boolean;
}
