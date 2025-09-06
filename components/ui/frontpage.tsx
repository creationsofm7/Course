"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative min-h-[92vh] bg-black text-white flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full border border-white/10 float-slow"></div>
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-white/10 float-slow" style={{ animationDelay: "-1.5s" }}></div>
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="reveal max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1 text-xs tracking-wide uppercase text-white/70">
              Built with AI • Designed for Focus
            </span>
            <h1 className="text-5xl md:text-7xl leading-[0.95] font-semibold">
             Empower your mind.
              <br className="hidden md:block" />
              Learn smarter, not harder.
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl">
              Course.ai maps your path to mastery—personalized to your goals—and delivers it in a minimal, high-contrast experience that keeps you in flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/signin" className="btn-solid">
                Start your smart learning journey
              </Link>
              <a href="#features" className="btn-ghost">Learn more</a>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-white text-black border-y border-black/10">
        <div className="marquee py-4">
          <div className="marquee__inner text-sm md:text-base font-medium tracking-wide uppercase text-black/60">
            <span>AI Courses</span>
            <span>•</span>
            <span>Interactive Lessons</span>
            <span>•</span>
            <span>Code Walkthroughs</span>
            <span>•</span>
            <span>Smart Quizzes</span>
            <span>•</span>
            <span>Personalized Pace</span>
            <span>•</span>
            <span>Creator Tools</span>
            <span>•</span>
            <span>AI Courses</span>
            <span>•</span>
            <span>Interactive Lessons</span>
            <span>•</span>
            <span>Code Walkthroughs</span>
            <span>•</span>
            <span>Smart Quizzes</span>
            <span>•</span>
            <span>Personalized Pace</span>
            <span>•</span>
            <span>Creator Tools</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white text-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="reveal text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold">Smart by design</h2>
            <p className="mt-4 text-black/60">Adaptive, focused, and intentionally simple—so you learn deeper, faster.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="reveal rounded-xl border border-black/10 p-8 hover:-translate-y-1 transition-transform bg-white">
              <div className="mb-6 h-10 w-10 rounded-full border border-black/15 flex items-center justify-center">1</div>
              <h3 className="text-xl font-medium mb-2">Adaptive paths</h3>
              <p className="text-black/60">Your route evolves with your progress. No filler, only signal.</p>
            </div>
            <div className="reveal rounded-xl border border-black/10 p-8 hover:-translate-y-1 transition-transform bg-white">
              <div className="mb-6 h-10 w-10 rounded-full border border-black/15 flex items-center justify-center">2</div>
              <h3 className="text-xl font-medium mb-2">Active learning</h3>
              <p className="text-black/60">Structured challenges, instant feedback, spaced reinforcement.</p>
            </div>
            <div className="reveal rounded-xl border border-black/10 p-8 hover:-translate-y-1 transition-transform bg-white">
              <div className="mb-6 h-10 w-10 rounded-full border border-black/15 flex items-center justify-center">3</div>
              <h3 className="text-xl font-medium mb-2">Creator-grade</h3>
              <p className="text-black/60">Author tools that are as focused as the experience itself.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT SECTION */}
      <section className="bg-black text-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold">Less noise. More signal.</h3>
            <p className="text-white/70">High contrast UI, intentional whitespace, and kinetic micro-interactions keep you in flow.</p>
            <div className="flex gap-3 pt-2">
              <Link href="/signin" className="btn-solid">Start free</Link>
              <a href="#cta" className="btn-ghost">See how it works</a>
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/15 p-6">
              <div className="text-4xl font-semibold">94%</div>
              <div className="text-white/60">Completion uplift</div>
            </div>
            <div className="rounded-xl border border-white/15 p-6">
              <div className="text-4xl font-semibold">2x</div>
              <div className="text-white/60">Faster mastery</div>
            </div>
            <div className="rounded-xl border border-white/15 p-6">
              <div className="text-4xl font-semibold"><span className="align-top">0</span>%</div>
              <div className="text-white/60">Unnecessary UI</div>
            </div>
            <div className="rounded-xl border border-white/15 p-6">
              <div className="text-4xl font-semibold">∞</div>
              <div className="text-white/60">Room to grow</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-white text-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="reveal text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold">Ready when you are.</h3>
            <p className="mt-4 text-black/60">Join and keep it simple. Learn, build, evolve.</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/signin" className="btn-solid">Get started</Link>
              <a href="#features" className="btn-ghost">Features</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/70">© {new Date().getFullYear()} creationsofm7</div>
          <nav className="flex gap-6 text-white/70">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}