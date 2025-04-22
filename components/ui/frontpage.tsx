"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-gradient-to-b from-slate-50 to-violet-50">
      {/* Hero Section */}
      <div className={`w-full max-w-7xl px-6 py-28 md:py-36 flex flex-col md:flex-row items-center justify-between gap-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
            Learn Without <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">Limits</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Personalized learning journeys that adapt to your pace, style, and goals.
            Unlock your potential with our AI-powered course platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/signin"
              className="px-10 py-4 text-center text-white font-medium rounded-full bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 transition-all shadow-lg hover:shadow-purple-200 transform hover:-translate-y-1"
            >
              Explore The Project
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center w-full">
          <div className="relative w-full max-w-md h-80 sm:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 rounded-3xl transform rotate-3 hidden sm:block shadow-xl"></div>
            <div className="absolute inset-0 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 sm:p-8 backdrop-blur-sm bg-white/90">
              <div className="text-center space-y-5">
                <div className="bg-gradient-to-r from-purple-100 to-violet-100 h-40 sm:h-48 rounded-xl flex items-center justify-center shadow-inner">
                  <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent text-5xl sm:text-6xl font-bold">AI</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">Powered Learning</h3>
                <p className="text-slate-600 text-base sm:text-lg">Adaptive courses that evolve with your progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-violet-500 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Why Choose Our Platform</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/15 rounded-2xl p-8 backdrop-blur-md text-white shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border border-white/20">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Personalized Learning</h3>
              <p className="text-white/90 leading-relaxed">Courses adapt to your knowledge level, learning style, and pace to maximize efficiency and retention.</p>
            </div>
            
            <div className="bg-white/15 rounded-2xl p-8 backdrop-blur-md text-white shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border border-white/20">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Learn On Your Schedule</h3>
              <p className="text-white/90 leading-relaxed">Access courses anytime, anywhere. Your progress is always saved and synced across all your devices.</p>
            </div>
            
            <div className="bg-white/15 rounded-2xl p-8 backdrop-blur-md text-white shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300 border border-white/20">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"></path><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Expert Instructors</h3>
              <p className="text-white/90 leading-relaxed">Learn from the best with our curated courses designed by industry leaders and educational experts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-slate-800">Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">S</div>
                <div className="ml-5">
                  <h4 className="font-semibold text-xl text-slate-800">Sarah Johnson</h4>
                  <p className="text-purple-600">Software Developer</p>
                </div>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed">
                &quot;This platform transformed my learning experience. The personalized approach helped me master complex topics in half the time. I&apos;ve now landed my dream job as a developer.&quot;
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">M</div>
                <div className="ml-5">
                  <h4 className="font-semibold text-xl text-slate-800">Michael Chen</h4>
                  <p className="text-purple-600">Data Scientist</p>
                </div>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed">
                &quot;The AI-powered recommendations were spot on. Each lesson built perfectly on the previous one, and the interactive exercises cemented my understanding of complex concepts.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-gradient-to-r from-purple-50 to-violet-50 py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Join thousands of learners who have accelerated their education and careers with our platform.
          </p>
          <Link
            href="/signin"
            className="px-10 py-4 text-white bg-gradient-to-r from-purple-600 to-violet-500 rounded-full hover:from-purple-700 hover:to-violet-600 transition-all font-medium text-lg shadow-lg hover:shadow-purple-200 transform hover:-translate-y-1"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">LearnEdge</h3>
              <p className="text-slate-300 leading-relaxed">
                Transforming education through personalized AI-powered learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-5 text-white">Platform</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/courses" className="hover:text-purple-300 transition-colors">Courses</Link></li>
                <li><Link href="/pricing" className="hover:text-purple-300 transition-colors">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-purple-300 transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-5 text-white">Resources</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/blog" className="hover:text-purple-300 transition-colors">Blog</Link></li>
                <li><Link href="/help" className="hover:text-purple-300 transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-purple-300 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-5 text-white">Legal</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/terms" className="hover:text-purple-300 transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-purple-300 transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} LearnEdge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}