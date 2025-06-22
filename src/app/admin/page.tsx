"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Shield,
  BarChart3,
  Settings
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { Input } from '@/src/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/src/components/ui/table';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';
import { useAuth } from '@/src/lib/auth-context';
import { featuredAuctions } from '@/src/lib/mock-data';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">You don&lsquo;t have permission to access this page.</p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const stats = {
    totalUsers: 12500,
    activeAuctions: 1250,
    totalRevenue: 125000,
    pendingReports: 23,
    monthlyGrowth: 15.2,
    conversionRate: 3.4
  };

  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@/srcexample.com', joined: '2024-12-20', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@/srcexample.com', joined: '2024-12-19', status: 'pending' },
    { id: 3, name: 'Mike Brown', email: 'mike@/srcexample.com', joined: '2024-12-18', status: 'active' },
    { id: 4, name: 'Emily Davis', email: 'emily@/srcexample.com', joined: '2024-12-17', status: 'suspended' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary" />
              <span>Admin Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-2">Manage your auction platform</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/admin/settings">
                <Settings size={16} className="mr-2" />
                Settings
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/reports">
                <BarChart3 size={16} className="mr-2" />
                Reports
              </Link>
            </Button>
          </div>
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="auctions">Auctions</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+180 new this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeAuctions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.pendingReports}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Excellent</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            user.status === 'active' ? 'default' :
                            user.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {user.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{user.joined}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Auctions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredAuctions.slice(0, 4).map((auction) => (
                      <div key={auction.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex-1">
                          <p className="font-medium truncate">{auction.title}</p>
                          <p className="text-sm text-muted-foreground">{auction.bidCount} bids</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${auction.currentPrice.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{auction.watchers} watching</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex space-x-2">
                <Input placeholder="Search users..." className="w-64" />
                <Button variant="outline">Export</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell>
                          <Badge variant={
                            user.status === 'active' ? 'default' :
                            user.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>4.8</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye size={14} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit size={14} />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auctions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Auction Management</h2>
              <div className="flex space-x-2">
                <Input placeholder="Search auctions..." className="w-64" />
                <Button variant="outline">Filter</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featuredAuctions.map((auction) => (
                      <TableRow key={auction.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {auction.title}
                        </TableCell>
                        <TableCell>{auction.sellerName}</TableCell>
                        <TableCell>${auction.currentPrice.toLocaleString()}</TableCell>
                        <TableCell>{auction.bidCount}</TableCell>
                        <TableCell>
                          <Badge variant={auction.status === 'active' ? 'default' : 'secondary'}>
                            {auction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye size={14} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit size={14} />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Transaction Management</h2>
              <div className="flex space-x-2">
                <Input placeholder="Search transactions..." className="w-64" />
                <Button variant="outline">Export</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((transaction) => (
                      <TableRow key={transaction}>
                        <TableCell className="font-medium">#TXN-{1000 + transaction}</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>TechDeals</TableCell>
                        <TableCell>$3,200</TableCell>
                        <TableCell>2024-12-20</TableCell>
                        <TableCell>
                          <Badge variant="default">Completed</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Reports & Issues</h2>
              <Button variant="outline">Generate Report</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((report) => (
                      <div key={report} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="destructive">High Priority</Badge>
                          <span className="text-sm text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="font-medium mb-1">Suspicious bidding activity</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Multiple bids from same IP address on auction #123
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Review</Button>
                          <Button size="sm">Investigate</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Info</Badge>
                        <span className="text-sm text-muted-foreground">1 hour ago</span>
                      </div>
                      <p className="font-medium mb-1">Server maintenance scheduled</p>
                      <p className="text-sm text-muted-foreground">
                        Scheduled maintenance window: Dec 25, 2:00 AM - 4:00 AM
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge>Success</Badge>
                        <span className="text-sm text-muted-foreground">3 hours ago</span>
                      </div>
                      <p className="font-medium mb-1">Backup completed successfully</p>
                      <p className="text-sm text-muted-foreground">
                        Daily database backup completed at 3:00 AM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}