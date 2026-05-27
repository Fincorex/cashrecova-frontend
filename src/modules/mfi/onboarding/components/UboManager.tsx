import { Trash2, Plus } from 'lucide-react';
import { Director, OnboardingNewDirector } from '@/types';

interface UboManagerProps {
  directors: Director[];
  newDirector: OnboardingNewDirector;
  onDirectorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddDirector: () => void;
  onRemoveDirector: (index: number) => void;
  error?: string;
}

/**
 * UboManager Component
 * 
 * Manages director and Ultimate Beneficial Owner (UBO) listings, including inline additions and share verification.
 */
const UboManager = ({
  directors = [],
  newDirector,
  onDirectorChange,
  onAddDirector,
  onRemoveDirector,
  error
}: UboManagerProps) => {
  const totalOwnership = directors.reduce((sum, d) => sum + parseFloat(d.ownership || '0'), 0);

  return (
    <div className="border-t border-slate-100 pt-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
          Registered Directors & UBOs (Minimum 1 Required)
        </span>
        <span className="text-[10px] font-bold text-slate-400">
          Total: {totalOwnership}% / 100%
        </span>
      </div>

      {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}

      <div className="space-y-1.5">
        {directors.map((d, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center bg-slate-50 border border-slate-200/50 px-3 py-2 rounded-lg text-xs hover:border-slate-300 transition-colors"
          >
            <div>
              <span className="font-bold text-slate-800">{d.fullName}</span>
              <span className="text-[10px] text-slate-405 font-semibold ml-2">
                ({d.nationality} • DOB: {d.dob})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary-600 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded text-[9px]">
                {d.ownership}% ownership
              </span>
              <button 
                type="button" 
                onClick={() => onRemoveDirector(index)} 
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inline beneficial owner register */}
      <div className="border border-dashed border-slate-200 p-3 bg-slate-50/20 rounded-lg flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[130px]">
          <label className="block text-[9px] text-slate-400 font-bold uppercase mb-0.5">UBO Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            placeholder="e.g. Dr. Babatunde"
            value={newDirector.fullName} 
            onChange={onDirectorChange}
            className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:border-primary-500 bg-white"
          />
        </div>
        <div className="w-[110px]">
          <label className="block text-[9px] text-slate-400 font-bold uppercase mb-0.5">DOB</label>
          <input 
            type="date" 
            name="dob" 
            value={newDirector.dob} 
            onChange={onDirectorChange}
            className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:border-primary-500 bg-white"
          />
        </div>
        <div className="w-[70px]">
          <label className="block text-[9px] text-slate-400 font-bold uppercase mb-0.5">UBO %</label>
          <input 
            type="number" 
            name="ownership" 
            placeholder="UBO %"
            value={newDirector.ownership} 
            onChange={onDirectorChange}
            className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded focus:outline-none focus:border-primary-500 bg-white"
          />
        </div>
        <button 
          type="button" 
          onClick={onAddDirector}
          className="bg-white border border-slate-200 hover:bg-slate-50 font-bold px-3.5 py-1.5 rounded-lg text-xs text-slate-700 flex items-center gap-1 hover:border-slate-350 transition-all shadow-3xs active:scale-98"
        >
          <Plus className="h-3.5 w-3.5 text-primary-500" /> Add Director
        </button>
      </div>
    </div>
  );
};

export default UboManager;
