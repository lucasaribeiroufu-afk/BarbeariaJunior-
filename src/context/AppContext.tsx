import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Service, Product, CartItem, Appointment, Order, GalleryItem } from '../types';
import { SERVICES, PRODUCTS, BARBERS } from '../data/mockData';

interface AppContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;

  // Bookings / Appointments
  appointments: Appointment[];
  addAppointment: (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => Appointment;
  cancelAppointment: (appointmentId: string) => void;

  // Store Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => Order;

  // Modals & Navigation
  isBookingOpen: boolean;
  bookingPreselectedService: Service | null;
  openBooking: (service?: Service | null) => void;
  closeBooking: () => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  isHistoryOpen: boolean;
  historyInitialTab: 'agendamentos' | 'pedidos';
  openHistory: (tab?: 'agendamentos' | 'pedidos') => void;
  closeHistory: () => void;

  selectedProductDetail: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  selectedGalleryItem: GalleryItem | null;
  openGalleryModal: (item: GalleryItem) => void;
  closeGalleryModal: () => void;

  // Active Category Filter for Store
  selectedStoreCategory: string;
  setSelectedStoreCategory: (cat: string) => void;

  // Active Section Scrolling
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  CART: '13302_cart_v1',
  APPOINTMENTS: '13302_appointments_v1',
  ORDERS: '13302_orders_v1',
};

// Initial seed appointments so user sees a realistic booking history immediately
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-13302-8821',
    service: SERVICES[3], // Visagismo
    barber: BARBERS[0],
    date: '2026-09-02',
    time: '15:00',
    customerName: 'Cliente 13302',
    customerPhone: '(34) 99944-8588',
    customerEmail: 'cliente@13302studio.com',
    notes: 'Primeira vez no estúdio, foco em alinhamento de corte e estilo old-money.',
    totalPrice: 180,
    paymentMethod: 'pix',
    paymentStatus: 'pago',
    status: 'confirmado',
    createdAt: '2026-08-28T14:30:00.000Z',
  }
];

// Initial seed order
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-13302-9904',
    items: [
      { product: PRODUCTS[0], quantity: 1 }, // Pomada Old Money
      { product: PRODUCTS[1], quantity: 1 }, // Óleo para Barba
    ],
    subtotal: 140,
    discount: 0,
    shippingFee: 0,
    total: 140,
    customerName: 'Cliente 13302',
    customerPhone: '(34) 99944-8588',
    customerEmail: 'cliente@13302studio.com',
    deliveryMethod: 'retirada',
    paymentMethod: 'pix',
    paymentStatus: 'pago',
    status: 'pronto_retirada',
    createdAt: '2026-08-27T11:15:00.000Z',
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // UI Navigation / Modals State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreselectedService, setBookingPreselectedService] = useState<Service | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyInitialTab, setHistoryInitialTab] = useState<'agendamentos' | 'pedidos'>('agendamentos');
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedStoreCategory, setSelectedStoreCategory] = useState<string>('TODOS');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Persistence to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Appointment operations
  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Appointment => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `APT-13302-${randomCode}`,
      status: 'confirmado',
      paymentStatus: appointmentData.paymentMethod === 'local' ? 'pendente_local' : 'pago',
      createdAt: new Date().toISOString(),
    };

    setAppointments(prev => [newAppointment, ...prev]);
    return newAppointment;
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'cancelado' } : apt
      )
    );
  };

  // Order operations
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Order => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ORD-13302-${randomCode}`,
      status: orderData.deliveryMethod === 'retirada' ? 'pronto_retirada' : 'confirmado',
      paymentStatus: 'pago',
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Navigation & Modals
  const openBooking = (service: Service | null = null) => {
    setBookingPreselectedService(service);
    setIsBookingOpen(true);
    setIsSidebarOpen(false);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingPreselectedService(null);
  };

  const openCart = () => {
    setIsCartOpen(true);
    setIsSidebarOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const openHistory = (tab: 'agendamentos' | 'pedidos' = 'agendamentos') => {
    setHistoryInitialTab(tab);
    setIsHistoryOpen(true);
    setIsSidebarOpen(false);
  };

  const closeHistory = () => setIsHistoryOpen(false);

  const openProductDetail = (product: Product) => setSelectedProductDetail(product);
  const closeProductDetail = () => setSelectedProductDetail(null);

  const openGalleryModal = (item: GalleryItem) => setSelectedGalleryItem(item);
  const closeGalleryModal = () => setSelectedGalleryItem(null);

  const scrollToSection = (sectionId: string) => {
    setIsSidebarOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        appointments,
        addAppointment,
        cancelAppointment,
        orders,
        createOrder,
        isBookingOpen,
        bookingPreselectedService,
        openBooking,
        closeBooking,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        isHistoryOpen,
        historyInitialTab,
        openHistory,
        closeHistory,
        selectedProductDetail,
        openProductDetail,
        closeProductDetail,
        selectedGalleryItem,
        openGalleryModal,
        closeGalleryModal,
        selectedStoreCategory,
        setSelectedStoreCategory,
        activeSection,
        scrollToSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
