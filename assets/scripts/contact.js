const contacts = [
  { id: "1", name: "John Doe", phone: "08123", email: "john@mail.com" },
  { id: "2", name: "Jane Smith", phone: "08234", email: "jane@mail.com" },
  { id: "3", name: "Bob Johnson", phone: "08345", email: "bob@mail.com" },
  { id: "4", name: "Alice Williams", phone: "08456", email: "alice@mail.com" },
  { id: "5", name: "Charlie Brown", phone: "08567", email: "charlie@mail.com" },
];

console.log("contacts:", contacts);

const STORAGE_KEY = "contacts";

function generateId() {
  return Date.now().toString();
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
  if (!contact.name || !contact.phone || !contact.email) {
    return { valid: false, message: "All fields are required" };
  }

  if (!/^[0-9]+$/.test(contact.phone)) {
    return { valid: false, message: "Phone must contain only numbers" };
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

clearAllContacts();

addContact({
  name: "Gede Arya",
  phone: "08123456789",
  email: "gedearya@gmail.com",
});

addContact({
  name: "",
  phone: "08123456789",
  email: "gedearya@gmail.com",
});

addContact({
  name: "Gede Arya",
  phone: "testnomor",
  email: "gedearya@gmail.com",
});

addContact({
  name: "Gede Arya",
  phone: "08123456789",
  email: "gedearya",
});

addContact({
  name: "Gede Arya",
  phone: "08123456789",
  email: "gedearya@gmail.com",
});

addContact({
  name: "Mas Haidar",
  phone: "082233445566",
  email: "haidar@gmail.com",
});

log("All Contacts", loadContacts());
