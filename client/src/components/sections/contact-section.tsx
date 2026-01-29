import { ScrollAnimation } from "@/components/scroll-animation";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    details: ["123 Ahmed's Street", "Downtown District", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["hello@ahmedscoffee.com", "reservations@ahmedscoffee.com"],
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon - Fri: 7AM - 9PM", "Sat - Sun: 8AM - 10PM"],
  },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-up" className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Visit <span className="text-primary">Us</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            We'd love to hear from you. Whether you have a question, feedback,
            or just want to say hello, don't hesitate to reach out.
          </p>
        </ScrollAnimation>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <ScrollAnimation
              key={item.title}
              animation="fade-up"
              delay={(index * 100) as 0 | 100 | 200 | 300}
            >
              <Card className="p-6 h-full hover-elevate transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-3">{item.title}</h3>
                <div className="space-y-1">
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-up">
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-4">
                  Connect With Us
                </h3>
                <p className="opacity-90 mb-8 leading-relaxed">
                  Follow us on social media for updates on new menu items,
                  events, and behind-the-scenes looks at our craft.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                      aria-label={social.label}
                      data-testid={`link-social-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="aspect-video lg:aspect-auto bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919364!2d-74.0062269845996!3d40.71277937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197c06b7cb%3A0x40a06c78f79e5de6!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1629991345671!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Artisan Coffee House Location"
                />
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
}
