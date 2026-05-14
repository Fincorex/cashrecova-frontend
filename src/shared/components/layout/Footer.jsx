import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isWaitlist = location.pathname === '/waitlist';

  return (
    <footer className={`relative overflow-hidden transition-all duration-500 ${
      isWaitlist 
        ? "bg-neutral-900/30 border-t border-white/10 backdrop-blur-xl" 
        : "bg-neutral-50 border-t border-neutral-200"
    }`}>
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand & Social */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <span className="text-2xl font-bold text-primary-500 tracking-tight">Fincorex</span>
            </Link>
            <p className={`text-sm leading-relaxed max-w-xs ${isWaitlist ? "text-neutral-400" : "text-neutral-600"}`}>
              Modern banking infrastructure for financial institutions. Build, scale, and manage with ease.
            </p>
            <div className="flex gap-4">
              <a href="#" className={`text-xl transition-colors ${isWaitlist ? "text-neutral-500 hover:text-white" : "text-neutral-400 hover:text-primary-500"}`}>
                <i className="ti ti-brand-linkedin"></i>
              </a>
              <a href="#" className={`text-xl transition-colors ${isWaitlist ? "text-neutral-500 hover:text-white" : "text-neutral-400 hover:text-primary-500"}`}>
                <i className="ti ti-brand-twitter"></i>
              </a>
              <a href="#" className={`text-xl transition-colors ${isWaitlist ? "text-neutral-500 hover:text-white" : "text-neutral-400 hover:text-primary-500"}`}>
                <i className="ti ti-brand-github"></i>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <h4 className={`text-sm font-bold uppercase tracking-wider ${isWaitlist ? "text-white" : "text-neutral-900"}`}>Products</h4>
                <ul className={`flex flex-col gap-3 text-sm ${isWaitlist ? "text-neutral-400" : "text-neutral-600"}`}>
                  <li><Link to="/products/corepoint" className="hover:text-primary-500 transition-colors">Corepoint</Link></li>
                  <li><Link to="/products/cashrecova" className="hover:text-primary-500 transition-colors">CashRecova</Link></li>
                  <li><Link to="/products/zebra" className="hover:text-primary-500 transition-colors">Zebra</Link></li>
                  <li><Link to="/products/agentix" className="hover:text-primary-500 transition-colors">Agentix</Link></li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className={`text-sm font-bold uppercase tracking-wider ${isWaitlist ? "text-white" : "text-neutral-900"}`}>Company</h4>
                <ul className={`flex flex-col gap-3 text-sm ${isWaitlist ? "text-neutral-400" : "text-neutral-600"}`}>
                  <li><Link to="/company/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
                  <li><Link to="/company/case-studies" className="hover:text-primary-500 transition-colors">Case Studies</Link></li>
                  <li><Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link></li>
                  <li><Link to="/waitlist" className="hover:text-primary-500 transition-colors">Join Waitlist</Link></li>
                </ul>
              </div>

              <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                <h4 className={`text-sm font-bold uppercase tracking-wider ${isWaitlist ? "text-white" : "text-neutral-900"}`}>Legal</h4>
                <ul className={`flex flex-col gap-3 text-sm ${isWaitlist ? "text-neutral-400" : "text-neutral-600"}`}>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${isWaitlist ? "border-white/5 text-neutral-500" : "border-neutral-200 text-neutral-500"}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 Fincorex. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Security</span>
              <span>Compliance</span>
              <span>Status</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
