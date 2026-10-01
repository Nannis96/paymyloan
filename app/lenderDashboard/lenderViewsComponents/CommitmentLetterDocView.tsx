"use client";

import { useSite } from "@/app/components/layout/SiteShell";

export default function CommitmentLetterDocView() {
  const { t } = useSite();
  const doc = t.commitmentLetterDoc;

  // NOTA PARA LA INTEGRACION FUTURA CON EL BACKEND:
  // Para que esta vista sea dinamica con un contrato real, debes:
  // 1. Recibir `contractId` como prop o sacarlo de los parametros de la ruta.
  // 2. Hacer fetch a `GET /api/contracts/${contractId}`
  // 3. Mapear `contract.property`, `contract.currentTerms`, y `contract.currentTerms.feeItems`
  //    (revisar Docs/API_REFERENCE.md).

  return (
    <div className="mx-auto w-full max-w-[680px] p-[32px_16px] font-sans">
      
      {/* Top Actions */}
      <div className="mb-[16px] flex items-center justify-between">
        <div className="text-[12px] font-[600] text-[#8898aa]">
          {doc.label}
        </div>
        <div className="flex gap-[8px]">
          <button className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[7px] text-[12px] font-[600] text-[#425466]">
            {doc.print}
          </button>
          <button className="cursor-pointer rounded-[6px] border-none bg-[#0a2540] px-[14px] py-[7px] text-[12px] font-[700] text-white">
            {doc.download}
          </button>
        </div>
      </div>

      {/* Document Wrapper */}
      <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        
        {/* Document Header */}
        <div className="flex items-center justify-between bg-[#0a2540] p-[28px_40px]">
          <div className="text-[18px] font-[800] tracking-[-0.3px] text-white">
            PayMy<span className="text-[#635bff]">Loan</span>.ai
          </div>
          <div className="text-[11px] font-[700] uppercase tracking-[0.8px] text-[#8898aa]">
            {doc.docType}
          </div>
        </div>

        {/* Document Body */}
        <div className="p-[40px]">
          <div className="mb-[6px] text-center text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
            {doc.title}
          </div>
          <div className="mb-[32px] text-center text-[12px] text-[#8898aa]">
            {doc.subtitle}
          </div>

          {/* Section: Parties */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.parties}
            </div>
            <div className="grid grid-cols-2 gap-[10px]">
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.lender}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Moore Capital LLC</div>
              </div>
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.lenderSig}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Wilson Moore, Managing Member</div>
              </div>
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.borrower}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Memphis Realty LLC</div>
              </div>
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.borrowerSig}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Marcus Johnson, Managing Member</div>
              </div>
            </div>
          </div>

          {/* Section: Property */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.property}
            </div>
            <div className="grid grid-cols-2 gap-[10px]">
              <div className="col-span-2 rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.address}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">3802 University Cove, Memphis, TN 38127</div>
              </div>
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.propType}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Single family residential</div>
              </div>
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.exit}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Sell after rehab</div>
              </div>
            </div>
          </div>

          {/* Section: Loan Terms */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.terms}
            </div>
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-[#f0f4f8]">
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.loanAmount}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">$115,000.00</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.purchaseFunded}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">$85,000 (100%)</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.rehabFunded}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">$30,000 (100%) — {doc.values.heldBack}</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.interestRate}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">12.00% {doc.values.perAnnum}</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.monthlyPayment}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">$1,150.00 {doc.values.io}</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.perDiem}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">$38.33</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.term}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">12 months</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.maturity}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">September 22, 2027</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.ltv}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">66.7% ($115,000 ÷ $165,000 ARV)</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.disbursement}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{doc.values.drawBased}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section: Fees */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.fees}
            </div>
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-[#f0f4f8]">
                <tr>
                  <td className="py-[8px] text-[13px] text-[#0a2540]">{doc.labels.origination}</td>
                  <td className="py-[8px] text-right text-[13px] font-[700] text-[#0a2540]">$1,150.00</td>
                </tr>
                <tr>
                  <td className="py-[8px] text-[13px] text-[#0a2540]">{doc.labels.appraisal}</td>
                  <td className="py-[8px] text-right text-[13px] font-[700] text-[#0a2540]">$595.00</td>
                </tr>
                <tr>
                  <td className="py-[8px] text-[13px] text-[#0a2540]">{doc.labels.admin}</td>
                  <td className="py-[8px] text-right text-[13px] font-[700] text-[#0a2540]">$595.00</td>
                </tr>
                <tr>
                  <td className="py-[8px] text-[13px] text-[#0a2540]">{doc.labels.wire}</td>
                  <td className="py-[8px] text-right text-[13px] font-[700] text-[#0a2540]">$49.00</td>
                </tr>
                <tr>
                  <td className="py-[8px] text-[13px] text-[#0a2540]">{doc.labels.pmlFee}</td>
                  <td className="py-[8px] text-right text-[13px] font-[700] text-[#0a2540]">$1,150.00</td>
                </tr>
                <tr>
                  <td className="pt-[12px] pb-[8px] text-[14px] font-[800] text-[#0a2540] border-none">{doc.labels.totalFees}</td>
                  <td className="pt-[12px] pb-[8px] text-right text-[14px] font-[800] text-[#0a2540] border-none">$3,539.00</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-[14px] rounded-[7px] border border-[#c7c4ff] bg-[#f0efff] p-[12px_14px] text-[12px] leading-[1.6] text-[#635bff]">
              {doc.pmlFeeNote}
            </div>
          </div>

          {/* Section: Conditions */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.conditions}
            </div>
            <ul className="list-none p-0">
              {doc.conditionsList.map((condition, i) => (
                <li key={i} className="flex gap-[8px] border-b border-[#f6f9fc] py-[6px] text-[13px] leading-[1.6] text-[#425466]">
                  <span className="shrink-0 font-[700] text-[#635bff]">·</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Agreement */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.agreement}
            </div>
            {doc.agreementTexts.map((text, i) => (
              <p key={i} className="mb-[10px] text-[13px] leading-[1.8] text-[#425466]">
                {text}
              </p>
            ))}
          </div>

          {/* Signatures */}
          <div className="mt-[32px] border-t-2 border-[#e6ebf1] pt-[28px]">
            <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2">
              <div>
                <div className="mb-[20px] text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4]">
                  {doc.labels.lenderSigRole}
                </div>
                <div className="relative mb-[6px] h-[40px] border-b-[1.5px] border-[#0a2540]">
                  <span className="absolute bottom-[4px] left-0 text-[11px] font-[700] italic text-[#635bff]">
                    {doc.values.esignedBy} Wilson Moore
                  </span>
                </div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Wilson Moore</div>
                <div className="text-[11px] text-[#8898aa]">Managing Member, Moore Capital LLC</div>
                <div className="mt-[4px] text-[11px] text-[#8898aa]">{doc.labels.signed} September 21, 2026 at 2:34 PM CDT</div>
              </div>
              <div>
                <div className="mb-[20px] text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4]">
                  {doc.labels.borrowerSigRole}
                </div>
                <div className="relative mb-[6px] h-[40px] border-b-[1.5px] border-[#0a2540]">
                  <span className="absolute bottom-[4px] left-0 text-[11px] font-[700] italic text-[#635bff]">
                    {doc.values.esignedBy} Marcus Johnson
                  </span>
                </div>
                <div className="text-[13px] font-[700] text-[#0a2540]">Marcus Johnson</div>
                <div className="text-[11px] text-[#8898aa]">Managing Member, Memphis Realty LLC</div>
                <div className="mt-[4px] text-[11px] text-[#8898aa]">{doc.labels.signed} September 21, 2026 at 3:12 PM CDT</div>
              </div>
            </div>
          </div>

        </div>

        {/* Document Footer */}
        <div className="border-t border-[#e6ebf1] bg-[#f6f9fc] p-[16px_40px] text-center text-[10px] leading-[1.8] text-[#aab7c4]">
          {doc.values.footerGen} · {doc.values.footerId} PML-2026-09-21-3802UCOVE · {doc.values.footerLegal}<br />
          PayMyLoan LLC · {doc.values.footerTag} · paymyloan.ai
        </div>

      </div>
    </div>
  );
}