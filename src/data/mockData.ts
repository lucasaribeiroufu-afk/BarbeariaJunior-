import { Service, Barber, Product, GalleryItem, InstagramPost, Testimonial } from '../types';
const ademirAvatar = '/images/ademir-junior.png';

export const STUDIO_INFO = {
  name: '13302 STUDIO',
  slogan: 'Mais que um corte, uma experiência única.',
  subtitle: 'Experiências personalizadas para homens que valorizam elegância, imagem e exclusividade.',
  tagline: 'ATENDIMENTO VIP · VISAGISMO · EXCLUSIVIDADE',
  instagramHandle: '@13302studio',
  instagramUrl: 'https://www.instagram.com/13302studio',
  whatsappNumber: '5534999448588',
  whatsappUrl: 'https://wa.me/5534999448588',
  phoneDisplay: '(34) 99944-8588',
  address: 'Rua Santos Dumont, 1302 - Centro',
  hours: 'Seg a Sáb: 09:00 às 20:00',
  googleMapsLink: 'https://maps.google.com/?q=13302+Studio',
};

export const SERVICES: Service[] = [
  {
    "id": "corte-classico",
    "name": "Corte Signature",
    "category": "cabelo",
    "durationMin": 40,
    "price": 35,
    "description": "Corte masculino personalizado, executado com técnica refinada e acabamento preciso. Um serviço pensado para destacar sua identidade e manter um visual impecável."
  },
  {
    "id": "corte-barba",
    "name": "Experiência Executiva",
    "category": "combos",
    "durationMin": 60,
    "price": 60,
    "description": "A combinação perfeita entre cuidado e sofisticação. Inclui Corte Signature e Barboterapia Premium, proporcionando um visual completo, alinhado e elegante.",
    "popular": true
  },
  {
    "id": "barba-desenhada",
    "name": "Barboterapia Premium",
    "category": "barba",
    "durationMin": 30,
    "price": 35,
    "description": "Experiência dedicada à barba, com preparação da pele, toalha quente, modelagem personalizada, acabamento na navalha e finalização com produtos premium."
  },
  {
    "id": "visagismo",
    "name": "Consultoria Visagista",
    "category": "visagismo",
    "durationMin": 60,
    "price": 50,
    "description": "Análise personalizada das proporções faciais, estilo de vida e objetivos de imagem para desenvolver um visual autêntico, equilibrado e alinhado à sua personalidade."
  },
  {
    "id": "atendimento-vip",
    "name": "Experiência The Gentleman",
    "category": "vip",
    "durationMin": 120,
    "price": 150,
    "description": "A experiência mais exclusiva da 13302 Studio. Combina corte personalizado, barboterapia premium, hidratação capilar, tratamento facial revitalizante e atendimento reservado em ambiente privativo.",
    "highlights": [
      "Atendimento exclusivo",
      "Bebida premium de cortesia",
      "Tratamento completo de imagem e bem-estar"
    ],
    "vip": true
  },
  {
    "id": "old-money-hairstyle",
    "name": "Assinatura Old Money",
    "category": "cabelo",
    "durationMin": 60,
    "price": 120,
    "description": "Inspirado na elegância masculina clássica, o Old Money Hairstyle combina corte de precisão, texturização estratégica e finalização personalizada para criar um visual sofisticado, natural e atemporal.",
    "highlights": [
      "Estilo clássico e elegante",
      "Acabamento premium",
      "Fixação natural e duradoura (Escova + Pomada)"
    ]
  },
  {
    "id": "camuflagem-grisalhos",
    "name": "Pintura ou Camuflagem Premium de Grisalhos",
    "category": "cabelo",
    "durationMin": 40,
    "price": 50,
    "description": "Procedimento desenvolvido para suavizar fios brancos de forma discreta, preservando a naturalidade e a harmonia da imagem masculina.",
    "highlights": [
      "Resultado sutil e sofisticado",
      "Sem efeito artificial",
      "Aparência mais jovem e elegante"
    ]
  }
];

export const BARBERS: Barber[] = [{
  id: 'barber-ademir-junior',
  name: 'Ademir Júnior',
  role: 'Barbeiro responsável · 13302 Studio',
  avatar: ademirAvatar,
  bio: 'Ademir Júnior é o único profissional responsável pelos cortes da 13302 Studio. Cada atendimento é realizado de forma personalizada, com atenção ao estilo e às preferências de cada cliente.',
  experienceYears: 0,
  rating: 0,
  reviewsCount: 0,
  specialties: ['Corte masculino', 'Barba', 'Visagismo', 'Atendimento personalizado'],
}];

export const PRODUCTS: Product[] = [
  {
    "id": "oleo-play-barber-30ml",
    "name": "Óleo para Barba Play Barber 30 ml",
    "category": "BARBA",
    "price": 20,
    "description": "Óleo para barba Play Barber, linha Woody, com fragrância amadeirada. Apresentação profissional em frasco de 30 ml.",
    "benefits": [
      "Fragrância amadeirada Woody",
      "Apresentação profissional",
      "Frasco de 30 ml"
    ],
    "volume": "30 ml",
    "image": "/images/products/play-barber-oleo-30ml.png",
    "imageFrame": {
      "width": 372,
      "height": 443,
      "sourceHeight": 582
    },
    "stock": 0,
    "rating": 0,
    "reviewsCount": 0
  },
  {
    "id": "cera-matte-wax-big-barber-75g",
    "name": "Cera Capilar Matte Wax Big Barber 75 g",
    "category": "STYLING",
    "price": 20,
    "description": "Desenvolvida para estilizar o penteado com acabamento matte e efeito seco extra forte. Ideal para deixar o cabelo com aparência natural e leve, conferindo opacidade sem pesar. Sua textura firme ajuda a criar um visual elegante e de longa duração.",
    "benefits": [
      "Acabamento matte e efeito seco",
      "Fixação extra forte",
      "Aparência natural e leve",
      "Textura firme para modelar"
    ],
    "volume": "75 g",
    "image": "/images/products/big-barber-matte-wax-75g.png",
    "imageFrame": {
      "width": 307,
      "height": 285,
      "sourceHeight": 656
    },
    "stock": 0,
    "rating": 0,
    "reviewsCount": 0
  },
  {
    "id": "pasta-shine-wax-big-barber-75g",
    "name": "Pasta Capilar Shine Wax Big Barber 75 g",
    "category": "STYLING",
    "price": 20,
    "description": "Pasta capilar profissional com efeito brilho e fixação extra forte. Oferece ação antifrizz e hidratação para estilizar com acabamento natural e sofisticado.",
    "benefits": [
      "Efeito brilho",
      "Fixação extra forte",
      "Ação antifrizz",
      "Hidratação e acabamento sofisticado"
    ],
    "volume": "75 g",
    "image": "/images/products/big-barber-shine-wax-75g.png",
    "imageFrame": {
      "width": 411,
      "height": 365,
      "sourceHeight": 590
    },
    "stock": 0,
    "rating": 0,
    "reviewsCount": 0
  },
  {
    "id": "kit-shampoo-condicionador-big-barber-250ml",
    "name": "Kit Shampoo + Condicionador Big Barber 250 ml",
    "category": "KITS",
    "price": 35,
    "description": "Kit profissional com Shampoo Capilar Big Barber Ice Cool e Condicionador Capilar Big Barber Nutre Care, com 250 ml cada. O shampoo foi desenvolvido para promover limpeza profunda, removendo impurezas e oleosidade excessiva sem ressecar, com hidratação, fortalecimento e revitalização dos cabelos. O condicionador ajuda a hidratar e restaurar os fios, proporcionando maciez da raiz às pontas. Sua fórmula conta com seiva de bambu, aloe vera e óleo de macadâmia para nutrição e prevenção do ressecamento.",
    "benefits": [
      "Shampoo Ice Cool + Condicionador Nutre Care",
      "250 ml em cada frasco",
      "Limpeza sem ressecar",
      "Hidratação, maciez e nutrição",
      "Indicado para todos os tipos de cabelo"
    ],
    "volume": "2 × 250 ml",
    "image": "/images/products/big-barber-kit-250ml.png",
    "imageFrame": {
      "width": 312,
      "height": 312,
      "sourceHeight": 735
    },
    "stock": 0,
    "rating": 0,
    "reviewsCount": 0
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Old Money Side Part',
    subtitle: 'Acabamento acetinado clássico com risca milimétrica e degradê suave.',
    category: 'Old Money',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
    likes: 342,
    tags: ['Old Money', 'Clássico', 'Visagismo'],
    serviceReferenceName: 'Assinatura Old Money',
    serviceId: 'old-money-hairstyle',
  },
  {
    id: 'gal-2',
    title: 'Lâminas & Navalha de Precisão',
    subtitle: 'O ritual tradicional com toalhas quentes e navalhete de aço cirúrgico.',
    category: 'Barboterapia',
    imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80',
    likes: 289,
    tags: ['Barba', 'Navalha', 'Ritual'],
    serviceReferenceName: 'Barboterapia Premium',
    serviceId: 'barba-desenhada',
  },
  {
    id: 'gal-3',
    title: 'Scissor Cut & Texture',
    subtitle: 'Trabalho manual 100% na tesoura para caimento orgânico com volume nobre.',
    category: 'Corte',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80',
    likes: 415,
    tags: ['Tesoura', 'Textura', 'Natural'],
    serviceReferenceName: 'Corte Signature',
    serviceId: 'corte-classico',
  },
  {
    id: 'gal-4',
    title: 'Fade Sombreado & Barba Esculpida',
    subtitle: 'Conexão harmônica entre costeleta e barba desenhada sob medida.',
    category: 'Combo',
    imageUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=800&auto=format&fit=crop&q=80',
    likes: 520,
    tags: ['Corte + Barba', 'Fade', 'Harmonização'],
    serviceReferenceName: 'Experiência Executiva',
    serviceId: 'corte-barba',
  },
  {
    id: 'gal-5',
    title: 'Experiência VIP & Sala Reservada',
    subtitle: 'Ambiente exclusivo com café especial, uísque single malt e total privacidade.',
    category: 'Exclusividade',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80',
    likes: 388,
    tags: ['VIP', 'Privacidade', 'Bebida Cortesia'],
    serviceReferenceName: 'Experiência The Gentleman',
    serviceId: 'atendimento-vip',
  },
  {
    id: 'gal-6',
    title: 'Grooming & Finalização Premium',
    subtitle: 'Produtos selecionados para manter o penteado perfeito até o final do dia.',
    category: 'Styling',
    imageUrl: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80',
    likes: 310,
    tags: ['Produtos', 'Pomada', 'Finalização'],
    serviceReferenceName: 'Assinatura Old Money',
    serviceId: 'old-money-hairstyle',
  },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
    caption: 'Mais que um corte, um ritual que define presença. Agende seu horário no link da bio. 💈✂️ #13302studio #oldmoney #visagismo',
    likes: 482,
    comments: 28,
    date: 'Há 2 dias',
    postUrl: 'https://www.instagram.com/13302studio',
  },
  {
    id: 'ig-2',
    imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80',
    caption: 'Precisão milimétrica na navalha com toalha quente e óleos nobres de bergamota. Viva a experiência do 13302 Studio.',
    likes: 395,
    comments: 19,
    date: 'Há 4 dias',
    postUrl: 'https://www.instagram.com/13302studio',
  },
  {
    id: 'ig-3',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80',
    caption: 'A nova linha de pomadas Old Money com fixação matte já disponível no studio e em nossa loja virtual!',
    likes: 512,
    comments: 42,
    date: 'Há 6 dias',
    postUrl: 'https://www.instagram.com/13302studio',
  },
  {
    id: 'ig-4',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80',
    caption: 'Nosso espaço foi desenhado para quem valoriza discrição, conforto e excelência artesanal.',
    likes: 628,
    comments: 31,
    date: 'Há 1 semana',
    postUrl: 'https://www.instagram.com/13302studio',
  },
];

export const TESTIMONIALS: Testimonial[] = [];
