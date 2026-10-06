"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

function InviteFlowContent() {
  const { t } = useSite();
  const inv = t.inviteFlow;

  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [lenderFound, setLenderFound] = useState(false);

  // function for demonstration of backend connection
  const handleInviteLender = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    setIsInviting(true);
    
    try {
      // Mocked DUMMY ID for demonstration of the route structure
      const loanRequestId = "DUMMY_REQ_ID";
      // The API asks for lenderCompanyId. If we just have email, the backend would resolve it,
      // or we'd fetch the company ID first. We mock the body to show the integration point.
      const token = localStorage.getItem("accessToken") || "";
      
      const res = await fetch(API_ROUTES.borrowers.loanRequestTargets(loanRequestId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ lenderCompanyId: "MOCK_LENDER_COMP_ID_BASED_ON_EMAIL" })
      });

      // We proceed with the UI simulation whether it passes or not since it's a dummy ID
      setTimeout(() => {
        setLenderFound(true);
        setIsInviting(false);
        setInviteEmail("");
      }, 800);

    } catch (e) {
      console.error(e);
      setIsInviting(false);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto p-[20px] lg:p-[48px_40px] font-sans">
      
      <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#635bff] mb-[6px]">
        {inv.header.label}
      </div>
      <div className="text-[26px] font-[900] text-[#0a2540] mb-[6px]">
        {inv.header.title}
      </div>
      <div className="text-[14px] text-[#8898aa] mb-[40px] leading-[1.6]">
        {inv.header.sub}
      </div>

      {/* ===================== */}
      {/* VIEW 1: LENDER WIDGET */}
      {/* ===================== */}
      <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#635bff] mb-[6px]">
        {inv.view1.label}
      </div>
      <div className="text-[18px] font-[900] mb-[20px] text-[#0a2540]">
        {inv.view1.title}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] mb-[48px]">
        
        {/* Invite Widget */}
        <div className="bg-white border border-[#e6ebf1] rounded-[12px] p-[28px]">
          <div className="text-[16px] font-[800] mb-[4px] text-[#0a2540]">{inv.view1.widgetTitle}</div>
          <div className="text-[13px] text-[#8898aa] mb-[20px]">{inv.view1.widgetSub}</div>

          <div className="text-[12px] font-[700] color-[#425466] mb-[8px] text-[#0a2540]">
            {inv.view1.linkTitle}
          </div>
          <div className="flex gap-[8px] items-center bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] p-[10px_14px] mb-[16px]">
            <span className="text-[12px] text-[#425466] flex-1 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
              paymyloan.ai/invite/jsmith-f7k2x
            </span>
            <button className="bg-[#635bff] text-white px-[14px] py-[6px] rounded-[5px] text-[12px] font-[700] cursor-pointer shrink-0 transition-opacity hover:opacity-90">
              {inv.view1.copyBtn}
            </button>
          </div>

          <div className="text-center text-[12px] text-[#8898aa] my-[12px] relative before:content-[''] before:absolute before:top-1/2 before:w-[calc(50%-54px)] before:h-[1px] before:bg-[#e6ebf1] before:left-0 after:content-[''] after:absolute after:top-1/2 after:w-[calc(50%-54px)] after:h-[1px] after:bg-[#e6ebf1] after:right-0">
            {inv.view1.orDivider}
          </div>

          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[8px]">
              <input 
                type="email" 
                placeholder="borrower@email.com" 
                className="flex-1 p-[9px_14px] border border-[#e6ebf1] rounded-[6px] text-[13px] outline-none text-[#0a2540] focus:border-[#635bff]" 
              />
              <button className="bg-[#635bff] text-white p-[9px_18px] rounded-[6px] text-[13px] font-[700] cursor-pointer whitespace-nowrap transition-opacity hover:opacity-90">
                {inv.view1.sendBtn}
              </button>
            </div>
            <div className="text-[11px] text-[#8898aa]">
              {inv.view1.inputHint}
            </div>
          </div>

          <div className="flex gap-[16px] mt-[20px] pt-[20px] border-t border-[#e6ebf1]">
            <div className="flex-1 text-center"><div className="text-[20px] font-[900] text-[#635bff]">3</div><div className="text-[11px] text-[#8898aa] mt-[2px]">{inv.view1.stats.sent}</div></div>
            <div className="flex-1 text-center"><div className="text-[20px] font-[900] text-[#635bff]">2</div><div className="text-[11px] text-[#8898aa] mt-[2px]">{inv.view1.stats.signedUp}</div></div>
            <div className="flex-1 text-center"><div className="text-[20px] font-[900] text-[#635bff]">1</div><div className="text-[11px] text-[#8898aa] mt-[2px]">{inv.view1.stats.posted}</div></div>
            <div className="flex-1 text-center"><div className="text-[20px] font-[900] text-[#635bff]">$95K</div><div className="text-[11px] text-[#8898aa] mt-[2px]">{inv.view1.stats.funded}</div></div>
          </div>
        </div>

        {/* Right Info Column */}
        <div>
          <div className="bg-[#f0efff] border-[1.5px] border-[#c7c4ff] rounded-[10px] p-[16px_20px]">
            <div className="text-[13px] font-[800] text-[#635bff] mb-[4px]">{inv.view1.feeTitle}</div>
            <div className="text-[12px] text-[#425466] leading-[1.6]">
              {inv.view1.feeBody1}<span className="font-[700] text-[#0a2540]">{inv.view1.feeBody1Highlight}</span>{inv.view1.feeBody1Cont}<br /><br />
              <span className="font-[700] text-[#0a2540]">{inv.view1.feeBody2Highlight}</span>{inv.view1.feeBody2Cont}<br /><br />
              <span className="font-[700] text-[#0a2540]">{inv.view1.feeBody3Highlight}</span> <code className="bg-[#e6ebf1] p-[1px_5px] rounded-[3px] text-[11px]">source: direct_invite</code>
            </div>
          </div>

          <div className="bg-white border border-[#e6ebf1] rounded-[12px] p-[32px] mt-[20px]">
            <div className="text-[14px] font-[800] mb-[12px] text-[#0a2540]">{inv.view1.borrowerReceivesTitle}</div>
            <div className="text-[13px] text-[#425466] leading-[1.8] whitespace-pre-line">
              {inv.view1.borrowerReceivesBody}
            </div>
          </div>
        </div>

      </div>

      {/* ========================= */}
      {/* VIEW 2: BORROWER FIELD    */}
      {/* ========================= */}
      <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#635bff] mb-[6px]">
        {inv.view2.label}
      </div>
      <div className="text-[18px] font-[900] mb-[20px] text-[#0a2540]">
        {inv.view2.title}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] mb-[48px]">

        <div className="bg-white border border-[#e6ebf1] rounded-[12px] p-[32px]">
          <div className="text-[15px] font-[800] mb-[4px] text-[#0a2540]">{inv.view2.stepTitle}</div>
          <div className="text-[13px] text-[#8898aa] mb-[24px]">{inv.view2.stepSub}</div>

          <div className="mb-[20px]">
            <div className="text-[12px] font-[700] text-[#425466] mb-[6px]">{inv.view2.amountLabel} <span className="text-[#c62626]">*</span></div>
            <input type="text" className="w-full p-[10px_14px] border border-[#e6ebf1] rounded-[8px] text-[13px] outline-none text-[#0a2540]" value="$115,000" readOnly />
          </div>

          <div className="mb-[20px]">
            <div className="text-[12px] font-[700] text-[#425466] mb-[6px]">{inv.view2.termLabel}</div>
            <select className="w-full p-[10px_14px] border border-[#e6ebf1] rounded-[8px] text-[13px] outline-none text-[#0a2540] appearance-none cursor-pointer">
              <option>6 {t.marketplace.dealDetails.months}</option>
              <option>12 {t.marketplace.dealDetails.months}</option>
            </select>
          </div>

          <div className="h-[1px] bg-[#e6ebf1] my-[20px]"></div>

          <div className="mb-[20px]">
            <div className="text-[12px] font-[700] text-[#425466] mb-[6px]">
              {inv.view2.haveLenderLabel}
              <span className="text-[10px] font-[600] text-[#aab7c4] ml-[6px]">{inv.view2.optionalTag}</span>
            </div>
            <div className="text-[12px] text-[#8898aa] mb-[10px]">{inv.view2.haveLenderHint}</div>
            
            <form onSubmit={handleInviteLender} className="flex gap-[8px]">
              <input 
                type="email" 
                placeholder="lender@email.com" 
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                disabled={lenderFound || isInviting}
                className="flex-1 p-[10px_14px] border border-[#e6ebf1] rounded-[6px] text-[13px] outline-none text-[#0a2540] focus:border-[#635bff] disabled:bg-[#f6f9fc]" 
              />
              <button 
                disabled={lenderFound || isInviting}
                className="bg-[#635bff] text-white p-[10px_18px] rounded-[6px] text-[13px] font-[700] cursor-pointer whitespace-nowrap transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isInviting ? t.inviteModal.sending : inv.view2.inviteBtn}
              </button>
            </form>
          </div>

          {/* State: lender found / invited */}
          {lenderFound && (
            <div className="bg-[#e8f5e9] border-[1.5px] border-[#a5d6a7] rounded-[8px] p-[12px_16px] flex items-center gap-[12px] mt-[8px] animate-in fade-in zoom-in-95">
              <div className="w-[36px] h-[36px] rounded-full bg-[#635bff] flex items-center justify-center text-[14px] font-[800] text-white shrink-0">
                J
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-[800] text-[#0a2540]">{inv.view2.lenderFoundName}</div>
                <div className="text-[11px] text-[#2e7d32]">{inv.view2.lenderFoundSub}</div>
              </div>
              <span className="text-[11px] font-[700] text-[#8898aa] cursor-pointer hover:text-[#c62626]" onClick={() => setLenderFound(false)}>
                {inv.view2.removeBtn}
              </span>
            </div>
          )}

          <div className="bg-[#f0efff] border-[1.5px] border-[#c7c4ff] rounded-[10px] p-[16px_20px] mt-[16px]">
            <div className="text-[13px] font-[800] text-[#635bff] mb-[4px]">{inv.view2.feeTitle}</div>
            <div className="text-[12px] text-[#425466] leading-[1.6]">
              {inv.view2.feeBody1}<span className="font-[700] text-[#0a2540]">{inv.view2.feeBody1Highlight}</span>{inv.view2.feeBody1Cont}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border border-[#e6ebf1] rounded-[12px] p-[32px]">
            <div className="text-[14px] font-[800] mb-[12px] text-[#0a2540]">{inv.view2.lenderReceivesTitle}</div>
            <div className="text-[13px] text-[#425466] leading-[1.8] whitespace-pre-line">
              {inv.view2.lenderReceivesBody}
            </div>
          </div>

          <div className="bg-white border border-[#e6ebf1] rounded-[12px] p-[32px] mt-[20px]">
            <div className="text-[14px] font-[800] mb-[12px] text-[#0a2540]">{inv.view2.noFundTitle}</div>
            <div className="text-[13px] text-[#425466] leading-[1.6] whitespace-pre-line">
              {inv.view2.noFundBody}
            </div>
          </div>
        </div>

      </div>

      {/* ============================ */}
      {/* VIEW 3: CO-BRANDED LANDING   */}
      {/* ============================ */}
      <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#635bff] mb-[6px]">
        {inv.view3.label}
      </div>
      <div className="text-[18px] font-[900] mb-[20px] text-[#0a2540]">
        {inv.view3.title}
      </div>

      <div className="max-w-[560px] mx-auto mb-[48px]">

        <div className="bg-[linear-gradient(135deg,#0a2540_0%,#1a3a5c_100%)] rounded-[16px] p-[60px_48px] text-center text-white mb-[40px] shadow-lg">
          <div className="w-[64px] h-[64px] rounded-full bg-[#635bff] flex items-center justify-center text-[24px] font-[900] border-[3px] border-[#a78bfa] mx-auto mb-[16px]">
            J
          </div>
          <div className="text-[14px] text-white/90 mb-[8px]">
            <strong className="text-white">John Smith</strong> {inv.view3.heroInviter}
          </div>
          <div className="text-[12px] font-[700] uppercase tracking-[1px] text-[#a78bfa] mb-[12px]">
            {inv.view3.heroEyebrow}
          </div>
          <div className="text-[36px] font-[900] leading-[1.2] mb-[16px]">
            {inv.view3.heroTitle1}<br/>{inv.view3.heroTitle2} <span className="text-[#a78bfa]">{inv.view3.heroTitle3}</span>
          </div>
          <div className="text-[15px] text-white/75 max-w-[480px] mx-auto mb-[32px] leading-[1.7]">
            {inv.view3.heroSub}
          </div>
          <button className="inline-block bg-[#635bff] text-white p-[14px_36px] rounded-[8px] text-[15px] font-[800] border-none cursor-pointer mt-[8px] hover:bg-[#524ddb] transition-colors">
            {inv.view3.heroBtn}
          </button>
          <div className="text-[11px] text-white/40 mt-[12px]">
            {inv.view3.heroFine}
          </div>
        </div>

        <div className="bg-white border border-[#e6ebf1] rounded-[12px] p-[32px] max-w-[440px] mx-auto shadow-sm">
          <div className="inline-flex items-center gap-[6px] bg-[#f0efff] border border-[#c7c4ff] rounded-[20px] p-[4px_12px] text-[11px] font-[700] text-[#635bff] mb-[20px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#635bff]"></div>
            {inv.view3.signupTag}
          </div>
          <div className="text-[20px] font-[900] mb-[4px] text-[#0a2540]">{inv.view3.signupTitle}</div>
          <div className="text-[13px] text-[#8898aa] mb-[24px]">{inv.view3.signupSub}</div>

          <div className="grid grid-cols-2 gap-[12px] mb-[16px]">
            <div>
              <label className="block text-[12px] font-[700] text-[#425466] mb-[6px]">{inv.view3.firstName}</label>
              <input type="text" placeholder="Marcus" className="w-full p-[10px_14px] border border-[#e6ebf1] rounded-[7px] text-[13px] outline-none focus:border-[#635bff]" />
            </div>
            <div>
              <label className="block text-[12px] font-[700] text-[#425466] mb-[6px]">{inv.view3.lastName}</label>
              <input type="text" placeholder="Johnson" className="w-full p-[10px_14px] border border-[#e6ebf1] rounded-[7px] text-[13px] outline-none focus:border-[#635bff]" />
            </div>
          </div>
          <div className="mb-[16px]">
            <label className="block text-[12px] font-[700] text-[#425466] mb-[6px]">{inv.view3.email}</label>
            <input type="email" placeholder="marcus@email.com" className="w-full p-[10px_14px] border border-[#e6ebf1] rounded-[7px] text-[13px] outline-none focus:border-[#635bff]" />
          </div>
          <div className="mb-[16px]">
            <label className="block text-[12px] font-[700] text-[#425466] mb-[6px]">{inv.view3.phone}</label>
            <input type="tel" placeholder="(901) 555-0100" className="w-full p-[10px_14px] border border-[#e6ebf1] rounded-[7px] text-[13px] outline-none focus:border-[#635bff]" />
          </div>
          <div className="mb-[16px]">
            <label className="block text-[12px] font-[700] text-[#425466] mb-[6px]">{inv.view3.password}</label>
            <input type="password" placeholder="••••••••" className="w-full p-[10px_14px] border border-[#e6ebf1] rounded-[7px] text-[13px] outline-none focus:border-[#635bff]" />
          </div>
          
          <button className="w-full bg-[#635bff] text-white p-[12px] rounded-[7px] text-[14px] font-[800] border-none cursor-pointer mt-[4px] hover:bg-[#524ddb] transition-colors">
            {inv.view3.signupBtn}
          </button>
          
          <div className="text-[11px] text-[#8898aa] text-center mt-[12px] leading-[1.6]">
            {inv.view3.signupFine}
          </div>
        </div>

      </div>

      {/* ===================== */}
      {/* FEE LOGIC TABLE       */}
      {/* ===================== */}
      <div className="bg-white border border-[#e6ebf1] rounded-[12px] p-[32px] mb-[48px]">
        <div className="text-[16px] font-[800] mb-[4px] text-[#0a2540]">{inv.feeTable.title}</div>
        <div className="text-[13px] text-[#8898aa] mb-[8px]">{inv.feeTable.sub}</div>

        <div className="overflow-x-auto mt-[16px]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#8898aa] p-[10px_14px] border-b-[2px] border-[#e6ebf1]">{inv.feeTable.headers[0]}</th>
                <th className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#8898aa] p-[10px_14px] border-b-[2px] border-[#e6ebf1]">
                  {inv.feeTable.headers[1]}<br/><span className="text-[10px] font-[500] normal-case">{inv.feeTable.headers[2]}</span>
                </th>
                <th className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#8898aa] p-[10px_14px] border-b-[2px] border-[#e6ebf1]">
                  {inv.feeTable.headers[3]}<br/><span className="text-[10px] font-[500] normal-case">{inv.feeTable.headers[4]}</span>
                </th>
                <th className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#8898aa] p-[10px_14px] border-b-[2px] border-[#e6ebf1]">{inv.feeTable.headers[5]}</th>
              </tr>
            </thead>
            <tbody>
              {inv.feeTable.rows.map((row: any, idx: number) => (
                <tr key={idx}>
                  <td className="text-[13px] p-[12px_14px] border-b border-[#f0f4f8] align-top text-[#0a2540] font-semibold">{row.fee}</td>
                  <td className="text-[13px] p-[12px_14px] border-b border-[#f0f4f8] align-top font-[700] text-[#2e7d32]">{row.match}</td>
                  <td className={`text-[13px] p-[12px_14px] border-b border-[#f0f4f8] align-top font-[600] ${row.invite === "Waived" || row.invite === "Condonada" ? "text-[#aab7c4]" : "text-[#2e7d32]"}`}>{row.invite}</td>
                  <td className="text-[13px] p-[12px_14px] border-b border-[#f0f4f8] align-top text-[#425466]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#0a2540] rounded-[10px] p-[20px_24px] mt-[24px]">
          <div className="text-[12px] font-[700] uppercase tracking-[0.5px] text-[#a78bfa] mb-[12px]">
            {inv.feeTable.specTitle}
          </div>
          
          <div className="flex flex-col gap-[8px]">
            {inv.feeTable.specs.map((spec: any, idx: number) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-[4px] sm:gap-[12px] text-[13px] text-white/85 leading-[1.5]">
                <span className="font-[700] text-white min-w-[140px] shrink-0">{spec.key}</span>
                <span className="text-[#a78bfa] break-all sm:break-normal">{spec.val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default function InviteFlowPage() {
  return (
    <SiteShell isDashboard={true}>
      <InviteFlowContent />
    </SiteShell>
  );
}