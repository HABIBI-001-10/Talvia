import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

export default function WhatsAppButton({ phone = '919876543210', message = 'Hello Talvia, I need guidance on college admissions.' }: WhatsAppButtonProps) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl whatsapp-pulse transition-all duration-200 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="text-white" fill="white" />
    </a>
  );
}

