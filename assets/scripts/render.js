// ================= RENDERING FUNCTIONS =================

// Constants
const AVATAR_COLORS = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-emerald-500",
];
const ACTIVE_MENU_CLASSES = ["bg-blue-50", "text-blue-600"];

// Helper functions
function getInitials(name) {
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getAvatarColor(name) {
  return AVATAR_COLORS[hashString(name) % AVATAR_COLORS.length];
}

function updateLabelColor() {
  const hasValue = DOM.inputs.label.value !== "";
  DOM.inputs.label.classList.toggle("text-gray-400", !hasValue);
  DOM.inputs.label.classList.toggle("text-black", hasValue);
}

function formatPhoneDisplay(raw) {
  try {
    const phone = libphonenumber.parsePhoneNumber(raw, "ID");
    return phone.formatInternational().replace(/ /g, "-");
  } catch {
    return raw;
  }
}

function getEmptyStateConfig() {
  return {
    noContacts: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
      title: "No contacts yet",
      message: "Get started by adding your first contact",
      action: `<button onclick="DOM.openFormBtn.click()" class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">Add Contact</button>`,
    },
    noSearchResults: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
      title: "No results found",
      message: `No contacts match "${state.search}"`,
      action: `<button onclick="DOM.search.value=''; DOM.search.dispatchEvent(new Event('input'))" class="mt-4 text-blue-500 hover:text-blue-600 transition">Clear search</button>`,
    },
    emptyTrash: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
      title: "Trash is empty",
      message: "Deleted contacts will appear here",
      action: "",
    },
    emptyFavorites: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`,
      title: "No favorites yet",
      message: "Star contacts to add them to favorites",
      action: "",
    },
    emptyLabel: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>`,
      title: "No contacts in this label",
      message: `No contacts with label "${state.activeLabel}"`,
      action: "",
    },
    noLabels: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>`,
      title: "No labels yet",
      message: "Create labels to organize your contacts",
      action: "",
    },
  };
}

function renderEmptyState(type) {
  const config = getEmptyStateConfig()[type];
  return `
    <tr>
      <td colspan="5" class="p-12">
        <div class="flex flex-col items-center justify-center text-center">
          ${config.icon}
          <h3 class="text-xl font-semibold text-gray-700 mt-4">${config.title}</h3>
          <p class="text-gray-500 mt-2">${config.message}</p>
          ${config.action}
        </div>
      </td>
    </tr>
  `;
}

function renderLabelEmptyState() {
  const config = getEmptyStateConfig().noLabels;
  return `
    <div class="flex flex-col items-center justify-center text-center p-4 text-gray-400">
      ${config.icon}
      <p class="text-xs mt-2">${config.message}</p>
    </div>
  `;
}

function updateTableHeader() {
  const thead = document.querySelector("table thead tr");

  if (state.activeView === "trash") {
    thead.innerHTML = `
      <th class="text-left p-3 w-12">
        <input type="checkbox" id="selectAllCheckbox" class="w-4 h-4 text-blue-600 rounded cursor-pointer" title="Select All" />
      </th>
      <th class="text-left p-3">Name</th>
      <th class="text-left p-3">Deleted</th>
      <th class="text-left p-3">Delete Forever</th>
    `;
  } else {
    thead.innerHTML = `
      <th class="text-left p-3 w-12">
        <input type="checkbox" id="selectAllCheckbox" class="w-4 h-4 text-blue-600 rounded cursor-pointer" title="Select All" />
      </th>
      <th class="text-left p-3">Name</th>
      <th class="text-left p-3">Email</th>
      <th class="text-left p-3">Phone</th>
      <th class="text-left p-3">Label</th>
    `;
  }

  DOM.selectAllCheckbox = document.getElementById("selectAllCheckbox");
  DOM.selectAllCheckbox.onclick = handleSelectAll;
}

function renderAvatar(
  contact,
  size = "w-9 h-9",
  textSize = "",
  rounded = true,
) {
  const roundedClass = rounded ? "rounded-full" : "";

  if (contact.avatar) {
    return `<img src="${contact.avatar}" class="${size} ${roundedClass} object-cover" alt="${contact.name}">`;
  }

  return `<div class="${size} ${roundedClass} ${getAvatarColor(contact.name)} text-white flex items-center justify-center font-semibold ${textSize}">
    ${getInitials(contact.name)}
  </div>`;
}

function renderContactRow(contact) {
  const isSelected = state.selectedContacts.has(contact.id);

  if (state.activeView === "trash" && contact.deletedAt) {
    const deletedDate = dayjs(contact.deletedAt);
    const deleteForeverDate = deletedDate.add(TRASH_RETENTION_DAYS, "day");
    const now = dayjs();

    const formatDeletedDate = () => {
      const diffDays = now.diff(deletedDate, "day");
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      return deletedDate.format("D MMM YYYY");
    };

    const daysUntilDelete = deleteForeverDate.diff(now, "day");
    const deleteForeverText = deleteForeverDate.format("D MMM YYYY");
    const deleteForeverClass =
      daysUntilDelete <= 7 ? "text-red-600 font-semibold" : "";

    return `
      <tr class="border-b hover:bg-gray-100 ${isSelected ? "bg-blue-50" : ""}">
        <td class="p-3">
          <input type="checkbox" class="contact-checkbox w-4 h-4 text-blue-600 rounded cursor-pointer" data-id="${contact.id}" ${isSelected ? "checked" : ""} onclick="event.stopPropagation(); toggleSelectContact(${contact.id})" />
        </td>
        <td class="p-3 flex items-center gap-3 cursor-pointer" onclick="showDetail(${contact.id})">
          ${renderAvatar(contact)}
          <div>
            <div>${contact.name}</div>
            <div class="text-xs text-gray-500">${contact.email || contact.phone || ""}</div>
          </div>
        </td>
        <td class="p-3 cursor-pointer text-gray-600" onclick="showDetail(${contact.id})">${formatDeletedDate()}</td>
        <td class="p-3 cursor-pointer ${deleteForeverClass}" onclick="showDetail(${contact.id})">
          ${deleteForeverText}
          ${daysUntilDelete <= 7 ? `<div class="text-xs">(${daysUntilDelete} days left)</div>` : ""}
        </td>
      </tr>`;
  }

  const labelBadge = contact.label
    ? `<div class="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">${contact.label}</div>`
    : "";

  return `
    <tr class="border-b hover:bg-gray-100 ${isSelected ? "bg-blue-50" : ""}">
      <td class="p-3">
        <input type="checkbox" class="contact-checkbox w-4 h-4 text-blue-600 rounded cursor-pointer" data-id="${contact.id}" ${isSelected ? "checked" : ""} onclick="event.stopPropagation(); toggleSelectContact(${contact.id})" />
      </td>
      <td class="p-3 flex items-center gap-3 cursor-pointer" onclick="showDetail(${contact.id})">
        ${renderAvatar(contact)}
        ${contact.name}
      </td>
      <td class="p-3 cursor-pointer" onclick="showDetail(${contact.id})">${contact.email || "-"}</td>
      <td class="p-3 cursor-pointer" onclick="showDetail(${contact.id})">${contact.phone ? formatPhoneDisplay(contact.phone) : "-"}</td>
      <td class="p-3 cursor-pointer" onclick="showDetail(${contact.id})">${labelBadge}</td>
    </tr>`;
}

function renderContacts(data = loadContacts()) {
  updateTableHeader();

  if (data.length === 0) {
    let emptyStateType;
    const allContacts = loadContacts();
    const activeContacts = allContacts.filter((c) => !c.deletedAt);
    const hasNoActiveContacts = activeContacts.length === 0;

    if (state.activeView === "trash") {
      emptyStateType = "emptyTrash";
    } else if (state.activeView === "favorite") {
      emptyStateType = "emptyFavorites";
    } else if (state.activeView === "label") {
      emptyStateType = "emptyLabel";
    } else if (hasNoActiveContacts && state.activeView === "all") {
      emptyStateType = "noContacts";
    } else if (state.search) {
      emptyStateType = "noSearchResults";
    } else {
      emptyStateType = "noSearchResults";
    }

    DOM.contactList.innerHTML = renderEmptyState(emptyStateType);
  } else {
    DOM.contactList.innerHTML = data.map(renderContactRow).join("");
  }
}

function renderLabelItem(label) {
  const isActive = state.activeView === "label" && state.activeLabel === label;
  const activeClass = isActive ? "bg-blue-100 text-black" : "hover:bg-gray-100";
  const iconColor = isActive ? "text-black" : "text-gray-400";

  return `
    <div class="group flex items-center justify-between p-2 rounded-lg cursor-pointer ${activeClass}">
      <div onclick="filterByLabel('${label}')" class="flex items-center gap-2 flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ${iconColor}" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.41 11.58l-9-9A2 2 0 0011 2H4a2 2 0 00-2 2v7a2 2 0 00.59 1.41l9 9a2 2 0 002.82 0l7-7a2 2 0 000-2.83zM7 7a1 1 0 112 0 1 1 0 01-2 0z"/>
        </svg>
        <span>${label}</span>
      </div>
      <div class="flex gap-1 opacity-0 group-hover:opacity-100">
        <button onclick="editLabel('${label}')" class="text-yellow-600 hover:bg-yellow-200 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h2M12 4v2m6.364-1.636a2 2 0 112.828 2.828L7 21H3v-4L18.364 2.364z"/>
          </svg>
        </button>
        <button onclick="deleteLabel('${label}')" class="text-red-600 hover:bg-red-200 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4"/>
          </svg>
        </button>
      </div>
    </div>`;
}

function renderLabels() {
  const labels = loadLabels();
  DOM.labelList.innerHTML =
    labels.length === 0
      ? renderLabelEmptyState()
      : labels.map(renderLabelItem).join("");
}

function renderLabelOptions(selected = "") {
  const labels = loadLabels();
  const options = [
    '<option value="">-- No Label --</option>',
    ...labels.map(
      (l) =>
        `<option value="${l}" ${l === selected ? "selected" : ""}>${l}</option>`,
    ),
  ];
  DOM.inputs.label.innerHTML = options.join("");
}

function setActiveMenu() {
  [DOM.allMenu, DOM.favoriteMenu, DOM.trashMenu].forEach((menu) => {
    menu.classList.remove(...ACTIVE_MENU_CLASSES);
  });

  if (state.activeView === "all") {
    DOM.allMenu.classList.add(...ACTIVE_MENU_CLASSES);
  } else if (state.activeView === "favorite") {
    DOM.favoriteMenu.classList.add(...ACTIVE_MENU_CLASSES);
  } else if (state.activeView === "trash") {
    DOM.trashMenu.classList.add(...ACTIVE_MENU_CLASSES);
  }
}

function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen;
  DOM.sidebar.classList.toggle("w-64", state.sidebarOpen);
  DOM.sidebar.classList.toggle("w-0", !state.sidebarOpen);
}

function updateCounters() {
  const all = loadContacts();
  const activeContacts = all.filter((c) => !c.deletedAt);
  DOM.totalCount.innerText = activeContacts.length;
}

function updateTrashUI() {
  DOM.trashBanner.classList.toggle("hidden", state.activeView !== "trash");
  DOM.emptyTrashBtn.classList.toggle("hidden", state.activeView !== "trash");
}

function refreshUI() {
  applyFilterAndSort();
  renderLabels();
}

function updateBulkActionBar() {
  const count = state.selectedContacts.size;
  const isTrashView = state.activeView === "trash";

  if (count > 0) {
    DOM.bulkActionBar.classList.remove("hidden");
    DOM.selectedCount.textContent = count;

    if (isTrashView) {
      DOM.bulkAddLabelBtn.classList.add("hidden");
      DOM.bulkDeleteBtn.classList.remove("hidden");
      DOM.bulkRestoreBtn.classList.remove("hidden");
      DOM.bulkDeleteText.textContent = "Delete Forever";
      DOM.bulkDeleteBtn.onclick = confirmBulkDeletePermanent;
    } else {
      DOM.bulkAddLabelBtn.classList.remove("hidden");
      DOM.bulkDeleteBtn.classList.remove("hidden");
      DOM.bulkRestoreBtn.classList.add("hidden");
      DOM.bulkDeleteText.textContent = "Move to Trash";
      DOM.bulkDeleteBtn.onclick = confirmBulkDelete;
    }
  } else {
    DOM.bulkActionBar.classList.add("hidden");
  }

  const rows = document.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const checkbox = row.querySelector(".contact-checkbox");
    if (checkbox) {
      const id = parseInt(checkbox.dataset.id);
      const isSelected = state.selectedContacts.has(id);
      row.classList.toggle("bg-blue-50", isSelected);
      checkbox.checked = isSelected;
    }
  });
}

function updateSelectAllCheckbox() {
  const visibleContacts = getFilteredData();
  const allSelected =
    visibleContacts.length > 0 &&
    visibleContacts.every((c) => state.selectedContacts.has(c.id));
  DOM.selectAllCheckbox.checked = allSelected;
}

function handleSelectAll() {
  const isChecked = DOM.selectAllCheckbox.checked;
  if (isChecked) {
    selectAllContacts();
  } else {
    deselectAllContacts();
  }
}
