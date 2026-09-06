export type ContactFormData = {
  name: string;
  phone: string;
  messenger: string;
  comment: string;
};

// Заглушка отправки формы. Подключите реальный бэкенд здесь:
// например fetch('/api/lead', { method: 'POST', body: JSON.stringify(data) })
// или интеграцию с CRM / Telegram-ботом / формой Creatium.
export async function submitContactForm(data: ContactFormData): Promise<{ ok: boolean }> {
  console.log("[contact form submit]", data);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ok: true };
}
