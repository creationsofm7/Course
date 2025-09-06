export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-24">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Terms of Service</h1>
        <p className="text-white/70 mb-8">Last updated: {new Date().getFullYear()}</p>
        <div className="space-y-8">
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Use of Service</h2>
            <p className="text-white/70">By accessing Course.ai, you agree to use the service lawfully and comply with these terms.</p>
          </section>
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Accounts</h2>
            <p className="text-white/70">You are responsible for maintaining the confidentiality of your account and for all activities under it.</p>
          </section>
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Content</h2>
            <p className="text-white/70">Course content and materials are provided for personal learning. Do not copy, resell, or redistribute without permission.</p>
          </section>
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Limitation of Liability</h2>
            <p className="text-white/70">Course.ai is provided &quot;as is&quot; without warranties. We are not liable for damages arising from use of the service.</p>
          </section>
          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-medium mb-2">Contact</h2>
            <p className="text-white/70">Questions about these terms? Contact legal@course.ai.</p>
          </section>
        </div>
      </div>
    </div>
  );
}


