export enum TestData {
  FIRSTNAME = "TestFirstName",
  LASTNAME = "TestLastName",
  PASSWORD = "Test12345678",
  DATE_OF_BIRTH = "2000-01-01"
};

export const generateUniqueEmail = (): string => {
  return `testAQA${Date.now()}@gmail.com`
};
