import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">nint.co.in</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Book verified local professionals for home services, repairs, and personal assistance.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="#about" className="hover:text-white">About</Link></li>
            <li><Link href="#services" className="hover:text-white">Services</Link></li>
            <li><Link href="#how-it-works" className="hover:text-white">How it works</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Privacy</Link></li>
            <li><Link href="#" className="hover:text-white">Terms</Link></li>
            <li><Link href="#" className="hover:text-white">Support</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Stay in touch</p>
          <div className="mt-4 flex flex-col gap-3">
            <input className="h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-white" placeholder="Email address" />
            <button className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-white">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
