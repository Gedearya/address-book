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
    "id": "1",
    "name": "John Doe",
    "phone": "08123456789",
    "email": "john@mail.com"
  }
]
```

## ✅ Validation Rules

- Name cannot be empty
- Phone must contain only numbers
- Email must be valid format
- Contact cannot duplicated
