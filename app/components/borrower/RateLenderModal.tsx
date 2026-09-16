"use client";

import { useState } from "react";
import { X, Star, CheckCircle2 } from "lucide-react";
import { useSite } from "./layout/SiteShell";

interface RateLenderModalProps {
  onClose: () => void;
  lenderName: string;
  contractId: string;
}

export default function RateLenderModal({ onClose, lenderName, contractId }: RateLenderModalProps) {
  const { t } = useSite();
  const rl = t.rateLender;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);
    
    // TODO: BACKEND - Enviar calificacion a la API
    console.log("Enviando calificacion para", lenderName, "Contrato:", contractId, { rating, review });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[500px] overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xl">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-crit hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
              <h2 className="mb-2 text-2xl font-black text-ink">{rl.success}</h2>
              <button
                onClick={onClose}
                className="mt-6 w-full rounded-lg bg-ink px-5 py-3 font-bold text-bg hover:opacity-90 transition-opacity"
              >
                {rl.close}
              </button>
            </div>
          ) : (
            <>
              <h2 className="mb-2 text-2xl font-black tracking-tight text-ink">
                {rl.title}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-ink-2">
                {rl.subtitle} <strong className="text-ink">{lenderName}</strong>?
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="flex flex-col items-center gap-3">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-ink-3">
                    {rl.ratingLabel}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={36}
                          className={`${
                            star <= (hoverRating || rating)
                              ? "fill-amber text-amber"
                              : "text-rule-strong"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-ink-3">
                    {rl.reviewLabel}
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder={rl.reviewPh}
                    className="w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[14px] text-ink outline-none transition-colors focus:border-accent min-h-[100px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="mt-2 w-full rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? "..." : rl.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}