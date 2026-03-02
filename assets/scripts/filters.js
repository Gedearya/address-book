// ================= FILTER & SORT =================
const SEARCH_FIELDS = ["name", "email"];

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

function applyFilterAndSort() {
  const filtered = getFilteredData();
  const sorted = sortData(filtered);
  renderContacts(sorted);
  setActiveMenu();
  updateCounters();
  updateTrashUI();
  deselectAllContacts();
}
