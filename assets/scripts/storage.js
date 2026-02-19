// ================= STORAGE =================
function loadContacts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading contacts:", error);
    return [];
  }
}

function saveContacts(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving contacts:", error);
  }
}

function clearAllContacts() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("All contacts cleared!");
    return { success: true };
  } catch (error) {
    console.error("Error clearing contacts:", error);
    return { success: false, message: error.message };
  }
}
