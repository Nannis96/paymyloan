// components/mockedThings.ts
export const DEMO_MOCKS = {
  entity: "Example Entity LLC",
  cards: [
    {
      id: "demo-deal-card-1",
      type: "Bridge",
      address: "123 Example Street",
      cityState: "Anytown, USA 12345",
      loanRequest: "$115,000",
      arv: "$180,000",
      ltv: "63%",
      rating: "A+",
      buttonId: "demo-btn-offer",
      opacity: "opacity-100",
      hiddenOnMobile: false
    },
    {
      id: "demo-deal-card-2",
      type: "Slow flip",
      address: "456 Sample Avenue",
      cityState: "Other City, USA 67890",
      loanRequest: "$95,000",
      arv: "$140,000",
      ltv: "67%",
      rating: "B+",
      buttonId: "",
      opacity: "opacity-75",
      hiddenOnMobile: false
    },
    {
      id: "demo-deal-card-3",
      type: "Bridge",
      address: "789 Mock Boulevard",
      cityState: "Test Town, USA 13579",
      loanRequest: "$210,000",
      arv: "$280,000",
      ltv: "75%",
      rating: "A",
      buttonId: "",
      opacity: "opacity-75",
      hiddenOnMobile: true
    }
  ]
};