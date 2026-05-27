
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-6 mt-auto border-t border-slate-200 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm text-slate-500 font-medium">
                    &copy; {currentYear} Cashrecova Technologies. All rights reserved. 
                    <span className="mx-2 text-slate-300">|</span>
                    Secure Lending & Automated Debt Recovery Platform.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
