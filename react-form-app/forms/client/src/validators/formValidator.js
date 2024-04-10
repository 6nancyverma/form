import { validateEmail, validatePhone } from "./validators";

export function validateForm(formData) {
  const errors = {};
  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!formData.email.trim() || !validateEmail(formData.email)) {
    errors.email = !formData.email.trim()
      ? "Email is required."
      : "Invalid email address.";
  }
  if (!formData.phone.trim() || !validatePhone(formData.phone)) {
    errors.phone = !formData.phone.trim()
      ? "Phone is required."
      : "Invalid phone number.";
  }
  return errors;
}
