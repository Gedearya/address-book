# Unit Testing for Contact API with Jest

## About Jest

Jest is the most popular and easy-to-use JavaScript testing framework. Created by Facebook, Jest provides everything you need for testing in one package.

**Jest Advantages:**

- Zero config - ready to use out of the box
- Built-in mocking for fetch API
- Complete assertion library
- Automatic coverage reports
- Watch mode for development
- Fast and parallel test execution

## Installation

```bash
npm install --save-dev jest
```

Required dependencies:

- `jest` - Testing framework

## File Structure

```text
.
├── index.js              # Main file with CRUD functions
├── index.test.js         # Test file with 17 test cases
├── test-data.js          # Mock data from real API
├── package.json          # npm and Jest configuration
└── README-TESTING.md     # This documentation
```

## Running Tests

### Run all tests

```bash
npm test
```

### Watch mode (auto-rerun on file changes)

```bash
npm run test:watch
```

### With coverage report

```bash
npm run test:coverage
```

## Test Coverage

The `index.test.js` file includes 17 test cases:

### 1. GET Operations (4 tests)

- ✅ getAllContacts - success case with 7 contacts
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

- ✅ Network error for getAllContacts
- ✅ Network error for getContactById
- ✅ Network error for createContact
- ✅ Network error for updateContact
- ✅ Network error for deleteContact

### 7. testCRUD Function (1 test)

- ✅ testCRUD function execution

## Mock Data

The `test-data.js` file contains real data from the API:

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
  // ... 6 more contacts
];
```

This data is used for:

- Mocking API responses
- More specific assertions
- Test data consistency

## Example Output

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
All files |   98.55 |    88.88 |     100 |   98.55 |
 index.js |   98.55 |    88.88 |     100 |   98.55 | 160
----------|---------|----------|---------|---------|-------------------

Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        1.234s
```

## Jest Configuration

The `package.json` file contains Jest configuration:

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

## Development Tips

### 1. Run tests before committing

Ensure all tests pass before committing code

### 2. Use watch mode during development

```bash
npm run test:watch
```

Tests will auto-rerun whenever files change

### 3. Check coverage reports

```bash
npm run test:coverage
```

Minimum target: 80% coverage

### 4. Update tests when API changes

If the API changes, update `test-data.js` and assertions in `index.test.js`

### 5. Isolate test cases

Each test should be independent and not depend on other tests

## Troubleshooting

### Tests fail with "fetch is not defined" error

Make sure `global.fetch = jest.fn()` is present in the test file

### Coverage shows 0%

Ensure functions are exported from `index.js` and imported in `index.test.js`

### Test timeout

Add timeout to the test:

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

## Conclusion

Testing with Jest provides confidence that your code works correctly. With 17 test cases and 90%+ coverage, the CRUD API is production-ready and ready for deployment.
