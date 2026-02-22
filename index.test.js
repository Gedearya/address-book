// ================= UNIT TESTS WITH JEST =================

// Mock console methods to avoid cluttering test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
};

// Mock fetch globally
global.fetch = jest.fn();

// Import functions from index.js
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  testCRUD,
} = require("./index.js");

// Import mock data from real API
const { mockContacts } = require("./test-data.js");

const API_URL = "https://6995d3a3b081bc23e9c492b5.mockapi.io/api/contacts";

// ================= TEST SUITES =================

describe("Contact API - GET Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllContacts should return array of 7 contacts from real API", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockContacts),
      }),
    );

    const result = await getAllContacts();

    expect(fetch).toHaveBeenCalledWith(API_URL);
    expect(result).toEqual(mockContacts);
    expect(result).toHaveLength(7);
    expect(result[0].name).toBe("Lazuardy Anugrah");
    expect(result[1].name).toBe("I Gede Arya");
    expect(result[6].name).toBe("Ben Nata");
  });

  test("getAllContacts should return empty array on error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }),
    );

    const result = await getAllContacts();

    expect(result).toEqual([]);
  });

  test("getContactById should return Lazuardy Anugrah", async () => {
    const mockContact = mockContacts[0];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockContact),
      }),
    );

    const result = await getContactById("1");

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`);
    expect(result).toEqual(mockContact);
    expect(result.id).toBe("1");
    expect(result.name).toBe("Lazuardy Anugrah");
    expect(result.email).toBe("lazu@gmail.com");
    expect(result.address).toBe("Tangerang, Indonesia");
  });

  test("getContactById should return null on 404", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    const result = await getContactById("999");

    expect(result).toBeNull();
  });
});

describe("Contact API - POST Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createContact should create and return new contact with ID 8", async () => {
    const newContactData = {
      name: "Test User",
      phone: "6281234567890",
      email: "testuser@gmail.com",
      address: "Jakarta, Indonesia",
    };

    const mockResponse = {
      id: "8",
      createdAt: "2026-02-21T10:00:00.000Z",
      ...newContactData,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const result = await createContact(newContactData);

    expect(fetch).toHaveBeenCalledWith(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContactData),
    });
    expect(result).toEqual(mockResponse);
    expect(result.id).toBe("8");
    expect(result.name).toBe("Test User");
  });

  test("createContact should return null on error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      }),
    );

    const result = await createContact({});

    expect(result).toBeNull();
  });
});

describe("Contact API - PUT Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("updateContact should update Lazuardy Anugrah data", async () => {
    const updatedData = {
      name: "Lazuardy Anugrah Updated",
      phone: "6285891840999",
      email: "lazu.updated@gmail.com",
      address: "Jakarta, Indonesia",
    };

    const mockResponse = {
      id: "1",
      createdAt: "2026-02-18T13:28:20.023Z",
      ...updatedData,
      updatedAt: "2026-02-21T10:00:00.000Z",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const result = await updateContact("1", updatedData);

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    expect(result).toEqual(mockResponse);
    expect(result.name).toBe("Lazuardy Anugrah Updated");
    expect(result.email).toBe("lazu.updated@gmail.com");
  });

  test("updateContact should return null on error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    const result = await updateContact("999", {});

    expect(result).toBeNull();
  });
});

describe("Contact API - DELETE Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deleteContact should delete Ben Nata", async () => {
    const mockResponse = mockContacts[6];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    );

    const result = await deleteContact("7");

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/7`, {
      method: "DELETE",
    });
    expect(result).toEqual(mockResponse);
    expect(result.name).toBe("Ben Nata");
    expect(result.email).toBe("ben@gmail.com");
  });

  test("deleteContact should return null on error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    const result = await deleteContact("999");

    expect(result).toBeNull();
  });
});

describe("Contact API - Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Full CRUD flow should work correctly", async () => {
    // 1. Create new contact (ID 8)
    const newContact = {
      name: "Integration Test User",
      phone: "6281111111111",
      email: "integration@test.com",
      address: "Test City, Indonesia",
    };

    const createdContact = {
      id: "8",
      createdAt: "2026-02-21T10:00:00.000Z",
      ...newContact,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(createdContact),
      }),
    );

    const created = await createContact(newContact);
    expect(created.id).toBe("8");
    expect(created.name).toBe("Integration Test User");

    // 2. Read the created contact
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(created),
      }),
    );

    const fetched = await getContactById("8");
    expect(fetched).toEqual(created);

    // 3. Update the contact
    const updatedData = {
      ...newContact,
      name: "Integration Test User Updated",
    };
    const updatedContact = {
      ...createdContact,
      ...updatedData,
      updatedAt: "2026-02-21T11:00:00.000Z",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updatedContact),
      }),
    );

    const updated = await updateContact("8", updatedData);
    expect(updated.name).toBe("Integration Test User Updated");

    // 4. Delete the contact
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(updated),
      }),
    );

    const deleted = await deleteContact("8");
    expect(deleted).toEqual(updated);
  });
});

describe("Contact API - Error Handling Edge Cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllContacts should handle network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const result = await getAllContacts();

    expect(result).toEqual([]);
  });

  test("getContactById should handle network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const result = await getContactById("1");

    expect(result).toBeNull();
  });

  test("createContact should handle network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const result = await createContact({
      name: "Test",
      phone: "123",
      email: "test@test.com",
      address: "Test",
    });

    expect(result).toBeNull();
  });

  test("updateContact should handle network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const result = await updateContact("1", { name: "Updated" });

    expect(result).toBeNull();
  });

  test("deleteContact should handle network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const result = await deleteContact("1");

    expect(result).toBeNull();
  });
});

describe("Contact API - testCRUD function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("testCRUD should execute full flow with real data", async () => {
    const mockNewContact = {
      id: "8",
      createdAt: "2026-02-21T10:00:00.000Z",
      name: "Test User",
      phone: "6281234567890",
      email: "testuser@gmail.com",
      address: "Jakarta, Indonesia",
    };

    global.fetch = jest
      .fn()
      // First call: getAllContacts
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockContacts),
      })
      // Second call: getContactById(1) - Lazuardy
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockContacts[0]),
      })
      // Third call: createContact
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockNewContact),
      })
      // Fourth call: updateContact
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            ...mockNewContact,
            name: "Test User Updated",
            phone: "6289876543210",
            email: "testupdated@gmail.com",
            address: "Bandung, Indonesia",
          }),
      })
      // Fifth call: deleteContact
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockNewContact),
      })
      // Sixth call: getAllContacts (final)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockContacts),
      });

    await testCRUD();

    expect(fetch).toHaveBeenCalledTimes(6);
  });
});
