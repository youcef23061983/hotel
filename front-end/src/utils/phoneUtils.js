export const isValidPhone = (phone) => {
  return /^\+[1-9]\d{1,14}$/.test(phone);
};

export const formatPhone = (phoneCode, localNumber) => {
  if (!localNumber) return "";

  // Convert to string in case (still good practice)
  const localStr = String(localNumber);

  // Remove all non-digit characters except leading "+"
  const cleaned = localStr.replace(/[^\d+]/g, "");

  // ✅ 1. Already starts with '+' and includes country code
  if (cleaned.startsWith(`+${phoneCode}`)) {
    return cleaned;
  }

  // ✅ 2. Already has country code without '+'
  if (cleaned.startsWith(phoneCode)) {
    return `+${cleaned}`;
  }

  // ✅ 3. Starts with '00'
  if (cleaned.startsWith(`00${phoneCode}`)) {
    return `+${cleaned.slice(2)}`;
  }

  // ✅ 4. Starts with '0' (local format)
  if (cleaned.startsWith("0")) {
    const withoutLeadingZero = cleaned.replace(/^0+/, "");
    return `+${phoneCode}${withoutLeadingZero}`;
  }

  // ✅ 5. No special format - assume it's just the local number
  return `+${phoneCode}${cleaned}`;
};
