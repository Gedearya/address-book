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
  if (!contact.name || !contact.phone || !contact.email || !contact.address) {
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

function searchContacts(keyword) {
  const result = loadContacts().filter((c) =>
    c.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  log(`Search Result: "${keyword}"`, result);
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

log("All Contacts", loadContacts());

searchContacts("gede");
