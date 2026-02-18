// ================= CONSTANTS =================
const STORAGE_KEY = "contacts";

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

// ================= STORAGE =================
function loadContacts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading contacts:", error);
    return [];
  }
}

function saveContacts(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving contacts:", error);
  }
}

// ================= VALIDATION =================
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

function normalizeContact(contact) {
  return {
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    email: contact.email.trim().toLowerCase(),
    address: contact.address.trim(),
  };
}

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

function clearAllContacts() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("All contacts cleared!");
    return { success: true };
  } catch (error) {
    console.error("Error clearing contacts:", error);
    return { success: false, message: error.message };
  }
}

// ================= UTILITY FUNCTIONS =================
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

// ================= FORMATTING =================
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

// ================= TEST DATA =================
function runTests() {
  console.log("\n🧪 Starting Contact Management Tests...\n");

  clearAllContacts();

  // Test cases
  const testCases = [
    {
      description: "✅ Valid contact",
      data: {
        name: "Gede Arya",
        phone: "+62-891-234-889",
        email: "gedearya@gmail.com",
        address: "Jakarta, Indonesia",
      },
      shouldPass: true,
    },
    {
      description: "❌ Empty name",
      data: {
        name: "",
        phone: "+62-891-234-889",
        email: "gedearya@gmail.com",
        address: "Jakarta, Indonesia",
      },
      shouldPass: false,
    },
    {
      description: "❌ Empty phone",
      data: {
        name: "Gede Arya",
        phone: "",
        email: "gedearya@gmail.com",
        address: "Jakarta, Indonesia",
      },
      shouldPass: false,
    },
    {
      description: "❌ Empty email",
      data: {
        name: "Gede Arya",
        phone: "+62-891-234-889",
        email: "",
        address: "Jakarta, Indonesia",
      },
      shouldPass: false,
    },
    {
      description: "❌ Empty address",
      data: {
        name: "Gede Arya",
        phone: "+62-891-234-889",
        email: "gedearya@gmail.com",
        address: "",
      },
      shouldPass: false,
    },
    {
      description: "❌ Invalid phone format",
      data: {
        name: "Gede Arya",
        phone: "testnomor",
        email: "gedearya@gmail.com",
        address: "Jakarta, Indonesia",
      },
      shouldPass: false,
    },
    {
      description: "❌ Invalid email format",
      data: {
        name: "Gede Arya",
        phone: "+62-891-234-889",
        email: "gedearya",
        address: "Jakarta, Indonesia",
      },
      shouldPass: false,
    },
    {
      description: "❌ Duplicate contact",
      data: {
        name: "Gede Arya",
        phone: "+62-891-234-889",
        email: "gedearya@gmail.com",
        address: "Jakarta, Indonesia",
      },
      shouldPass: false,
    },
    {
      description: "✅ Valid contact - Haidar",
      data: {
        name: "Haidar",
        phone: "+62-851-234-600",
        email: "haidar@gmail.com",
        address: "BSD, Indonesia",
      },
      shouldPass: true,
    },
    {
      description: "✅ Valid contact - Ben",
      data: {
        name: "Ben",
        phone: "+62-851-581-931",
        email: "ben@gmail.com",
        address: "Kediri, Indonesia",
      },
      shouldPass: true,
    },
  ];

  // Run test cases
  testCases.forEach((test) => {
    console.log(`\nTest: ${test.description}`);
    addContact(test.data);
  });

  log("All Contacts", loadContacts());

  // Search tests
  console.log("\n🔍 Search Tests:");
  searchContacts("gedexxx");
  searchContacts("gede");
  searchContacts("gmail");
  searchContacts("+62-851-581-931");
  searchContacts("BSD");

  // Edit test
  console.log("\n✏️ Edit Test:");
  const firstContact = loadContacts()[0];
  if (firstContact) {
    editContactById(firstContact.id, {
      phone: "+62-899-000-111",
      address: "Denpasar, Indonesia",
    });
  }

  // Delete test
  console.log("\n🗑️ Delete Test:");
  const thirdContact = loadContacts()[2];
  if (thirdContact) {
    deleteContactById(thirdContact.id);
  }

  // Display results
  log("Sorted Contacts", getSortedContacts());
  log("Final Contacts", loadContacts());
  displayAllContacts();

  console.log("\n✅ Tests completed!");
}

// Run tests
runTests();
