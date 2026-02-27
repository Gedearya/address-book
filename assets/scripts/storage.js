// ================= STORAGE =================
// Generic storage functions
function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return [];
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// Specific functions
function loadContacts() {
  return loadFromStorage("contacts");
}

function saveContacts(data) {
  saveToStorage("contacts", data);
}

function loadLabels() {
  return loadFromStorage("labels");
}

function saveLabels(data) {
  saveToStorage("labels", data);
}

function clearAllContacts() {
  try {
    localStorage.removeItem("contacts");
    console.log("All contacts cleared!");
    return { success: true };
  } catch (error) {
    console.error("Error clearing contacts:", error);
    return { success: false, message: error.message };
  }
}
