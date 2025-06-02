import { useState } from "react";
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
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Save
} from "lucide-react";
import { useStore } from "@/lib/store";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get store data
  const { treatments, products, cart } = useStore();
  
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

  const handleBusinessSettingsUpdate = () => {
    toast({
      title: "Settings Updated",
      description: "Business settings have been saved successfully."
    });
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cart.length}</div>
          <p className="text-xs text-muted-foreground">Current session</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£{cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Cart total</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderTreatments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Treatments Management</h3>
        <div className="text-sm text-muted-foreground">
          {treatments.length} treatments available
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Treatments</CardTitle>
          <CardDescription>
            These are the treatments currently displayed on your website
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {treatments.map((treatment) => (
                <TableRow key={treatment.id}>
                  <TableCell className="font-medium">{treatment.title}</TableCell>
                  <TableCell>{treatment.duration} min</TableCell>
                  <TableCell>£{treatment.price}</TableCell>
                  <TableCell className="max-w-xs truncate">{treatment.description}</TableCell>
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
        <h3 className="text-lg font-semibold">Products Management</h3>
        <div className="text-sm text-muted-foreground">
          {products.length} products available
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Products</CardTitle>
          <CardDescription>
            These are the products currently displayed on your website
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
              onCheckedChange={(checked) => 
                setBusinessSettings(prev => ({ ...prev, bookingEnabled: checked }))
              }
            />
            <Label htmlFor="booking-enabled">Enable Online Booking</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="maintenance-mode" 
              checked={businessSettings.maintenanceMode}
              onCheckedChange={(checked) => 
                setBusinessSettings(prev => ({ ...prev, maintenanceMode: checked }))
              }
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
          <Button onClick={handleBusinessSettingsUpdate} className="ml-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | The Sculpting Art</title>
        <meta name="description" content="Admin dashboard for managing The Sculpting Art website content and settings." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your website content and business settings</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="treatments">Treatments</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              {renderOverview()}
            </TabsContent>

            <TabsContent value="treatments" className="mt-6">
              {renderTreatments()}
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              {renderProducts()}
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              {renderSettings()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}