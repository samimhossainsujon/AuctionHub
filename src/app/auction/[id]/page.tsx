"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  Shield, 
  Truck, 
  ArrowLeft,
  Eye,
  MessageSquare,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useAuth } from '@/lib/auth-context';
import { featuredAuctions } from '@/lib/mock-data';
import { toast } from 'sonner';

export async function generateStaticParams() {
  return featuredAuctions.map((auction) => ({
    id: auction.id,
  }));
}

export default function AuctionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [isWatched, setIsWatched] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Find the auction by ID
  const auction = featuredAuctions.find(a => a.id === params.id);

  useEffect(() => {
    if (!auction) {
      router.push('/404');
    }
  }, [auction, router]);

  if (!auction) {
    return null;
  }

  const timeLeft = new Date(auction.endTime).getTime() - new Date().getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const formatTimeLeft = () => {
    if (timeLeft <= 0) return 'Auction ended';
    if (daysLeft > 0) return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m`;
    if (hoursLeft > 0) return `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    return `${minutesLeft}m ${secondsLeft}s`;
  };

  const handleBid = async () => {
    if (!user) {
      toast.error('Please sign in to place a bid');
      router.push('/login');
      return;
    }

    const bid = parseFloat(bidAmount);
    if (!bid || bid <= auction.currentPrice) {
      toast.error('Bid must be higher than current price');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Bid placed successfully!');
    setBidAmount('');
    setIsLoading(false);
  };

  const handleBuyNow = async () => {
    if (!user) {
      toast.error('Please sign in to buy now');
      router.push('/login');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Item purchased successfully!');
    setIsLoading(false);
  };

  const handleWatchToggle = () => {
    if (!user) {
      toast.error('Please sign in to add to watchlist');
      router.push('/login');
      return;
    }
    setIsWatched(!isWatched);
    toast.success(isWatched ? 'Removed from watchlist' : 'Added to watchlist');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === auction.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? auction.images.length - 1 : prev - 1
    );
  };

  const mockBidHistory = [
    { id: 1, bidder: 'b***r', amount: auction.currentPrice, time: '2 minutes ago' },
    { id: 2, bidder: 's***h', amount: auction.currentPrice - 50, time: '15 minutes ago' },
    { id: 3, bidder: 'm***k', amount: auction.currentPrice - 100, time: '1 hour ago' },
    { id: 4, bidder: 'j***n', amount: auction.currentPrice - 200, time: '3 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center space-x-1">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </Button>
          <span>/</span>
          <Link href="/categories" className="hover:text-foreground">Categories</Link>
          <span>/</span>
          <Link href={`/category/${auction.category}`} className="hover:text-foreground capitalize">
            {auction.category}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{auction.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={auction.images[currentImageIndex]}
                    alt={auction.title}
                    fill
                    className="object-cover"
                  />
                  {auction.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft size={20} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight size={20} />
                      </Button>
                    </>
                  )}
                  {auction.featured && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                {auction.images.length > 1 && (
                  <div className="flex space-x-2 p-4 overflow-x-auto">
                    {auction.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex ? 'border-primary' : 'border-border'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${auction.title} ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Item Details */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="seller">Seller Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Item Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {auction.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <h4 className="font-medium mb-2">Condition</h4>
                        <Badge variant="secondary" className="capitalize">
                          {auction.condition}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Category</h4>
                        <Badge variant="outline" className="capitalize">
                          {auction.category}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Location</h4>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          <span>{auction.location}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Item ID</h4>
                        <span className="text-sm text-muted-foreground">#{auction.id}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="shipping" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Truck size={16} className="text-muted-foreground" />
                          <span>Standard Shipping</span>
                        </div>
                        <span className="font-medium">
                          {auction.shipping === 0 ? 'FREE' : `$${auction.shipping}`}
                        </span>
                      </div>
                      <Separator />
                      <div className="text-sm text-muted-foreground">
                        <p>• Ships within 1-2 business days</p>
                        <p>• Tracking number provided</p>
                        <p>• Insurance included for items over $100</p>
                        <p>• Returns accepted within 30 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="seller" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Seller Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="text-lg">
                          {auction.sellerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{auction.sellerName}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="font-medium">{auction.sellerRating}</span>
                          </div>
                          <Badge variant="secondary">Verified Seller</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Member since 2020 • 99.2% positive feedback
                        </p>
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <MessageSquare size={14} className="mr-1" />
                            Contact Seller
                          </Button>
                          <Button variant="outline" size="sm">
                            View Other Items
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Bidding */}
          <div className="space-y-6">
            {/* Auction Info */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{auction.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Price */}
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-primary">
                      ${auction.currentPrice.toLocaleString()}
                    </span>
                    {auction.buyItNowPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${auction.buyItNowPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {auction.bidCount} bids • {auction.watchers} watching
                  </p>
                </div>

                {/* Time Left */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="font-medium">Time left:</span>
                  </div>
                  <div className={`text-lg font-bold ${
                    timeLeft < 3600000 ? 'text-red-600' : 'text-foreground'
                  }`}>
                    {formatTimeLeft()}
                  </div>
                </div>

                {timeLeft > 0 ? (
                  <>
                    {/* Bidding */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Enter your bid:</label>
                        <div className="flex space-x-2 mt-1">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              $
                            </span>
                            <Input
                              type="number"
                              placeholder={`${auction.currentPrice + 1}`}
                              value={bidAmount}
                              onChange={(e) => setBidAmount(e.target.value)}
                              className="pl-8"
                              min={auction.currentPrice + 1}
                            />
                          </div>
                          <Button 
                            onClick={handleBid} 
                            disabled={isLoading}
                            className="px-6"
                          >
                            {isLoading ? 'Bidding...' : 'Bid'}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Minimum bid: ${(auction.currentPrice + 1).toLocaleString()}
                        </p>
                      </div>

                      {auction.buyItNowPrice && (
                        <Button 
                          onClick={handleBuyNow} 
                          disabled={isLoading}
                          className="w-full"
                          size="lg"
                        >
                          {isLoading ? 'Processing...' : `Buy It Now - $${auction.buyItNowPrice.toLocaleString()}`}
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-lg font-medium text-muted-foreground">Auction Ended</p>
                    <Button variant="outline" className="mt-2">
                      View Similar Items
                    </Button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWatchToggle}
                    className="flex-1"
                  >
                    <Heart size={14} className={`mr-1 ${isWatched ? 'fill-current text-red-600' : ''}`} />
                    {isWatched ? 'Watching' : 'Watch'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 size={14} className="mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlertTriangle size={14} className="mr-1" />
                    Report
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield size={14} className="text-green-600" />
                    <span>Buyer Protection</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Eye size={14} className="text-blue-600" />
                    <span>Authenticity Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck size={14} className="text-purple-600" />
                    <span>Fast & Secure Shipping</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bid History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBidHistory.map((bid) => (
                    <div key={bid.id} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{bid.bidder}</span>
                        <p className="text-muted-foreground">{bid.time}</p>
                      </div>
                      <span className="font-bold">${bid.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Bids
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}