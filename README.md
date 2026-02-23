# 📒 Gede Contacts – Modern Contact Management App

A modern, feature-rich contact management application inspired by Google Contacts. Built with vanilla JavaScript and modular architecture, featuring advanced validation, trash management, and real-time search capabilities. All data is stored locally using browser LocalStorage.

## 🧑‍💻 Author

I Gede Arya Danny Pratama

## 🌐 Live Website

- 🔗 <https://contacts.igdarya.com>
- 🔗 <https://contacts-igdarya.vercel.app/>

## ▶️ How To Run

Simply open `index.html` in your browser – no server or installation required!

```bash
# Clone the repository
git clone <repository-url>

# Open in browser
open index.html
```

## ✨ Features

### 📇 Contact Management (CRUD)

- ➕ **Add Contact** – Create new contacts with comprehensive validation
- ✏️ **Edit Contact** – Update existing contact information
- 🗑️ **Soft Delete** – Move contacts to trash (30-day retention)
- 👁️ **View Details** – Slide-in panel with full contact information
- 🖼️ **Smart Avatars** – Custom image URL or auto-generated colorful initials
- 📞 **Phone Formatting** – International format display using libphonenumber-js

### ⭐ Favorites System

- ⭐ Mark/unmark contacts as favorites
- 📋 Dedicated favorites view in sidebar
- 💾 Persistent favorite status across sessions

### 🏷️ Label Management

- 🏷️ Create custom labels to organize contacts
- ✏️ Edit label names (updates all associated contacts)
- 🗑️ Delete labels (clears label from all contacts)
- 🎯 Filter contacts by label
- 📝 Assign labels via contact form dropdown

### �️ Trash Management

- 🗑️ Soft delete with 30-day retention period
- ♻️ Restore deleted contacts
- 🔥 Permanent delete option
- 🧹 Empty trash (bulk delete)
- ⏰ Auto-cleanup of expired trash items
- ⚠️ Trash banner with retention reminder

### 🔍 Search & Sort

- 🔎 **Real-time Search** – Search by name or email
- 🔤 **Smart Sorting** – Toggle between A-Z and Z-A
- ⚡ **Instant Results** – No page reload required

### ✅ Advanced Validation

- 📝 **Real-time Validation** – Errors shown on blur
- 🔴 **Visual Feedback** – Red borders and error messages
- 🚫 **Duplicate Detection** – Prevents duplicate phone numbers (all formats)
- 📱 **Phone Normalization** – Detects 08xxx, 628xxx, +628xxx as same number

### 🎨 UI/UX Features

- 📱 Responsive sidebar with toggle
- 🎨 Color-coded avatars based on name hash
- 🔔 Confirmation modals for destructive actions
- 🎯 Active menu highlighting
- 📊 Contact counter badge
- 🌈 Modern Tailwind CSS styling

## 🏗️ Project Structure

```text
gede-contacts/
├── index.html              # Main HTML file
├── assets/
│   ├── scripts/
│   │   ├── storage.js      # LocalStorage operations
│   │   ├── state.js        # Business logic & validation
│   │   ├── ui.js           # DOM manipulation & rendering
│   │   └── main.js         # Event handlers & initialization
│   └── images/
│       └── address-book-drawio.jpg
├── app.test.js             # Jest unit tests
├── package.json            # NPM configuration
├── README.md               # This file
└── README-TESTING.md       # Testing documentation
```

### 📦 Modular Architecture

**storage.js** – Data persistence layer

- `loadContacts()` / `saveContacts()`
- `loadLabels()` / `saveLabels()`
- `clearAllContacts()`

**state.js** – Business logic & state management

- Contact CRUD operations
- Label management
- Validation rules & duplicate checking
- Filter & sort logic
- Trash management with auto-cleanup

**ui.js** – Presentation layer

- DOM caching and manipulation
- Rendering functions (contacts, labels, avatars)
- Modal utilities
- Empty state handling
- Error message display

**main.js** – Application initialization

- Event listener setup
- Real-time validation binding
- App initialization

## 🧠 System Flow

### Application Lifecycle

```text
┌─────────────────────────────────────────┐
│         Load Application                │
│  (HTML + CSS + JS + libphonenumber)     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Check LocalStorage                 │
│  contacts: [] | labels: []              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Initialize Application             │
│  • Cleanup expired trash (>30 days)     │
│  • Bind event listeners                 │
│  • Render UI (contacts, labels, counts) │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         User Interactions               │
│  • Add/Edit/Delete contacts             │
│  • Search & Sort                        │
│  • Manage labels                        │
│  • Toggle favorites                     │
└─────────────────────────────────────────┘
```

### Add/Edit Contact Flow

```text
User clicks "Add Contact" or "Edit"
           ↓
    Show Form Modal
           ↓
    User fills inputs
           ↓
    Real-time validation on blur
    ├─ Invalid → Show red error message
    └─ Valid → Clear error
           ↓
    User clicks "Save"
           ↓
    Validate all fields
    ├─ Invalid → Show errors, prevent save
    └─ Valid → Continue
           ↓
    Check duplicate phone
    ├─ Duplicate → Show error with existing contact name
    └─ Unique → Continue
           ↓
    Save to LocalStorage
           ↓
    Close modal & refresh UI
```

### Delete Contact Flow

```text
User clicks "Delete" on contact
           ↓
    Show confirmation modal
    "Contact will be deleted after 30 days"
           ↓
    User confirms
           ↓
    Add deletedAt timestamp
           ↓
    Save to LocalStorage
           ↓
    Contact moves to Trash view
           ↓
    (After 30 days: auto-cleanup on app load)
```

## 🔁 Flowchart

![Address Book Flowchart](/assets/images/address-book-drawio.jpg)

## 🧩 Technologies & Libraries

- **HTML5** – Semantic markup
- **Tailwind CSS** – Utility-first styling (CDN)
- **Vanilla JavaScript** – No frameworks, pure ES6+
- **libphonenumber-js** – International phone number formatting
- **LocalStorage API** – Client-side data persistence
- **Jest** – Unit testing framework

## 💾 LocalStorage Data Format

### Contacts Data

**Key:** `contacts`

```json
[
  {
    "id": 1,
    "name": "Lazuardy Anugrah",
    "phone": "6285891840888",
    "email": "lazu@gmail.com",
    "address": "Tangerang, Indonesia",
    "avatar": "",
    "label": "Bootcamp",
    "favorite": false,
    "deletedAt": null
  },
  {
    "id": 2,
    "name": "I Gede Arya",
    "phone": "6285891840619",
    "email": "arya@gmail.com",
    "address": "Jakarta, Indonesia",
    "avatar": "https://example.com/avatar.jpg",
    "label": "",
    "favorite": true,
    "deletedAt": null
  },
  {
    "id": 3,
    "name": "Ben Nata",
    "phone": "6285892654123",
    "email": "ben@gmail.com",
    "address": "Kediri, Indonesia",
    "avatar": "",
    "label": "Mentor",
    "favorite": false,
    "deletedAt": 1708876800000
  }
]
```

### Labels Data

**Key:** `labels`

```json
["Bootcamp", "Mentor", "President"]
```

## ✅ Validation Rules

### Name Validation

- ✔️ **Required field**
- ✔️ Minimum 2 characters
- ✔️ Maximum 50 characters
- ✔️ Only letters and spaces allowed
- ❌ Error: "Name is required", "Name must be at least 2 characters", etc.

### Phone Validation

- ✔️ **Required field**
- ✔️ Indonesian format: `08xxx`, `628xxx`, or `+628xxx`
- ✔️ 9-12 digits after country code
- ✔️ **Duplicate detection** across all formats
- ❌ Error: "Phone number is required", "Invalid phone format"
- ❌ Error: "Phone number already exists for contact 'John Doe'"

**Duplicate Detection Examples:**

```text
08123456789  ≈  +628123456789  ≈  628123456789  → DUPLICATE ❌
0812-345-6789  ≈  +62 812 345 6789  → DUPLICATE ❌
```

### Email Validation

- ⚪ Optional field
- ✔️ Must be valid email format if provided
- ❌ Error: "Invalid email format"

### Address Validation

- ⚪ Optional field
- ✔️ Maximum 200 characters
- ❌ Error: "Address must not exceed 200 characters"

## 🧪 Testing

The project includes comprehensive Jest unit tests for API operations.

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

**Test Coverage:**

- ✅ Storage operations (load/save contacts and labels)
- ✅ Validation (name, phone, email, address)
- ✅ Duplicate detection with phone normalization
- ✅ Filter and sort functionality
- ✅ Contact CRUD operations
- ✅ Trash management
- ✅ Integration workflows

See [README-TESTING.md](README-TESTING.md) for detailed testing documentation.

## 🎯 Key Features Highlights

### 🔒 Data Integrity

- Duplicate phone detection with format normalization
- Comprehensive field validation
- Soft delete with recovery option

### 🎨 User Experience

- Real-time search and filtering
- Instant validation feedback
- Confirmation dialogs for destructive actions
- Smooth animations and transitions

### 🏗️ Code Quality

- Modular architecture (separation of concerns)
- Clean, maintainable code
- Comprehensive error handling
- Unit tested API layer

## 📝 License

This project is open source and available for educational purposes.

---

Made with ❤️ by I Gede Arya Danny Pratama
