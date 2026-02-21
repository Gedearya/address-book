const API_URL = "https://6995d3a3b081bc23e9c492b5.mockapi.io/api/contacts";

async function getAllContacts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ GET All Contacts:", data);
    return data;
  } catch (error) {
    console.error("❌ Error loading contacts:", error);
    return [];
  }
}

async function getContactById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`✅ GET Contact ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error getting contact ID ${id}:`, error);
    return null;
  }
}

async function createContact(contactData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ POST Create Contact:", data);
    return data;
  } catch (error) {
    console.error("❌ Error creating contact:", error);
    return null;
  }
}

async function updateContact(id, updatedData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ PUT Update Contact ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error updating contact ID ${id}:`, error);
    return null;
  }
}

async function deleteContact(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ DELETE Contact ID ${id}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error deleting contact ID ${id}:`, error);
    return null;
  }
}

// ================= EXAMPLE USAGE =================
async function testCRUD() {
  console.log("\n🧪 Starting CRUD Tests with Fetch API...\n");

  console.log("1️⃣ GET All Contacts:");
  const allContacts = await getAllContacts();
  console.table(allContacts);

  console.log("\n2️⃣ GET Single Contact (ID: 1):");
  const singleContact = await getContactById(1);
  console.table([singleContact]);

  console.log("\n3️⃣ POST Create New Contact:");
  const newContact = await createContact({
    name: "Test User",
    phone: "6281234567890",
    email: "testuser@gmail.com",
    address: "Jakarta, Indonesia",
  });
  console.table([newContact]);

  if (newContact && newContact.id) {
    console.log(`\n4️⃣ PUT Update Contact (ID: ${newContact.id}):`);
    const updatedContact = await updateContact(newContact.id, {
      name: "Test User Updated",
      phone: "6289876543210",
      email: "testupdated@gmail.com",
      address: "Bandung, Indonesia",
    });
    console.table([updatedContact]);

    console.log(`\n5️⃣ DELETE Contact (ID: ${newContact.id}):`);
    await deleteContact(newContact.id);
  }

  console.log("\n6️⃣ GET All Contacts (Final State):");
  const finalContacts = await getAllContacts();
  console.table(finalContacts);

  console.log("\n✅ CRUD Tests Completed!");
}

testCRUD();
