export function validateEmail(email: string): boolean {
  const emailRegex = /^\w+@\w+(\.\w)+/;

  return emailRegex.test(email);
}

export function validatePhoneNo(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;

  return phoneRegex.test(phone);
}

export function validateResume(resume: File): boolean {
  const fileTypes = ['application/pdf'];
  const maxSize = 5 * 1024 * 1024;

  const isValidFormat = fileTypes.includes(resume.type);
  const isValidSize = resume.size <= maxSize;

  if (isValidFormat && isValidSize) return true;

  return false;
}
