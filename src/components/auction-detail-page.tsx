"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { Separator } from '@/src/components/ui/separator';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';
import { useAuth } from '@/src/lib/auth-context';
import { toast } from 'sonner';
import { Auction } from '@/src/lib/types';

interface AuctionDetailPageClientProps {
    auction: Auction | undefined;
}

export default function AuctionDetailPageClient({ auction }: AuctionDetailPageClientProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [bidAmount, setBidAmount] = useState('');
    const [isWatched, setIsWatched] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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
                            </CardContent>
                        </Card>

                        {/* Auction Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{auction.description}</p>
                                <Separator className="my-4" />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="font-semibold">Condition:</span> {auction.condition}</div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right Column - Bidding and Seller Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">{auction.title}</CardTitle>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                        <Heart size={16} />
                                        <span>{auction.watchers} watchers</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <div className="text-lg">Current bid</div>
                                    <div className="text-3xl font-bold text-primary">${auction.currentPrice.toLocaleString()}</div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {mockBidHistory.length} bids
                                </div>

                                <div className="flex items-center space-x-2 text-destructive-foreground bg-destructive/90 p-3 rounded-md">
                                    <Clock size={20} />
                                    <div className="flex flex-col">
                                        <span className="font-bold">Auction ends in</span>
                                        <span className="text-lg font-mono tracking-wider">{formatTimeLeft()}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex space-x-2">
                                        <Input
                                            type="number"
                                            placeholder={`$${(auction.currentPrice + (auction.currentPrice * 0.05)).toFixed(2)} or more`}
                                            className="flex-grow"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            disabled={isLoading || timeLeft <= 0}
                                        />
                                        <Button
                                            onClick={handleBid}
                                            disabled={isLoading || timeLeft <= 0}
                                            className="w-28"
                                        >
                                            {isLoading ? 'Bidding...' : 'Place Bid'}
                                        </Button>
                                    </div>
                                    {auction.buyItNowPrice && (
                                        <Button
                                            variant="secondary"
                                            className="w-full"
                                            onClick={handleBuyNow}
                                            disabled={isLoading || timeLeft <= 0}
                                        >
                                            Buy Now for ${auction.buyItNowPrice.toLocaleString()}
                                        </Button>
                                    )}
                                </div>

                                <div className="flex justify-center space-x-4 pt-2">
                                    <Button variant="outline" size="sm" onClick={handleWatchToggle}>
                                        <Heart size={16} className="mr-2" />
                                        {isWatched ? 'Watching' : 'Watch'}
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Share2 size={16} className="mr-2" />
                                        Share
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Seller Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarFallback>{auction.sellerName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-bold text-primary">{auction.sellerName}</div>
                                        <div className="text-sm text-muted-foreground">99.5% Positive Feedback</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Star size={16} className="text-yellow-400" />
                                    <span>Top Rated Seller</span>
                                </div>
                                <Separator />
                                <Button variant="outline" className="w-full">
                                    <MessageSquare size={16} className="mr-2" />
                                    Contact Seller
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping & Payments</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                    <MapPin size={16} className="text-muted-foreground" />
                                    <span>Ships from {auction.location}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Questions and Answers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">No questions yet.</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Report Item</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" size="sm" className="w-full text-destructive">
                                    <AlertTriangle size={16} className="mr-2" />
                                    Report this item
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