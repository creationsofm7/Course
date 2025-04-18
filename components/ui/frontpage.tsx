"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gradient-to-b from-white to-indigo-50">
      {/* Hero Section */}
      <div className={`w-full max-w-7xl px-6 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Learn Without <span className="text-indigo-600">Limits</span>
          </h1>
          <p className="text-xl text-gray-600">
            Personalized learning journeys that adapt to your pace, style, and goals.
            Unlock your potential with our AI-powered course platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/signin"
              className="px-8 py-3 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Explore The Project Here
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center w-full">
          <div className="relative w-full max-w-md h-64 sm:h-80">
            <div className="absolute inset-0 bg-indigo-600 rounded-2xl transform rotate-3 hidden sm:block"></div>
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center p-4 sm:p-6">
              <div className="text-center space-y-3 sm:space-y-4">
          <div className="bg-indigo-100 h-32 sm:h-40 rounded-lg flex items-center justify-center">
            <span className="text-indigo-600 text-4xl sm:text-5xl font-bold">AI</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold">Powered Learning</h3>
          <p className="text-gray-600 text-sm sm:text-base">Adaptive courses that evolve with your progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Why Choose Our Platform</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm text-white hover:transform hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Learning</h3>
              <p className="text-indigo-100">Courses adapt to your knowledge level, learning style, and pace to maximize efficiency.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm text-white hover:transform hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Learn On Your Schedule</h3>
              <p className="text-indigo-100">Access courses anytime, anywhere. Your progress is always saved and synced across devices.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm text-white hover:transform hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"></path><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
              <p className="text-indigo-100">Learn from the best with our curated courses designed by industry leaders and educational experts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">S</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;This platform transformed my learning experience. The personalized approach helped me master complex topics in half the time. I&apos;ve now landed my dream job as a developer.&quot;
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">M</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;The AI-powered recommendations were spot on. Each lesson built perfectly on the previous one, and the interactive exercises cemented my understanding of complex concepts.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners who have accelerated their education and careers with our platform.
          </p>
          <Link
            href="/signin"
            className="px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LearnEdge</h3>
              <p className="text-gray-400">
                Transforming education through personalized AI-powered learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
            <p>© {new Date().getFullYear()} LearnEdge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
