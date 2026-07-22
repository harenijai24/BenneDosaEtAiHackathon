interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md';
}

export default function LoadingSpinner({
  label = 'Analyzing…',
  size = 'md',
}: LoadingSpinnerProps) {
  const sizeClass = size === 'sm' ? 'h-5 w-5' : 'h-8 w-8';

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div
        className={`${sizeClass} animate-spin rounded-full border-[3px] border-whatsapp-light border-t-transparent`}
        role="status"
        aria-label={label}
      />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
