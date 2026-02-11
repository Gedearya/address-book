const contacts = [
  {
    id: 1,
    name: "Gede Arya",
    phone: "+6285-891-234-889",
    email: "gedearya@gmail.com",
    address: "Jakarta, Indonesia",
  },
  {
    id: 2,
    name: "Ardanu Wicaksono",
    phone: "+6281-234-567-890",
    email: "ardanu@gmail.com",
    address: "Riau, Indonesia",
  },
  {
    id: 3,
    name: "Muhammad Alroy",
    phone: "+6283-456-789-012",
    email: "alroy@gmail.com",
    address: "Surabaya, Indonesia",
  },
  {
    id: 4,
    name: "Dimas Aditya",
    phone: "+6284-567-890-123",
    email: "dimas@gmail.com",
    address: "Bandung, Indonesia",
  },
  {
    id: 5,
    name: "Lazuardy Anugrah",
    phone: "+6285-678-901-234",
    email: "lazuardy@mail.com",
    address: "Tangerang, Indonesia",
  },
];

console.log("contacts:", contacts);

const STORAGE_KEY = "contacts";

function generateId() {
  return Date.now();
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
