import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

export default function WhatsAppButton({
  phone = '918943442479',
  message = 'Hello Talvia Consultancy, I need guidance on college admissions across India.',
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-black hover:bg-zinc-800 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-zinc-700 group"
      aria-label="Enquire on WhatsApp"
    >
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
        <MessageCircle size={18} fill="currentColor" />
      </div>
      <div className="text-left hidden sm:block">
        <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Enquiry Desk</div>
        <div className="text-xs font-bold leading-tight">+91 8943442479</div>
      </div>
    </a>
  );
}
