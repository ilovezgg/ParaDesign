export const CONSULTATION_MODAL_EVENT = "para:open-consultation-modal";

export type ConsultationTopic = "audit";

export function openConsultationModal(topic?: ConsultationTopic) {
  window.dispatchEvent(new CustomEvent(CONSULTATION_MODAL_EVENT, { detail: { topic } }));
}
