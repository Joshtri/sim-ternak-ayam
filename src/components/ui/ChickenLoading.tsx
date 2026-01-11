import { Bird } from "lucide-react";

interface ChickenLoadingProps {
  text?: string;
  className?: string;
  fullScreen?: boolean;
  isLoading?: boolean;
}

export const ChickenLoading = ({
  text,
  className = "",
  fullScreen = false,
  isLoading = true,
}: ChickenLoadingProps) => {
  if (!isLoading) return null;
  const Content = () => (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="relative">
        {/* Lingkaran luar berputar */}
        <div className="absolute inset-0 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin w-20 h-20" />

        {/* Icon ayam di tengah, sedikit bouncing biar lucu */}
        <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-sm z-10 border border-orange-100">
          {/* Muter-muter effect on the bird itself if requested, but spinning the container is better UI. 
               However, user said "ayam gitu muter", let's spin the bird gently back and forth or run 'animate-spin' on it if strictly literal.
               I'll do a wobble/spin.
           */}
          <Bird className="w-10 h-10 text-orange-600 animate-[bounce_1s_infinite]" />
        </div>
      </div>
      <p className="text-sm font-medium text-orange-600 animate-pulse mt-2">
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <Content />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full min-h-[80vh] items-center justify-center p-8">
      <Content />
    </div>
  );
};
