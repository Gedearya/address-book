// ================= MODAL OPERATIONS =================
function toggleModal(modal, show) {
  if (show) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  } else {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function openForm() {
  toggleModal(DOM.formModal, true);
}

function closeForm() {
  toggleModal(DOM.formModal, false);
  resetForm();
}

function openLabelModal() {
  toggleModal(DOM.labelModal, true);
}

function addLabelMode() {
  state.editingLabel = null;
  DOM.inputs.newLabel.value = "";
  document.querySelector("#labelModal h2").innerText = "Add Label";
  openLabelModal();
}

function closeLabelModal() {
  toggleModal(DOM.labelModal, false);
}

function openConfirmModal(
  title,
  message,
  onConfirm,
  okText = "Delete",
  okButtonClass = "bg-red-600 hover:bg-red-700",
) {
  DOM.confirmTitle.innerText = title;
  DOM.confirmMessage.innerHTML = message;
  DOM.confirmOkBtn.innerText = okText;

  // Reset button classes and apply new ones
  DOM.confirmOkBtn.className = `px-4 py-2 text-white rounded-lg transition ${okButtonClass}`;

  toggleModal(DOM.confirmModal, true);

  DOM.confirmCancelBtn.onclick = closeConfirmModal;
  DOM.confirmOkBtn.onclick = () => {
    closeConfirmModal();
    onConfirm();
  };
}

function closeConfirmModal() {
  DOM.confirmCancelBtn.style.display = "";
  toggleModal(DOM.confirmModal, false);
}

function resetForm() {
  Object.values(DOM.inputs).forEach((input) => {
    if (input.type !== "hidden") input.value = "";
  });

  DOM.inputs.id.value = "";
  document.getElementById("formTitle").innerText = "Add Contact";
  clearAllErrors();
}

function getContactFormData() {
  return {
    name: DOM.inputs.name.value.trim(),
    phone: DOM.inputs.phone.value.trim(),
    email: DOM.inputs.email.value.trim(),
    address: DOM.inputs.address.value.trim(),
    avatar: DOM.inputs.avatar.value.trim(),
    label: DOM.inputs.label.value,
    favorite: false,
  };
}

function showFieldError(fieldName, message) {
  const input = DOM.inputs[fieldName];
  const errorId = `${fieldName}Error`;
  let errorElement = document.getElementById(errorId);

  input.classList.add("border-red-500");
  input.classList.remove("border-gray-300");

  if (!errorElement) {
    errorElement = document.createElement("p");
    errorElement.id = errorId;
    errorElement.className = "text-red-500 text-xs mt-1";
    input.parentElement.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

function clearFieldError(fieldName) {
  const input = DOM.inputs[fieldName];
  const errorId = `${fieldName}Error`;
  const errorElement = document.getElementById(errorId);

  input.classList.remove("border-red-500");
  input.classList.add("border-gray-300");

  if (errorElement) {
    errorElement.remove();
  }
}

function clearAllErrors() {
  const fields = ["name", "phone", "email", "address"];
  fields.forEach((field) => clearFieldError(field));
}

function openBulkLabelModal() {
  if (state.selectedContacts.size === 0) return;

  const selectedIds = Array.from(state.selectedContacts);
  const contacts = loadContacts().filter((c) => selectedIds.includes(c.id));

  const count = state.selectedContacts.size;
  DOM.bulkLabelCount.textContent = count;
  DOM.bulkLabelWord.textContent = count === 1 ? "contact" : "contacts";

  const labels = [...new Set(contacts.map((c) => c.label).filter(Boolean))];

  if (labels.length === 1) {
    DOM.bulkLabelSelect.value = labels[0];
  } else {
    DOM.bulkLabelSelect.value = "";
  }

  const labelOptions = loadLabels()
    .map(
      (label) =>
        `<option value="${label}" style="color: #000000;">${label}</option>`,
    )
    .join("");

  DOM.bulkLabelSelect.innerHTML = `
    <option value="" style="color: #000000;">No Label</option>
    ${labelOptions}
  `;

  if (labels.length === 1) {
    DOM.bulkLabelSelect.value = labels[0];
  }

  updateBulkLabelColor();
  toggleModal(DOM.bulkLabelModal, true);
}

function closeBulkLabelModal() {
  toggleModal(DOM.bulkLabelModal, false);
}

function updateBulkLabelColor() {
  const selectedLabel = DOM.bulkLabelSelect.value;
  DOM.bulkLabelSelect.style.color = selectedLabel ? "#000000" : "#9CA3AF";
}

function applyBulkLabel() {
  const label = DOM.bulkLabelSelect.value;
  bulkAddLabel(label);
  closeBulkLabelModal();
}

function confirmBulkDelete() {
  if (state.selectedContacts.size === 0) return;

  const count = state.selectedContacts.size;
  const contactWord = count === 1 ? "contact" : "contacts";

  openConfirmModal(
    "Delete Contacts",
    `Move ${count} ${contactWord} to trash?`,
    () => {
      bulkDelete();
    },
    "Move to Trash",
  );
}

function confirmBulkRestore() {
  if (state.selectedContacts.size === 0) return;

  const count = state.selectedContacts.size;
  const contactWord = count === 1 ? "contact" : "contacts";

  openConfirmModal(
    "Restore Contacts",
    `Restore ${count} ${contactWord}?`,
    () => {
      bulkRestore();
    },
    "Restore",
    "bg-green-600 hover:bg-green-700",
  );
}

function confirmBulkDeletePermanent() {
  if (state.selectedContacts.size === 0) return;

  const count = state.selectedContacts.size;
  const contactWord = count === 1 ? "contact" : "contacts";

  openConfirmModal(
    "Delete Forever",
    `Permanently delete ${count} ${contactWord}? This cannot be undone.`,
    () => {
      bulkDeletePermanent();
    },
    "Delete Forever",
  );
}

function showDetail(id) {
  const c = loadContacts().find((x) => x.id === id);
  if (!c) return;

  const isInTrash = !!c.deletedAt;

  DOM.detailName.innerText = c.name;
  DOM.detailPhone.innerText = formatPhoneDisplay(c.phone);
  DOM.detailEmail.innerText = c.email || "-";
  DOM.detailAddress.innerText = c.address || "-";
  DOM.detailLabel.innerText = c.label || "No Label";

  if (c.avatar) {
    DOM.detailAvatar.innerHTML = `<img src="${c.avatar}" alt="${c.name}" class="w-full h-full object-cover" />`;
  } else {
    const initials = getInitials(c.name);
    const bgColor = getAvatarColor(c.name);
    DOM.detailAvatar.innerHTML = `<div class="w-full h-full flex items-center justify-center ${bgColor} text-white text-5xl font-bold">${initials}</div>`;
  }

  const favoriteIcon = c.favorite
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`;

  DOM.detailFavoriteBtn.innerHTML = favoriteIcon;
  DOM.detailFavoriteBtn.onclick = () => toggleFavorite(id);

  if (isInTrash) {
    DOM.detailEditBtn.style.display = "none";
    DOM.detailDeleteBtn.style.display = "none";
    DOM.detailFavoriteBtn.style.display = "none";
    DOM.detailRestoreBtn.style.display = "inline-flex";
    DOM.detailDeleteForeverBtn.style.display = "inline-flex";

    DOM.detailRestoreBtn.onclick = () => restoreContact(id);
    DOM.detailDeleteForeverBtn.onclick = () => deletePermanent(id);
  } else {
    DOM.detailEditBtn.style.display = "inline-flex";
    DOM.detailDeleteBtn.style.display = "inline-flex";
    DOM.detailFavoriteBtn.style.display = "inline-flex";
    DOM.detailRestoreBtn.style.display = "none";
    DOM.detailDeleteForeverBtn.style.display = "none";

    DOM.detailEditBtn.onclick = () => editContact(id);
    DOM.detailDeleteBtn.onclick = () => deleteContact(id, c.name);
  }

  DOM.detailPanel.classList.remove("translate-x-full");
  DOM.detailOverlay.classList.remove("hidden");
}

function closeDetail() {
  DOM.detailPanel.classList.add("translate-x-full");
  DOM.detailOverlay.classList.add("hidden");
}
