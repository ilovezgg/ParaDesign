export type ContactFormData = {
  name: string;
  phone: string;
  messenger: string;
  comment: string;
  figmaLink?: string;
  file?: File | null;
};

// Заглушка отправки формы. Подключите реальный бэкенд здесь:
// например fetch('/api/lead', { method: 'POST', body: toFormData(data) }) — FormData, а не
// JSON.stringify, т.к. data.file — это File и в JSON не сериализуется.
// Или интеграцию с CRM / Telegram-ботом.
export async function submitContactForm(data: ContactFormData): Promise<{ ok: boolean }> {
  console.log("[contact form submit]", data);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ok: true };
}
