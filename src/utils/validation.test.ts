import { validateEmail, validatePhoneNo, validateResume } from './validation';
import { TextEncoder } from 'util';

describe('Test validation functions', () => {
  test('if email validation works properly', () => {
    expect(validateEmail('tesat@test.com')).toBe(true);
    expect(validateEmail('tesat@test.eu.org')).toBe(true);
    expect(validateEmail('a@a.com')).toBe(true);
    expect(validateEmail('  tesat@test.com   ')).toBe(false);
    expect(validateEmail('tesat@.com')).toBe(false);
    expect(validateEmail('tesat@testcom')).toBe(false);
    expect(validateEmail('tesat@test.')).toBe(false);
    expect(validateEmail('@test.com')).toBe(false);
  });

  test('if phone number validation works properly', () => {
    expect(validatePhoneNo('1234567890')).toBe(true);
    expect(validatePhoneNo('9990001313')).toBe(true);
    expect(validatePhoneNo('  1234567890   ')).toBe(false);
    expect(validatePhoneNo('123asdf123')).toBe(false);
    expect(validatePhoneNo('12345')).toBe(false);
    expect(validatePhoneNo('aaaaaaaaaa')).toBe(false);
    expect(validatePhoneNo('aaaa')).toBe(false);
  });

  test('if resume validation works properly', () => {
    const pdfContent =
      '%PDF-1.3\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 44 >>\nstream\nBT /F1 24 Tf 250 750 Td (Hello, world!) Tj ET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000077 00000 n \n0000000178 00000 n \n0000000297 00000 n \n0000000357 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n424\n%%EOF\n';

    const pdfContentArray = new TextEncoder().encode(pdfContent);

    const pdfBlob = new Blob([pdfContentArray], { type: 'application/pdf' });

    expect(validateResume(new File(['foo'], 'foo.txt'))).toBe(false);
    expect(
      validateResume(
        new File([pdfBlob], 'foo.pdf', {
          type: 'application/pdf',
          lastModified: new Date().getTime()
        })
      )
    ).toBe(true);
  });
});
