import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CalendarDays, Clock, Users, CheckCircle } from "lucide-react";
import cafeInteriorImage from "@/assets/images/cafe-interior.png";

const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  guests: z.string().min(1, "Please select number of guests"),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM",
];

export function ReservationSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      specialRequests: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ReservationFormData) => {
      return apiRequest("POST", "/api/reservations", {
        ...data,
        guests: parseInt(data.guests),
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
      toast({
        title: "Reservation Confirmed!",
        description: "We look forward to seeing you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReservationFormData) => {
    mutation.mutate(data);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reservations" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollAnimation animation="slide-left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              <img
                src={cafeInteriorImage}
                alt="Elegant cafe interior"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-video"
              />
              <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-6 shadow-xl max-w-xs">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-lg mb-1">Opening Hours</div>
                    <div className="text-sm text-muted-foreground">
                      Mon - Fri: 7AM - 9PM<br />
                      Sat - Sun: 8AM - 10PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-right">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Reservations
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Reserve Your <span className="text-primary">Table</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Secure your spot at Ahmed's Coffee House. Whether it's a business meeting,
              a date, or catching up with friends, we'll make it memorable.
            </p>

            {isSubmitted ? (
              <Card className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-4">
                  Your reservation has been submitted successfully.
                  We'll send a confirmation to your email shortly.
                </p>
                <Button onClick={() => setIsSubmitted(false)} data-testid="button-new-reservation">
                  Make Another Reservation
                </Button>
              </Card>
            ) : (
              <Card className="p-6 lg:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                {...field}
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Guests</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-guests">
                                  <SelectValue placeholder="Select guests" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    <div className="flex items-center gap-2">
                                      <Users className="h-4 w-4" />
                                      {num} {num === 1 ? "Guest" : "Guests"}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="date"
                                  min={today}
                                  className="pl-10"
                                  {...field}
                                  data-testid="input-date"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-time">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <SelectValue placeholder="Select time" />
                                  </div>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any dietary requirements or special occasions..."
                              className="resize-none"
                              rows={3}
                              {...field}
                              data-testid="textarea-special-requests"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={mutation.isPending}
                      data-testid="button-submit-reservation"
                    >
                      {mutation.isPending ? "Submitting..." : "Reserve Table"}
                    </Button>
                  </form>
                </Form>
              </Card>
            )}
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
