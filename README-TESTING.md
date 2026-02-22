# Unit Testing untuk Contact API dengan Jest

## Tentang Jest

Jest adalah JavaScript testing framework yang paling populer dan mudah digunakan. Dibuat oleh Facebook, Jest menyediakan semua yang dibutuhkan untuk testing dalam satu package.

**Kelebihan Jest:**

- Zero config - langsung bisa digunakan
- Built-in mocking untuk fetch API
- Assertion library lengkap
- Coverage report otomatis
- Watch mode untuk development
- Fast and parallel test execution

## Instalasi

```bash
npm install
```

Dependencies yang dibutuhkan:

- `jest` - Testing framework

## Struktur File

```text
.
├── index.js              # File utama dengan fungsi CRUD
├── index.test.js         # File testing dengan 17 test cases
├── test-data.js          # Mock data dari real API
├── package.json          # Konfigurasi npm dan Jest
└── README-TESTING.md     # Dokumentasi ini
```

## Menjalankan Test

### Run semua test

```bash
npm test
```

### Watch mode (auto-rerun saat ada perubahan)

```bash
npm run test:watch
```

### Dengan coverage report

```bash
npm run test:coverage
```

## Test Coverage

File `index.test.js` mencakup 17 test cases:

### 1. GET Operations (4 tests)

- ✅ getAllContacts - success case dengan 7 contacts
- ✅ getAllContacts - error handling
- ✅ getContactById - success case (Lazuardy Anugrah)
- ✅ getContactById - 404 not found

### 2. POST Operations (2 tests)

- ✅ createContact - success case (ID 8)
- ✅ createContact - error handling

### 3. PUT Operations (2 tests)

- ✅ updateContact - success case (update Lazuardy)
- ✅ updateContact - error handling

### 4. DELETE Operations (2 tests)

- ✅ deleteContact - success case (delete Ben Nata)
- ✅ deleteContact - error handling

### 5. Integration Tests (1 test)

- ✅ Full CRUD flow - create → read → update → delete

### 6. Error Handling Edge Cases (5 tests)

- ✅ Network error untuk getAllContacts
- ✅ Network error untuk getContactById
- ✅ Network error untuk createContact
- ✅ Network error untuk updateContact
- ✅ Network error untuk deleteContact

### 7. testCRUD Function (1 test)

- ✅ testCRUD function execution

## Mock Data

File `test-data.js` berisi data real dari API:

```javascript
const mockContacts = [
  {
    id: "1",
    name: "Lazuardy Anugrah",
    email: "lazu@gmail.com",
    phone: "6285891840888",
    address: "Tangerang, Indonesia",
    createdAt: "2026-02-18T13:28:20.023Z",
  },
  // ... 6 contacts lainnya
];
```

Data ini digunakan untuk:

- Mock response dari API
- Assertions yang lebih spesifik
- Konsistensi test data

## Contoh Output

```text
PASS  ./index.test.js
  Contact API - GET Operations
    ✓ getAllContacts should return array of 7 contacts from real API (3ms)
    ✓ getAllContacts should return empty array on error (1ms)
    ✓ getContactById should return Lazuardy Anugrah (1ms)
    ✓ getContactById should return null on 404 (1ms)
  Contact API - POST Operations
    ✓ createContact should create and return new contact with ID 8 (2ms)
    ✓ createContact should return null on error (1ms)
  Contact API - PUT Operations
    ✓ updateContact should update Lazuardy Anugrah data (1ms)
    ✓ updateContact should return null on error (1ms)
  Contact API - DELETE Operations
    ✓ deleteContact should delete Ben Nata (1ms)
    ✓ deleteContact should return null on error (1ms)
  Contact API - Integration Tests
    ✓ Full CRUD flow should work correctly (2ms)
  Contact API - Error Handling Edge Cases
    ✓ getAllContacts should handle network error (1ms)
    ✓ getContactById should handle network error (1ms)
    ✓ createContact should handle network error (1ms)
    ✓ updateContact should handle network error (1ms)
    ✓ deleteContact should handle network error (1ms)
  Contact API - testCRUD function
    ✓ testCRUD should execute full flow with real data (2ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   90.47 |    88.88 |     100 |   90.47 |
 index.js |   90.47 |    88.88 |     100 |   90.47 | 108-145,159
----------|---------|----------|---------|---------|-------------------

Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        1.234s
```

## Konfigurasi Jest

File `package.json` berisi konfigurasi Jest:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"],
    "collectCoverageFrom": ["index.js"]
  }
}
```

## Best Practices

### 1. Mock External Dependencies

```javascript
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData),
  }),
);
```

### 2. Clear Mocks Before Each Test

```javascript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 3. Test Naming Convention

Format: "should [expected behavior] when [condition]"

```javascript
test("getAllContacts should return array of 7 contacts from real API", async () => {
  // test implementation
});
```

### 4. Test Both Success and Error Cases

```javascript
// Success case
test("createContact should create and return new contact", async () => {
  // mock success response
});

// Error case
test("createContact should return null on error", async () => {
  // mock error response
});
```

### 5. Use Specific Assertions

```javascript
expect(result.name).toBe("Lazuardy Anugrah");
expect(result.email).toBe("lazu@gmail.com");
expect(result).toHaveLength(7);
```

## Tips Development

### 1. Run test sebelum commit

Pastikan semua test pass sebelum commit code

### 2. Gunakan watch mode saat development

```bash
npm run test:watch
```

Test akan auto-rerun setiap kali ada perubahan file

### 3. Check coverage report

```bash
npm run test:coverage
```

Target minimal: 80% coverage

### 4. Update test saat ada perubahan API

Jika API berubah, update `test-data.js` dan assertions di `index.test.js`

### 5. Isolate test cases

Setiap test harus independent dan tidak bergantung pada test lain

## Troubleshooting

### Test gagal dengan error "fetch is not defined"

Pastikan `global.fetch = jest.fn()` ada di file test

### Coverage 0%

Pastikan fungsi di-export dari `index.js` dan di-import di `index.test.js`

### Test timeout

Tambahkan timeout di test:

```javascript
test("slow test", async () => {
  // test code
}, 10000); // 10 second timeout
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Jest Matchers](https://jestjs.io/docs/expect)
- [Jest Mock Functions](https://jestjs.io/docs/mock-functions)
- [Testing Async Code](https://jestjs.io/docs/asynchronous)

## Kesimpulan

Testing dengan Jest memberikan confidence bahwa code berfungsi dengan benar. Dengan 17 test cases dan coverage 90%+, API CRUD sudah production-ready dan siap untuk deployment.
