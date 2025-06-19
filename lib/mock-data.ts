import { Auction, Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', icon: 'Smartphone', count: 1250 },
  { id: '2', name: 'Fashion', slug: 'fashion', icon: 'Shirt', count: 2100 },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', icon: 'Home', count: 890 },
  { id: '4', name: 'Collectibles', slug: 'collectibles', icon: 'Star', count: 650 },
  { id: '5', name: 'Sports', slug: 'sports', icon: 'Zap', count: 420 },
  { id: '6', name: 'Motors', slug: 'motors', icon: 'Car', count: 310 },
  { id: '7', name: 'Books', slug: 'books', icon: 'Book', count: 780 },
  { id: '8', name: 'Art', slug: 'art', icon: 'Palette', count: 290 }
];

export const featuredAuctions: Auction[] = [
  {
    id: '1',
    title: 'Vintage 1960s Gibson Les Paul Standard',
    description: 'Rare vintage Gibson Les Paul in excellent condition. Original PAF pickups, beautiful flame maple top.',
    images: [
      'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg',
      'https://images.pexels.com/photos/1290123/pexels-photo-1290123.jpeg'
    ],
    startPrice: 500,
    currentPrice: 2850,
    buyItNowPrice: 4500,
    endTime: '2024-12-25T18:00:00Z',
    sellerId: 'seller1',
    sellerName: 'VintageGuitars',
    sellerRating: 4.9,
    category: 'collectibles',
    condition: 'used',
    location: 'Nashville, TN',
    shipping: 50,
    bidCount: 23,
    watchers: 156,
    status: 'active',
    featured: true,
    createdAt: '2024-12-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Apple MacBook Pro 16" M3 Max - Sealed',
    description: 'Brand new sealed MacBook Pro 16" with M3 Max chip, 32GB RAM, 1TB SSD. Space Black color.',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg'
    ],
    startPrice: 1000,
    currentPrice: 3200,
    buyItNowPrice: 3800,
    endTime: '2024-12-23T15:30:00Z',
    sellerId: 'seller2',
    sellerName: 'TechDeals',
    sellerRating: 4.7,
    category: 'electronics',
    condition: 'new',
    location: 'Cupertino, CA',
    shipping: 0,
    bidCount: 47,
    watchers: 298,
    status: 'active',
    featured: true,
    createdAt: '2024-12-14T09:15:00Z'
  },
  {
    id: '3',
    title: 'Rolex Submariner Date - 2020 Model',
    description: 'Authentic Rolex Submariner Date 116610LN from 2020. Complete set with box and papers.',
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
    ],
    startPrice: 5000,
    currentPrice: 8750,
    buyItNowPrice: 12000,
    endTime: '2024-12-24T20:00:00Z',
    sellerId: 'seller3',
    sellerName: 'LuxuryWatches',
    sellerRating: 4.95,
    category: 'fashion',
    condition: 'used',
    location: 'Geneva, Switzerland',
    shipping: 100,
    bidCount: 15,
    watchers: 234,
    status: 'active',
    featured: true,
    createdAt: '2024-12-13T14:20:00Z'
  },
  {
    id: '4',
    title: 'Rare Pokemon Card Collection - Shadowless Base Set',
    description: 'Complete shadowless base set in mint condition. All cards professionally graded PSA 9-10.',
    images: [
      'https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg',
      'https://images.pexels.com/photos/9072320/pexels-photo-9072320.jpeg'
    ],
    startPrice: 200,
    currentPrice: 1450,
    endTime: '2024-12-26T12:00:00Z',
    sellerId: 'seller4',
    sellerName: 'CardCollector',
    sellerRating: 4.8,
    category: 'collectibles',
    condition: 'new',
    location: 'Tokyo, Japan',
    shipping: 30,
    bidCount: 31,
    watchers: 187,
    status: 'active',
    featured: true,
    createdAt: '2024-12-12T11:30:00Z'
  }
];

export const recentAuctions: Auction[] = [
  {
    id: '5',
    title: 'Nike Air Jordan 1 Retro High OG "Chicago"',
    description: 'Authentic Nike Air Jordan 1 in the iconic Chicago colorway. Size 10, worn once.',
    images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
    startPrice: 100,
    currentPrice: 285,
    buyItNowPrice: 400,
    endTime: '2024-12-22T19:45:00Z',
    sellerId: 'seller5',
    sellerName: 'SneakerHead',
    sellerRating: 4.6,
    category: 'fashion',
    condition: 'used',
    location: 'Chicago, IL',
    shipping: 15,
    bidCount: 12,
    watchers: 67,
    status: 'active',
    featured: false,
    createdAt: '2024-12-16T08:00:00Z'
  },
  {
    id: '6',
    title: 'Sony PlayStation 5 Console - Digital Edition',
    description: 'PS5 Digital Edition in perfect working condition. Includes original box and accessories.',
    images: ['https://images.pexels.com/photos/7915285/pexels-photo-7915285.jpeg'],
    startPrice: 200,
    currentPrice: 420,
    buyItNowPrice: 500,
    endTime: '2024-12-23T21:00:00Z',
    sellerId: 'seller6',
    sellerName: 'GameZone',
    sellerRating: 4.7,
    category: 'electronics',
    condition: 'used',
    location: 'Los Angeles, CA',
    shipping: 25,
    bidCount: 18,
    watchers: 89,
    status: 'active',
    featured: false,
    createdAt: '2024-12-15T16:45:00Z'
  }
];