# 📒 Gede Contacts – LocalStorage Web App

A simple web-based contact management application inspired by Google Contacts, built using HTML, CSS, and JavaScript, with data stored in LocalStorage.
This project demonstrates CRUD operations, validation, and client-side data management.

## 🧑‍💻 Author

I Gede Arya Danny Pratama

## 🚀 Features

- Add new contact
- Edit existing contact
- Delete contact
- Search contact
- Input validation
- Duplicate contact detection
- Persistent storage using LocalStorage

### Optional / Future Features

- Favorite (Star) contact
- Labels / Groups

## 🧠 System Overview

The application uses a Single Page Application (SPA) approach:

- Load application (HTML, CSS, JS)
- Check LocalStorage
- Initialize or load contacts
- Render contact list
- User performs actions
- Save data to LocalStorage
- Update UI

## 🔁 Flowchart Summary

![Address Book draw.io](/assets/images/address-book-drawio.jpg)

### Main Flow

```text
Start
│
├─ Load App
│
├─ LocalStorage Exists?
│ ├─ NO → Create Empty Contacts
│ │ → Save
│ │ → Load Contacts
│ └─ YES → Load Contacts
│
├─ Render Contact List
│
└─ User Action
```

### Add / Edit Contact

```text
Add / Edit Contact
↓
Show Form
↓
Input Valid?
├─ NO → Back to Form
└─ YES → Duplicate Contact?
   ├─ YES → Back to Form
   └─ NO → Save to LocalStorage
     ↓
   Render Contact List
```

### Delete Contact

```text
Delete Contact
↓
Confirm Delete?
├─ NO → Back to List
└─ YES → Delete from LocalStorage
   ↓
  Render Contact List
```

### Search Contact

```text
Search Contact
↓
Keyword Entered?
├─ NO → Show All Contacts
└─ YES → Apply Filter
   ↓
  Render Contact List
```

## 🧩 Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser LocalStorage

## 💾 LocalStorage Data Format

**Key:** `contacts`

```json
[
  {
    "id": 1,
    "name": "Gede Arya",
    "phone": "+6285-891-840-666",
    "email": "gedearya@gmail.com",
    "address": "Jakarta, Indonesia"
  }
]
```

## ✅ Validation Rules

- Name cannot be empty
- Phone must contain only numbers
- Email must be valid format
- Contact cannot duplicated
