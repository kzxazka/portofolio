import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Frankazastain Studio | Muhamad Azka Atqiya</h3>
            <p className="text-gray-300 mb-4">
              Creative design and technology solutions to help your business grow and succeed in the digital world.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/azkaazka20_/" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="github.com/kzxazka" className="text-gray-300 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/azka-atqiya-3659392ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 mt-0.5 text-accent" />
                <a href="mailto:atqiyaazka96@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  atqiyaazka96@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 mt-0.5 text-accent" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  +62857-1840-6768
                </a>
              </li>
              <li className="text-gray-300 mt-4">
                Bandar Lampung<br />
                Lampung, Indonesia<br />
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© {currentYear} Azka aka Frankazastain Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
