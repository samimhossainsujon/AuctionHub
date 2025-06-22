"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Package, 
  Heart, 
  MessageSquare, 
  Star, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';
import AuctionCard from '@/src/components/auction-card';
import { useAuth } from '@/src/lib/auth-context';
import { featuredAuctions } from '@/src/lib/mock-data';

export default function DashboardPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'buying', 'selling', 'messages'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-8">You need to be signed in to access your dashboard.</p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const stats = {
    totalBids: 23,
    wonAuctions: 5,
    activeSales: 12,
    totalEarnings: 2450.50,
    watchlistItems: 18,
    messages: 7
  };

  const recentActivity = [
    { id: 1, type: 'bid', item: 'Vintage Guitar', amount: 1200, time: '2 hours ago' },
    { id: 2, type: 'won', item: 'MacBook Pro', amount: 2800, time: '1 day ago' },
    { id: 3, type: 'sale', item: 'Camera Lens', amount: 450, time: '2 days ago' },
    { id: 4, type: 'watch', item: 'Collectible Card', amount: 0, time: '3 days ago' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* User Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="w-16 h-16">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <AvatarFallback>
                  <User className="w-8 h-8 text-primary" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{user.rating}</span>
                  <span className="text-sm text-muted-foreground">rating</span>
                </div>
                <Badge variant={user.verified ? 'default' : 'secondary'}>
                  {user.verified ? 'Verified' : 'Unverified'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Member since {new Date(user.joinedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/profile">Edit Profile</Link>
            </Button>
            <Button asChild>
              <Link href="/sell" className="flex items-center space-x-2">
                <Plus size={16} />
                <span>List Item</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="buying">Buying</TabsTrigger>
            <TabsTrigger value="selling">Selling</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBids}</div>
                  <p className="text-xs text-muted-foreground">+3 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Won Auctions</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.wonAuctions}</div>
                  <p className="text-xs text-muted-foreground">+1 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sales</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeSales}</div>
                  <p className="text-xs text-muted-foreground">3 ending soon</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.watchlistItems}</div>
                  <p className="text-xs text-muted-foreground">2 ending today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.messages}</div>
                  <p className="text-xs text-muted-foreground">3 unread</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'bid' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'won' ? 'bg-green-100 text-green-600' :
                          activity.type === 'sale' ? 'bg-purple-100 text-purple-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {activity.type === 'bid' && <TrendingUp size={16} />}
                          {activity.type === 'won' && <Package size={16} />}
                          {activity.type === 'sale' && <DollarSign size={16} />}
                          {activity.type === 'watch' && <Heart size={16} />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {activity.type === 'bid' && `Bid on ${activity.item}`}
                            {activity.type === 'won' && `Won ${activity.item}`}
                            {activity.type === 'sale' && `Sold ${activity.item}`}
                            {activity.type === 'watch' && `Added ${activity.item} to watchlist`}
                          </p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      {activity.amount > 0 && (
                        <span className="font-medium">${activity.amount.toLocaleString()}</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buying" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Bids</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredAuctions.slice(0, 3).map((auction) => (
                      <div key={auction.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium truncate">{auction.title}</p>
                          <p className="text-sm text-muted-foreground">Your bid: $1,200</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${auction.currentPrice.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Current</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Won Auctions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">MacBook Pro 16&ldquo; M3 Max</p>
                          <Badge variant="secondary">Payment Required</Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$3,200</p>
                          <Button size="sm" variant="outline">Pay Now</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Watchlist Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredAuctions.slice(0, 3).map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="selling" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Listings</h2>
              <Button asChild>
                <Link href="/sell" className="flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Create Listing</span>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAuctions.slice(0, 6).map((auction) => (
                <Card key={auction.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={auction.images[0]}
                        alt={auction.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2">
                        {auction.status === 'active' ? 'Live' : 'Draft'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{auction.title}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary">
                        ${auction.currentPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {auction.bidCount} bids
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((message) => (
                    <div key={message} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">John Doe</p>
                          <span className="text-sm text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">Re: Vintage Guitar Auction</p>
                        <p className="text-sm">Hi, I&apos;m interested in the guitar. Can you provide more details about the condition?</p>
                      </div>
                      {message <= 3 && (
                        <Badge variant="destructive" className="px-1 min-w-[8px] h-2"></Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}