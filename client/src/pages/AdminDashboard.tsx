import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  Search 
} from "lucide-react";
import { useCallback } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const { treatments, products } = useStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const getImagePath = useCallback((filename: string) => {
    try {
      const path = new URL(`@assets/${filename}`, import.meta.url).href;
      return path;
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  }, []);
  
  // Mock data for dashboard
  const recentBookings = [
    { id: "1", customer: "John Smith", treatment: "Wood Therapy", date: "2023-07-16", time: "9:00 AM", status: "confirmed" },
    { id: "2", customer: "Emma Johnson", treatment: "Lymphatic Drainage", date: "2023-07-17", time: "1:30 PM", status: "confirmed" },
    { id: "3", customer: "Michael Brown", treatment: "Cavitation & Vacuum", date: "2023-07-18", time: "3:00 PM", status: "pending" },
    { id: "4", customer: "Sarah Davis", treatment: "Laser Lipo", date: "2023-07-19", time: "10:30 AM", status: "confirmed" },
    { id: "5", customer: "Robert Wilson", treatment: "RecoveryBoost", date: "2023-07-20", time: "4:30 PM", status: "cancelled" },
  ];
  
  const recentOrders = [
    { id: "1001", customer: "Lisa Thompson", products: "Sculpting Body Oil, Firming Body Cream", total: 90.00, status: "completed" },
    { id: "1002", customer: "David Martinez", products: "Home Massage Kit", total: 75.00, status: "shipped" },
    { id: "1003", customer: "Jennifer White", products: "Detox Body Scrub", total: 38.00, status: "processing" },
    { id: "1004", customer: "Kevin Johnson", products: "Sculpting Body Oil", total: 42.00, status: "shipped" },
    { id: "1005", customer: "Maria Garcia", products: "Firming Body Cream, Detox Body Scrub", total: 86.00, status: "completed" },
  ];
  
  // Filter treatments and products based on search query
  const filteredTreatments = treatments.filter(treatment => 
    treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treatment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been successfully saved."
    });
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
              
              <div className="flex items-center">
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
              <h2 className="text-3xl font-playfair text-secondary">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$15,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+235</div>
                    <p className="text-xs text-muted-foreground">
                      +12.5% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+418</div>
                    <p className="text-xs text-muted-foreground">
                      +18.2% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +6.8% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      You have {recentBookings.length} recent bookings
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
                        {recentBookings.slice(0, 4).map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{booking.customer}</TableCell>
                            <TableCell>{booking.treatment}</TableCell>
                            <TableCell>{`${booking.date} • ${booking.time}`}</TableCell>
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
                      You have {recentOrders.length} recent orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Products</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.slice(0, 4).map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell className="truncate max-w-[150px]">{order.products}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
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
              <h2 className="text-3xl font-playfair text-secondary">Manage Bookings</h2>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Bookings</CardTitle>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Bookings</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Treatment</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>#{booking.id}</TableCell>
                          <TableCell>{booking.customer}</TableCell>
                          <TableCell>{booking.treatment}</TableCell>
                          <TableCell>{`${booking.date} • ${booking.time}`}</TableCell>
                          <TableCell>
                            <Select defaultValue={booking.status}>
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Treatments Tab */}
            <TabsContent value="treatments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-playfair text-secondary">Manage Treatments</h2>
                <Button className="bg-secondary hover:bg-secondary/90">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Treatment
                </Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTreatments.map((treatment) => (
                        <TableRow key={treatment.id}>
                          <TableCell>
                            <img 
                              src={getImagePath(treatment.image)} 
                              alt={treatment.title} 
                              className="w-12 h-12 object-cover rounded-md" 
                            />
                          </TableCell>
                          <TableCell>{treatment.title}</TableCell>
                          <TableCell>${treatment.price.toFixed(2)}</TableCell>
                          <TableCell>{treatment.duration} min</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button size="sm" variant="destructive">
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
                <h2 className="text-3xl font-playfair text-secondary">Manage Products</h2>
                <Button className="bg-secondary hover:bg-secondary/90">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img 
                              src={getImagePath(product.image)} 
                              alt={product.title} 
                              className="w-12 h-12 object-cover rounded-md" 
                            />
                          </TableCell>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button size="sm" variant="destructive">
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
              <h2 className="text-3xl font-playfair text-secondary">Manage Orders</h2>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Orders</CardTitle>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>#{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="truncate max-w-[200px]">{order.products}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Select defaultValue={order.status}>
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button variant="outline">Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-3xl font-playfair text-secondary">Website Settings</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-medium">Website Title</label>
                    <Input defaultValue="The Sculpting Art - Luxury Body Sculpting & Wellness Spa" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-medium">Description</label>
                    <Textarea defaultValue="Experience transformative body sculpting and wellness treatments at The Sculpting Art. Our professional spa offers Wood Therapy, Cavitation, Lymphatic Drainage, and more." />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-medium">Contact Email</label>
                    <Input defaultValue="info@thesculptingart.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-medium">Phone Number</label>
                    <Input defaultValue="(310) 555-0123" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-medium">Business Address</label>
                    <Textarea defaultValue="123 Wellness Way, Beverly Hills, CA 90210" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-secondary hover:bg-secondary/90"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-medium">Instagram</label>
                    <Input defaultValue="https://instagram.com/thesculptingartbyel" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-medium">Facebook</label>
                    <Input defaultValue="https://facebook.com/thesculptingart" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-medium">Twitter</label>
                    <Input defaultValue="https://twitter.com/thesculptingart" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-secondary hover:bg-secondary/90"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
