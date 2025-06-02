import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useRoute } from "wouter";
import { format, addDays, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay, isBefore } from "date-fns";
import { ChevronLeft, ChevronRight, Clock, Info } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/hooks/use-settings";
import { Link } from "wouter";

// Define available time slots
const timeSlots = [
  "9:00 AM", "10:30 AM", "12:00 PM", 
  "1:30 PM", "3:00 PM", "4:30 PM"
];

export default function Booking() {
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { treatments, addToCart } = useStore();
  const { toast } = useToast();
  const [, params] = useRoute("/booking");
  const [location] = useLocation();
  const { settings, loading } = useSettings();

  // Extract treatment ID from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split("?")[1]);
    const treatmentId = searchParams.get("treatment");

    if (treatmentId && treatments.some(t => t.id === treatmentId)) {
      setSelectedTreatment(treatmentId);
    } else if (treatments.length > 0) {
      setSelectedTreatment(treatments[0].id);
    }
  }, [location, treatments]);

  const getDaysInMonth = () => {
    const firstDay = startOfMonth(currentMonth);
    const lastDay = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: firstDay, end: lastDay });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Clear time selection when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select a date and time",
        description: "You need to choose both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    const treatment = treatments.find((t) => t.id === selectedTreatment);
    if (!treatment) return;

    addToCart({
      type: "booking",
      itemId: treatment.id,
      title: treatment.title,
      price: treatment.price,
      quantity: 1,
      image: treatment.image,
      date: format(selectedDate, "MMMM d, yyyy"),
      time: selectedTime,
      duration: treatment.duration
    });

    toast({
      title: "Added to cart",
      description: `${treatment.title} appointment on ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime} has been added to your cart.`
    });
  };

  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select a date and time",
        description: "You need to choose both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    handleAddToCart();
    // Redirect to checkout page
    window.location.href = "/checkout";
  };

  const days = getDaysInMonth();
  const firstDayOfMonth = startOfMonth(currentMonth).getDay();

  // Calculate days from previous month to fill in the first row
  const daysFromPrevMonth = Array.from({ length: firstDayOfMonth }, (_, i) => 
    addDays(startOfMonth(currentMonth), -firstDayOfMonth + i)
  );

  // Combine days from previous month, current month, and next month as needed
  const calendarDays = [...daysFromPrevMonth, ...days];

  // Add days from next month to complete the grid (if needed)
  const remainingDays = 42 - calendarDays.length; // 6 rows × 7 days = 42
  const daysFromNextMonth = Array.from({ length: remainingDays }, (_, i) => 
    addDays(endOfMonth(currentMonth), i + 1)
  );

  const allCalendarDays = [...calendarDays, ...daysFromNextMonth];

  const selectedTreatmentData = treatments.find(t => t.id === selectedTreatment);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading booking system...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!settings?.bookingEnabled) {
    return (
      <div className="min-h-screen bg-white py-16">
        <Helmet>
          <title>Booking Unavailable | The Sculpting Art</title>
          <meta name="description" content="Online booking is temporarily unavailable. Contact us directly to schedule your appointment." />
        </Helmet>

        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
              <h1 className="text-3xl font-playfair text-secondary mb-4">
                Booking Temporarily Unavailable
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Our online booking system is currently disabled for maintenance. 
                We apologize for any inconvenience.
              </p>
              <p className="text-gray-600 mb-8">
                Please contact us directly to schedule your appointment. 
                We're here to help you achieve your wellness goals!
              </p>
              <div className="space-y-4">
                <div>
                  <strong>Phone:</strong> +44 123 456 7890
                </div>
                <div>
                  <strong>Email:</strong> info@thesculptingart.com
                </div>
              </div>
              <div className="mt-8">
                <Button asChild className="bg-secondary hover:bg-secondary/90">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book Your Treatment | The Sculpting Art</title>
        <meta name="description" content="Schedule your body sculpting session at The Sculpting Art. Choose from our range of transformative treatments and select your preferred date and time." />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">Book Your Treatment</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Schedule your body sculpting session and start your journey to a more confident you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-playfair text-secondary mb-6">Select Treatment</h2>

                  <Select 
                    value={selectedTreatment} 
                    onValueChange={setSelectedTreatment}
                  >
                    <SelectTrigger className="mb-6">
                      <SelectValue placeholder="Choose a treatment" />
                    </SelectTrigger>
                    <SelectContent>
                      {treatments.map((treatment) => (
                        <SelectItem key={treatment.id} value={treatment.id}>
                          {treatment.title} - £{treatment.price} ({treatment.duration} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedTreatmentData && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center text-primary">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{selectedTreatmentData.duration} minutes</span>
                      </div>

                      <h3 className="text-xl font-medium">
                        £{selectedTreatmentData.price}
                      </h3>

                      <p className="text-gray-600">
                        {selectedTreatmentData.description}
                      </p>

                      <Alert className="bg-muted border-primary/20 mt-4">
                        <Info className="h-4 w-4 text-primary" />
                        <AlertDescription>
                          A £20 deposit is required to secure your booking, which will be deducted from your final payment.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-playfair text-secondary mb-6">Select Date & Time</h2>

                  {/* Month Navigation */}
                  <div className="flex justify-between items-center mb-4">
                    <button 
                      className="text-secondary hover:text-secondary/80"
                      onClick={handlePrevMonth}
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h4 className="text-lg font-medium">
                      {format(currentMonth, "MMMM yyyy")}
                    </h4>
                    <button 
                      className="text-secondary hover:text-secondary/80"
                      onClick={handleNextMonth}
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Calendar */}
                  <div className="grid grid-cols-7 gap-1 mb-6">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="text-center text-sm text-gray-500 py-1">{day}</div>
                    ))}

                    {allCalendarDays.map((day, index) => {
                      const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isPast = isBefore(day, new Date()) && !isToday(day);

                      return (
                        <div key={index} className="text-center py-2">
                          <button
                            type="button"
                            onClick={() => !isPast && handleDateSelect(day)}
                            disabled={isPast}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              !isCurrentMonth 
                                ? "text-gray-300" 
                                : isPast 
                                  ? "text-gray-400 cursor-not-allowed" 
                                  : isSelected 
                                    ? "bg-secondary text-white" 
                                    : isToday(day) 
                                      ? "border border-secondary text-secondary" 
                                      : "hover:bg-muted-foreground/10"
                            }`}
                          >
                            {format(day, "d")}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Available Time Slots */}
                  {selectedDate && (
                    <>
                      <h4 className="font-medium mb-3">
                        Available Times for {format(selectedDate, "MMMM d")}:
                      </h4>
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleTimeSelect(time)}
                            className={`py-2 text-center border rounded-md text-sm hover:border-secondary ${
                              selectedTime === time 
                                ? "bg-secondary text-white border-secondary" 
                                : "border-gray-300"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="mt-6">
                      <Separator className="mb-4" />

                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Selected Treatment:</span>
                        <span className="font-medium">{selectedTreatmentData?.title}</span>
                      </div>

                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{format(selectedDate, "MMMM d, yyyy")}</span>
                      </div>

                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>

                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedTreatmentData?.duration} minutes</span>
                      </div>

                      <div className="flex justify-between text-lg font-medium mb-6">
                        <span>Total:</span>
                        <span>£{selectedTreatmentData?.price.toFixed(2)}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-3">
                        <Button
                          variant="outline"
                          className="border-secondary text-secondary hover:bg-muted sm:flex-1"
                          onClick={handleAddToCart}
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          className="bg-secondary hover:bg-secondary/90 text-white sm:flex-1"
                          onClick={handleBookNow}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}