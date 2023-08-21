export function validateEmail(email: string): boolean {
  const emailRegex = /^\w+@\w+(\.\w)+/;

  return emailRegex.test(email);
}

export function validatePhoneNo(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;

  return phoneRegex.test(phone);
}
