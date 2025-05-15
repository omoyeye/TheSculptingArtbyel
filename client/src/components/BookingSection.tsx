import { useState } from "react";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay, addDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const timeSlots = [
  "9:00 AM", "10:30 AM", "12:00 PM", 
  "1:30 PM", "3:00 PM", "4:30 PM"
];

export default function BookingSection() {
  const [selectedTreatment, setSelectedTreatment] = useState("wood-therapy");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const { treatments, addToCart } = useStore();
  const { toast } = useToast();

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

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-playfair text-secondary mb-6">
              Book Your Treatment
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Schedule your body sculpting session today and start your journey to a more confident you. 
              Our expert therapists will customize each treatment to meet your specific goals.
            </p>
            
            {/* Treatment Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-playfair text-secondary mb-4">Select Treatment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {treatments.map((treatment) => (
                  <div key={treatment.id} className="relative">
                    <input 
                      type="radio" 
                      id={treatment.id} 
                      name="treatment" 
                      className="absolute opacity-0"
                      checked={selectedTreatment === treatment.id}
                      onChange={() => setSelectedTreatment(treatment.id)} 
                    />
                    <label 
                      htmlFor={treatment.id} 
                      className={`block border-2 rounded-md p-4 cursor-pointer transition duration-300 hover:border-secondary ${
                        selectedTreatment === treatment.id ? "border-secondary bg-muted" : "border-gray-200"
                      }`}
                    >
                      <span className="text-lg font-medium block mb-1">{treatment.title}</span>
                      <span className="text-primary">${treatment.price} • {treatment.duration} min</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            {/* Date Picker */}
            <div className="bg-muted rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-playfair text-secondary mb-4">Select Date & Time</h3>
              
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
                  const isPast = day < new Date() && !isToday(day);
                  
                  return (
                    <div key={index} className="text-center py-2">
                      <button
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
              
              <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0">
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-muted"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-white"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
