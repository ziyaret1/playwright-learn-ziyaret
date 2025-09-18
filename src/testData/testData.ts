export enum TestData {
  FIRSTNAME = "TestFirstName",
  LASTNAME = "TestLastName",
  PASSWORD = "Test1234!",
  DATE_OF_BIRTH = "2000-01-01",
}

export const generateUniqueEmail = () =>    //for make email address unique (not added testdata because it is not fixed)
  `testzi${Date.now()}@mail.com`;