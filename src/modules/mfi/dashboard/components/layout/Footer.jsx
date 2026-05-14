import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-6 mt-auto border-t border-slate-200 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm text-slate-500 font-medium">
                    &copy; {currentYear} Fincorex. All rights reserved. 
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="text-primary-700">Cashrecova</span> for better banking.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
