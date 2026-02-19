// ================= CRUD OPERATIONS =================
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

  log(`Search Result: "${keyword}"`, result);
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
