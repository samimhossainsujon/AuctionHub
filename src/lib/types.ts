export interface Auction {
  id: string;
  title: string;
  description: string;
  images: string[];
  startPrice: number;
  currentPrice: number;
  buyItNowPrice?: number;
  reservePrice?: number;
  endTime: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  category: string;
  condition: 'new' | 'used' | 'refurbished';
  location: string;
  shipping: number;
  bidCount: number;
  watchers: number;
  status: 'active' | 'ended' | 'sold' | 'draft';
  featured: boolean;
  createdAt: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: string;
  isWinning: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  auctionId?: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  auctionId: string;
  rating: number;
  comment: string;
  timestamp: string;
  type: 'buyer' | 'seller';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  subcategories?: Category[];
}