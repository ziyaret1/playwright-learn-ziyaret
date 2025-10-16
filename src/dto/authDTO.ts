export interface RegisterDataDTO {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
}

export interface SignInRequestDTO {
    email: string;
    password: string;
}

export interface SignInRegisterResponseDTO {
    'jwt-token': string;
}

//! Courses DTO
export interface FilterCoursesRequestDTO {
    language?: string;
    type?: string;
    country?: string;
}

export interface FilterCoursesResponseDTO {
    courses: CourseDTO[];
}

export interface CourseDTO {
    name: string;
    country: string;
    language: string;
    type: string;
    startDate: string;
}

export interface CoursesResponseDTO {
    courses: CourseDTO[];
}

export interface CourseTypesResponseDTO {
    types: string[];
}

export interface CourseLanguagesResponseDTO {
    languages: string[];
}

export interface CourseCountriesDTO {
    countries: string[];
}
