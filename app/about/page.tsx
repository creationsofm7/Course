export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-24">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">About Course.ai</h1>
        <p className="text-white/70 max-w-3xl">
          Course.ai helps you learn smarter with adaptive paths and a distraction-free, high-contrast interface. We believe mastery comes from focus, iteration, and clear feedback—so we design every interaction to keep you in flow.
        </p>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Our mission</h2>
            <p className="text-white/70">Make deep learning accessible to everyone through smart structure and minimal design.</p>
          </div>
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">What we build</h2>
            <p className="text-white/70">Adaptive courses, intelligent assessments, and creator tools that prioritize clarity over noise.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


