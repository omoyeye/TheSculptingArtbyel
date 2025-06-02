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
  EyeOff,
  Save
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [isAddTreatmentOpen, setIsAddTreatmentOpen] = useState(false);
  const [isEditTreatmentOpen, setIsEditTreatmentOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  
  // Form states
  const [editingTreatment, setEditingTreatment] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newTreatment, setNewTreatment] = useState({
    title: "", description: "", price: 0, duration: 30, featured: false
  });
  const [newProduct, setNewProduct] = useState({
    title: "", description: "", price: 0, category: "Body Sculpting", stockQuantity: 0, featured: false
  });
  const [settings, setSettings] = useState<any>(null);

  // Fetch data with proper typing
  const { data: treatments = [], isLoading: treatmentsLoading } = useQuery({
    queryKey: ['/api/treatments'],
    enabled: activeTab === 'treatments' || activeTab === 'overview'
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products'],
    enabled: activeTab === 'products' || activeTab === 'overview'
  });

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['/api/bookings'],
    enabled: activeTab === 'bookings' || activeTab === 'overview'
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['/api/orders'],
    enabled: activeTab === 'orders' || activeTab === 'overview'
  });

  // Load settings from localStorage and API
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Load from localStorage first for real-time updates
        const localSettings = localStorage.getItem('adminSettings');
        if (localSettings) {
          setSettings(JSON.parse(localSettings));
        }
        
        // Then fetch from API
        const apiSettings = await apiRequest('/api/settings');
        setSettings(apiSettings);
        localStorage.setItem('adminSettings', JSON.stringify(apiSettings));
      } catch (error) {
        console.error('Failed to load settings:', error);
        // Fallback to default settings
        const defaultSettings = {
          id: 1,
          bookingEnabled: true,
          maintenanceMode: false,
          businessHours: {
            monday: { closed: true },
            tuesday: { closed: false, open: "8:00", close: "17:00" },
            wednesday: { closed: false, open: "8:00", close: "17:00" },
            thursday: { closed: false, open: "8:00", close: "17:00" },
            friday: { closed: false, open: "8:00", close: "17:00" },
            saturday: { closed: false, open: "8:00", close: "17:00" },
            sunday: { closed: false, open: "8:00", close: "17:00" }
          },
          contactInfo: {
            phone: "+44 123 456 7890",
            email: "info@thesculptingart.com",
            address: "123 Beauty Street, London, UK"
          },
          socialMedia: {
            instagram: "@thesculptingart",
            facebook: "The Sculpting Art",
            twitter: "@sculptigart"
          },
          siteContent: {
            heroTitle: "Transform Your Body, Elevate Your Confidence",
            heroSubtitle: "Experience Professional Body Sculpting & Wellness Treatments",
            aboutText: "The Sculpting Art specializes in non-invasive body sculpting treatments that help you achieve your wellness goals."
          }
        };
        setSettings(defaultSettings);
        localStorage.setItem('adminSettings', JSON.stringify(defaultSettings));
      }
    };
    
    loadSettings();
  }, []);

  // Real-time settings update function
  const updateSettings = async (newSettings: any) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));
      
      // Update API
      await apiRequest('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(updatedSettings)
      });
      
      toast({ title: "Settings updated successfully" });
    } catch (error) {
      console.error('Failed to update settings:', error);
      toast({ title: "Failed to update settings", variant: "destructive" });
    }
  };

  // Mutations for CRUD operations
  const createTreatmentMutation = useMutation({
    mutationFn: async (treatment: any) => {
      const treatmentData = {
        ...treatment,
        slug: treatment.title.toLowerCase().replace(/\s+/g, '-'),
        image: "wood-therapy-1.jpg"
      };
      return await apiRequest('/api/treatments', {
        method: 'POST',
        body: JSON.stringify(treatmentData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
      setNewTreatment({ title: "", description: "", price: 0, duration: 30, featured: false });
      setIsAddTreatmentOpen(false);
      toast({ title: "Treatment created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create treatment", variant: "destructive" });
    }
  });

  const updateTreatmentMutation = useMutation({
    mutationFn: async (treatment: any) => {
      return await apiRequest(`/api/treatments/${treatment.id}`, {
        method: 'PUT',
        body: JSON.stringify(treatment)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
      setEditingTreatment(null);
      setIsEditTreatmentOpen(false);
      toast({ title: "Treatment updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update treatment", variant: "destructive" });
    }
  });

  const deleteTreatmentMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/treatments/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/treatments'] });
      toast({ title: "Treatment deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete treatment", variant: "destructive" });
    }
  });

  const createProductMutation = useMutation({
    mutationFn: async (product: any) => {
      const productData = {
        ...product,
        slug: product.title.toLowerCase().replace(/\s+/g, '-'),
        image: "waist-trainer-1.jpg"
      };
      return await apiRequest('/api/products', {
        method: 'POST',
        body: JSON.stringify(productData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setNewProduct({ title: "", description: "", price: 0, category: "Body Sculpting", stockQuantity: 0, featured: false });
      setIsAddProductOpen(false);
      toast({ title: "Product created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create product", variant: "destructive" });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async (product: any) => {
      return await apiRequest(`/api/products/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify(product)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setEditingProduct(null);
      setIsEditProductOpen(false);
      toast({ title: "Product updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update product", variant: "destructive" });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/products/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Product deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete product", variant: "destructive" });
    }
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await apiRequest(`/api/bookings/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      toast({ title: "Booking status updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update booking status", variant: "destructive" });
    }
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await apiRequest(`/api/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({ title: "Order status updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update order status", variant: "destructive" });
    }
  });

  // Toggle booking system
  const toggleBookingSystem = (enabled: boolean) => {
    updateSettings({ bookingEnabled: enabled });
  };

  // Calculate statistics
  const totalRevenue = Array.isArray(orders) ? orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0) : 0;
  const totalBookings = Array.isArray(bookings) ? bookings.length : 0;
  const pendingBookings = Array.isArray(bookings) ? bookings.filter((b: any) => b.status === 'pending').length : 0;
  const completedOrders = Array.isArray(orders) ? orders.filter((o: any) => o.status === 'completed').length : 0;

  // Filter data based on search
  const filteredTreatments = Array.isArray(treatments) ? treatments.filter((t: any) => 
    t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const filteredProducts = Array.isArray(products) ? products.filter((p: any) => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const filteredBookings = Array.isArray(bookings) ? bookings.filter((b: any) => 
    b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.treatmentTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const filteredOrders = Array.isArray(orders) ? orders.filter((o: any) => 
    o.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  // Edit handlers
  const handleEditTreatment = (treatment: any) => {
    setEditingTreatment(treatment);
    setIsEditTreatmentOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsEditProductOpen(true);
  };

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
                    <div className="text-2xl font-bold">{Array.isArray(treatments) ? treatments.length : 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {Array.isArray(treatments) ? treatments.filter((t: any) => t.featured).length : 0} featured
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Array.isArray(products) ? products.length : 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {Array.isArray(products) ? products.filter((p: any) => p.stockQuantity > 0).length : 0} in stock
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      Latest {Math.min(5, totalBookings)} bookings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookingsLoading ? (
                      <p>Loading bookings...</p>
                    ) : (
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
                          {Array.isArray(bookings) && bookings.length > 0 ? bookings.slice(0, 5).map((booking: any) => (
                            <TableRow key={booking.id}>
                              <TableCell>{booking.customerName || 'Guest'}</TableCell>
                              <TableCell>{booking.treatmentTitle || 'N/A'}</TableCell>
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
                          )) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-muted-foreground">
                                No bookings yet
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Latest {Math.min(5, Array.isArray(orders) ? orders.length : 0)} orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {ordersLoading ? (
                      <p>Loading orders...</p>
                    ) : (
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
                          {Array.isArray(orders) && orders.length > 0 ? orders.slice(0, 5).map((order: any) => (
                            <TableRow key={order.id}>
                              <TableCell>{order.customerName || 'Guest'}</TableCell>
                              <TableCell>£{(order.total || 0).toFixed(2)}</TableCell>
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
                          )) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-muted-foreground">
                                No orders yet
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}
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

              {settings && !settings.bookingEnabled && (
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
                  {bookingsLoading ? (
                    <p>Loading bookings...</p>
                  ) : (
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
                        {filteredBookings.length > 0 ? filteredBookings.map((booking: any) => (
                          <TableRow key={booking.id}>
                            <TableCell>#{booking.id}</TableCell>
                            <TableCell>{booking.customerName || 'Guest'}</TableCell>
                            <TableCell>{booking.treatmentTitle || 'N/A'}</TableCell>
                            <TableCell>{booking.date} • {booking.time}</TableCell>
                            <TableCell>£{(booking.price || 0).toFixed(2)}</TableCell>
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
                        )) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                              No bookings found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Treatments Tab */}
            <TabsContent value="treatments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair text-secondary">Treatment Management</h2>
                <Dialog open={isAddTreatmentOpen} onOpenChange={setIsAddTreatmentOpen}>
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
                          onChange={(e) => setNewTreatment({...newTreatment, price: parseFloat(e.target.value) || 0})}
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
                          onChange={(e) => setNewTreatment({...newTreatment, duration: parseInt(e.target.value) || 30})}
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="featured" className="text-right">
                          Featured
                        </Label>
                        <Switch
                          id="featured"
                          checked={newTreatment.featured}
                          onCheckedChange={(featured) => setNewTreatment({...newTreatment, featured})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        onClick={() => createTreatmentMutation.mutate(newTreatment)}
                        disabled={createTreatmentMutation.isPending}
                      >
                        {createTreatmentMutation.isPending ? 'Creating...' : 'Create Treatment'}
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
                  {treatmentsLoading ? (
                    <p>Loading treatments...</p>
                  ) : (
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
                        {filteredTreatments.length > 0 ? filteredTreatments.map((treatment: any) => (
                          <TableRow key={treatment.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{treatment.title}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                  {treatment.description}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>£{(treatment.price || 0).toFixed(2)}</TableCell>
                            <TableCell>{treatment.duration || 0} min</TableCell>
                            <TableCell>
                              <Switch
                                checked={treatment.featured || false}
                                onCheckedChange={(featured) =>
                                  updateTreatmentMutation.mutate({ ...treatment, featured })
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditTreatment(treatment)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => deleteTreatmentMutation.mutate(treatment.id)}
                                  disabled={deleteTreatmentMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              No treatments found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Edit Treatment Dialog */}
              <Dialog open={isEditTreatmentOpen} onOpenChange={setIsEditTreatmentOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Treatment</DialogTitle>
                    <DialogDescription>
                      Update treatment details.
                    </DialogDescription>
                  </DialogHeader>
                  {editingTreatment && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="edit-title"
                          value={editingTreatment.title}
                          onChange={(e) => setEditingTreatment({...editingTreatment, title: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-price" className="text-right">
                          Price (£)
                        </Label>
                        <Input
                          id="edit-price"
                          type="number"
                          value={editingTreatment.price}
                          onChange={(e) => setEditingTreatment({...editingTreatment, price: parseFloat(e.target.value) || 0})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-duration" className="text-right">
                          Duration (min)
                        </Label>
                        <Input
                          id="edit-duration"
                          type="number"
                          value={editingTreatment.duration}
                          onChange={(e) => setEditingTreatment({...editingTreatment, duration: parseInt(e.target.value) || 30})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="edit-description"
                          value={editingTreatment.description}
                          onChange={(e) => setEditingTreatment({...editingTreatment, description: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-featured" className="text-right">
                          Featured
                        </Label>
                        <Switch
                          id="edit-featured"
                          checked={editingTreatment.featured}
                          onCheckedChange={(featured) => setEditingTreatment({...editingTreatment, featured})}
                        />
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={() => updateTreatmentMutation.mutate(editingTreatment)}
                      disabled={updateTreatmentMutation.isPending}
                    >
                      {updateTreatmentMutation.isPending ? 'Updating...' : 'Update Treatment'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair text-secondary">Product Management</h2>
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
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
                          onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-category" className="text-right">
                          Category
                        </Label>
                        <Select value={newProduct.category} onValueChange={(category) => setNewProduct({...newProduct, category})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Body Sculpting">Body Sculpting</SelectItem>
                            <SelectItem value="Waist Trainers">Waist Trainers</SelectItem>
                            <SelectItem value="Skincare">Skincare</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-stock" className="text-right">
                          Stock
                        </Label>
                        <Input
                          id="product-stock"
                          type="number"
                          value={newProduct.stockQuantity}
                          onChange={(e) => setNewProduct({...newProduct, stockQuantity: parseInt(e.target.value) || 0})}
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-featured" className="text-right">
                          Featured
                        </Label>
                        <Switch
                          id="product-featured"
                          checked={newProduct.featured}
                          onCheckedChange={(featured) => setNewProduct({...newProduct, featured})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        onClick={() => createProductMutation.mutate(newProduct)}
                        disabled={createProductMutation.isPending}
                      >
                        {createProductMutation.isPending ? 'Creating...' : 'Create Product'}
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
                  {productsLoading ? (
                    <p>Loading products...</p>
                  ) : (
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
                        {filteredProducts.length > 0 ? filteredProducts.map((product: any) => (
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
                            <TableCell>£{(product.price || 0).toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`${(product.stockQuantity || 0) <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {product.stockQuantity || 0}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={product.featured || false}
                                onCheckedChange={(featured) =>
                                  updateProductMutation.mutate({ ...product, featured })
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => deleteProductMutation.mutate(product.id)}
                                  disabled={deleteProductMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                              No products found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Edit Product Dialog */}
              <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                      Update product details.
                    </DialogDescription>
                  </DialogHeader>
                  {editingProduct && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-product-title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="edit-product-title"
                          value={editingProduct.title}
                          onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-product-price" className="text-right">
                          Price (£)
                        </Label>
                        <Input
                          id="edit-product-price"
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-product-category" className="text-right">
                          Category
                        </Label>
                        <Select value={editingProduct.category} onValueChange={(category) => setEditingProduct({...editingProduct, category})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Body Sculpting">Body Sculpting</SelectItem>
                            <SelectItem value="Waist Trainers">Waist Trainers</SelectItem>
                            <SelectItem value="Skincare">Skincare</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-product-stock" className="text-right">
                          Stock
                        </Label>
                        <Input
                          id="edit-product-stock"
                          type="number"
                          value={editingProduct.stockQuantity}
                          onChange={(e) => setEditingProduct({...editingProduct, stockQuantity: parseInt(e.target.value) || 0})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-product-description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="edit-product-description"
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-product-featured" className="text-right">
                          Featured
                        </Label>
                        <Switch
                          id="edit-product-featured"
                          checked={editingProduct.featured}
                          onCheckedChange={(featured) => setEditingProduct({...editingProduct, featured})}
                        />
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={() => updateProductMutation.mutate(editingProduct)}
                      disabled={updateProductMutation.isPending}
                    >
                      {updateProductMutation.isPending ? 'Updating...' : 'Update Product'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                  {ordersLoading ? (
                    <p>Loading orders...</p>
                  ) : (
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
                        {filteredOrders.length > 0 ? filteredOrders.map((order: any) => (
                          <TableRow key={order.id}>
                            <TableCell>#{order.id}</TableCell>
                            <TableCell>{order.customerName || 'Guest'}</TableCell>
                            <TableCell>£{(order.total || 0).toFixed(2)}</TableCell>
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
                        )) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                              No orders found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
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
                          updateSettings({ maintenanceMode })
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
                      {settings && settings.businessHours && Object.entries(settings.businessHours).map(([day, hours]: [string, any]) => (
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
                                updateSettings({ businessHours: updatedHours });
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
                                    updateSettings({ businessHours: updatedHours });
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
                                    updateSettings({ businessHours: updatedHours });
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
                          onChange={(e) => updateSettings({
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
                          onChange={(e) => updateSettings({
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
                        onChange={(e) => updateSettings({
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
                          onChange={(e) => updateSettings({
                            socialMedia: { ...settings?.socialMedia, instagram: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <Input
                          id="facebook"
                          value={settings?.socialMedia?.facebook || ""}
                          onChange={(e) => updateSettings({
                            socialMedia: { ...settings?.socialMedia, facebook: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          value={settings?.socialMedia?.twitter || ""}
                          onChange={(e) => updateSettings({
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
                        onChange={(e) => updateSettings({
                          siteContent: { ...settings?.siteContent, heroTitle: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                      <Input
                        id="hero-subtitle"
                        value={settings?.siteContent?.heroSubtitle || ""}
                        onChange={(e) => updateSettings({
                          siteContent: { ...settings?.siteContent, heroSubtitle: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="about-text">About Text</Label>
                      <Textarea
                        id="about-text"
                        value={settings?.siteContent?.aboutText || ""}
                        onChange={(e) => updateSettings({
                          siteContent: { ...settings?.siteContent, aboutText: e.target.value }
                        })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => toast({ title: "All changes are saved automatically" })}>
                      <Save className="mr-2 h-4 w-4" />
                      Auto-Saved
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}