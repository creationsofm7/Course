export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-24">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Privacy Policy</h1>
        <p className="text-white/70 mb-8">Last updated: {new Date().getFullYear()}</p>
        <div className="space-y-8">
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Your data, your control</h2>
            <p className="text-white/70">We collect the minimum necessary information to provide and improve Course.ai. You can request export or deletion of your data at any time.</p>
          </section>
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">What we collect</h2>
            <p className="text-white/70">Account details, usage metrics, and learning progress. We do not sell your personal information.</p>
          </section>
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Security</h2>
            <p className="text-white/70">We use industry-standard encryption and access controls to protect your data.</p>
          </section>
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Contact</h2>
            <p className="text-white/70">For privacy requests, contact us at privacy@course.ai.</p>
          </section>
        </div>
      </div>
    </div>
  );
}


