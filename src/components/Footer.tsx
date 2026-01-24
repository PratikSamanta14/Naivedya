import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "Puja Samagri", href: "#" },
      { name: "Festival Combos", href: "#" },
      { name: "Flowers & Garlands", href: "#" },
      { name: "Prasad & Sweets", href: "#" },
      { name: "Idols & Murtis", href: "#" },
    ],
    services: [
      { name: "Book Pandit", href: "#" },
      { name: "Utensil Rentals", href: "#" },
      { name: "Puja Knowledge", href: "#" },
      { name: "Custom Orders", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#" },
      { name: "FAQs", href: "#" },
      { name: "Shipping Policy", href: "#" },
      { name: "Return Policy", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-accent text-accent-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.img
              src={logo}
              alt="Naivedya"
              className="h-20 w-auto mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
            <p className="text-sm opacity-90 mb-6 max-w-sm">
              Bringing authentic Bengali puja essentials to your doorstep with devotion and trust. Your one-stop destination for all ritual needs.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Salt Lake, Kolkata, West Bengal 700091</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:support@naivedya.in" className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>support@naivedya.in</span>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:underline transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:underline transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:underline transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm opacity-70 text-center md:text-left">
              © 2026 Naivedya. All rights reserved. Made with 🪔 in Kolkata.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
