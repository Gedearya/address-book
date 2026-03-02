# 📒 Gede Contacts – Modern Contact Management App

A modern, feature-rich contact management application inspired by Google Contacts. Built with vanilla JavaScript and modular architecture, featuring advanced validation, trash management, bulk operations, and real-time search capabilities. All data is stored locally using browser LocalStorage.

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

### 🗑️ Trash Management

- 🗑️ Soft delete with 30-day retention period
- ♻️ Restore deleted contacts (with green confirmation button)
- 🔥 Permanent delete option
- 🧹 Empty trash (bulk delete)
- ⏰ Auto-cleanup of expired trash items
- ⚠️ Trash banner with retention reminder
- 📅 Smart date display (Today/Yesterday or formatted date)
- 🔴 Red warning for contacts expiring in <7 days

### 🔍 Search & Sort

- 🔎 **Real-time Search** – Search by name or email
- 🔤 **Smart Sorting** – Toggle between A-Z and Z-A
- ⚡ **Instant Results** – No page reload required

### ☑️ Bulk Operations

- ☑️ **Select All** – Select all visible contacts
- ☑️ **Individual Selection** – Click checkboxes to select contacts
- 🏷️ **Bulk Add Label** – Add/change label for multiple contacts
- 🗑️ **Bulk Delete** – Move multiple contacts to trash
- ♻️ **Bulk Restore** – Restore multiple contacts from trash
- 🔥 **Bulk Delete Forever** – Permanently delete multiple contacts
- 📊 **Selection Counter** – Shows number of selected contacts
- 🎨 **Visual Feedback** – Selected rows highlighted in blue
- 🎯 **Context-Aware** – Different actions for normal view vs trash view

### ✅ Advanced Validation

- 📝 **Real-time Validation** – Errors shown on blur
- 🔴 **Visual Feedback** – Red borders and error messages
- 🚫 **Duplicate Detection** – Prevents duplicate phone numbers (all formats)
- 📱 **Phone Normalization** – Detects 08xxx, 628xxx, +628xxx as same number

### 🎨 UI/UX Features

- 📱 **Responsive Layout** – Header, Sidebar, Main content structure
- 🍔 **Hamburger Menu** – Toggle sidebar visibility
- 🎨 **Enhanced Styling** – Custom CSS with shadows, animations, hover effects
- 🎯 **Active Menu Highlighting** – Visual feedback for current view
- 📊 **Contact Counter Badge** – Shows total contacts
- 🌈 **Modern Tailwind CSS** – Utility-first styling
- 🎭 **Modal Animations** – Smooth transitions for modals
- 📜 **Custom Scrollbar** – Styled scrollbar for better UX
- 💫 **Avatar Animations** – Hover effects on avatars
- 🎨 **Color-coded Buttons** – Green for restore, red for delete
- 📱 **Mobile Optimized** – Responsive design for all screen sizes

### 👁️ Detail Panel

- 🖼️ **Square Avatar** – Rounded corners instead of circle
- 📝 **Name at Top** – Centered with favorite star beside it
- 📞 **Contact Info** – Phone, email, address, label
- ⭐ **Quick Favorite** – Toggle favorite from detail panel
- ✏️ **Quick Edit** – Edit contact directly
- 🗑️ **Quick Delete** – Move to trash or delete forever
- ♻️ **Quick Restore** – Restore from trash (trash view only)

## 🏗️ Project Structure

```text
gede-contacts/
├── index.html                      # Main HTML file
├── assets/
│   ├── scripts/
│   │   ├── storage.js              # LocalStorage operations
│   │   ├── state.js                # State management
│   │   ├── dom.js                  # DOM element caching
│   │   ├── validation.js           # Form validation rules
│   │   ├── filters.js              # Filter logic
│   │   ├── render.js               # UI rendering functions
│   │   ├── modals.js               # Modal operations
│   │   ├── contacts.js             # Contact CRUD operations
│   │   ├── labels.js               # Label management
│   │   ├── bulk.js                 # Bulk operations
│   │   ├── events.js               # Event handlers
│   │   └── init.js                 # App initialization
│   ├── styles/
│   │   └── style.css               # Custom CSS enhancements
│   ├── icons/
│   │   └── contact.svg             # App icon
│   └── images/
│       └── address-book-drawio.jpg # Flowchart diagram
├── app.test.js                     # Jest unit tests
├── package.json                    # NPM configuration
├── README.md                       # This file
├── README-TESTING.md               # Testing documentation
├── ARCHITECTURE.md                 # Architecture documentation
├── SCRIPTS-STRUCTURE.md            # Scripts structure guide
├── BULK_OPERATIONS_GUIDE.md        # Bulk operations guide
└── TROUBLESHOOTING.md              # Troubleshooting guide
```

### 📦 Modular Architecture

**storage.js** – Data persistence layer

- `loadContacts()` / `saveContacts()`
- `loadLabels()` / `saveLabels()`
- `clearAllContacts()`

**state.js** – State management

- Application state (activeView, selectedContacts, filters)
- View switching logic
- Filter state management

**dom.js** – DOM element caching

- Centralized DOM element references
- Improves performance by caching selectors

**validation.js** – Form validation

- Field validation rules
- Phone number normalization
- Duplicate contact detection
- Form validation logic

**filters.js** – Advanced filtering

- Filter logic (email, phone, label, avatar, favorites)
- Filter state management
- Filter chip rendering

**render.js** – UI rendering

- Contact list rendering
- Label list rendering
- Avatar generation
- Empty state handling
- Bulk action bar updates
- Dynamic table headers

**modals.js** – Modal operations

- Form modal (add/edit contact)
- Confirmation modals
- Label modal
- Bulk label modal
- Detail panel
- Alert modals

**contacts.js** – Contact operations

- CRUD operations
- Trash management
- Favorite toggle
- Auto-cleanup expired trash

**labels.js** – Label management

- Create, edit, delete labels
- Label assignment
- Label filtering

**bulk.js** – Bulk operations

- Select/deselect contacts
- Bulk label assignment
- Bulk delete/restore
- Bulk permanent delete

**events.js** – Event handlers

- Form submission
- Search and sort
- Menu navigation
- Bulk action events
- Real-time validation

**init.js** – Application initialization

- Load initial data
- Cleanup expired trash
- Render initial UI
- Setup event listeners

## 🧠 System Flow

### Application Lifecycle

```text
┌─────────────────────────────────────────┐
│         Load Application                │
│  (HTML + CSS + JS + Libraries)          │
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
│  • Setup real-time validation           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         User Interactions               │
│  • Add/Edit/Delete contacts             │
│  • Search & Sort                        │
│  • Apply advanced filters               │
│  • Bulk operations                      │
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
    Add deletedAt timestamp (ISO 8601)
           ↓
    Save to LocalStorage
           ↓
    Contact moves to Trash view
           ↓
    (After 30 days: auto-cleanup on app load)
```

### Bulk Operations Flow

```text
User selects multiple contacts (checkboxes)
           ↓
    Bulk action bar appears
    Shows: [Count] | Set Label | Delete | ✕
           ↓
    User clicks bulk action
           ↓
    Show confirmation modal
    (Green button for Restore, Red for Delete)
           ↓
    User confirms
           ↓
    Apply action to all selected contacts
           ↓
    Save to LocalStorage
           ↓
    Deselect all & refresh UI
```

## 🔁 Flowchart

![Address Book Flowchart](/assets/images/address-book-drawio.jpg)

## 🧩 Technologies & Libraries

- **HTML5** – Semantic markup
- **Tailwind CSS** – Utility-first styling (CDN)
- **Vanilla JavaScript** – No frameworks, pure ES6+
- **libphonenumber-js** – International phone number formatting
- **Day.js** – Date formatting and manipulation
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
    "deletedAt": "2025-01-30T03:15:17.673Z"
  }
]
```

**Note:** `deletedAt` uses ISO 8601 format for better readability and compatibility.

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

The project includes comprehensive Jest unit tests covering 45 test cases.

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
- ✅ Phone normalization (08xxx, +62xxx, 62xxx)
- ✅ Duplicate detection with format normalization
- ✅ Filter and sort functionality
- ✅ Contact CRUD operations
- ✅ Trash management
- ✅ Integration workflows

**Test Results:** 45/45 tests passing ✅

See [README-TESTING.md](README-TESTING.md) for detailed testing documentation.

## 🎯 Key Features Highlights

### 🔒 Data Integrity

- Duplicate phone detection with format normalization
- Comprehensive field validation
- Soft delete with recovery option
- Auto-cleanup of expired trash items

### 🎨 User Experience

- Real-time search and filtering
- Bulk operations for efficiency
- Instant validation feedback
- Confirmation dialogs for destructive actions
- Smooth animations and transitions
- Context-aware UI (different views for normal/trash)
- Smart date formatting (Today/Yesterday)

### 🏗️ Code Quality

- Modular architecture (12 separate script files)
- Separation of concerns (storage, state, UI, validation)
- Clean, maintainable code
- Comprehensive error handling
- Unit tested (45 test cases)
- Global scope for easy debugging

## 📝 License

This project is open source and available for educational purposes.

---

Made with ❤️ by I Gede Arya Danny Pratama
