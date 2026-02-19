// ================= MAIN & TESTS =================
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
