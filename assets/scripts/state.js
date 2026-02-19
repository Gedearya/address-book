// ================= STATE & BUSINESS LOGIC =================
const VALIDATION_RULES = {
  phone: /^[0-9,+\-]+$/,
  email: /^\S+@\S+\.\S+$/,
};

const VALIDATION_MESSAGES = {
  name: "Name is required",
  phone: "Phone number is required",
  email: "Email is required",
  address: "Address is required",
  phoneFormat: "Phone must contain only numbers, hyphens, and plus signs",
  emailFormat: "Invalid email format",
  duplicate: "Contact already exists!",
  notFound: "Contact not found!",
};

const SEARCHABLE_FIELDS = ["name", "phone", "email", "address"];

function generateId() {
  const contacts = loadContacts();
  if (contacts.length === 0) return 1;
  const maxId = Math.max(...contacts.map((c) => c.id));
  return maxId + 1;
}

function normalizeContact(contact) {
  return {
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    email: contact.email.trim().toLowerCase(),
    address: contact.address.trim(),
  };
}

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

function addContact(contact) {
  const contacts = loadContacts();
  const normalized = normalizeContact(contact);
  const validation = validateContact(normalized);

  if (!validation.valid) {
    console.warn(validation.message);
    return { success: false, message: validation.message };
  }

  if (isDuplicate(normalized, contacts)) {
    console.warn(VALIDATION_MESSAGES.duplicate);
    return { success: false, message: VALIDATION_MESSAGES.duplicate };
  }

  const newContact = {
    id: generateId(),
    ...normalized,
    createdAt: new Date().toISOString(),
  };

  contacts.push(newContact);
  saveContacts(contacts);

  console.log("Contact added:");
  console.table([newContact]);

  return { success: true, data: newContact };
}

function searchContacts(keyword) {
  const key = keyword.toLowerCase();
  const result = loadContacts().filter((c) =>
    SEARCHABLE_FIELDS.some((field) => c[field].toLowerCase().includes(key)),
  );
  return result;
}

function editContactById(id, updatedData) {
  const contacts = loadContacts();
  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    console.warn(VALIDATION_MESSAGES.notFound);
    return { success: false, message: VALIDATION_MESSAGES.notFound };
  }

  const updatedContact = normalizeContact({
    ...contacts[index],
    ...updatedData,
  });

  const validation = validateContact(updatedContact);
  if (!validation.valid) {
    console.warn(validation.message);
    return { success: false, message: validation.message };
  }

  if (isDuplicate(updatedContact, contacts, id)) {
    console.warn(VALIDATION_MESSAGES.duplicate);
    return { success: false, message: VALIDATION_MESSAGES.duplicate };
  }

  contacts[index] = {
    ...contacts[index],
    ...updatedContact,
    updatedAt: new Date().toISOString(),
  };

  saveContacts(contacts);

  console.log("Contact updated:");
  console.table([contacts[index]]);

  return { success: true, data: contacts[index] };
}

function deleteContactById(id) {
  const contacts = loadContacts();
  const filtered = contacts.filter((c) => c.id !== id);

  if (contacts.length === filtered.length) {
    console.warn(VALIDATION_MESSAGES.notFound);
    return { success: false, message: VALIDATION_MESSAGES.notFound };
  }

  saveContacts(filtered);
  console.log(`Contact with id ${id} deleted!`);

  return { success: true };
}

function getContactById(id) {
  return loadContacts().find((c) => c.id === id);
}

function getSortedContacts(sortBy = "name", order = "asc") {
  const contacts = loadContacts();
  return contacts.sort((a, b) => {
    const comparison = a[sortBy].localeCompare(b[sortBy]);
    return order === "asc" ? comparison : -comparison;
  });
}
