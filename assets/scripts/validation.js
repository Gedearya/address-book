// ================= VALIDATION =================
function validateRequiredFields(contact) {
  const requiredFields = ["name", "phone", "email", "address"];

  for (const field of requiredFields) {
    if (!contact[field]) {
      return { valid: false, message: VALIDATION_MESSAGES[field] };
    }
  }

  return { valid: true };
}

function validateFormat(contact) {
  if (!VALIDATION_RULES.phone.test(contact.phone)) {
    return { valid: false, message: VALIDATION_MESSAGES.phoneFormat };
  }

  if (!VALIDATION_RULES.email.test(contact.email)) {
    return { valid: false, message: VALIDATION_MESSAGES.emailFormat };
  }

  return { valid: true };
}

function validateContact(contact) {
  const requiredValidation = validateRequiredFields(contact);
  if (!requiredValidation.valid) return requiredValidation;

  const formatValidation = validateFormat(contact);
  if (!formatValidation.valid) return formatValidation;

  return { valid: true };
}

function isDuplicate(contact, contacts, excludeId = null) {
  return contacts.some(
    (c) =>
      c.id !== excludeId &&
      (c.phone === contact.phone ||
        c.email.toLowerCase() === contact.email.toLowerCase()),
  );
}
