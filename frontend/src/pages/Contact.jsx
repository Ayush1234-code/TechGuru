import { Mail, MapPin, MessageCircle, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f7fdff] text-slate-950">
      <header className="border-b border-cyan-900/10 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 shadow-glow"><Sparkles size={18} /></div>
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-xl font-black tracking-tight text-transparent">Tech Guru</span>
          </Link>
          <Link className="btn-primary" to="/signup">Signup</Link>
        </div>
      </header>
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,0.22),transparent_28rem),radial-gradient(circle_at_88%_8%,rgba(59,130,246,0.18),transparent_30rem)]" />
        <section className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-black text-cyan-700"><MessageCircle size={14} /> Contact</span>
            <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">Let’s build your interview edge.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Questions, feedback, partnership ideas, or support requests can be sent directly to the Tech Guru team.</p>
            <div className="mt-8 grid gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><Mail className="text-cyan-600" /><span className="font-black">guptaayush0545@gmail.com</span></div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><MapPin className="text-cyan-600" /><span className="font-bold text-slate-700">Available for students, engineers, and exam aspirants</span></div>
            </div>
          </div>
          <form className="rounded-[2rem] border border-cyan-100 bg-white/85 p-6 shadow-[0_25px_90px_rgba(14,165,233,0.14)] backdrop-blur md:p-8">
            <h2 className="text-3xl font-black">Send a message</h2>
            <label className="mt-6 block text-sm font-black text-slate-700">Name<input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" placeholder="Your name" /></label>
            <label className="mt-4 block text-sm font-black text-slate-700">Email<input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" placeholder="you@example.com" /></label>
            <label className="mt-4 block text-sm font-black text-slate-700">Message<textarea className="mt-2 min-h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100" placeholder="How can Tech Guru help?" /></label>
            <button type="button" className="btn-primary mt-6 w-full"><Send size={17} /> Send message</button>
            <p className="mt-3 text-center text-xs text-slate-500">This demo form is UI-ready. Connect it to an email service or backend route for production delivery.</p>
          </form>
        </section>
      </main>
    </div>
  );
}
