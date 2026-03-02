// ================= LABEL OPERATIONS =================
function showAlertModal(message) {
  closeLabelModal();
  openConfirmModal("Alert", message, () => {}, "OK");
  DOM.confirmCancelBtn.style.display = "none";
}

function saveNewLabel() {
  const name = DOM.inputs.newLabel.value.trim();
  if (!name) {
    showAlertModal("Label name is required");
    return;
  }

  let labels = loadLabels();
  const isEditMode = state.editingLabel !== null;

  if (isEditMode) {
    if (labels.includes(name) && name !== state.editingLabel) {
      showAlertModal(
        `Label <span class="text-red-500 font-semibold">${name} </span> already exists`,
      );
      return;
    }
    labels = labels.map((l) => (l === state.editingLabel ? name : l));
    const contacts = loadContacts().map((c) =>
      c.label === state.editingLabel ? { ...c, label: name } : c,
    );
    saveContacts(contacts);
  } else {
    if (labels.includes(name)) {
      showAlertModal(
        `Label <span class="text-red-500 font-semibold"">${name} </span> already exists`,
      );
      return;
    }
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
