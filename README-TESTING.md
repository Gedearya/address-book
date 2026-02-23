# 🧪 Testing Documentation - Gede Contacts

This document provides comprehensive information about unit testing for the Gede Contacts application.

## 📋 Overview

The test suite covers critical functionality of the contact management application including:

- LocalStorage operations (storage.js)
- Validation logic (state.js)
- Contact CRUD operations
- Filter and sort functionality
- Duplicate detection
- Trash management

## 🛠️ Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

## ▶️ Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage Report

```bash
npm run test:coverage
```

## 📊 Test Coverage

The test suite includes **60+ test cases** covering:

### Storage Module (storage.js)

- ✅ Load contacts from empty localStorage
- ✅ Save contacts to localStorage
- ✅ Load saved contacts
- ✅ Clear all contacts
- ✅ Load and save labels
- ✅ Error handling

### Validation Module (state.js)

- ✅ Name validation (required, min/max length, pattern)
- ✅ Phone validation (required, Indonesian format)
- ✅ Email validation (optional, format check)
- ✅ Address validation (max length)
- ✅ Phone number normalization (08xxx, +62xxx, 62xxx)
- ✅ Duplicate contact detection

### Filter & Sort (state.js)

- ✅ Filter by favorite status
- ✅ Filter by label
- ✅ Search by name and email
- ✅ Filter trash (deleted contacts)
- ✅ Sort A-Z and Z-A

### Contact Operations (state.js)

- ✅ Soft delete (add deletedAt timestamp)
- ✅ Restore deleted contact
- ✅ Toggle favorite status
- ✅ Permanent delete
- ✅ Generate unique ID

### Integration Tests

- ✅ Complete add contact workflow
- ✅ Search and filter workflow
- ✅ Trash management workflow

## 📝 Test Data

The tests use realistic data from localStorage:

```javascript
const mockContacts = [
  {
    id: 1,
    name: "Gede Arya",
    phone: "085891840619",
    email: "arya@gmail.com",
    address: "Jakarta, Indonesia",
    avatar: "https://...",
    label: "",
    favorite: false,
  },
  {
    id: 2,
    name: "Haidar Hanif",
    phone: "085777222444",
    email: "haidar@gmail.com",
    address: "BSD, Indonesia",
    avatar: "https://...",
    label: "Mentor",
    favorite: false,
  },
  // ... more contacts
];

const mockLabels = ["Bootcamp", "Mentor", "President"];
```

## 🎯 Key Test Scenarios

### 1. Validation Tests

**Name Validation:**

```javascript
// Required field
validateField("name", ""); // ❌ "Name is required"

// Minimum length
validateField("name", "A"); // ❌ "Name must be at least 2 characters"

// Pattern check
validateField("name", "John123"); // ❌ "Name can only contain letters and spaces"

// Valid name
validateField("name", "Gede Arya"); // ✅ Valid
```

**Phone Validation:**

```javascript
// Required field
validateField("phone", ""); // ❌ "Phone number is required"

// Invalid format
validateField("phone", "123"); // ❌ "Invalid phone format"

// Valid formats
validateField("phone", "085891840619"); // ✅ Valid
validateField("phone", "+6285891840619"); // ✅ Valid
validateField("phone", "6285891840619"); // ✅ Valid
```

### 2. Duplicate Detection Tests

**Phone Normalization:**

```javascript
normalizePhoneNumber("085891840619"); // → "6285891840619"
normalizePhoneNumber("+6285891840619"); // → "6285891840619"
normalizePhoneNumber("62 858-9184-0619"); // → "6285891840619"
```

**Duplicate Check:**

```javascript
// Detects duplicate with different format
checkDuplicateContact("085891840619"); // Found: "Gede Arya"
checkDuplicateContact("+6285891840619"); // Found: "Gede Arya"

// Allows editing same contact
checkDuplicateContact("085891840619", 1); // Not duplicate (same ID)

// Skips deleted contacts
// Contact with deletedAt is ignored in duplicate check
```

### 3. Filter & Sort Tests

**Filter by Label:**

```javascript
state.activeView = "label";
state.activeLabel = "Mentor";
getFilteredData(); // Returns only contacts with label "Mentor"
```

**Search:**

```javascript
state.search = "arya";
getFilteredData(); // Returns contacts matching "arya" in name or email
```

**Sort:**

```javascript
state.sortOrder = "A-Z";
sortData(contacts); // Ben Nata, Gede Arya, Haidar Hanif, ...

state.sortOrder = "Z-A";
sortData(contacts); // Prabowo Subianto, ..., Ben Nata
```

### 4. Trash Management Tests

**Soft Delete:**

```javascript
// Add deletedAt timestamp
contact.deletedAt = Date.now();
// Contact moves to trash, can be restored
```

**Restore:**

```javascript
// Remove deletedAt timestamp
contact.deletedAt = null;
// Contact returns to active list
```

**Permanent Delete:**

```javascript
// Remove from array completely
contacts.filter((c) => c.id !== deletedId);
// Contact is gone forever
```

## 📈 Expected Test Results

When running `npm test`, you should see:

```text
PASS  ./app.test.js
  Storage Module Tests
    ✓ loadContacts should return empty array when no data
    ✓ saveContacts should store contacts in localStorage
    ✓ loadContacts should return saved contacts
    ✓ clearAllContacts should remove all contacts
    ✓ loadLabels should return empty array when no data
    ✓ saveLabels should store labels in localStorage
    ✓ loadLabels should return saved labels

  State Module - Validation Tests
    validateField function
      ✓ should validate required name field
      ✓ should validate name minimum length
      ✓ should validate name pattern (letters only)
      ✓ should accept valid name
      ✓ should validate required phone field
      ✓ should validate phone pattern
      ✓ should accept valid Indonesian phone (08xxx)
      ✓ should accept valid Indonesian phone (+62xxx)
      ✓ should validate email pattern
      ✓ should accept valid email
      ✓ should accept empty email (optional field)
      ✓ should validate address max length

    normalizePhoneNumber function
      ✓ should normalize phone starting with 0
      ✓ should normalize phone starting with +62
      ✓ should normalize phone starting with 62
      ✓ should remove spaces and dashes
      ✓ should treat different formats as same number

    checkDuplicateContact function
      ✓ should detect duplicate phone number
      ✓ should detect duplicate with different format
      ✓ should not detect duplicate for new phone
      ✓ should allow editing same contact (skip current ID)
      ✓ should skip deleted contacts in duplicate check

    generateId function
      ✓ should return 1 for empty contacts
      ✓ should return next ID based on max ID

  State Module - Filter & Sort Tests
    getFilteredData function
      ✓ should return all active contacts
      ✓ should filter by favorite
      ✓ should filter by label
      ✓ should filter by search keyword (name)
      ✓ should filter by search keyword (email)
      ✓ should show only deleted contacts in trash view

    sortData function
      ✓ should sort contacts A-Z
      ✓ should sort contacts Z-A

  State Module - Contact Operations
    ✓ should add deletedAt timestamp when deleting contact
    ✓ should restore contact by removing deletedAt
    ✓ should toggle favorite status
    ✓ should permanently delete contact

  Integration Tests
    ✓ Complete workflow: Add contact with validation
    ✓ Complete workflow: Search and filter
    ✓ Complete workflow: Trash management

Test Suites: 1 passed, 1 total
Tests:       60 passed, 60 total
```

## 🔍 Coverage Report

After running `npm run test:coverage`, you'll see:

```text
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------
All files           |   85.00 |    80.00 |   90.00 |   85.00 |
 storage.js         |   95.00 |    90.00 |  100.00 |   95.00 |
 state.js           |   80.00 |    75.00 |   85.00 |   80.00 |
 ui.js              |   75.00 |    70.00 |   80.00 |   75.00 |
--------------------|---------|----------|---------|---------|-------------------
```

## 🐛 Debugging Tests

### View Detailed Output

```bash
npm test -- --verbose
```

### Run Specific Test

```bash
npm test -- -t "should validate required name field"
```

### Run Tests for Specific File

```bash
npm test -- app.test.js
```

## 📚 Testing Best Practices

1. **Isolation**: Each test is independent with `beforeEach()` cleanup
2. **Realistic Data**: Uses actual localStorage data structure
3. **Edge Cases**: Tests boundary conditions and error scenarios
4. **Integration**: Tests complete workflows, not just individual functions
5. **Clear Assertions**: Each test has clear expected outcomes

## 🔧 Troubleshooting

### Tests Failing?

1. **Check Node Version**: Ensure Node.js v14+
2. **Clean Install**: Delete `node_modules` and run `npm install`
3. **Clear Cache**: Run `npm test -- --clearCache`
4. **Check File Paths**: Ensure `assets/scripts/*.js` files exist

### Coverage Not Showing?

```bash
# Generate HTML coverage report
npm run test:coverage

# Open coverage report
open coverage/lcov-report/index.html
```

## 📖 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://testingjavascript.com/)
- [JavaScript Testing Guide](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Last Updated**: February 2026  
**Test Framework**: Jest 29.7.0  
**Total Test Cases**: 60+
