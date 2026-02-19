// ================= UTILITIES =================
function generateId() {
  const contacts = loadContacts();
  if (contacts.length === 0) return 1;

  const maxId = Math.max(...contacts.map((c) => c.id));
  return maxId + 1;
}

function log(title, data) {
  console.log(`\n=== ${title} ===`);
  console.table(data);
}

function normalizeContact(contact) {
  return {
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    email: contact.email.trim().toLowerCase(),
    address: contact.address.trim(),
  };
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

function displayAllContacts() {
  console.log("\n=== All Contacts (Formatted) ===");
  loadContacts().forEach((contact, index) => {
    console.log(`${index + 1}. ${formatContact(contact)}`);
  });
}
