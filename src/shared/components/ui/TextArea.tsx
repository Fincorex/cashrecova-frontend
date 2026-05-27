
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = ({ 
  label, 
  id, 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  rows = 4,
  className = '',
  ...props 
}: TextAreaProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`
          w-full px-4 py-2.5 rounded-lg border transition-all duration-200 outline-none resize-none
          ${error 
            ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' 
            : 'border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'
          }
          bg-white text-slate-900 placeholder:text-slate-400 text-sm
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-rose-500 font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
