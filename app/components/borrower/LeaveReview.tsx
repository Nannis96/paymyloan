"use client";

import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { useSite } from "@/app/components/layout/SiteShell";
import Link from "next/link";

export default function BorrowerLeaveReview() {
  const { t } = useSite();
  const lr = t.leaveReview;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Datos estaticos del mock del HTML original
  const lenderName = "James R.";
  const lenderInitials = "JR";
  const lenderRole = "Private Lender · Memphis, TN · 23 deals funded";
  const dealAddress = "1847 Oak Ridge Ln, Memphis TN";
  const dealMeta = "$185,000 · 10% · 9 months · Closed Sept 29, 2026";

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (!rating) {
      alert("Please select a star rating.");
      return;
    }
    if (!reviewText.trim()) {
      alert("Please write a brief review.");
      return;
    }
    // Validacion simple para prevenir informacion de contacto
    if (/\d{7,}/.test(reviewText) || /\S+@\S+\.\S+/.test(reviewText)) {
      alert("Please remove contact information from your review.");
      return;
    }

    // Simular el envio a la API
    setIsSubmitted(true);
  };

  // Separar el prefijo "Importante:" para pintarlo en negrita como en el diseno original
  const [importantTitle, ...importantTextPieces] = lr.importantNote.split(": ");
  const importantText = importantTextPieces.join(": ");

  return (
    <div className="max-w-[600px] mx-auto py-12 px-6">
      <h1 className="text-2xl font-black text-ink mb-1.5">{lr.pageTitle}</h1>
      <p className="text-sm text-ink-2 mb-8 leading-relaxed">{lr.pageSub}</p>

      {/* Resumen del Trato */}
      <div className="bg-surface border border-rule rounded-xl p-4 mb-7 flex items-center justify-between shadow-sm">
        <div>
          <div className="text-sm font-bold text-ink">{dealAddress}</div>
          <div className="text-xs text-ink-3 mt-0.5">{dealMeta}</div>
        </div>
        <span className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ml-4">
          {lr.closedBadge}
        </span>
      </div>

      {!isSubmitted ? (
        <div className="bg-surface border border-rule rounded-xl p-7 shadow-sm">
          <h2 className="text-[15px] font-black text-ink mb-1.5">{lr.rateTitle}</h2>
          <p className="text-[13px] text-ink-2 mb-5">{lr.rateSub}</p>

          {/* Fila del Prestamista */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-ink text-bg flex items-center justify-center font-bold text-[15px] shrink-0">
              {lenderInitials}
            </div>
            <div>
              <div className="text-sm font-bold text-ink">{lenderName}</div>
              <div className="text-xs text-ink-3">{lenderRole}</div>
            </div>
          </div>

          {/* Estrellas Interactivas */}
          <div className="flex gap-2 mb-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-amber text-amber"
                      : "text-rule-strong"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          <div className="text-xs text-ink-3 mb-5">
            {rating > 0 ? lr.labels[rating] : lr.tapToRate}
          </div>

          {/* Area de Comentario */}
          <div className="mb-4">
            <label className="text-[13px] font-bold text-ink block mb-2">
              {lr.writeReview}
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setReviewText(e.target.value);
                }
              }}
              placeholder={lr.reviewPh}
              className="w-full border border-rule bg-surface-2 rounded-lg p-3 text-sm text-ink focus:border-accent outline-none min-h-[100px] resize-y transition-colors"
            ></textarea>
            <div className="text-[11px] text-ink-3 text-right mt-1">
              {reviewText.length} / 500
            </div>
          </div>

          {/* Etiquetas / Tags */}
          <div className="mb-4">
            <div className="text-xs font-bold text-ink-3 uppercase tracking-wider mb-2">
              {lr.tagsTitle}
            </div>
            <div className="flex flex-wrap gap-2">
              {lr.tags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`border rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-accent-soft border-accent text-accent"
                        : "bg-surface border-rule text-ink-2 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aviso Importante */}
          <div className="bg-surface-2 border border-rule rounded-lg p-3 text-xs text-ink-3 leading-relaxed mb-6">
            <strong className="text-ink font-bold">{importantTitle}:</strong> {importantText}
          </div>

          {/* Botones de Accion */}
          <button
            onClick={handleSubmit}
            className="w-full bg-accent text-accent-ink font-bold text-[15px] py-3.5 rounded-lg hover:opacity-90 transition-opacity mb-2.5"
          >
            {lr.submitBtn}
          </button>
          <Link href="/borrowerDashboard" className="block w-full">
            <button className="w-full bg-surface border border-rule text-ink font-semibold text-sm py-3 rounded-lg hover:bg-surface-2 transition-colors">
              {lr.skipBtn}
            </button>
          </Link>
        </div>
      ) : (
        /* Estado Enviado */
        <div className="bg-surface border border-rule rounded-xl p-10 text-center shadow-sm animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-center mb-4">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h2 className="text-xl font-black text-ink mb-2">
            {lr.submittedTitle}
          </h2>
          <p className="text-sm text-ink-2 leading-relaxed mb-8 max-w-sm mx-auto">
            {lr.submittedSub.replace("{name}", lenderName).replace("{name}", lenderName)}
          </p>
          <Link href="/borrowerDashboard" className="block w-full max-w-[280px] mx-auto">
            <button className="w-full bg-accent text-accent-ink font-bold text-[15px] py-3.5 rounded-lg hover:opacity-90 transition-opacity">
              {lr.backBtn}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}