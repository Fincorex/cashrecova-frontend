import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    setIsCompanyOpen(false);
  }, [location.pathname]);
  
  const products = [
    {
      name: "Corepoint",
      fullName: "Corepoint (Core Banking)",
      desc: "Core banking engine for accounts, loans, and ledger",
      path: "/products/corepoint",
      icon: "ti-building-bank"
    },
    {
      name: "CashRecova",
      fullName: "CashRecova (Payments)",
      desc: "Automated direct debit & recurring collections",
      path: "/products/cashrecova",
      icon: "ti-refresh"
    },
    {
      name: "Zebra",
      fullName: "Zebra (Cards)",
      desc: "Card issuing & processing infrastructure",
      path: "/products/zebra",
      icon: "ti-credit-card"
    },
    {
      name: "Agentix",
      fullName: "Agentix (Agency Banking)",
      desc: "Agent network & agency banking platform",
      path: "/products/agentix",
      icon: "ti-users-group"
    }
  ];

  const companyLinks = [
    {
      name: "About Fincorex",
      desc: "Learn about our mission, vision, and infrastructure",
      path: "/company/about",
      icon: "ti-info-circle"
    },

    {
      name: "Teams",
      desc: "Meet the people behind Fincorex",
      path: "#",
      icon: "ti-users"
    }
  ];

  return (
    <>
      <nav className="z-50 w-full fixed top-0 left-0 bg-neutral-200 border-b border-neutral-300 backdrop-blur-md">
        <div className="container">
          <div className="static flex py-4 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <div className="flex flex-1 flex-shrink-0 items-center justify-between text-primary-500">
                <Link to="/" className="flex items-center gap-2 no-underline">
                  <span className="text-2xl font-bold text-primary-500 tracking-tight">Fincorex</span>
                </Link>
              </div>
              <div
                className={`nav-collapse grow w-full lg:flex lg:w-full flex-auto justify-center ${isMobileMenuOpen ? 'max-lg:block max-lg:absolute max-lg:top-[100%] max-lg:left-0 max-lg:bg-white max-lg:w-full max-lg:shadow-lg max-lg:rounded-b-2xl border-t border-neutral-100 max-lg:max-h-[80vh] max-lg:overflow-y-auto' : 'hidden'}`}
                id="main-navbar-collapse"
              >
                <div className="justify-center flex flex-col lg:flex-row p-4 lg:p-0 lg:bg-neutral-200 lg:rounded-full max-lg:bg-white">
                  <div 
                    className={`btn-group group ${isProductsOpen ? 'drp-show' : ''}`}
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button
                      className="inline-flex text-neutral-900 hover:bg-primary-500/[.04] rounded-full px-[18px] py-3 text-[14px] font-medium transition-all leading-[1.429] dropdown-toggle arrow-none ltr:text-left rtl:text-right max-lg:w-full justify-between items-center"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isProductsOpen}
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                    >
                      Products
                      <i className={`ti ti-chevron-down ml-1 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    <div 
                      className={`dropdown-menu dropdown-center group-[.drp-show]:max-lg:!relative !w-[700px] max-lg:!w-full max-lg:!transform-none !p-0 overflow-hidden lg:shadow-2xl transition-all duration-300 ${isProductsOpen ? 'show opacity-100 translate-y-0 max-lg:block' : 'opacity-0 -translate-y-2 pointer-events-none max-lg:hidden'}`}
                    >
                      <div className="p-4 h-auto overflow-auto bg-white">
                        <div className="grid grid-cols-12 gap-4">
                          {products.map((product, idx) => (
                            <div key={idx} className="col-span-12 sm:col-span-6">
                              <Link 
                                to={product.path} 
                                className="group/nav-item block p-4 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-all duration-300"
                                onClick={() => setIsProductsOpen(false)}
                              >
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover/nav-item:scale-110 transition-transform">
                                    <i className={`ti ${product.icon} text-2xl`}></i>
                                  </div>
                                  <div className="flex flex-col">
                                    <h6 className="subtitle1 font-bold text-theme-text-primary group-hover/nav-item:text-primary-500 transition-colors">
                                      {product.fullName}
                                    </h6>
                                    <p className="body2 text-theme-text-secondary leading-snug">
                                      {product.desc}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-neutral-50 border-t border-neutral-100">
                        <Link 
                          to="/products" 
                          className="flex items-center justify-center gap-2 text-primary-500 font-bold hover:gap-3 transition-all"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          View All Products <i className="ti ti-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-block text-neutral-900 hover:bg-primary-500/[.04] rounded-full px-[18px] lg:px-6 py-3 text-[14px] font-medium transition-all leading-[1.429]"
                  >
                    Solutions
                  </a>
                  <Link
                    to="/contact"
                    className="inline-block text-neutral-900 hover:bg-primary-500/[.04] rounded-full px-[18px] lg:px-6 py-3 text-[14px] font-medium transition-all leading-[1.429]"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/company/case-studies"
                    className="inline-block text-neutral-900 hover:bg-primary-500/[.04] rounded-full px-[18px] lg:px-6 py-3 text-[14px] font-medium transition-all leading-[1.429]"
                  >
                    Case Studies
                  </Link>
                  <div 
                    className={`btn-group group ${isCompanyOpen ? 'drp-show' : ''}`}
                    onMouseEnter={() => setIsCompanyOpen(true)}
                    onMouseLeave={() => setIsCompanyOpen(false)}
                  >
                    <button
                      className="inline-flex text-neutral-900 hover:bg-primary-500/[.04] rounded-full px-[18px] lg:px-6 py-3 text-[14px] font-medium transition-all leading-[1.429] dropdown-toggle arrow-none ltr:text-left rtl:text-right max-lg:w-full justify-between items-center"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isCompanyOpen}
                      onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                    >
                      Company
                      <i className={`ti ti-chevron-down ml-1 transition-transform duration-200 ${isCompanyOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    <div 
                      className={`dropdown-menu dropdown-menu-end group-[.drp-show]:max-lg:!relative !w-[600px] max-lg:!w-full max-lg:!transform-none !p-0 overflow-hidden lg:shadow-2xl transition-all duration-300 ${isCompanyOpen ? 'show opacity-100 translate-y-0 max-lg:block' : 'opacity-0 -translate-y-2 pointer-events-none max-lg:hidden'}`}
                    >
                      <div className="p-4 h-auto overflow-auto bg-white">
                        <div className="grid grid-cols-12 gap-4">
                          {companyLinks.map((link, idx) => (
                            <div key={idx} className="col-span-12 sm:col-span-6">
                              <Link 
                                to={link.path} 
                                className="group/nav-item block p-4 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-all duration-300"
                                onClick={() => setIsCompanyOpen(false)}
                              >
                                <div className="flex items-start gap-4">
                                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover/nav-item:scale-110 transition-transform">
                                    <i className={`ti ${link.icon} text-2xl`}></i>
                                  </div>
                                  <div className="flex flex-col">
                                    <h6 className="subtitle1 font-bold text-theme-text-primary group-hover/nav-item:text-primary-500 transition-colors">
                                      {link.name}
                                    </h6>
                                    <p className="body2 text-theme-text-secondary leading-snug">
                                      {link.desc}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:hidden flex flex-col gap-3 p-4 border-t border-neutral-100 bg-neutral-50 mt-2 w-full">
                    <Link
                      to="/waitlist"
                      className="btn-primary btn w-full h-12 flex items-center justify-center rounded-xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Waitlist
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/waitlist"
                className="btn-primary btn max-sm:hidden px-6"
              >
                Join Waitlist
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-neutral-900 rounded-full lg:hidden hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200"
              >
                <i className={`ti ${isMobileMenuOpen ? 'ti-x' : 'ti-menu-2'} text-2xl leading-none`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
