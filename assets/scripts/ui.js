// ================= DOM CACHE =================
const DOM = {
  // Lists
  contactList: document.getElementById("contactList"),
  totalCount: document.getElementById("totalCount"),
  labelList: document.getElementById("labelList"),

  // Sidebar
  sidebar: document.getElementById("sidebar"),
  toggleSidebarBtn: document.getElementById("toggleSidebarBtn"),

  // Menu buttons
  openFormBtn: document.getElementById("openFormBtn"),
  allMenu: document.getElementById("allMenu"),
  favoriteMenu: document.getElementById("favoriteMenu"),
  trashMenu: document.getElementById("trashMenu"),
  emptyTrashBtn: document.getElementById("emptyTrashBtn"),
  trashBanner: document.getElementById("trashBanner"),

  // Search and sort
  search: document.getElementById("search"),
  sortBtn: document.getElementById("sortBtn"),

  // Modals
  formModal: document.getElementById("formModal"),
  labelModal: document.getElementById("labelModal"),
  detailPanel: document.getElementById("detailPanel"),
  detailOverlay: document.getElementById("detailOverlay"),

  // Form buttons
  cancelFormBtn: document.getElementById("cancelFormBtn"),
  saveContactBtn: document.getElementById("saveContactBtn"),

  // Label buttons
  openLabelBtn: document.getElementById("openLabelBtn"),
  cancelLabelBtn: document.getElementById("cancelLabelBtn"),
  saveLabelBtn: document.getElementById("saveLabelBtn"),

  // Confirm modal
  confirmModal: document.getElementById("confirmModal"),
  confirmTitle: document.getElementById("confirmTitle"),
  confirmMessage: document.getElementById("confirmMessage"),
  confirmCancelBtn: document.getElementById("confirmCancelBtn"),
  confirmOkBtn: document.getElementById("confirmOkBtn"),

  // Bulk operations
  selectAllCheckbox: document.getElementById("selectAllCheckbox"),
  bulkActionBar: document.getElementById("bulkActionBar"),
  selectedCount: document.getElementById("selectedCount"),
  bulkAddLabelBtn: document.getElementById("bulkAddLabelBtn"),
  bulkRestoreBtn: document.getElementById("bulkRestoreBtn"),
  bulkDeleteBtn: document.getElementById("bulkDeleteBtn"),
  bulkDeleteText: document.getElementById("bulkDeleteText"),
  bulkDeselectBtn: document.getElementById("bulkDeselectBtn"),
  bulkLabelModal: document.getElementById("bulkLabelModal"),
  bulkLabelModalTitle: document.getElementById("bulkLabelModalTitle"),
  bulkLabelSelect: document.getElementById("bulkLabelSelect"),
  bulkLabelCount: document.getElementById("bulkLabelCount"),
  cancelBulkLabelBtn: document.getElementById("cancelBulkLabelBtn"),
  applyBulkLabelBtn: document.getElementById("applyBulkLabelBtn"),

  // Form inputs
  inputs: {
    id: document.getElementById("contactId"),
    name: document.getElementById("name"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    address: document.getElementById("address"),
    avatar: document.getElementById("avatar"),
    label: document.getElementById("label"),
    newLabel: document.getElementById("newLabelInput"),
  },
};

// ================= CONSTANTS =================
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

// ================= HELPERS =================
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

// ================= EMPTY STATES =================
function getEmptyStateConfig() {
  const configs = {
    noContacts: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>`,
      title: "No contacts yet",
      message: "Get started by adding your first contact",
      action: `<button onclick="DOM.openFormBtn.click()" class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
        Add Contact
      </button>`,
    },
    noSearchResults: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>`,
      title: "No results found",
      message: `No contacts match "${state.search}"`,
      action: `<button onclick="DOM.search.value=''; DOM.search.dispatchEvent(new Event('input'))" class="mt-4 text-blue-500 hover:text-blue-600 transition">
        Clear search
      </button>`,
    },
    emptyTrash: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>`,
      title: "Trash is empty",
      message: "Deleted contacts will appear here",
      action: "",
    },
    emptyFavorites: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>`,
      title: "No favorites yet",
      message: "Star contacts to add them to favorites",
      action: "",
    },
    emptyLabel: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
      </svg>`,
      title: "No contacts in this label",
      message: `No contacts with label "${state.activeLabel}"`,
      action: "",
    },
    noLabels: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
      </svg>`,
      title: "No labels yet",
      message: "Create labels to organize your contacts",
      action: "",
    },
  };

  return configs;
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

// ================= RENDER =================
function updateTableHeader() {
  const thead = document.querySelector("table thead tr");

  if (state.activeView === "trash") {
    // Trash view header
    thead.innerHTML = `
      <th class="text-left p-3 w-12">
        <input
          type="checkbox"
          id="selectAllCheckbox"
          class="w-4 h-4 text-blue-600 rounded cursor-pointer"
          title="Select All"
        />
      </th>
      <th class="text-left p-3">Name</th>
      <th class="text-left p-3">Deleted</th>
      <th class="text-left p-3">Delete Forever</th>
    `;
  } else {
    // Normal view header
    thead.innerHTML = `
      <th class="text-left p-3 w-12">
        <input
          type="checkbox"
          id="selectAllCheckbox"
          class="w-4 h-4 text-blue-600 rounded cursor-pointer"
          title="Select All"
        />
      </th>
      <th class="text-left p-3">Name</th>
      <th class="text-left p-3">Email</th>
      <th class="text-left p-3">Phone</th>
      <th class="text-left p-3">Label</th>
    `;
  }

  // Re-attach select all event listener
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

  // Trash view - different columns
  if (state.activeView === "trash" && contact.deletedAt) {
    const deletedDate = dayjs(contact.deletedAt);
    const deleteForeverDate = deletedDate.add(TRASH_RETENTION_DAYS, "day");
    const now = dayjs();

    // Format: "16 Feb 2024" atau "Today" atau "Yesterday"
    const formatDeletedDate = () => {
      const diffDays = now.diff(deletedDate, "day");
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      return deletedDate.format("D MMM YYYY");
    };

    // Format: "15 Mar 2024" dengan warna merah jika kurang dari 7 hari
    const daysUntilDelete = deleteForeverDate.diff(now, "day");
    const deleteForeverText = deleteForeverDate.format("D MMM YYYY");
    const deleteForeverClass =
      daysUntilDelete <= 7 ? "text-red-600 font-semibold" : "";

    return `
      <tr class="border-b hover:bg-gray-100 ${isSelected ? "bg-blue-50" : ""}">
        <td class="p-3">
          <input
            type="checkbox"
            class="contact-checkbox w-4 h-4 text-blue-600 rounded cursor-pointer"
            data-id="${contact.id}"
            ${isSelected ? "checked" : ""}
            onclick="event.stopPropagation(); toggleSelectContact(${contact.id})"
          />
        </td>
        <td class="p-3 flex items-center gap-3 cursor-pointer" onclick="showDetail(${contact.id})">
          ${renderAvatar(contact)}
          <div>
            <div>${contact.name}</div>
            <div class="text-xs text-gray-500">${contact.email || contact.phone || ""}</div>
          </div>
        </td>
        <td class="p-3 cursor-pointer text-gray-600" onclick="showDetail(${contact.id})">
          ${formatDeletedDate()}
        </td>
        <td class="p-3 cursor-pointer ${deleteForeverClass}" onclick="showDetail(${contact.id})">
          ${deleteForeverText}
          ${daysUntilDelete <= 7 ? `<div class="text-xs">(${daysUntilDelete} days left)</div>` : ""}
        </td>
      </tr>`;
  }

  // Normal view - original columns
  const labelBadge = contact.label
    ? `<div class="inline-block bg-blue-100 text-blue-600 
         px-3 py-1 rounded-full text-xs font-medium">
         ${contact.label}
       </div>`
    : "";

  return `
    <tr class="border-b hover:bg-gray-100 ${isSelected ? "bg-blue-50" : ""}">
      <td class="p-3">
        <input
          type="checkbox"
          class="contact-checkbox w-4 h-4 text-blue-600 rounded cursor-pointer"
          data-id="${contact.id}"
          ${isSelected ? "checked" : ""}
          onclick="event.stopPropagation(); toggleSelectContact(${contact.id})"
        />
      </td>
      <td class="p-3 flex items-center gap-3 cursor-pointer" onclick="showDetail(${contact.id})">
        ${renderAvatar(contact)}
        ${contact.name}
      </td>
      <td class="p-3 cursor-pointer" onclick="showDetail(${contact.id})">${contact.email || "-"}</td>
      <td class="p-3 cursor-pointer" onclick="showDetail(${contact.id})">
        ${contact.phone ? formatPhoneDisplay(contact.phone) : "-"}
      </td>
      <td class="p-3 cursor-pointer" onclick="showDetail(${contact.id})">${labelBadge}</td>
    </tr>`;
}

function renderContacts(data = loadContacts()) {
  // Update table header based on view
  updateTableHeader();

  // Determine empty state type
  if (data.length === 0) {
    let emptyStateType;

    if (state.search) {
      emptyStateType = "noSearchResults";
    } else if (state.activeView === "trash") {
      emptyStateType = "emptyTrash";
    } else if (state.activeView === "favorite") {
      emptyStateType = "emptyFavorites";
    } else if (state.activeView === "label") {
      emptyStateType = "emptyLabel";
    } else {
      // Check if there are any contacts at all
      const allContacts = loadContacts();
      emptyStateType =
        allContacts.length === 0 ? "noContacts" : "noSearchResults";
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
        <svg xmlns="http://www.w3.org/2000/svg"
             class="w-4 h-4 ${iconColor}"
             viewBox="0 0 24 24"
             fill="currentColor">
          <path d="M21.41 11.58l-9-9A2 2 0 0011 2H4a2 2 0 00-2 2v7a2 2 0 00.59 1.41l9 9a2 2 0 002.82 0l7-7a2 2 0 000-2.83zM7 7a1 1 0 112 0 1 1 0 01-2 0z"/>
        </svg>
        <span>${label}</span>
      </div>
      <div class="flex gap-1 opacity-0 group-hover:opacity-100">
        <button onclick="editLabel('${label}')"
                class="text-yellow-600 hover:bg-yellow-200 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5h2M12 4v2m6.364-1.636a2 2 0 112.828 2.828L7 21H3v-4L18.364 2.364z"/>
          </svg>
        </button>
        <button onclick="deleteLabel('${label}')"
                class="text-red-600 hover:bg-red-200 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4"/>
          </svg>
        </button>
      </div>
    </div>`;
}

function renderLabels() {
  const labels = loadLabels();

  if (labels.length === 0) {
    DOM.labelList.innerHTML = renderLabelEmptyState();
  } else {
    DOM.labelList.innerHTML = labels.map(renderLabelItem).join("");
  }
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
  DOM.inputs.label.value = selected || "";
  updateLabelColor();
}

// ================= MENU ACTIVE =================
function setActiveMenu() {
  const menus = {
    all: DOM.allMenu,
    favorite: DOM.favoriteMenu,
    trash: DOM.trashMenu,
  };

  Object.values(menus).forEach((menu) => {
    menu.classList.remove(...ACTIVE_MENU_CLASSES);
  });

  const activeMenu = menus[state.activeView];
  if (activeMenu) {
    activeMenu.classList.add(...ACTIVE_MENU_CLASSES);
  }
}

// ================= DETAIL PANEL =================
function showDetail(id) {
  const c = loadContacts().find((x) => x.id === id);

  DOM.detailPanel.innerHTML = `
<!-- Header -->
<div class="flex items-center gap-3 mb-6">
  <button 
    onclick="closeDetail()"
    class="flex items-center gap-1
    border border-gray-300
    text-gray-700
    px-3 py-1.5 rounded-lg
    hover:bg-gray-100 transition text-sm">
    ← Back
  </button>

 <div class="inline-block">
  <p class="font-semibold text-gray-700 relative pb-1">
    Detail Contact
    <span class="absolute left-0 bottom-0 w-1/2 h-[2px] bg-blue-500 rounded"></span>
  </p>
</div>
</div>

<div class="flex items-center gap-2 mb-4">
  <h1 class="text-2xl font-bold text-gray-900">
    ${c.name}
  </h1>

  <button onclick="toggleFavorite(${c.id})">
    <svg xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 ${c.favorite ? "text-yellow-400" : "text-gray-300"}"
      fill="currentColor"
      viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03
        L22 9.24l-7.19-.61L12 2
        9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  </button>
</div>

<div class="bg-white rounded-xl border p-5">

  <div class="flex justify-center mb-4">
    ${renderAvatar(c, "w-36 h-36", "text-5xl", false)}
  </div>

  <div class="space-y-3 text-sm">
    <div class="flex">
      <span class="w-20 text-gray-500">Email</span>
      <span class="font-medium">${c.email || "-"}</span>
    </div>

    <div class="flex">
      <span class="w-20 text-gray-500">Phone</span>
      <span class="font-medium">
        ${c.phone ? formatPhoneDisplay(c.phone) : "-"}
      </span>
    </div>

    <div class="flex">
      <span class="w-20 text-gray-500">Address</span>
      <span class="font-medium">${c.address || "-"}</span>
    </div>

  </div>

  ${
    c.label
      ? `<div class="mt-4">
          <span class="inline-block bg-blue-100 text-blue-600 
          px-3 py-1 rounded-full text-xs font-medium">
            ${c.label}
          </span>
        </div>`
      : ""
  }
</div>

<div class="mt-6 flex gap-3">
${
  c.deletedAt
    ? `
      <button
        onclick="restoreContact(${c.id})"
        class="bg-green-500 hover:bg-green-600 text-white 
        px-4 py-2 rounded-lg transition">
        Restore
      </button>

      <button
        onclick="deletePermanent(${c.id})"
        class="bg-red-600 hover:bg-red-700 text-white 
        px-4 py-2 rounded-lg transition">
        Delete Forever
      </button>
    `
    : `
      <button
        onclick="editContact(${c.id})"
        class="bg-yellow-400 hover:bg-yellow-500 
        px-4 py-2 rounded-lg transition">
        Edit
      </button>

      <button
        onclick="deleteContact(${c.id}, '${c.name}')"
        class="bg-red-500 hover:bg-red-600 text-white 
        px-4 py-2 rounded-lg transition">
        Delete
      </button>
    `
}

</div>
`;
  DOM.detailPanel.classList.remove("translate-x-full");
  DOM.detailOverlay.classList.remove("hidden");
}

function closeDetail() {
  DOM.detailPanel.classList.add("translate-x-full");
  DOM.detailOverlay.classList.add("hidden");
}

// ================= UI HELPERS =================
function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen;

  if (state.sidebarOpen) {
    DOM.sidebar.classList.remove("w-0");
    DOM.sidebar.classList.add("w-64");
  } else {
    DOM.sidebar.classList.remove("w-64");
    DOM.sidebar.classList.add("w-0");
  }
}

function updateCounters() {
  const all = loadContacts();
  const activeContacts = all.filter((c) => !c.deletedAt);

  DOM.totalCount.innerText = activeContacts.length;
}

function updateTrashUI() {
  const isTrashView = state.activeView === "trash";
  DOM.emptyTrashBtn.classList.toggle("hidden", !isTrashView);
  DOM.trashBanner.classList.toggle("hidden", !isTrashView);
}

function applyFilterAndSort() {
  const data = getFilteredData();
  const sortedData = sortData(data);

  updateTrashUI();
  renderContacts(sortedData);
  renderLabels();
  setActiveMenu();
}

function refreshUI() {
  applyFilterAndSort();
  renderLabels();
  renderLabelOptions();
  updateCounters();
}

// ================= MODAL UTILITIES =================
function showFieldError(fieldName, message) {
  const input = DOM.inputs[fieldName];
  const errorId = `${fieldName}Error`;
  let errorElement = document.getElementById(errorId);

  // Add red border to input
  input.classList.add("border-red-500");
  input.classList.remove("border-gray-300");

  // Create or update error message
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

  // Remove red border
  input.classList.remove("border-red-500");
  input.classList.add("border-gray-300");

  // Remove error message
  if (errorElement) {
    errorElement.remove();
  }
}

function clearAllErrors() {
  const fields = ["name", "phone", "email", "address"];
  fields.forEach((field) => clearFieldError(field));
}

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

function openConfirmModal(title, message, onConfirm, okText = "Delete") {
  DOM.confirmTitle.innerText = title;
  DOM.confirmMessage.innerHTML = message;
  DOM.confirmOkBtn.innerText = okText;

  toggleModal(DOM.confirmModal, true);

  DOM.confirmCancelBtn.onclick = closeConfirmModal;
  DOM.confirmOkBtn.onclick = () => {
    closeConfirmModal();
    onConfirm();
  };
}

function closeConfirmModal() {
  // Reset cancel button visibility
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

// ================= BULK OPERATIONS UI =================
function updateBulkActionBar() {
  const count = state.selectedContacts.size;

  if (count > 0) {
    DOM.bulkActionBar.classList.remove("hidden");
    DOM.bulkActionBar.classList.add("flex");
    DOM.selectedCount.textContent = `${count} selected`;

    // Show/hide buttons based on active view
    if (state.activeView === "trash") {
      // In trash: show Restore and Delete Forever
      DOM.bulkAddLabelBtn.classList.add("hidden");
      DOM.bulkRestoreBtn.classList.remove("hidden");
      DOM.bulkDeleteText.textContent = "Delete Forever";
      DOM.bulkDeleteBtn.title = "Delete Forever";
    } else {
      // Not in trash: show Label and Delete (move to trash)
      DOM.bulkAddLabelBtn.classList.remove("hidden");
      DOM.bulkRestoreBtn.classList.add("hidden");
      DOM.bulkDeleteText.textContent = "Delete";
      DOM.bulkDeleteBtn.title = "Delete Selected";
    }
  } else {
    DOM.bulkActionBar.classList.add("hidden");
    DOM.bulkActionBar.classList.remove("flex");
  }
}

function updateSelectAllCheckbox() {
  const visibleContacts = getFilteredData();
  const allSelected =
    visibleContacts.length > 0 &&
    visibleContacts.every((c) => state.selectedContacts.has(c.id));

  DOM.selectAllCheckbox.checked = allSelected;
  DOM.selectAllCheckbox.indeterminate =
    state.selectedContacts.size > 0 && !allSelected;
}

function handleSelectAll() {
  const visibleContacts = getFilteredData();
  const allSelected = visibleContacts.every((c) =>
    state.selectedContacts.has(c.id),
  );

  if (allSelected) {
    // Deselect all visible
    visibleContacts.forEach((c) => state.selectedContacts.delete(c.id));
  } else {
    // Select all visible
    visibleContacts.forEach((c) => state.selectedContacts.add(c.id));
  }

  updateBulkActionBar();
  updateSelectAllCheckbox();
  applyFilterAndSort();
}

function openBulkLabelModal() {
  if (state.selectedContacts.size === 0) return;

  // Get selected contacts
  const selectedIds = Array.from(state.selectedContacts);
  const allContacts = loadContacts();
  const selectedContactsData = allContacts.filter((c) =>
    selectedIds.includes(c.id),
  );

  // Check if any selected contact has a label
  const hasLabels = selectedContactsData.some(
    (c) => c.label && c.label.trim() !== "",
  );

  // Set modal title based on whether contacts have labels
  DOM.bulkLabelModalTitle.textContent = hasLabels ? "Edit Label" : "Add Label";

  // Populate label options (like add contact form)
  const labels = loadLabels();
  const options = [
    '<option value="">-- No Label --</option>',
    ...labels.map((l) => `<option value="${l}">${l}</option>`),
  ];

  DOM.bulkLabelSelect.innerHTML = options.join("");
  DOM.bulkLabelCount.textContent = state.selectedContacts.size;

  // Update label color (like in add contact form)
  updateBulkLabelColor();

  toggleModal(DOM.bulkLabelModal, true);
}

function closeBulkLabelModal() {
  toggleModal(DOM.bulkLabelModal, false);
}

function updateBulkLabelColor() {
  const hasValue = DOM.bulkLabelSelect.value !== "";
  DOM.bulkLabelSelect.classList.toggle("text-gray-400", !hasValue);
  DOM.bulkLabelSelect.classList.toggle("text-black", hasValue);
}

function applyBulkLabel() {
  const label = DOM.bulkLabelSelect.value;

  // Empty string means no label (remove label)
  bulkAddLabel(label);
  closeBulkLabelModal();
}

function confirmBulkDelete() {
  if (state.selectedContacts.size === 0) return;

  const count = state.selectedContacts.size;

  if (state.activeView === "trash") {
    // Delete permanently
    openConfirmModal(
      "Delete Forever",
      `Permanently delete <span class="font-semibold text-red-600">${count} contact${count > 1 ? "s" : ""}</span>? This cannot be undone.`,
      () => {
        bulkDeletePermanent();
      },
      "Delete Forever",
    );
  } else {
    // Move to trash
    openConfirmModal(
      "Delete Selected Contacts",
      `Move <span class="font-semibold text-red-600">${count} contact${count > 1 ? "s" : ""}</span> to trash?`,
      () => {
        bulkDelete();
      },
      "Move to Trash",
    );
  }
}

function confirmBulkRestore() {
  if (state.selectedContacts.size === 0) return;

  const count = state.selectedContacts.size;
  openConfirmModal(
    "Restore Selected Contacts",
    `Restore <span class="font-semibold text-green-600">${count} contact${count > 1 ? "s" : ""}</span> from trash?`,
    () => {
      bulkRestore();
    },
    "Restore",
  );
}
