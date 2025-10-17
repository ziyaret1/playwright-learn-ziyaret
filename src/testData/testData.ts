import path from 'path';
export enum TestData {
    FIRSTNAME = 'TestAQA',
    LASTNAME = 'TestAQA',
    PASSWORD = 'Test12345678',
    DATE_OF_BIRTH = '2000-01-01',
}
export const generateUniqueEmail = (): string => {
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
    // Password validation test data
    PASSWORD_MIN = '12345678', // 8 characters
    PASSWORD_MAX = '12345678901234567890', // 20 characters
    PASSWORD_UNDER_MIN = '1234567', // 7 characters
    PASSWORD_OVER_MAX = '123456789012345678901', // 21 characters
}
export enum PageUrls {
    REGISTER = 'https://qa-course-01.andersenlab.com/registration',
    SIGNIN = 'https://qa-course-01.andersenlab.com/login',
    USER_PROFILE = 'https://qa-course-01.andersenlab.com/',
    SELECT_COURSES = 'https://qa-course-01.andersenlab.com/select',
    DRAG_AND_DROP = 'https://qa-course-01.andersenlab.com/dragndrop',
    ACTIONS_AND_ALERTS = 'https://qa-course-01.andersenlab.com/actions',
}
export const TestFiles = {
    PHOTO: path.resolve('src/testData/files/testImage.png'),
};
export enum CourseEndpoints {
    FILTER_COURSE_ENDP = '/api/secured/course/filter',
    COURSES_ENDP = '/api/secured/course',
    TYPES_ENDP = '/api/secured/course/types',
    LANGUAGES_ENDP = '/api/secured/course/languages',
    COUNTRIES_ENDP = '/api/secured/course/countries',
}
export enum UserProfilesEndpoints {
    ACCOUNT_PHOTO_ENDP = '/api/secured/account/photo', // check this secured think
    EDIT_USERINFO_ENDP = '/api/secured/account/edit',
    VIEW_USERINFO_ENDP = '/api/secured/account/view',
    DELETE_ACCOUNT_ENDP = '/api/secured/account/delete',
}
export enum AuthEndpoints {
    REGISTER_ENDP = '/api/public/registration',
    SIGNIN_ENDP = '/api/public/login',
}
export enum HealthCheckEndpoints {
    HEALTH_CHECK_SECURED = '/api/secured/health',
    HEALTH_CHECK_PUBLIC = '/api/public/health',
}
