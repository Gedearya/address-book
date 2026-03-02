// ================= BULK OPERATIONS =================
function toggleSelectContact(id) {
  if (state.selectedContacts.has(id)) {
    state.selectedContacts.delete(id);
  } else {
    state.selectedContacts.add(id);
  }
  updateBulkActionBar();
  updateSelectAllCheckbox();
}

function selectAllContacts() {
  const visibleContacts = getFilteredData();
  visibleContacts.forEach((c) => state.selectedContacts.add(c.id));
  updateBulkActionBar();
  updateSelectAllCheckbox();
}

function deselectAllContacts() {
  state.selectedContacts.clear();
  updateBulkActionBar();
  updateSelectAllCheckbox();
}

function bulkAddLabel(label) {
  if (state.selectedContacts.size === 0) return;

  const contacts = loadContacts().map((c) =>
    state.selectedContacts.has(c.id) ? { ...c, label } : c,
  );

  saveContacts(contacts);
  deselectAllContacts();
  refreshUI();
}

function bulkDelete() {
  if (state.selectedContacts.size === 0) return;

  const selectedIds = Array.from(state.selectedContacts);
  const now = new Date().toISOString();

  const contacts = loadContacts().map((c) =>
    selectedIds.includes(c.id) ? { ...c, deletedAt: now } : c,
  );

  saveContacts(contacts);
  deselectAllContacts();
  refreshUI();
}

function bulkRestore() {
  if (state.selectedContacts.size === 0) return;

  const selectedIds = Array.from(state.selectedContacts);

  const contacts = loadContacts().map((c) =>
    selectedIds.includes(c.id) ? { ...c, deletedAt: null } : c,
  );

  saveContacts(contacts);
  deselectAllContacts();
  refreshUI();
}

function bulkDeletePermanent() {
  if (state.selectedContacts.size === 0) return;

  const selectedIds = Array.from(state.selectedContacts);

  const contacts = loadContacts().filter((c) => !selectedIds.includes(c.id));

  saveContacts(contacts);
  deselectAllContacts();
  refreshUI();
}
