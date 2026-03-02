// ================= VALIDATION =================
const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: {
      required: "Name is required",
      minLength: "Name must be at least 2 characters",
      maxLength: "Name must not exceed 50 characters",
      pattern: "Name can only contain letters and spaces",
    },
  },
  phone: {
    required: true,
    pattern: /^(\+62|62|0)[0-9]{9,12}$/,
    message: {
      required: "Phone number is required",
      pattern: "Invalid phone format (e.g., 08123456789 or +628123456789)",
    },
  },
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: {
      pattern: "Invalid email format",
    },
  },
  address: {
    required: false,
    maxLength: 200,
    message: {
      maxLength: "Address must not exceed 200 characters",
    },
  },
};

function validateField(fieldName, value) {
  const rules = VALIDATION_RULES[fieldName];
  if (!rules) return { valid: true };

  const trimmedValue = value.trim();

  if (rules.required && !trimmedValue) {
    return { valid: false, message: rules.message.required };
  }

  if (!trimmedValue && !rules.required) {
    return { valid: true };
  }

  if (rules.minLength && trimmedValue.length < rules.minLength) {
    return { valid: false, message: rules.message.minLength };
  }

  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    return { valid: false, message: rules.message.maxLength };
  }

  if (rules.pattern && !rules.pattern.test(trimmedValue)) {
    return { valid: false, message: rules.message.pattern };
  }

  return { valid: true };
}

function normalizePhoneNumber(phone) {
  let normalized = phone.trim().replace(/[\s\-\(\)]/g, "");

  if (normalized.startsWith("+62")) {
    return normalized.substring(1);
  }

  if (normalized.startsWith("0")) {
    return "62" + normalized.substring(1);
  }

  return normalized;
}

function checkDuplicateContact(phone, currentId = null) {
  const contacts = loadContacts();
  const normalizedPhone = normalizePhoneNumber(phone);

  return contacts.find((c) => {
    const contactPhone = normalizePhoneNumber(c.phone);
    if (currentId && c.id == currentId) return false;
    if (c.deletedAt) return false;
    return contactPhone === normalizedPhone;
  });
}

function validateForm() {
  const fields = ["name", "phone", "email", "address"];
  let isValid = true;

  fields.forEach((field) => {
    const input = DOM.inputs[field];
    const result = validateField(field, input.value);

    if (!result.valid) {
      showFieldError(field, result.message);
      isValid = false;
    } else {
      clearFieldError(field);
    }
  });

  if (isValid) {
    const phoneValue = DOM.inputs.phone.value.trim();
    const currentId = DOM.inputs.id.value;
    const duplicate = checkDuplicateContact(phoneValue, currentId);

    if (duplicate) {
      showFieldError(
        "phone",
        `Phone number already exists for contact "${duplicate.name}"`,
      );
      isValid = false;
    }
  }

  return isValid;
}
