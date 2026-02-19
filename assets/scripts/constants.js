// ================= CONSTANTS =================
const STORAGE_KEY = "contacts";

const VALIDATION_RULES = {
  phone: /^[0-9,+\-]+$/,
  email: /^\S+@\S+\.\S+$/,
};

const VALIDATION_MESSAGES = {
  name: "Name is required",
  phone: "Phone number is required",
  email: "Email is required",
  address: "Address is required",
  phoneFormat: "Phone must contain only numbers, hyphens, and plus signs",
  emailFormat: "Invalid email format",
  duplicate: "Contact already exists!",
  notFound: "Contact not found!",
};

const SEARCHABLE_FIELDS = ["name", "phone", "email", "address"];
