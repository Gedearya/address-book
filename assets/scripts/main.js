// ================= EVENT HANDLERS =================
function initializeEventListeners() {
  // Sidebar toggle
  DOM.toggleSidebarBtn.onclick = toggleSidebar;

  // Form events
  DOM.openFormBtn.onclick = () => {
    resetForm();
    renderLabelOptions();
    updateLabelColor();
    openForm();
  };
  DOM.cancelFormBtn.onclick = closeForm;
  DOM.saveContactBtn.onclick = saveContact;

  // Menu events
  DOM.allMenu.onclick = () => {
    state.activeView = "all";
    state.activeLabel = "";
    applyFilterAndSort();
  };
  DOM.favoriteMenu.onclick = filterFavorites;
  DOM.trashMenu.onclick = () => {
    state.activeView = "trash";
    applyFilterAndSort();
  };

  // Label events
  DOM.openLabelBtn.onclick = addLabelMode;
  DOM.cancelLabelBtn.onclick = closeLabelModal;
  DOM.saveLabelBtn.onclick = saveNewLabel;

  // Detail panel events
  DOM.detailOverlay.onclick = closeDetail;

  // Search and sort events
  DOM.search.oninput = (e) => {
    state.search = e.target.value.toLowerCase();
    applyFilterAndSort();
  };

  DOM.sortBtn.onclick = () => {
    state.sortOrder = state.sortOrder === "A-Z" ? "Z-A" : "A-Z";
    DOM.sortBtn.innerText = `Sort: ${state.sortOrder}`;
    applyFilterAndSort();
  };

  // Trash events
  DOM.emptyTrashBtn.onclick = () => {
    openConfirmModal("Empty Trash", "Delete all trash contacts?", () => {
      saveContacts(loadContacts().filter((c) => !c.deletedAt));
      refreshUI();
    });
  };

  // Bulk operation events
  DOM.selectAllCheckbox.onclick = handleSelectAll;
  DOM.bulkAddLabelBtn.onclick = openBulkLabelModal;
  DOM.bulkRestoreBtn.onclick = confirmBulkRestore;
  DOM.bulkDeleteBtn.onclick = confirmBulkDelete;
  DOM.bulkDeselectBtn.onclick = deselectAllContacts;
  DOM.cancelBulkLabelBtn.onclick = closeBulkLabelModal;
  DOM.applyBulkLabelBtn.onclick = applyBulkLabel;
  DOM.bulkLabelSelect.addEventListener("change", updateBulkLabelColor);

  // Form input events
  DOM.inputs.label.addEventListener("change", updateLabelColor);

  // Real-time validation
  ["name", "phone", "email", "address"].forEach((field) => {
    DOM.inputs[field].addEventListener("blur", function () {
      const result = validateField(field, this.value);
      if (!result.valid) {
        showFieldError(field, result.message);
      } else {
        clearFieldError(field);
      }
    });

    DOM.inputs[field].addEventListener("input", function () {
      // Clear error on input if field was previously invalid
      const errorElement = document.getElementById(`${field}Error`);
      if (errorElement) {
        clearFieldError(field);
      }
    });
  });
}

// ================= INITIALIZATION =================
function initialize() {
  cleanupTrash();
  initializeEventListeners();
  refreshUI();
}

// Initialize when DOM is ready
initialize();
