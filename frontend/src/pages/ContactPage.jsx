import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { siteConfig } from '@/data/mock';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { submitContactInquiry } from '@/services/contact';

const FORM_DEFAULTS = {
  quote: {
    subject: 'Product Quote Request',
    message: 'I would like to request a quote for your marble products. Please share pricing, availability, and delivery details.',
  },
  'custom-order': {
    subject: 'Custom Marble Order Inquiry',
    message: 'I would like to discuss a custom marble piece. Please share details about size, design, material, and delivery location.',
  },
};

const ContactPage = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('type') === 'custom-order' ? 'custom-order' : 'quote';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: FORM_DEFAULTS.quote.subject,
    message: FORM_DEFAULTS.quote.message,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      subject: FORM_DEFAULTS[activeTab].subject,
      message: current.message || FORM_DEFAULTS[activeTab].message,
    }));
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setSearchParams(tab === 'custom-order' ? { type: 'custom-order' } : {});
    setFormData((current) => ({
      ...current,
      subject: FORM_DEFAULTS[tab].subject,
      message: FORM_DEFAULTS[tab].message,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContactInquiry({
        ...formData,
        source: activeTab,
      });

      toast({
        title: result.emailed ? 'Message sent!' : 'Message saved, email not delivered',
        description: result.emailed
          ? `Thank you for contacting us. Your message has been sent to ${siteConfig.email}.`
          : result.warning || 'Your request was saved, but the email notification could not be sent. Please contact us directly or try again later.',
        variant: result.emailed ? 'default' : 'destructive',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: FORM_DEFAULTS[activeTab].subject,
        message: FORM_DEFAULTS[activeTab].message,
      });
    } catch (error) {
      toast({
        title: 'Unable to send message',
        description: error?.message || 'Please try again or email us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Toaster />
      <main>
        <section className="bg-[#1F3D36] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Reach Us</h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
              Have questions or want to discuss a custom order? Send us a message and we will get back to you.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-20 bg-[#FDF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D36] mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1F3D36] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#D4A853]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F3D36] mb-1">Showroom Address</h3>
                      <p className="text-gray-600">{siteConfig.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1F3D36] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#D4A853]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F3D36] mb-1">Workshop Address</h3>
                      <p className="text-gray-600">{siteConfig.address2}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1F3D36] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#D4A853]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F3D36] mb-1">Phone</h3>
                      <a href={`tel:${siteConfig.phone}`} className="text-gray-600 hover:text-[#1F3D36] block">
                        {siteConfig.phone}
                      </a>
                      <a href={`tel:${siteConfig.phone2}`} className="text-gray-600 hover:text-[#1F3D36] block">
                        {siteConfig.phone2}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1F3D36] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#D4A853]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F3D36] mb-1">Email</h3>
                      <a href={`mailto:${siteConfig.email}`} className="text-gray-600 hover:text-[#1F3D36]">
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1F3D36] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#D4A853]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F3D36] mb-1">Business Hours</h3>
                      <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 h-64 bg-gray-200 rounded-xl overflow-hidden border border-[#D4A853]/20">
                  <iframe
                    title="Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.5!2d75.8!3d26.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40!2sChandpole%20Bazaar%2C%20Jaipur!5e0!3m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div>
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#D4A853]/20">
                  <div className="flex flex-col sm:flex-row gap-2 mb-6 p-1 rounded-full bg-[#F8F1E8]">
                    <button
                      type="button"
                      onClick={() => handleTabChange('quote')}
                      className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                        activeTab === 'quote'
                          ? 'bg-[#1F3D36] text-white'
                          : 'text-[#1F3D36] hover:bg-white'
                      }`}
                    >
                      Get a Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabChange('custom-order')}
                      className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                        activeTab === 'custom-order'
                          ? 'bg-[#1F3D36] text-white'
                          : 'text-[#1F3D36] hover:bg-white'
                      }`}
                    >
                      Custom Order
                    </button>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D36] mb-2">
                    {activeTab === 'custom-order' ? 'Request a Custom Order' : 'Get a Quote'}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {activeTab === 'custom-order'
                      ? 'Tell us about the custom marble piece you want. Your message will be emailed to our team.'
                      : 'Fill out the form below and your message will be sent to our team.'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={siteConfig.phone}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder={activeTab === 'custom-order' ? 'Custom Marble Order Inquiry' : 'Product quote request'}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1F3D36] hover:bg-[#152C27] text-white py-3 rounded-full flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ContactPage;
