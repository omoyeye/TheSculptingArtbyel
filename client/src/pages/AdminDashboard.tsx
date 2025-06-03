import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
  LayoutDashboard,
  ShoppingBag, 
  Calendar, 
  Settings, 
  Package, 
  PlusCircle,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Save,
  Clock,
  Users,
  LogOut
} from "lucide-react";
import { useStore, type Treatment, type Product } from "@/lib/store";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const { logout, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  
  // Get store data
  const { treatments, products, cart } = useStore();
  
  // Database data states
  const [orders, setOrders] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [isAddTreatmentOpen, setIsAddTreatmentOpen] = useState(false);
  const [isEditTreatmentOpen, setIsEditTreatmentOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  
  // Form states
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [treatmentForm, setTreatmentForm] = useState({
    title: "",
    description: "",
    price: 0,
    duration: 30,
    image: ""
  });
  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    badge: ""
  });
  
  // Business settings state
  const [businessSettings, setBusinessSettings] = useState({
    bookingEnabled: true,
    maintenanceMode: false,
    businessHours: {
      monday: { closed: true },
      tuesday: { closed: false, open: "8:00", close: "17:00" },
      wednesday: { closed: false, open: "8:00", close: "17:00" },
      thursday: { closed: false, open: "8:00", close: "17:00" },
      friday: { closed: false, open: "8:00", close: "17:00" },
      saturday: { closed: false, open: "8:00", close: "17:00" },
      sunday: { closed: false, open: "8:00", close: "17:00" },
    },
    contactInfo: {
      phone: "+44 7XXX XXXXXX",
      email: "info@thesculptingart.com",
      address: "Your Business Address"
    }
  });

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/admin-login");
      return;
    }
  }, [isAuthenticated, setLocation]);

  // Load settings and data from backend on component mount
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch settings
        const settingsResponse = await fetch('/api/settings');
        if (settingsResponse.ok) {
          const settings = await settingsResponse.json();
          setBusinessSettings(settings);
        }
        
        // Fetch orders
        const ordersResponse = await fetch('/api/orders');
        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData);
        }
        
        // Fetch bookings
        const bookingsResponse = await fetch('/api/bookings');
        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json();
          setBookings(bookingsData);
        }
        
        // Fetch contact submissions
        const contactResponse = await fetch('/api/contact-submissions');
        if (contactResponse.ok) {
          const contactData = await contactResponse.json();
          setContactSubmissions(contactData);
        }
        
        // Fetch newsletter subscriptions
        const newsletterResponse = await fetch('/api/newsletter-subscriptions');
        if (newsletterResponse.ok) {
          const newsletterData = await newsletterResponse.json();
          setNewsletterSubscriptions(newsletterData);
        }
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated]);

  const handleBusinessSettingsUpdate = async (settingsToSave = businessSettings) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsToSave),
      });

      if (response.ok) {
        toast({
          title: "Settings Updated",
          description: "Business settings have been saved successfully."
        });
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleToggleChange = async (field: string, value: boolean) => {
    const updatedSettings = {
      ...businessSettings,
      [field]: value
    };
    setBusinessSettings(updatedSettings);
    // Save immediately when toggle changes
    await handleBusinessSettingsUpdate(updatedSettings);
  };

  const handleAddTreatment = () => {
    // In a real app, this would add to the store or API
    toast({
      title: "Treatment Added",
      description: `${treatmentForm.title} has been added successfully.`
    });
    setIsAddTreatmentOpen(false);
    setTreatmentForm({ title: "", description: "", price: 0, duration: 30, image: "" });
  };

  const handleEditTreatment = () => {
    // In a real app, this would update the store or API
    toast({
      title: "Treatment Updated",
      description: `${editingTreatment?.title} has been updated successfully.`
    });
    setIsEditTreatmentOpen(false);
    setEditingTreatment(null);
  };

  const handleDeleteTreatment = (treatment: Treatment) => {
    // In a real app, this would delete from the store or API
    toast({
      title: "Treatment Deleted",
      description: `${treatment.title} has been deleted successfully.`
    });
  };

  const handleAddProduct = () => {
    // In a real app, this would add to the store or API
    toast({
      title: "Product Added",
      description: `${productForm.title} has been added successfully.`
    });
    setIsAddProductOpen(false);
    setProductForm({ title: "", description: "", price: 0, image: "", category: "", badge: "" });
  };

  const handleEditProduct = () => {
    // In a real app, this would update the store or API
    toast({
      title: "Product Updated",
      description: `${editingProduct?.title} has been updated successfully.`
    });
    setIsEditProductOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (product: Product) => {
    // In a real app, this would delete from the store or API
    toast({
      title: "Product Deleted",
      description: `${product.title} has been deleted successfully.`
    });
  };

  const openEditTreatment = (treatment: Treatment) => {
    setEditingTreatment(treatment);
    setIsEditTreatmentOpen(true);
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditProductOpen(true);
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "treatments", label: "Treatments", icon: Package },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "customers", label: "Customers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Treatments</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{treatments.length}</div>
            <p className="text-xs text-muted-foreground">Active services</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Available items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : orders.length}</div>
            <p className="text-xs text-muted-foreground">Customer orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              £{loading ? '...' : orders.reduce((total, order) => total + parseFloat(order.total || '0'), 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Total revenue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">No orders yet</div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Order #{order.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.items?.length || 0} items • {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">£{order.total}</div>
                      <div className="text-sm text-muted-foreground">{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your content quickly</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button onClick={() => setIsAddTreatmentOpen(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Treatment
            </Button>
            <Button onClick={() => setIsAddProductOpen(true)} variant="outline">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button onClick={() => setActiveTab("settings")} variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTreatments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Treatments Management</h3>
          <p className="text-sm text-muted-foreground">{treatments.length} treatments available</p>
        </div>
        <Button onClick={() => setIsAddTreatmentOpen(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Treatment
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Treatments</CardTitle>
          <CardDescription>
            Manage the treatments displayed on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Treatment</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {treatments.map((treatment) => (
                <TableRow key={treatment.id}>
                  <TableCell className="font-medium">{treatment.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {treatment.duration} min
                    </div>
                  </TableCell>
                  <TableCell>£{treatment.price}</TableCell>
                  <TableCell className="max-w-xs truncate">{treatment.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditTreatment(treatment)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteTreatment(treatment)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Products Management</h3>
          <p className="text-sm text-muted-foreground">{products.length} products available</p>
        </div>
        <Button onClick={() => setIsAddProductOpen(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Products</CardTitle>
          <CardDescription>
            Manage the products displayed on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Badge</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>£{product.price}</TableCell>
                  <TableCell>{product.badge || "-"}</TableCell>
                  <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditProduct(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteProduct(product)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Bookings Management</h3>
          <p className="text-sm text-muted-foreground">View and manage customer bookings</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>
            Customer appointment bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No bookings available. Bookings will appear here when customers make appointments.
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Customer Management</h3>
          <p className="text-sm text-muted-foreground">View and manage customer accounts</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
          <CardDescription>
            Registered customers and their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No customers registered yet. Customer accounts will appear here when they sign up.
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Settings</CardTitle>
          <CardDescription>
            Manage your business configuration and operating hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch 
              id="booking-enabled" 
              checked={businessSettings.bookingEnabled}
              onCheckedChange={(checked) => handleToggleChange('bookingEnabled', checked)}
            />
            <Label htmlFor="booking-enabled">Enable Online Booking</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="maintenance-mode" 
              checked={businessSettings.maintenanceMode}
              onCheckedChange={(checked) => handleToggleChange('maintenanceMode', checked)}
            />
            <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex">
                  <Phone className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                  <Input 
                    id="phone"
                    value={businessSettings.contactInfo.phone}
                    onChange={(e) => setBusinessSettings(prev => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, phone: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex">
                  <Mail className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                  <Input 
                    id="email"
                    value={businessSettings.contactInfo.email}
                    onChange={(e) => setBusinessSettings(prev => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, email: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="flex">
                <MapPin className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                <Textarea 
                  id="address"
                  value={businessSettings.contactInfo.address}
                  onChange={(e) => setBusinessSettings(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, address: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Business Hours</h4>
            <p className="text-sm text-muted-foreground">Note: Currently closed on Mondays as per business policy</p>
            {Object.entries(businessSettings.businessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-24 capitalize">{day}</div>
                <Switch 
                  checked={!hours.closed}
                  onCheckedChange={(checked) => 
                    setBusinessSettings(prev => ({
                      ...prev,
                      businessHours: {
                        ...prev.businessHours,
                        [day]: { ...hours, closed: !checked }
                      }
                    }))
                  }
                  disabled={day === 'monday'}
                />
                {!hours.closed && hours.open && (
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="time" 
                      value={hours.open}
                      className="w-32"
                      onChange={(e) => 
                        setBusinessSettings(prev => ({
                          ...prev,
                          businessHours: {
                            ...prev.businessHours,
                            [day]: { ...hours, open: e.target.value }
                          }
                        }))
                      }
                    />
                    <span>to</span>
                    <Input 
                      type="time" 
                      value={hours.close}
                      className="w-32"
                      onChange={(e) => 
                        setBusinessSettings(prev => ({
                          ...prev,
                          businessHours: {
                            ...prev.businessHours,
                            [day]: { ...hours, close: e.target.value }
                          }
                        }))
                      }
                    />
                  </div>
                )}
                {hours.closed && <span className="text-muted-foreground">Closed</span>}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleBusinessSettingsUpdate()} className="ml-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return renderOverview();
      case "treatments": return renderTreatments();
      case "products": return renderProducts();
      case "bookings": return renderBookings();
      case "customers": return renderCustomers();
      case "settings": return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | The Sculpting Art</title>
        <meta name="description" content="Admin dashboard for managing The Sculpting Art website content and settings." />
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-600">The Sculpting Art</p>
          </div>
          
          <nav className="px-4 pb-4 flex flex-col h-full">
            <div className="flex-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg mb-1 transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  toast({
                    title: "Logged Out",
                    description: "You have been successfully logged out."
                  });
                  setLocation("/admin-login");
                }}
                className="w-full flex items-center px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Add Treatment Dialog */}
      <Dialog open={isAddTreatmentOpen} onOpenChange={setIsAddTreatmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Treatment</DialogTitle>
            <DialogDescription>
              Create a new treatment to offer to your customers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="treatment-title">Title</Label>
              <Input
                id="treatment-title"
                value={treatmentForm.title}
                onChange={(e) => setTreatmentForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter treatment title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="treatment-description">Description</Label>
              <Textarea
                id="treatment-description"
                value={treatmentForm.description}
                onChange={(e) => setTreatmentForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter treatment description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="treatment-price">Price (£)</Label>
                <Input
                  id="treatment-price"
                  type="number"
                  value={treatmentForm.price}
                  onChange={(e) => setTreatmentForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatment-duration">Duration (minutes)</Label>
                <Input
                  id="treatment-duration"
                  type="number"
                  value={treatmentForm.duration}
                  onChange={(e) => setTreatmentForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                  placeholder="30"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="treatment-image">Image Filename</Label>
              <Input
                id="treatment-image"
                value={treatmentForm.image}
                onChange={(e) => setTreatmentForm(prev => ({ ...prev, image: e.target.value }))}
                placeholder="image.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTreatmentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTreatment}>Add Treatment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Treatment Dialog */}
      <Dialog open={isEditTreatmentOpen} onOpenChange={setIsEditTreatmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Treatment</DialogTitle>
            <DialogDescription>
              Update the treatment information.
            </DialogDescription>
          </DialogHeader>
          {editingTreatment && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-treatment-title">Title</Label>
                <Input
                  id="edit-treatment-title"
                  defaultValue={editingTreatment.title}
                  placeholder="Enter treatment title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-treatment-description">Description</Label>
                <Textarea
                  id="edit-treatment-description"
                  defaultValue={editingTreatment.description}
                  placeholder="Enter treatment description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-treatment-price">Price (£)</Label>
                  <Input
                    id="edit-treatment-price"
                    type="number"
                    defaultValue={editingTreatment.price}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-treatment-duration">Duration (minutes)</Label>
                  <Input
                    id="edit-treatment-duration"
                    type="number"
                    defaultValue={editingTreatment.duration}
                    placeholder="30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-treatment-image">Image Filename</Label>
                <Input
                  id="edit-treatment-image"
                  defaultValue={editingTreatment.image}
                  placeholder="image.jpg"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTreatmentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTreatment}>Update Treatment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product to sell to your customers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product-title">Title</Label>
              <Input
                id="product-title"
                value={productForm.title}
                onChange={(e) => setProductForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter product title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                value={productForm.description}
                onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-price">Price (£)</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-category">Category</Label>
                <Input
                  id="product-category"
                  value={productForm.category}
                  onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Body Shapers"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-image">Image Filename</Label>
                <Input
                  id="product-image"
                  value={productForm.image}
                  onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="product.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-badge">Badge (optional)</Label>
                <Input
                  id="product-badge"
                  value={productForm.badge}
                  onChange={(e) => setProductForm(prev => ({ ...prev, badge: e.target.value }))}
                  placeholder="BEST SELLER"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product information.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-product-title">Title</Label>
                <Input
                  id="edit-product-title"
                  defaultValue={editingProduct.title}
                  placeholder="Enter product title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-product-description">Description</Label>
                <Textarea
                  id="edit-product-description"
                  defaultValue={editingProduct.description}
                  placeholder="Enter product description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-price">Price (£)</Label>
                  <Input
                    id="edit-product-price"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct.price}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-category">Category</Label>
                  <Input
                    id="edit-product-category"
                    defaultValue={editingProduct.category}
                    placeholder="Body Shapers"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-product-image">Image Filename</Label>
                  <Input
                    id="edit-product-image"
                    defaultValue={editingProduct.image}
                    placeholder="product.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-product-badge">Badge (optional)</Label>
                  <Input
                    id="edit-product-badge"
                    defaultValue={editingProduct.badge || ""}
                    placeholder="BEST SELLER"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}