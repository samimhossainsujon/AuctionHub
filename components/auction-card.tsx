"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Heart, Eye, MapPin, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Auction } from '@/lib/types';

interface AuctionCardProps {
  auction: Auction;
  className?: string;
}

export default function AuctionCard({ auction, className = '' }: AuctionCardProps) {
  const [isWatched, setIsWatched] = useState(false);
  
  const timeLeft = new Date(auction.endTime).getTime() - new Date().getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  const formatTimeLeft = () => {
    if (timeLeft <= 0) return 'Auction ended';
    if (daysLeft > 0) return `${daysLeft}d ${hoursLeft}h`;
    if (hoursLeft > 0) return `${hoursLeft}h ${minutesLeft}m`;
    return `${minutesLeft}m`;
  };

  const handleWatchToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWatched(!isWatched);
  };

  return (
    <Card className={`card-hover ${className} ${auction.featured ? 'auction-glow' : ''}`}>
      <div className="relative">
        <Link href={`/auction/${auction.id}`}>
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <Image
              src={auction.images[0]}
              alt={auction.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            {auction.featured && (
              <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={`absolute top-2 right-2 p-2 rounded-full ${
                isWatched ? 'bg-red-100 text-red-600' : 'bg-white/80 text-gray-600'
              } hover:bg-white transition-colors`}
              onClick={handleWatchToggle}
            >
              <Heart size={16} fill={isWatched ? 'currentColor' : 'none'} />
            </Button>
          </div>
        </Link>
      </div>

      <CardContent className="p-4">
        <Link href={`/auction/${auction.id}`} className="block">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
            {auction.title}
          </h3>
        </Link>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ${auction.currentPrice.toLocaleString()}
            </span>
            {auction.buyItNowPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${auction.buyItNowPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{auction.bidCount} bids</span>
            <div className="flex items-center space-x-1">
              <Clock size={12} />
              <span className={timeLeft < 3600000 ? 'text-red-600 font-medium' : ''}>
                {formatTimeLeft()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              <span>{auction.sellerRating}</span>
              <span className="text-muted-foreground">({auction.sellerName})</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <MapPin size={12} />
              <span className="truncate max-w-20">{auction.location}</span>
            </div>
          </div>

          {auction.shipping === 0 ? (
            <Badge variant="secondary" className="text-xs">Free Shipping</Badge>
          ) : (
            <span className="text-xs text-muted-foreground">
              +${auction.shipping} shipping
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-x-2">
        <Button asChild size="sm" className="flex-1">
          <Link href={`/auction/${auction.id}`}>
            {timeLeft > 0 ? 'Place Bid' : 'View Details'}
          </Link>
        </Button>
        {auction.buyItNowPrice && timeLeft > 0 && (
          <Button variant="outline" size="sm" className="flex-1">
            Buy Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}