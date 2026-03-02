// ================= CONTACT OPERATIONS =================
const TRASH_RETENTION_DAYS = 30;
const TRASH_RETENTION_MS = TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000;

function generateId() {
  const contacts = loadContacts();
  if (contacts.length === 0) return 1;
  return Math.max(...contacts.map((c) => c.id)) + 1;
}

function saveContact() {
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
        c.id === id ? { ...c, deletedAt: new Date().toISOString() } : c,
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
  const c = loadContacts().find((x) => x.id === id);

  openConfirmModal(
    "Restore Contact",
    `Restore contact <span class="font-semibold text-green-600">"${c.name}"</span>?`,
    () => {
      const data = loadContacts().map((contact) =>
        contact.id === id ? { ...contact, deletedAt: null } : contact,
      );
      saveContacts(data);
      refreshUI();
      closeDetail();
    },
    "Restore",
    "bg-green-600 hover:bg-green-700",
  );
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
  const now = new Date();
  const cleaned = loadContacts().filter((c) => {
    if (!c.deletedAt) return true;
    const deletedDate = new Date(c.deletedAt);
    const diffMs = now - deletedDate;
    return diffMs < TRASH_RETENTION_MS;
  });
  saveContacts(cleaned);
  updateCounters();
}
