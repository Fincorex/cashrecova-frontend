import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { navigation } from '../config/navigation';

const PlaceholderPage = () => {
    const location = useLocation();
    const currentItem = navigation.find(item => item.path === location.pathname);
    
    const label = currentItem ? currentItem.label : 'Page';
    const icon = currentItem ? currentItem.icon : 'solar:document-bold-duotone';

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center text-primary-500 mb-6 shadow-xl shadow-primary-500/10">
                <Icon icon={icon} width="40" height="40" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{label}</h1>
            <p className="text-slate-550 max-w-md mx-auto leading-relaxed">
                This module is currently under development for the Cashrecova platform.
                Soon you will be able to manage your {label.toLowerCase()} from this view.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm">
                        <div className="w-8 h-8 bg-slate-50 rounded-lg mb-3 animate-pulse"></div>
                        <div className="h-4 bg-slate-50 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-3 bg-slate-50 rounded w-1/2 animate-pulse"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaceholderPage;
