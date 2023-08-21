import { validateEmail, validatePhoneNo } from './validation';

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
});
