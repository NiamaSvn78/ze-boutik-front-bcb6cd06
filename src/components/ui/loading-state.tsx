import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState = ({ message = "Chargement...", className = "" }: LoadingStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <Loader2 className="w-8 h-8 animate-spin mb-4 text-purple-600" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}; 