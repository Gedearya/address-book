const STORAGE_KEY = "contacts";

let currentId = 0;

function generateId() {
  currentId += 1;
  return currentId;
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
  if (!contact.name || !contact.phone || !contact.email || !contact.address) {
    return { valid: false, message: "All fields are required" };
  }

  if (!/^[0-9,+\-]+$/.test(contact.phone)) {
    return {
      valid: false,
      message: "Phone must contain only numbers, hyphens, and plus signs",
    };
  }

  if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
    return { valid: false, message: "Invalid email format" };
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

function addContact(contact) {
  const contacts = loadContacts();
  const validation = validateContact(contact);

  if (!validation.valid) {
    console.warn(validation.message);
    return;
  }

  if (isDuplicate(contact, contacts)) {
    console.warn("Contact already exists!");
    return;
  }

  const newContact = { id: generateId(), ...contact };
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
  const result = loadContacts().filter((c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase()),
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

  const updatedContact = { ...contacts[index], ...updatedData };

  const validation = validateContact(updatedContact);
  if (!validation.valid) {
    console.warn(validation.message);
    return;
  }

  contacts[index] = updatedContact;
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
  return `👤 ${contact.name} | 📞 ${contact.phone} | 📧 ${contact.email} | 📍 ${contact.address}`;
}

clearAllContacts();

addContact({
  name: "Gede Arya",
  phone: "+62-891-234-889",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

addContact({
  name: "",
  phone: "+62-891-234-889",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

addContact({
  name: "Gede Arya",
  phone: "testnomor",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

addContact({
  name: "Gede Arya",
  phone: "+62-891-234-889",
  email: "gedearya",
  address: "Jakarta, Indonesia",
});

addContact({
  name: "Gede Arya",
  phone: "+62-891-234-889",
  email: "gedearya@gmail.com",
  address: "Jakarta, Indonesia",
});

addContact({
  name: "Mas Haidar",
  phone: "+62-851-234-600",
  email: "haidar@gmail.com",
  address: "BSD, Indonesia",
});

addContact({
  name: "Mas Ben",
  phone: "+62-851-581-931",
  email: "ben@gmail.com",
  address: "Kediri, Indonesia",
});

log("All Contacts", loadContacts());

searchContacts("gede");

editContact(1, {
  phone: "+62-899-000-111",
  address: "Denpasar, Indonesia",
});

deleteContact(5);

log("Final Contacts", loadContacts());

console.log("\n=== Final Contacts (Formatted) ===");
loadContacts().forEach((contact, index) => {
  console.log(`${index + 1}. ${formatContact(contact)}`);
});
