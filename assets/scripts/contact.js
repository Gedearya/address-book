const STORAGE_KEY = "contacts";
const regexPhoneValidation = /^[0-9,+\-]+$/;
const regexEmailValidation = /^\S+@\S+\.\S+$/;

function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function log(title, data) {
  console.log(`\n=== ${title} ===`);
  console.table(data);
}

function loadContacts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveContacts(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function validateContact(contact) {
  if (!contact.name) {
    return { valid: false, message: "Name is required" };
  }

  if (!contact.phone) {
    return { valid: false, message: "Phone number is required" };
  }

  if (!contact.email) {
    return { valid: false, message: "Email is required" };
  }

  if (!contact.address) {
    return { valid: false, message: "Address is required" };
  }

  if (!regexPhoneValidation.test(contact.phone)) {
    return {
      valid: false,
      message: "Phone must contain only numbers, hyphens, and plus signs",
    };
  }

  if (!regexEmailValidation.test(contact.email)) {
    return {
      valid: false,
      message: "Invalid email format",
    };
  }

  return { valid: true };
}

function isDuplicate(contact, contacts) {
  return contacts.some(
    (c) =>
      c.phone === contact.phone ||
      c.email.toLowerCase() === contact.email.toLowerCase(),
  );
}

function normalizeContact(contact) {
  return {
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    email: contact.email.trim().toLowerCase(),
    address: contact.address.trim(),
  };
}

function addContact(contact) {
  const contacts = loadContacts();
  const normalized = normalizeContact(contact);
  const validation = validateContact(normalized);

  if (!validation.valid) {
    console.warn(validation.message);
    return;
  }

  if (isDuplicate(contact, contacts)) {
    console.warn("Contact already exists!");
    return;
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
}

function clearAllContacts() {
  localStorage.removeItem(STORAGE_KEY);
  console.log("All contacts cleared!");
}

// TODO: make search to include email and phone number as well
function searchContacts(keyword) {
  const key = keyword.toLowerCase();

  const result = loadContacts().filter((c) =>
    [c.name, c.phone, c.email, c.address].some((field) =>
      field.toLowerCase().includes(key),
    ),
  );

  log(`Search Result: "${keyword}"`, result);
}

function editContact(id, updatedData) {
  const contacts = loadContacts();
  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    console.warn("Contact not found!");
    return;
  }

  const updatedContact = normalizeContact({
    ...contacts[index],
    ...updatedData,
  });

  const validation = validateContact(updatedContact);
  if (!validation.valid) {
    console.warn(validation.message);
    return;
  }

  contacts[index] = {
    ...contacts[index],
    ...updatedContact,
    updatedAt: new Date().toISOString(),
  };

  saveContacts(contacts);

  console.log("Contact updated:");
  console.table([updatedContact]);
}

function deleteContact(id) {
  const contacts = loadContacts();
  const filtered = contacts.filter((c) => c.id !== id);

  if (contacts.length === filtered.length) {
    console.warn("Contact not found!");
    return;
  }

  saveContacts(filtered);
  console.log(`Contact with id ${id} deleted!`);
}

function formatContact(contact) {
  return `
👤 ${contact.name}
📞 ${contact.phone}
📧 ${contact.email}
📍 ${contact.address}
-----------------------
`;
}

function countContacts() {
  return loadContacts().length;
}

function emailStats() {
  return loadContacts().reduce((acc, c) => {
    const domain = c.email.split("@")[1];
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});
}

function getSortedContacts() {
  return loadContacts().sort((a, b) => a.name.localeCompare(b.name));
}

clearAllContacts();

// Success
addContact({
  name: "Gede Arya",
  phone: "+62-891-234-889",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

// Failed, empty name
addContact({
  name: "",
  phone: "+62-891-234-889",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

// Failed, empty phone
addContact({
  name: "Gede Arya",
  phone: "",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

// Failed, empty email
addContact({
  name: "Gede Arya",
  phone: "+62-891-234-889",
  email: "",
  address: "Jakarta, Indonesia",
});

// Failed, empty address
addContact({
  name: "Gede Arya",
  phone: "+62-891-234-889",
  email: "gedearya@gmail.com",
  address: "",
});

// Failed, invalid format phone
addContact({
  name: "Gede Arya",
  phone: "testnomor",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

// Failed, invalid format email
addContact({
  name: "Gede Arya",
  phone: "+62-891-234-889",
  email: "gedearya",
  address: "Jakarta, Indonesia",
});

// Failed, duplicate contact
addContact({
  name: "Gede Arya",
  phone: "+62-891-234-889",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

// Success
addContact({
  name: "Haidar",
  phone: "+62-851-234-600",
  email: "haidar@gmail.com",
  address: "BSD, Indonesia",
});

// Success
addContact({
  name: "Ben",
  phone: "+62-851-581-931",
  email: "ben@gmail.com",
  address: "Kediri, Indonesia",
});

log("All Contacts", loadContacts());

searchContacts("gedexxx");
searchContacts("gede");
searchContacts("gmail");
searchContacts("+62-851-581-931");
searchContacts("BSD");

editContact(loadContacts()[0].id, {
  phone: "+62-899-000-111",
  address: "Denpasar, Indonesia",
});

deleteContact(loadContacts()[2].id);

log("Sorted Contacts", getSortedContacts());

log("Final Contacts", loadContacts());

console.log("\n=== Final Contacts (Formatted) ===");
loadContacts().forEach((contact, index) => {
  console.log(`${index + 1}. ${formatContact(contact)}`);
});
