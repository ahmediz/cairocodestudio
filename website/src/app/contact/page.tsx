import React from 'react';
import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Get in Touch With Us | Cairo Code Studio',
  description:
    'Have a question or need a quote? Our team is ready to help you build your next digital product. Contact us today and let us bring your idea to life.',
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg">
            Let's discuss how we can help elevate your digital presence. Reach
            out to us directly or fill out the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-antonio text-gray-900">
                  Email
                </h3>
                <a
                  href="mailto:hello@cairocodestudio.com"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  hello@cairocodestudio.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-antonio text-gray-900">
                  Phone
                </h3>
                <a
                  href="tel:+201000609719"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  +201000 60 9719
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-antonio text-gray-900">
                  Address
                </h3>
                <p className="text-gray-600 text-sm">Nasr City, Cairo, Egypt</p>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
            <ContactForm type="contact" />
          </div>
        </div>
      </div>
    </div>
  );
}
