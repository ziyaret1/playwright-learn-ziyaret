import path from 'path';

export enum TestData {
    FIRSTNAME = 'TestAQA',
    LASTNAME = 'TestAQA',
    PASSWORD = 'Test12345678',
    DATE_OF_BIRTH = '2000-01-01',
}
export const generateUniqueEmail = (): string => {
    //for make email address unique (not added testdata because it is not fixed)
    return `testaqa${Date.now()}@mail.com`;
};
export enum InvalidEmail {
    SIMPLE = 'Abc',
    DOUBLE_AT = 'Abc@abc@abc',
    SPACE_IN_LOCAL = 'Abc abc@abc',
    INVALID_CHAR = 'dsf()ds@ds',
}
export enum TestDataSignin {
    EMAIL = 'testZi@gmail.com',
    PASSWORD = 'Zi11111111',
    //! Password validation test data
    PASSWORD_MIN = '12345678', // 8 characters
    PASSWORD_MAX = '12345678901234567890', // 20 characters
    PASSWORD_UNDER_MIN = '1234567', // 7 characters
    PASSWORD_OVER_MAX = '123456789012345678901', // 21 characters
}
export enum PageUrls {
    REGISTER = 'https://qa-course-01.andersenlab.com/registration',
    SIGNIN = 'https://qa-course-01.andersenlab.com/login',
    USER_PROFILE = 'https://qa-course-01.andersenlab.com/',
}
export const TestFiles = {
  PHOTO: path.resolve('src/testData/files/testImage.png'),
};