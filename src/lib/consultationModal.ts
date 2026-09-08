export const CONSULTATION_MODAL_EVENT = "para:open-consultation-modal";

export function openConsultationModal() {
  window.dispatchEvent(new Event(CONSULTATION_MODAL_EVENT));
}
