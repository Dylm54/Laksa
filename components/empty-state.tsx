import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Belum Ada Produk",
  description = "Katalog kamu masih kosong nih. Yuk, mulai buat dan jual produk digital pertamamu sekarang!",
  buttonText = "+ Tambah Produk Baru",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 m-4 max-w-md mx-auto bg-amber-50 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl text-center">
      
      {/* Icon Badge */}
      <div className="w-20 h-20 bg-pink-400 border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-3">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-10 h-10 text-black" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
          />
        </svg>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-black text-black tracking-tight mb-2 uppercase">
        {title}
      </h3>

      <p className="text-black font-medium mb-6 text-sm leading-relaxed max-w-xs">
        {description}
      </p>

      {/* Button Action */}
      {/* <button
        onClick={onAction}
        type="button"
        className="w-full py-3 px-6 bg-emerald-400 text-black font-extrabold border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-lg cursor-pointer"
      >
        {buttonText}
      </button> */}

    </div>
  );
};