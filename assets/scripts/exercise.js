let currentId = 5;

function generateId() {
  currentId += 1;
  return currentId;
}
const contacts = [
  {
    id: 1,
    name: "Gede Arya",
    phone: "+62-891-234-889",
    email: "gedearya@gmail.com",
    address: "Jakarta, Indonesia",
  },
  {
    id: 2,
    name: "Ardanu Wicaksono",
    phone: "+62-234-567-890",
    email: "ardanu@gmail.com",
    address: "Riau, Indonesia",
  },
  {
    id: 3,
    name: "Muhammad Alroy",
    phone: "+62-456-789-012",
    email: "alroy@gmail.com",
    address: "Surabaya, Indonesia",
  },
  {
    id: 4,
    name: "Dimas Aditya",
    phone: "+62-567-890-123",
    email: "dimas@gmail.com",
    address: "Bandung, Indonesia",
  },
  {
    id: 5,
    name: "Lazuardy Anugrah",
    phone: "+62-678-901-234",
    email: "lazuardy@mail.com",
    address: "Tangerang, Indonesia",
  },
];

console.log(contacts);

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function createContact() {
  return {
    id: generateId(),
    name: getValue("name"),
    phone: getValue("phone"),
    email: getValue("email"),
    address: getValue("address"),
  };
}

function formatContact(contact) {
  return `👤 ${contact.name} | 📞 ${contact.phone} | 📧 ${contact.email} | 📍 ${contact.address}`;
}

function addContact() {
  const contact = createContact();
  contacts.push(contact);

  console.clear();
  console.log("CONTACT LIST:");
  contacts.forEach((c, i) => {
    console.log(`${i + 1}. ${formatContact(c)}`);
  });

  renderContacts();
  clearForm();
}

function renderContacts() {
  const list = document.getElementById("contactList");
  list.innerHTML = "";

  contacts.forEach((c) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="contact-info">
        <span>👤 <strong>${c.name}</strong></span>
        <span>📞 ${c.phone}</span>
        <span>📧 ${c.email}</span>
        <span>📍 ${c.address}</span>
      </div>
    `;
    list.appendChild(li);
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
}

renderContacts();
