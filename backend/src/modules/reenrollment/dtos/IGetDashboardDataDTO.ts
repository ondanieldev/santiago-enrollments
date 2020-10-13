interface IStudent {
    student_name: string;
    grade_name: string;
    type: string;
    paid: boolean;
}

interface IGrade {
    grade_name: string;
    value: number;
}

export default interface IGetDashboardDataDTO {
    enrollment_students: IStudent[];
    reenrollment_students: IStudent[];
    students_per_grade: IGrade[];
}
