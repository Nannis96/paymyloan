"use client";

import { useState } from "react";

interface BorrowerScoreCardProps {
  tier?: "rookie" | "pro" | "all-star" | "limited";
  matchState?: "matched" | "unmatched" | "pending" | "incoming";
  t: any; // Se inyecta el objeto de traducciones
  deal?: {
    address: string;
    loan: string;
    rate: string;
    term: string;
    arv: string;
    type: string;
    market: string;
    ltv: number;
  };
  borrower?: {
    score: number;
    deals: number;
    onTime: string;
    funded: string;
    extensions: number;
  };
}

export default function BorrowerScoreCard({
  tier = "all-star",
  matchState = "unmatched",
  t,
  deal = {
    address: "**** Oak Ridge Ln, Memphis, TN",
    loan: "$185K",
    rate: "10%",
    term: "9 mo",
    arv: "$310K",
    type: "Bridge",
    market: "Memphis",
    ltv: 62,
  },
  borrower = {
    score: 847,
    deals: 14,
    onTime: "100%",
    funded: "$2.4M",
    extensions: 0,
  }
}: BorrowerScoreCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const sc = t.uiComponents.scoreCard;

  // Configuracion visual para cada nivel (tier)
  const tierStyles = {
    "rookie": {
      badge: "bg-[#635bff33] text-[#a78bfa] border-[#635bff66]",
      front: "bg-surface-2 border-2 border-rule-strong",
      back: "bg-surface-2 border-2 border-rule-strong",
      label: sc.rookie.name
    },
    "pro": {
      badge: "bg-[#c9a84c33] text-[#c9a84c] border-[#c9a84c66]",
      front: "bg-[linear-gradient(135deg,#1a1814_0%,#2a261f_100%)] border-2 border-[#c9a84c]",
      back: "bg-[linear-gradient(135deg,#1a1814_0%,#2a261f_100%)] border-2 border-[#c9a84c]",
      label: sc.pro.name
    },
    "all-star": {
      badge: "bg-[#b482ff26] text-[#d4a8ff] border-[#b482ff66]",
      front: "bg-[linear-gradient(135deg,#0a0a0a_0%,#1a1a1a_50%,#0d0d1a_100%)] border-2 border-[#b482ffcc]",
      back: "bg-[linear-gradient(135deg,#0d0d1a_0%,#1a1a2e_100%)] border-2 border-[#b482ffcc]",
      label: sc.allStar.name
    },
    "limited": {
      badge: "bg-[#ffd70033] text-[#ffd700] border-[#ffd70066]",
      front: "bg-ink border-2 border-[#ffd700]",
      back: "bg-ink border-2 border-[#ffd700]",
      label: sc.limited.name
    }
  };

  const currentTier = tierStyles[tier];

  return (
    <div className="w-full max-w-[360px] mx-auto">
      {/* TARJETA 3D */}
      <div
        className="w-[320px] h-[210px] mx-auto mb-4 cursor-pointer [perspective:900px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`w-full h-full relative [transform-style:preserve-3d] transition-transform duration-500 ease-in-out ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* CARA FRONTAL - Info del Trato */}
          <div
            className={`absolute inset-0 rounded-2xl [backface-visibility:hidden] overflow-hidden ${currentTier.front}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)] pointer-events-none" />
            <div className="absolute top-[14px] left-[16px] text-xs font-extrabold text-white/70">
              Pay<span className="text-accent">My</span>Loan
            </div>
            <div className={`absolute top-[14px] right-[14px] text-[9px] font-extrabold uppercase tracking-[1.5px] px-2.5 py-1 rounded-full border ${currentTier.badge}`}>
              {currentTier.label}
            </div>

            <div className="absolute top-[40px] left-[16px] right-[16px] text-[13px] font-extrabold text-white">
              {deal.address}
            </div>

            <div className="absolute top-[68px] left-[16px] right-[16px] grid grid-cols-3 gap-1.5">
              <div className="text-[9px] text-white/50"><strong className="block text-[13px] font-extrabold text-white mb-[1px]">{deal.loan}</strong>{sc.fields.loan}</div>
              <div className="text-[9px] text-white/50"><strong className="block text-[13px] font-extrabold text-white mb-[1px]">{deal.rate}</strong>{sc.fields.rate}</div>
              <div className="text-[9px] text-white/50"><strong className="block text-[13px] font-extrabold text-white mb-[1px]">{deal.term}</strong>{sc.fields.term}</div>
              <div className="text-[9px] text-white/50"><strong className="block text-[13px] font-extrabold text-white mb-[1px]">{deal.arv}</strong>{sc.fields.arv}</div>
              <div className="text-[9px] text-white/50"><strong className="block text-[13px] font-extrabold text-white mb-[1px]">{deal.type}</strong>{sc.fields.type}</div>
              <div className="text-[9px] text-white/50"><strong className="block text-[13px] font-extrabold text-white mb-[1px]">{deal.market}</strong>{sc.fields.market}</div>
            </div>

            <div className="absolute bottom-[36px] left-[16px] right-[16px]">
              <div className="flex justify-between text-[9px] text-white/40 mb-1">
                <span>LTV {deal.ltv}%</span>
                <span className="text-green-500">{sc.underCap}</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full">
                <div className="h-1 bg-accent rounded-full" style={{ width: `${deal.ltv}%` }} />
              </div>
            </div>

            <div className="absolute bottom-[10px] left-0 right-0 text-center text-[9px] text-white/25 tracking-wider">
              {sc.tapToSee}
            </div>
          </div>

          {/* REVERSO - Score del Prestatario */}
          <div
            className={`absolute inset-0 rounded-2xl [backface-visibility:hidden] overflow-hidden [transform:rotateY(180deg)] ${currentTier.back}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)] pointer-events-none" />
            <div className="flex items-center justify-between px-4 pt-3">
              <div className="text-[10px] font-extrabold text-white/50">Pay<span className="text-accent">My</span>Loan</div>
              <div className={`text-[9px] font-extrabold uppercase tracking-[1.5px] px-2.5 py-1 rounded-full border ${currentTier.badge}`}>
                {currentTier.label}
              </div>
            </div>

            {matchState === "matched" ? (
              <div>
                <div className="text-center pt-2 pb-1">
                  <div className="text-[44px] font-black text-accent leading-none">{borrower.score}</div>
                  <div className="text-[10px] font-bold text-brand-purple tracking-wider mt-0.5">{sc.scoreLbl}</div>
                </div>
                <div className="flex justify-around px-4 py-2">
                  <div className="text-center text-[9px] text-white/50"><strong className="block text-[12px] font-extrabold text-white mb-[1px]">{borrower.deals}</strong>{sc.deals}</div>
                  <div className="text-center text-[9px] text-white/50"><strong className="block text-[12px] font-extrabold text-green-500 mb-[1px]">{borrower.onTime}</strong>{sc.onTime}</div>
                  <div className="text-center text-[9px] text-white/50"><strong className="block text-[12px] font-extrabold text-white mb-[1px]">{borrower.funded}</strong>{sc.funded}</div>
                  <div className="text-center text-[9px] text-white/50"><strong className="block text-[12px] font-extrabold text-[#c9a84c] mb-[1px]">{borrower.extensions}</strong>{sc.extensions}</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-accent/25 border-t border-accent/40 py-1.5 px-4 text-center text-[10px] font-bold text-brand-purple tracking-wider">
                  {sc.matchedStrip}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center pt-2 pb-1">
                  <div className="text-[44px] font-black text-accent leading-none blur-sm">8••</div>
                  <div className="text-[10px] font-bold text-ink-3 tracking-wider mt-0.5">{sc.scoreHidden}</div>
                </div>
                <div className="flex justify-around px-4 py-2 opacity-40 blur-[2px]">
                  <div className="text-center text-[9px] text-white/50"><strong className="block text-[12px] font-extrabold text-white mb-[1px]">••</strong>{sc.deals}</div>
                  <div className="text-center text-[9px] text-white/50"><strong className="block text-[12px] font-extrabold text-green-500 mb-[1px]">••%</strong>{sc.onTime}</div>
                  <div className="text-center text-[9px] text-white/50"><strong className="block text-[12px] font-extrabold text-white mb-[1px]">$•.•M</strong>{sc.funded}</div>
                  <div className="text-center text-[9px] text-white/50"><strong className="block text-[12px] font-extrabold text-[#c9a84c] mb-[1px]">•</strong>{sc.extensions}</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 py-1.5 px-4 text-center text-[10px] font-bold text-ink-3 tracking-wider">
                  {sc.lockedStrip}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTON DE VOLTEAR */}
      <div className="text-center mb-5">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="bg-white/5 border border-white/10 text-ink-3 rounded-md px-4 py-1.5 text-xs font-semibold cursor-pointer hover:bg-white/10 transition-colors"
        >
          {isFlipped ? sc.seeDeal : sc.seeScore}
        </button>
      </div>

      {/* LEYENDA INFORMATIVA NIVELES */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-3 mb-3">
          {sc.cardTiers}
        </div>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2.5 text-accent">
            <span className="w-2.5 h-2.5 bg-accent rounded-full shrink-0" />
            <div><strong>{sc.rookie.name}</strong> <span className="text-ink-3">{sc.rookie.desc}</span></div>
          </div>
          <div className="flex items-center gap-2.5 text-[#c9a84c]">
            <span className="w-2.5 h-2.5 bg-[#c9a84c] rounded-full shrink-0" />
            <div><strong>{sc.pro.name}</strong> <span className="text-ink-3">{sc.pro.desc}</span></div>
          </div>
          <div className="flex items-center gap-2.5 text-[#d4a8ff]">
            <span className="w-2.5 h-2.5 bg-gradient-to-br from-[#d4a8ff] to-accent rounded-full shrink-0" />
            <div><strong>{sc.allStar.name}</strong> <span className="text-ink-3">{sc.allStar.desc}</span></div>
          </div>
          <div className="flex items-center gap-2.5 text-[#ffd700]">
            <span className="w-2.5 h-2.5 bg-[#ffd700] rounded-full shrink-0" />
            <div><strong>{sc.limited.name}</strong> <span className="text-ink-3">{sc.limited.desc}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}