export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^7/, "").replace(/^8/, "").slice(0, 10);
  let out = "+7";
  if (digits.length > 0) out += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 3) out += ")";
  if (digits.length > 3) out += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
  return out;
}
