import Link from "next/link";
import { copy } from "../../content/copy";

export default function LoginPage() {
  // Por ahora asignamos el idioma manualmente para la maquetacion.
  // En la app real, esto se conectara a tu estado global de idioma.
  const lang = "es"; 
  const t = copy[lang].loginPage;

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        
        <h1 className="text-3xl font-black text-ink mb-2 tracking-tight">
          {t.title}
        </h1>
        <p className="text-ink-2 mb-8 text-center text-sm">
          {t.subtitle}
        </p>

        <div className="w-full bg-surface border border-rule rounded-2xl p-6 sm:p-8 shadow-xl">
          
          <div className="flex items-center gap-2 mb-6 text-ink font-bold tracking-wide">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            {t.cardTitle}
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-ink-3 tracking-wider uppercase">
                {t.emailLabel}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-ink-3 font-medium">
                  @
                </span>
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-surface-2 border border-rule text-ink rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-ink-3 tracking-wider uppercase">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-ink-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder={t.passwordPlaceholder}
                  className="w-full bg-surface-2 border border-rule text-ink rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-accent hover:opacity-90 text-accent-ink font-bold rounded-lg py-3 mt-4 transition-opacity"
            >
              {t.submit}
            </button>
          </form>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-xs text-ink-3 hover:text-accent transition-colors flex items-center gap-2 uppercase tracking-wide font-bold">
            <span>&larr;</span> {t.back}
          </Link>
        </div>
        
      </div>
    </div>
  );
}