/**
 * Unit Tests for Gede Contacts Application
 * Testing: storage.js, state.js validation functions
 */

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

// Mock data from localStorage
const mockContacts = [
  {
    id: 1,
    name: "Gede Arya",
    phone: "085891840619",
    email: "arya@gmail.com",
    address: "Jakarta, Indonesia",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQG5HEBrjc-vkg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692656478721?e=2147483647&v=beta&t=hS6xhnpFQrVFrA2-z5y5w6My5dA4Buq6tcOA6mDQJlk",
    label: "",
    favorite: false,
  },
  {
    id: 2,
    name: "Haidar Hanif",
    phone: "085777222444",
    email: "haidar@gmail.com",
    address: "BSD, Indonesia",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwx-5gcEBhvzEi-VKd8-gq-bOOm6g0AJlqdw&s",
    label: "Mentor",
    favorite: false,
  },
  {
    id: 3,
    name: "Ben Nata",
    phone: "085888646783",
    email: "ben@gmail.com",
    address: "Kediri, Indonesia",
    avatar:
      "https://media.licdn.com/dms/image/v2/C5603AQGUo5zmysXIYA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1631607209856?e=2147483647&v=beta&t=pkGy04kHCCOlHiySmbKCCAMZFvc57zG_Nhh5Pz08qn4",
    label: "Mentor",
    favorite: false,
  },
  {
    id: 4,
    name: "Prabowo Subianto",
    phone: "085888776414",
    email: "wowo@gmail.com",
    address: "Kalimantan, Indonesia",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYJdvMCLnoRNJS71p04s2ahHfBmzcOTIwtQg&s",
    label: "President",
    favorite: false,
  },
  {
    id: 5,
    name: "Joko Widodo",
    phone: "085878986445",
    email: "jokowow@gmail.com",
    address: "Solo, Indonesia",
    avatar:
      "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/727f/live/dcee9e00-e51a-11ee-8cb3-4bf196fb1b9a.jpg.webp",
    label: "President",
    favorite: false,
  },
];

const mockLabels = ["Bootcamp", "Mentor", "President"];

// Load the source files
const fs = require("fs");
const path = require("path");

// Read and evaluate storage.js
const storageCode = fs.readFileSync(
  path.join(__dirname, "assets/scripts/storage.js"),
  "utf8",
);
eval(storageCode);

// Read and evaluate state.js (contains validation)
const stateCode = fs.readFileSync(
  path.join(__dirname, "assets/scripts/state.js"),
  "utf8",
);

// Mock DOM object and UI functions before evaluating state.js
global.DOM = {
  inputs: {
    name: { value: "" },
    phone: { value: "" },
    email: { value: "" },
    address: { value: "" },
    id: { value: "" },
  },
};
global.showFieldError = jest.fn();
global.clearFieldError = jest.fn();

eval(stateCode);

describe("Storage Module Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("loadContacts should return empty array when no data", () => {
    const contacts = loadContacts();
    expect(contacts).toEqual([]);
  });

  test("saveContacts should store contacts in localStorage", () => {
    saveContacts(mockContacts);
    const stored = JSON.parse(localStorage.getItem("contacts"));
    expect(stored).toHaveLength(5);
    expect(stored[0].name).toBe("Gede Arya");
  });

  test("loadContacts should return saved contacts", () => {
    saveContacts(mockContacts);
    const contacts = loadContacts();
    expect(contacts).toHaveLength(5);
    expect(contacts[1].name).toBe("Haidar Hanif");
  });

  test("clearAllContacts should remove all contacts", () => {
    saveContacts(mockContacts);
    const result = clearAllContacts();
    expect(result.success).toBe(true);
    expect(loadContacts()).toEqual([]);
  });

  test("loadLabels should return empty array when no data", () => {
    const labels = loadLabels();
    expect(labels).toEqual([]);
  });

  test("saveLabels should store labels in localStorage", () => {
    saveLabels(mockLabels);
    const stored = JSON.parse(localStorage.getItem("labels"));
    expect(stored).toEqual(mockLabels);
  });

  test("loadLabels should return saved labels", () => {
    saveLabels(mockLabels);
    const labels = loadLabels();
    expect(labels).toHaveLength(3);
    expect(labels).toContain("Mentor");
  });
});

describe("State Module - Validation Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("validateField function", () => {
    test("should validate required name field", () => {
      const result = validateField("name", "");
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Name is required");
    });

    test("should validate name minimum length", () => {
      const result = validateField("name", "A");
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Name must be at least 2 characters");
    });

    test("should validate name pattern (letters only)", () => {
      const result = validateField("name", "John123");
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Name can only contain letters and spaces");
    });

    test("should accept valid name", () => {
      const result = validateField("name", "Gede Arya");
      expect(result.valid).toBe(true);
    });

    test("should validate required phone field", () => {
      const result = validateField("phone", "");
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Phone number is required");
    });

    test("should validate phone pattern", () => {
      const result = validateField("phone", "123");
      expect(result.valid).toBe(false);
      expect(result.message).toContain("Invalid phone format");
    });

    test("should accept valid Indonesian phone (08xxx)", () => {
      const result = validateField("phone", "085891840619");
      expect(result.valid).toBe(true);
    });

    test("should accept valid Indonesian phone (+62xxx)", () => {
      const result = validateField("phone", "+6285891840619");
      expect(result.valid).toBe(true);
    });

    test("should validate email pattern", () => {
      const result = validateField("email", "invalid-email");
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Invalid email format");
    });

    test("should accept valid email", () => {
      const result = validateField("email", "arya@gmail.com");
      expect(result.valid).toBe(true);
    });

    test("should accept empty email (optional field)", () => {
      const result = validateField("email", "");
      expect(result.valid).toBe(true);
    });

    test("should validate address max length", () => {
      const longAddress = "A".repeat(201);
      const result = validateField("address", longAddress);
      expect(result.valid).toBe(false);
      expect(result.message).toBe("Address must not exceed 200 characters");
    });
  });

  describe("normalizePhoneNumber function", () => {
    test("should normalize phone starting with 0", () => {
      const normalized = normalizePhoneNumber("085891840619");
      expect(normalized).toBe("6285891840619");
    });

    test("should normalize phone starting with +62", () => {
      const normalized = normalizePhoneNumber("+6285891840619");
      expect(normalized).toBe("6285891840619");
    });

    test("should normalize phone starting with 62", () => {
      const normalized = normalizePhoneNumber("6285891840619");
      expect(normalized).toBe("6285891840619");
    });

    test("should remove spaces and dashes", () => {
      const normalized = normalizePhoneNumber("+62 858-9184-0619");
      expect(normalized).toBe("6285891840619");
    });

    test("should treat different formats as same number", () => {
      const phone1 = normalizePhoneNumber("085891840619");
      const phone2 = normalizePhoneNumber("+6285891840619");
      const phone3 = normalizePhoneNumber("6285891840619");
      expect(phone1).toBe(phone2);
      expect(phone2).toBe(phone3);
    });
  });

  describe("checkDuplicateContact function", () => {
    beforeEach(() => {
      saveContacts(mockContacts);
    });

    test("should detect duplicate phone number", () => {
      const duplicate = checkDuplicateContact("085891840619");
      expect(duplicate).toBeDefined();
      expect(duplicate.name).toBe("Gede Arya");
    });

    test("should detect duplicate with different format", () => {
      const duplicate = checkDuplicateContact("+6285891840619");
      expect(duplicate).toBeDefined();
      expect(duplicate.name).toBe("Gede Arya");
    });

    test("should not detect duplicate for new phone", () => {
      const duplicate = checkDuplicateContact("081234567890");
      expect(duplicate).toBeUndefined();
    });

    test("should allow editing same contact (skip current ID)", () => {
      const duplicate = checkDuplicateContact("085891840619", 1);
      expect(duplicate).toBeUndefined();
    });

    test("should skip deleted contacts in duplicate check", () => {
      const contacts = loadContacts();
      contacts[0].deletedAt = Date.now();
      saveContacts(contacts);

      const duplicate = checkDuplicateContact("085891840619");
      expect(duplicate).toBeUndefined();
    });
  });

  describe("generateId function", () => {
    test("should return 1 for empty contacts", () => {
      const id = generateId();
      expect(id).toBe(1);
    });

    test("should return next ID based on max ID", () => {
      saveContacts(mockContacts);
      const id = generateId();
      expect(id).toBe(6);
    });
  });
});

describe("Contact Operations Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    saveContacts(mockContacts);
  });

  test("should add deletedAt timestamp when deleting contact", () => {
    const contacts = loadContacts();
    const beforeDelete = contacts.length;

    // Simulate delete by adding deletedAt
    const updated = contacts.map((c) =>
      c.id === 1 ? { ...c, deletedAt: Date.now() } : c,
    );
    saveContacts(updated);

    const afterDelete = loadContacts();
    expect(afterDelete).toHaveLength(beforeDelete);
    expect(afterDelete[0].deletedAt).toBeDefined();
  });

  test("should restore contact by removing deletedAt", () => {
    const contacts = loadContacts();
    contacts[0].deletedAt = Date.now();
    saveContacts(contacts);

    // Restore
    const updated = contacts.map((c) =>
      c.id === 1 ? { ...c, deletedAt: null } : c,
    );
    saveContacts(updated);

    const restored = loadContacts();
    expect(restored[0].deletedAt).toBeNull();
  });

  test("should toggle favorite status", () => {
    const contacts = loadContacts();
    const originalStatus = contacts[0].favorite;

    const updated = contacts.map((c) =>
      c.id === 1 ? { ...c, favorite: !c.favorite } : c,
    );
    saveContacts(updated);

    const toggled = loadContacts();
    expect(toggled[0].favorite).toBe(!originalStatus);
  });

  test("should permanently delete contact", () => {
    const contacts = loadContacts();
    const beforeDelete = contacts.length;

    const filtered = contacts.filter((c) => c.id !== 1);
    saveContacts(filtered);

    const afterDelete = loadContacts();
    expect(afterDelete).toHaveLength(beforeDelete - 1);
    expect(afterDelete.find((c) => c.id === 1)).toBeUndefined();
  });

  test("should filter contacts by label", () => {
    const contacts = loadContacts();
    const mentorContacts = contacts.filter((c) => c.label === "Mentor");
    expect(mentorContacts).toHaveLength(2);
    expect(mentorContacts.every((c) => c.label === "Mentor")).toBe(true);
  });

  test("should filter contacts by favorite", () => {
    const contacts = loadContacts();
    contacts[0].favorite = true;
    contacts[1].favorite = true;
    saveContacts(contacts);

    const favorites = loadContacts().filter((c) => c.favorite);
    expect(favorites).toHaveLength(2);
  });

  test("should search contacts by name", () => {
    const contacts = loadContacts();
    const keyword = "arya";
    const results = contacts.filter((c) =>
      c.name.toLowerCase().includes(keyword),
    );
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Gede Arya");
  });

  test("should search contacts by email", () => {
    const contacts = loadContacts();
    const keyword = "wowo";
    const results = contacts.filter((c) =>
      c.email.toLowerCase().includes(keyword),
    );
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Prabowo Subianto");
  });

  test("should sort contacts A-Z", () => {
    const contacts = loadContacts();
    const sorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
    expect(sorted[0].name).toBe("Ben Nata");
    expect(sorted[sorted.length - 1].name).toBe("Prabowo Subianto");
  });

  test("should sort contacts Z-A", () => {
    const contacts = loadContacts();
    const sorted = contacts.sort((a, b) => b.name.localeCompare(a.name));
    expect(sorted[0].name).toBe("Prabowo Subianto");
    expect(sorted[sorted.length - 1].name).toBe("Ben Nata");
  });
});

describe("Integration Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Complete workflow: Add and validate contact", () => {
    // Start with empty storage
    expect(loadContacts()).toEqual([]);

    // Validate new contact data
    const nameValidation = validateField("name", "Test User");
    const phoneValidation = validateField("phone", "085123456789");
    const emailValidation = validateField("email", "test@example.com");

    expect(nameValidation.valid).toBe(true);
    expect(phoneValidation.valid).toBe(true);
    expect(emailValidation.valid).toBe(true);

    // Add valid contact
    const newContact = {
      id: 1,
      name: "Test User",
      phone: "085123456789",
      email: "test@example.com",
      address: "Test Address",
      avatar: "",
      label: "",
      favorite: false,
    };

    saveContacts([newContact]);
    const contacts = loadContacts();

    expect(contacts).toHaveLength(1);
    expect(contacts[0].name).toBe("Test User");
  });

  test("Complete workflow: Duplicate detection", () => {
    saveContacts(mockContacts);

    // Try to add duplicate phone
    const duplicate1 = checkDuplicateContact("085891840619");
    expect(duplicate1).toBeDefined();
    expect(duplicate1.name).toBe("Gede Arya");

    // Try with different format
    const duplicate2 = checkDuplicateContact("+6285891840619");
    expect(duplicate2).toBeDefined();

    // New phone should be allowed
    const notDuplicate = checkDuplicateContact("081234567890");
    expect(notDuplicate).toBeUndefined();
  });

  test("Complete workflow: Trash management", () => {
    saveContacts(mockContacts);

    // Delete contact (soft delete)
    const contacts = loadContacts();
    contacts[0].deletedAt = Date.now();
    saveContacts(contacts);

    // Check deleted contact
    const afterDelete = loadContacts();
    expect(afterDelete[0].deletedAt).toBeDefined();

    // Restore contact
    const restored = afterDelete.map((c) =>
      c.id === 1 ? { ...c, deletedAt: null } : c,
    );
    saveContacts(restored);

    const afterRestore = loadContacts();
    expect(afterRestore[0].deletedAt).toBeNull();
  });

  test("Complete workflow: Labels management", () => {
    // Start with empty labels
    expect(loadLabels()).toEqual([]);

    // Add labels
    saveLabels(mockLabels);
    const labels = loadLabels();
    expect(labels).toHaveLength(3);

    // Add contacts with labels
    saveContacts(mockContacts);
    const contacts = loadContacts();
    const mentorContacts = contacts.filter((c) => c.label === "Mentor");
    expect(mentorContacts).toHaveLength(2);
  });
});
