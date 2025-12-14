import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import { Award, Users, Clock, Heart } from 'lucide-react';
import { stats } from '@/data/mock';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-[#1a5d4c] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Discover the legacy of craftsmanship that has been passed down through generations.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <img
                  src="https://www.pandeymarblemoorti.com/assets/front/images/uploads/decor.jpg"
                  alt="Our Workshop"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">A Legacy of Excellence</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ritika Marbles was founded with a vision to preserve and promote the ancient art of marble 
                  sculpting. Our journey began in the heart of Jaipur, known as the marble city of India, 
                  where skilled artisans have been crafting divine statues for centuries.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, we continue this rich tradition, combining time-honored techniques with modern 
                  precision to create masterpieces that inspire devotion and admiration. Each piece that 
                  leaves our workshop carries the soul of Rajasthani craftsmanship.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our team of master artisans, some with over 30 years of experience, brings life to 
                  every statue, ensuring that each creation is not just a product but a work of art 
                  that will be cherished for generations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do, from selecting raw materials to delivering 
                the finished masterpiece to your doorstep.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 bg-[#1a5d4c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Quality First</h3>
                <p className="text-gray-600 text-sm">
                  We use only premium Makrana marble and finest materials for lasting beauty.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 bg-[#1a5d4c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Expert Artisans</h3>
                <p className="text-gray-600 text-sm">
                  Our skilled craftsmen bring decades of experience to every creation.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 bg-[#1a5d4c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Timely Delivery</h3>
                <p className="text-gray-600 text-sm">
                  We respect your time and ensure prompt delivery without compromising quality.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-16 h-16 bg-[#1a5d4c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Customer Care</h3>
                <p className="text-gray-600 text-sm">
                  Your satisfaction is our priority. We're here to help at every step.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-[#1a5d4c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-6xl font-bold text-[#c9a962] mb-2">
                    {stat.value}+
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default AboutPage;
