// ================= CONSTANTS =================
const TRASH_RETENTION_DAYS = 30;
const TRASH_RETENTION_MS = TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000;
const SEARCH_FIELDS = ["name", "email"];

// ================= VALIDATION =================
const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: {
      required: "Name is required",
      minLength: "Name must be at least 2 characters",
      maxLength: "Name must not exceed 50 characters",
      pattern: "Name can only contain letters and spaces",
    },
  },
  phone: {
    required: true,
    pattern: /^(\+62|62|0)[0-9]{9,12}$/,
    message: {
      required: "Phone number is required",
      pattern: "Invalid phone format (e.g., 08123456789 or +628123456789)",
    },
  },
  email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: {
      pattern: "Invalid email format",
    },
  },
  address: {
    required: false,
    maxLength: 200,
    message: {
      maxLength: "Address must not exceed 200 characters",
    },
  },
};

function validateField(fieldName, value) {
  const rules = VALIDATION_RULES[fieldName];
  if (!rules) return { valid: true };

  const trimmedValue = value.trim();

  // Check required
  if (rules.required && !trimmedValue) {
    return { valid: false, message: rules.message.required };
  }

  // If empty and not required, skip other validations
  if (!trimmedValue && !rules.required) {
    return { valid: true };
  }

  // Check minLength
  if (rules.minLength && trimmedValue.length < rules.minLength) {
    return { valid: false, message: rules.message.minLength };
  }

  // Check maxLength
  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    return { valid: false, message: rules.message.maxLength };
  }

  // Check pattern
  if (rules.pattern && !rules.pattern.test(trimmedValue)) {
    return { valid: false, message: rules.message.pattern };
  }

  return { valid: true };
}

function normalizePhoneNumber(phone) {
  // Remove all spaces, dashes, and parentheses
  let normalized = phone.trim().replace(/[\s\-\(\)]/g, "");

  // Convert to standard format (starting with 62)
  if (normalized.startsWith("+62")) {
    normalized = normalized.substring(1); // Remove +, keep 62
  } else if (normalized.startsWith("0")) {
    normalized = "62" + normalized.substring(1); // Replace 0 with 62
  } else if (normalized.startsWith("62")) {
    // Already in correct format
    normalized = normalized;
  }

  return normalized;
}

function checkDuplicateContact(phone, currentId = null) {
  const contacts = loadContacts();
  const normalizedPhone = normalizePhoneNumber(phone);

  return contacts.find((c) => {
    const contactPhone = normalizePhoneNumber(c.phone);
    // Skip if it's the same contact being edited
    if (currentId && c.id == currentId) return false;
    // Skip deleted contacts
    if (c.deletedAt) return false;
    return contactPhone === normalizedPhone;
  });
}

function validateForm() {
  const fields = ["name", "phone", "email", "address"];
  let isValid = true;

  fields.forEach((field) => {
    const input = DOM.inputs[field];
    const result = validateField(field, input.value);

    if (!result.valid) {
      showFieldError(field, result.message);
      isValid = false;
    } else {
      clearFieldError(field);
    }
  });

  // Check for duplicate phone number
  if (isValid) {
    const phoneValue = DOM.inputs.phone.value.trim();
    const currentId = DOM.inputs.id.value;
    const duplicate = checkDuplicateContact(phoneValue, currentId);

    if (duplicate) {
      showFieldError(
        "phone",
        `Phone number already exists for contact "${duplicate.name}"`,
      );
      isValid = false;
    }
  }

  return isValid;
}

// ================= STATE =================
const state = {
  sortOrder: "A-Z",
  activeView: "all",
  activeLabel: "",
  editingLabel: null,
  search: "",
  sidebarOpen: true,
};

// ================= HELPERS =================
function generateId() {
  const contacts = loadContacts();
  if (contacts.length === 0) return 1;
  return Math.max(...contacts.map((c) => c.id)) + 1;
}

// ================= FILTER & SORT =================
function getFilteredData() {
  const allContacts = loadContacts();
  let data =
    state.activeView === "trash"
      ? allContacts.filter((c) => c.deletedAt)
      : allContacts.filter((c) => !c.deletedAt);

  if (state.activeView === "favorite") {
    data = data.filter((c) => c.favorite);
  }

  if (state.activeView === "label") {
    data = data.filter((c) => c.label === state.activeLabel);
  }

  if (state.search) {
    const keyword = state.search.toLowerCase();
    data = data.filter((c) =>
      SEARCH_FIELDS.some((key) => c[key].toLowerCase().includes(keyword)),
    );
  }

  return data;
}

function sortData(data) {
  return data.sort((a, b) => {
    const result = a.name.localeCompare(b.name);
    return state.sortOrder === "A-Z" ? result : -result;
  });
}

// ================= CONTACT OPERATIONS =================
function saveContact() {
  // Validate form first
  if (!validateForm()) {
    return;
  }

  const contactData = getContactFormData();

  const list = loadContacts();
  const id = DOM.inputs.id.value;

  if (id) {
    const index = list.findIndex((x) => x.id == id);
    list[index] = { id: Number(id), ...contactData };
  } else {
    list.push({ id: generateId(), ...contactData });
  }

  saveContacts(list);
  refreshUI();
  closeForm();
  closeDetail();
}

function editContact(id) {
  const c = loadContacts().find((x) => x.id === id);

  DOM.inputs.id.value = c.id;
  DOM.inputs.name.value = c.name;
  DOM.inputs.phone.value = c.phone;
  DOM.inputs.email.value = c.email;
  DOM.inputs.address.value = c.address;
  DOM.inputs.avatar.value = c.avatar || "";
  document.getElementById("formTitle").innerText = "Edit Contact";

  renderLabelOptions(c.label);
  updateLabelColor();
  openForm();
}

function deleteContact(id, name) {
  openConfirmModal(
    "Delete Contact",
    `This contact <span class="font-semibold text-red-600">"${name}"</span> will be permanently deleted from this account after ${TRASH_RETENTION_DAYS} days.`,
    () => {
      const data = loadContacts().map((c) =>
        c.id === id ? { ...c, deletedAt: Date.now() } : c,
      );
      saveContacts(data);
      refreshUI();
      closeDetail();
    },
    "Move to Trash",
  );
}

function toggleFavorite(id) {
  const data = loadContacts().map((c) =>
    c.id === id ? { ...c, favorite: !c.favorite } : c,
  );
  saveContacts(data);
  showDetail(id);
  applyFilterAndSort();
}

function restoreContact(id) {
  const data = loadContacts().map((c) =>
    c.id === id ? { ...c, deletedAt: null } : c,
  );
  saveContacts(data);
  refreshUI();
  closeDetail();
}

function deletePermanent(id) {
  openConfirmModal(
    "Delete Forever",
    "This cannot be undone. Continue?",
    () => {
      saveContacts(loadContacts().filter((c) => c.id !== id));
      refreshUI();
      closeDetail();
    },
    "Delete",
  );
}

function cleanupTrash() {
  const now = Date.now();
  const cleaned = loadContacts().filter((c) => {
    if (!c.deletedAt) return true;
    return now - c.deletedAt < TRASH_RETENTION_MS;
  });
  saveContacts(cleaned);
  updateCounters();
}

// ================= LABEL OPERATIONS =================
function saveNewLabel() {
  const name = DOM.inputs.newLabel.value.trim();
  if (!name) return alert("Label required");

  let labels = loadLabels();
  const isEditMode = state.editingLabel !== null;

  if (isEditMode) {
    if (labels.includes(name) && name !== state.editingLabel) {
      return alert("Label already exists");
    }
    labels = labels.map((l) => (l === state.editingLabel ? name : l));
    const contacts = loadContacts().map((c) =>
      c.label === state.editingLabel ? { ...c, label: name } : c,
    );
    saveContacts(contacts);
  } else {
    if (labels.includes(name)) return alert("Label already exists");
    labels.push(name);
  }

  saveLabels(labels);
  state.editingLabel = null;
  refreshUI();
  closeLabelModal();
}

function editLabel(name) {
  state.editingLabel = name;
  DOM.inputs.newLabel.value = name;
  document.querySelector("#labelModal h2").innerText = "Edit Label";
  openLabelModal();
}

function deleteLabel(name) {
  openConfirmModal(
    "Delete Label",
    `Delete Label <span class="font-semibold text-red-600">"${name}"</span>? All contacts using this label will be cleared.`,
    () => {
      saveLabels(loadLabels().filter((l) => l !== name));
      const contacts = loadContacts().map((c) =>
        c.label === name ? { ...c, label: "" } : c,
      );
      saveContacts(contacts);
      refreshUI();
    },
    "Delete",
  );
}

function filterByLabel(label) {
  state.activeView = "label";
  state.activeLabel = label;
  applyFilterAndSort();
}

function filterFavorites() {
  state.activeView = "favorite";
  state.activeLabel = "";
  applyFilterAndSort();
}
