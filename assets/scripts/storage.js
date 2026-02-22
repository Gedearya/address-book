// ================= STORAGE =================
function loadContacts() {
  try {
    const data = localStorage.getItem("contacts");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading contacts:", error);
    return [];
  }
}

function saveContacts(data) {
  try {
    localStorage.setItem("contacts", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving contacts:", error);
  }
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

function loadLabels() {
  try {
    const data = localStorage.getItem("labels");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading labels:", error);
    return [];
  }
}

function saveLabels(data) {
  try {
    localStorage.setItem("labels", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving labels:", error);
  }
}
