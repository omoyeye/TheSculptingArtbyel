import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import { 
  Users, 
  ShoppingBag, 
  BarChart, 
  Calendar, 
  Settings, 
  Package, 
  PlusCircle,
  Edit,
  Trash2, 
  Search,
  Power,
  Clock,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for forms
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newTreatment, setNewTreatment] = useState({
    title: "", description: "", price: 0, duration: 30, slug: "", image: "", featured: false
  });
  const [newProduct, setNewProduct] = useState({
    title: "", description: "", price: 0, slug: "", image: "", category: "", stockQuantity: 0, featured: false
  });

  // Fetch data
  const { data: treatments = [] } = useQuery({
    queryKey: ['/api/treatments'],
    enabled: activeTab === 'treatments' || activeTab === 'overview'
  });

  const { data: products = [] } = useQuery({
    queryKey: ['/api/products'],
    enabled: activeTab === 'products' || activeTab === 'overview'
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['/api/bookings'],
    enabled: activeTab === 'bookings' || activeTab === 'overview'
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['/api/orders'],
    enabled: activeTab === 'orders' || activeTab === 'overview'
  });

  const { data: settings } = useQuery({
    queryKey: ['/api/settings'],
    enabled: activeTab === 'settings'
  });

  // Mutations for CRUD operations
  const updateSettingsMutation = useMutation({
    mutationFn: (newSettings) => 
      apiRequest('/api/settings', { method: 'PUT', body: JSON.stringify(newSettings) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      toast({ title: "Settings updated successfully" });
    }
  });

  const createTreatmentMutation = useMutation({
    mutationFn: (treatment) => 
      apiRequest('/api/treatments', { method: 'POST', body: JSON.stringify(treatment) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
      setNewTreatment({ title: "", description: "", price: 0, duration: 30, slug: "", image: "", featured: false });
      toast({ title: "Treatment created successfully" });
    }
  });

  const updateTreatmentMutation = useMutation({
    mutationFn: ({ id, ...treatment }) => 
      apiRequest(`/api/treatments/${id}`, { method: 'PUT', body: JSON.stringify(treatment) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
      setEditingTreatment(null);
      toast({ title: "Treatment updated successfully" });
    }
  });

  const deleteTreatmentMutation = useMutation({
    mutationFn: (id) => 
      apiRequest(`/api/treatments/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
      toast({ title: "Treatment deleted successfully" });
    }
  });

  const createProductMutation = useMutation({
    mutationFn: (product) => 
      apiRequest('/api/products', { method: 'POST', body: JSON.stringify(product) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setNewProduct({ title: "", description: "", price: 0, slug: "", image: "", category: "", stockQuantity: 0, featured: false });
      toast({ title: "Product created successfully" });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, ...product }) => 
      apiRequest(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setEditingProduct(null);
      toast({ title: "Product updated successfully" });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id) => 
      apiRequest(`/api/products/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product deleted successfully" });
    }
  });

  const updateBookingMutation = useMutation({
    mutationFn: ({ id, status }) => 
      apiRequest(`/api/bookings/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({ title: "Booking status updated successfully" });
    }
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, status }) => 
      apiRequest(`/api/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({ title: "Order status updated successfully" });
    }
  });

  // Toggle booking system
  const toggleBookingSystem = (enabled) => {
    updateSettingsMutation.mutate({ 
      ...settings, 
      bookingEnabled: enabled 
    });
  };

  // Calculate statistics
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const totalBookings = bookings?.length || 0;
  const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;
  const completedOrders = orders?.filter(o => o.status === 'completed').length || 0;

  // Filter data based on search
  const filteredTreatments = treatments.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookings = bookings.filter(b => 
    b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.treatmentTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | The Sculpting Art</title>
        <meta name="description" content="Admin dashboard for managing The Sculpting Art website content, products, treatments, and bookings." />
      </Helmet>

      <div className="flex min-h-screen bg-muted/30">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-secondary text-white fixed h-full">
          <div className="p-6">
            <h1 className="text-xl font-playfair">Admin Dashboard</h1>
            {settings && (
              <div className="mt-4 p-3 bg-secondary-foreground/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Booking System</span>
                  {settings.bookingEnabled ? 
                    <Eye className="h-4 w-4 text-green-400" /> : 
                    <EyeOff className="h-4 w-4 text-red-400" />
                  }
                </div>
                <p className="text-xs opacity-75">
                  {settings.bookingEnabled ? 'Active' : 'Disabled'}
                </p>
              </div>
            )}
          </div>
          
          <nav className="flex-1 px-4 py-2 space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-secondary-foreground/10 ${activeTab === 'overview' ? 'bg-secondary-foreground/10' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart className="mr-2 h-5 w-5" /> Overview
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-secondary-foreground/10 ${activeTab === 'bookings' ? 'bg-secondary-foreground/10' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar className="mr-2 h-5 w-5" /> Bookings
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-secondary-foreground/10 ${activeTab === 'treatments' ? 'bg-secondary-foreground/10' : ''}`}
              onClick={() => setActiveTab('treatments')}
            >
              <Users className="mr-2 h-5 w-5" /> Treatments
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-secondary-foreground/10 ${activeTab === 'products' ? 'bg-secondary-foreground/10' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package className="mr-2 h-5 w-5" /> Products
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-secondary-foreground/10 ${activeTab === 'orders' ? 'bg-secondary-foreground/10' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Orders
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-secondary-foreground/10 ${activeTab === 'settings' ? 'bg-secondary-foreground/10' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="mr-2 h-5 w-5" /> Settings
            </Button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="md:hidden">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[250px]" 
                  />
                </div>
              </div>
            </div>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair text-secondary">Dashboard Overview</h2>
                {settings && (
                  <div className="flex items-center gap-2">
                    <Power className={`h-5 w-5 ${settings.bookingEnabled ? 'text-green-600' : 'text-red-600'}`} />
                    <span className="text-sm font-medium">
                      Booking System {settings.bookingEnabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£{totalRevenue.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      From {completedOrders} completed orders
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalBookings}</div>
                    <p className="text-xs text-muted-foreground">
                      {pendingBookings} pending approval
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Treatments</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{treatments.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {treatments.filter(t => t.featured).length} featured
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{products.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {products.filter(p => p.stockQuantity > 0).length} in stock
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      Latest {Math.min(5, bookings.length)} bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Treatment</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.slice(0, 5).map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{booking.customerName || 'Guest'}</TableCell>
                            <TableCell>{booking.treatmentTitle}</TableCell>
                            <TableCell>{booking.date} • {booking.time}</TableCell>
                            <TableCell>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : booking.status === 'cancelled' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Latest {Math.min(5, orders.length)} orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.slice(0, 5).map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.customerName || 'Guest'}</TableCell>
                            <TableCell>£{order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.status === 'shipped' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair text-secondary">Booking Management</h2>
                <div className="flex items-center gap-2">
                  <Label htmlFor="booking-toggle">Enable Bookings</Label>
                  <Switch
                    id="booking-toggle"
                    checked={settings?.bookingEnabled || false}
                    onCheckedChange={toggleBookingSystem}
                  />
                </div>
              </div>

              {!settings?.bookingEnabled && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-orange-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-medium">Booking System Disabled</span>
                    </div>
                    <p className="text-sm text-orange-700 mt-1">
                      The booking system is currently disabled. Customers cannot make new bookings.
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
                  <CardDescription>
                    Manage customer bookings and appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Treatment</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>#{booking.id}</TableCell>
                          <TableCell>{booking.customerName || 'Guest'}</TableCell>
                          <TableCell>{booking.treatmentTitle}</TableCell>
                          <TableCell>{booking.date} • {booking.time}</TableCell>
                          <TableCell>£{booking.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Select 
                              value={booking.status} 
                              onValueChange={(status) => 
                                updateBookingMutation.mutate({ id: booking.id, status })
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Treatments Tab */}
            <TabsContent value="treatments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair text-secondary">Treatment Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Treatment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Treatment</DialogTitle>
                      <DialogDescription>
                        Create a new treatment offering for your business.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          value={newTreatment.title}
                          onChange={(e) => setNewTreatment({...newTreatment, title: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price (£)
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={newTreatment.price}
                          onChange={(e) => setNewTreatment({...newTreatment, price: parseFloat(e.target.value)})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                          Duration (min)
                        </Label>
                        <Input
                          id="duration"
                          type="number"
                          value={newTreatment.duration}
                          onChange={(e) => setNewTreatment({...newTreatment, duration: parseInt(e.target.value)})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          value={newTreatment.description}
                          onChange={(e) => setNewTreatment({...newTreatment, description: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        onClick={() => createTreatmentMutation.mutate({
                          ...newTreatment,
                          slug: newTreatment.title.toLowerCase().replace(/\s+/g, '-'),
                          image: "wood-therapy-1.jpg"
                        })}
                      >
                        Create Treatment
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Treatments ({filteredTreatments.length})</CardTitle>
                  <CardDescription>
                    Manage your treatment offerings and pricing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Treatment</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTreatments.map((treatment) => (
                        <TableRow key={treatment.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{treatment.title}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {treatment.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>£{treatment.price.toFixed(2)}</TableCell>
                          <TableCell>{treatment.duration} min</TableCell>
                          <TableCell>
                            <Switch
                              checked={treatment.featured || false}
                              onCheckedChange={(featured) =>
                                updateTreatmentMutation.mutate({ id: treatment.id, featured })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => deleteTreatmentMutation.mutate(treatment.id)}
                              >
                                <Trash2 className="h-4 w-4" />
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

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair text-secondary">Product Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Add a new product to your store catalog.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="product-title"
                          value={newProduct.title}
                          onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-price" className="text-right">
                          Price (£)
                        </Label>
                        <Input
                          id="product-price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-category" className="text-right">
                          Category
                        </Label>
                        <Input
                          id="product-category"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-stock" className="text-right">
                          Stock
                        </Label>
                        <Input
                          id="product-stock"
                          type="number"
                          value={newProduct.stockQuantity}
                          onChange={(e) => setNewProduct({...newProduct, stockQuantity: parseInt(e.target.value)})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="product-description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        onClick={() => createProductMutation.mutate({
                          ...newProduct,
                          slug: newProduct.title.toLowerCase().replace(/\s+/g, '-'),
                          image: "waist-trainer-1.jpg"
                        })}
                      >
                        Create Product
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Products ({filteredProducts.length})</CardTitle>
                  <CardDescription>
                    Manage your product catalog and inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {product.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>£{product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`${product.stockQuantity <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {product.stockQuantity}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={product.featured || false}
                              onCheckedChange={(featured) =>
                                updateProductMutation.mutate({ id: product.id, featured })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => deleteProductMutation.mutate(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
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

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <h2 className="text-3xl font-playfair text-secondary">Order Management</h2>

              <Card>
                <CardHeader>
                  <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
                  <CardDescription>
                    Track and manage customer orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>#{order.id}</TableCell>
                          <TableCell>{order.customerName || 'Guest'}</TableCell>
                          <TableCell>£{order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Select 
                              value={order.status} 
                              onValueChange={(status) => 
                                updateOrderMutation.mutate({ id: order.id, status })
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-3xl font-playfair text-secondary">Website Settings</h2>

              <div className="grid gap-6">
                {/* System Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Power className="h-5 w-5" />
                      System Controls
                    </CardTitle>
                    <CardDescription>
                      Control core website functionality
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="booking-system">Booking System</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow customers to book treatments online
                        </p>
                      </div>
                      <Switch
                        id="booking-system"
                        checked={settings?.bookingEnabled || false}
                        onCheckedChange={toggleBookingSystem}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Put website in maintenance mode
                        </p>
                      </div>
                      <Switch
                        id="maintenance-mode"
                        checked={settings?.maintenanceMode || false}
                        onCheckedChange={(maintenanceMode) =>
                          updateSettingsMutation.mutate({ ...settings, maintenanceMode })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Business Hours
                    </CardTitle>
                    <CardDescription>
                      Set your operating hours for bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {settings && Object.entries(settings.businessHours).map(([day, hours]) => (
                        <div key={day} className="flex items-center justify-between">
                          <div className="capitalize font-medium">{day}</div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={!hours.closed}
                              onCheckedChange={(open) => {
                                const updatedHours = {
                                  ...settings.businessHours,
                                  [day]: open 
                                    ? { closed: false, open: "8:00", close: "17:00" }
                                    : { closed: true }
                                };
                                updateSettingsMutation.mutate({
                                  ...settings,
                                  businessHours: updatedHours
                                });
                              }}
                            />
                            {!hours.closed && (
                              <div className="flex gap-2">
                                <Input
                                  type="time"
                                  value={hours.open || "8:00"}
                                  className="w-32"
                                  onChange={(e) => {
                                    const updatedHours = {
                                      ...settings.businessHours,
                                      [day]: { ...hours, open: e.target.value }
                                    };
                                    updateSettingsMutation.mutate({
                                      ...settings,
                                      businessHours: updatedHours
                                    });
                                  }}
                                />
                                <span>to</span>
                                <Input
                                  type="time"
                                  value={hours.close || "17:00"}
                                  className="w-32"
                                  onChange={(e) => {
                                    const updatedHours = {
                                      ...settings.businessHours,
                                      [day]: { ...hours, close: e.target.value }
                                    };
                                    updateSettingsMutation.mutate({
                                      ...settings,
                                      businessHours: updatedHours
                                    });
                                  }}
                                />
                              </div>
                            )}
                            {hours.closed && (
                              <span className="text-muted-foreground">Closed</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>
                      Update your business contact details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={settings?.contactInfo?.phone || ""}
                          onChange={(e) => updateSettingsMutation.mutate({
                            ...settings,
                            contactInfo: { ...settings?.contactInfo, phone: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings?.contactInfo?.email || ""}
                          onChange={(e) => updateSettingsMutation.mutate({
                            ...settings,
                            contactInfo: { ...settings?.contactInfo, email: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Business Address</Label>
                      <Textarea
                        id="address"
                        value={settings?.contactInfo?.address || ""}
                        onChange={(e) => updateSettingsMutation.mutate({
                          ...settings,
                          contactInfo: { ...settings?.contactInfo, address: e.target.value }
                        })}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Instagram className="h-5 w-5" />
                      Social Media
                    </CardTitle>
                    <CardDescription>
                      Update your social media links
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          value={settings?.socialMedia?.instagram || ""}
                          onChange={(e) => updateSettingsMutation.mutate({
                            ...settings,
                            socialMedia: { ...settings?.socialMedia, instagram: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          value={settings?.socialMedia?.facebook || ""}
                          onChange={(e) => updateSettingsMutation.mutate({
                            ...settings,
                            socialMedia: { ...settings?.socialMedia, facebook: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          value={settings?.socialMedia?.twitter || ""}
                          onChange={(e) => updateSettingsMutation.mutate({
                            ...settings,
                            socialMedia: { ...settings?.socialMedia, twitter: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Site Content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Site Content</CardTitle>
                    <CardDescription>
                      Update homepage and key website content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hero-title">Hero Title</Label>
                      <Input
                        id="hero-title"
                        value={settings?.siteContent?.heroTitle || ""}
                        onChange={(e) => updateSettingsMutation.mutate({
                          ...settings,
                          siteContent: { ...settings?.siteContent, heroTitle: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                      <Input
                        id="hero-subtitle"
                        value={settings?.siteContent?.heroSubtitle || ""}
                        onChange={(e) => updateSettingsMutation.mutate({
                          ...settings,
                          siteContent: { ...settings?.siteContent, heroSubtitle: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-text">About Text</Label>
                      <Textarea
                        id="about-text"
                        value={settings?.siteContent?.aboutText || ""}
                        onChange={(e) => updateSettingsMutation.mutate({
                          ...settings,
                          siteContent: { ...settings?.siteContent, aboutText: e.target.value }
                        })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}