// ================= UI UTILITIES =================
function log(title, data) {
  console.log(`\n=== ${title} ===`);
  console.table(data);
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
