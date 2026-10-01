import CounterOfferView from "../lenderViewsComponents/CounterOfferView";

export default function CounterOfferPage() {
  return <CounterOfferView />;
}
/* Nota técnica: Endpoints requeridos para el flujo de Contraofertas

GET /api/marketplace/quotes/:quoteId/history

Propósito: Cargar la vista de la conversación.

Comportamiento esperado: Debe devolver el historial completo de la negociación en orden cronológico. El payload debe incluir la solicitud original del prestatario, la oferta inicial del prestamista y cualquier contraoferta subsiguiente. Cada nodo del historial necesita: emisor (LENDER o BORROWER), términos propuestos (monto, tasa, plazo, puntos), nota/mensaje adjunto, timestamp y el estado actual de esa propuesta (SUPERSEDED, PENDING, ACCEPTED, REJECTED).

POST /api/marketplace/quotes/:quoteId/counter

Propósito: Enviar una nueva contraoferta (funciona para ambas partes).

Comportamiento esperado: Recibe un body con los nuevos términos (principalAmount, interestRate, amortizationTermMonths, points, message). Debe crear un nuevo registro en el historial de la cotización (invalidando o marcando como superada la oferta anterior), cambiar el estado general del hilo (ej. a AWAITING_BORROWER o AWAITING_LENDER), y disparar una notificación por correo a la contraparte.

Actualización a POST /api/borrowers/me/loan-requests/:id/quotes/:quoteId/select

Propósito: Consolidar la aceptación de la contraoferta.

Comportamiento esperado: La lógica actual crea el contrato basado en la oferta inicial. Deberá actualizarse para que, al momento de aceptar, el backend lea los términos de la última contraoferta activa en el historial y use esos números exactos para crear el Contract y el ContractTerms inicial.*/