export enum TestData {
  FIRSTNAME = "TestAQA",
  LASTNAME = "TestAQA",
  PASSWORD = "Test12345678",
  DATE_OF_BIRTH = "2000-01-01"
}; 

export const generateUniqueEmail = (): string =>  {    //for make email address unique (not added testdata because it is not fixed)
return `testaqa${Date.now()}@mail.com`;
} 

export enum InvalidEmail {
  SIMPLE = "Abc",
  DOUBLE_AT = "Abc@abc@abc",
  SPACE_IN_LOCAL = "Abc abc@abc",
  INVALID_CHAR = "dsf()ds@ds"
}