export const SERVICE_MODAL_EVENT = "para:open-service-modal";

export function openServiceModal(index: number) {
  window.dispatchEvent(new CustomEvent<number>(SERVICE_MODAL_EVENT, { detail: index }));
}
