export interface FilterCoursesRequestDTO {
    language: string;
    type: string;
}

export interface CourseDTO {
    id: number;
    name: string;
    language: string;
    type: string;
}

export interface FilterCoursesResponseDTO {
    courses: CourseDTO[];
}

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
