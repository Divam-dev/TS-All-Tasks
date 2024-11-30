enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}

enum Semester {
    First = "First",
    Second = "Second"
}

enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = "Computer Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}

interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grades {
    studentId: number;
    courseId: number;
    grade: Grade;
    date: Date;
    semester: Semester;
}

class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grades[] = [];
    private enrollments: { studentId: number; courseId: number }[] = [];
    private nextStudentId: number = 1;
    private nextCourseId: number = 1;

    // Метод для запису студента в університет
    enrollStudent(studentData: Omit<Student, "id">): Student {
        
        if (!studentData.fullName || !studentData.faculty || 
            studentData.year <= 0 || !studentData.groupNumber) {
            throw new Error("Invalid student data");
        }

        const student: Student = {
            id: this.nextStudentId++,
            ...studentData,
            status: StudentStatus.Active,
            enrollmentDate: new Date()
        };

        this.students.push(student);
        return student;
    }

    // Метод для реєстрації студента на курс
    registerForCourse(studentId: number, courseId: number): void {
        
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        
        if (!student) throw new Error("Student not found");
        if (!course) throw new Error("Course not found");
        
        
        if (student.status !== StudentStatus.Active) {
            throw new Error("Only active students can register for courses");
        }

        
        if (student.faculty !== course.faculty) {
            throw new Error("Course is not available for student's faculty");
        }

        
        const currentEnrollment: number = this.grades.filter(g => g.courseId === courseId).length;
        if (currentEnrollment >= course.maxStudents) {
            throw new Error("Course is full");
        }

        this.enrollments.push({
            studentId,
            courseId
        });
    }


    // Метод для виставлення оцінки студенту
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        
        const existingRegistration = this.enrollments.find(
            g => g.studentId === studentId && g.courseId === courseId
        );

        if (!existingRegistration) {
            throw new Error("Student is not registered for this course");
        }

            this.grades.push({
                studentId,
                courseId,
                grade,
                date: new Date(),
                semester: this.courses.find(c => c.id === courseId)!.semester
            });
    }


    // Метод для оновлення статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);

        if (!student) {
            throw new Error("Student not found.");
        }

        if (newStatus === StudentStatus.Graduated && student.year < 4) {
            throw new Error("Student cannot graduate before completing all years.");
        }

        if (newStatus === StudentStatus.Expelled && student.status === StudentStatus.Graduated) {
            throw new Error("Graduated students cannot be expelled.");
        }

        student.status = newStatus;
    }

    // Метод для отримання студентів за факультетом
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }


    // Метод для отримання оцінок студента
    getStudentGrades(studentId: number): Grade[] {
        return this.grades
            .filter(g => g.studentId === studentId)
            .map(g => g.grade);
    }


    // Метод для отримання доступних курсів
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(
            c => c.faculty === faculty && c.semester === semester
        );
    }

    // Метод для розрахунку середнього балу
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.grades.filter(g => g.studentId === studentId);
        
        if (studentGrades.length === 0) return 0;

        const totalGrade = studentGrades.reduce((sum, g) => sum + Number(g.grade), 0);
        return Number((totalGrade / studentGrades.length).toFixed(2));
    }


    // Метод для отримання відмінників
    getTopStudents(faculty: Faculty): Student[] {
        return this.students.filter(student => 
            student.faculty === faculty && 
            this.calculateAverageGrade(student.id) >= 5
        );
    }

    // Метод для додавання нового курсу
    addCourse(course: Omit<Course, "id">): Course {
        const newCourse: Course = {
            id: this.nextCourseId++,
            ...course
        };
        this.courses.push(newCourse);
        return newCourse;
    }
}

// Тестування
const ums = new UniversityManagementSystem();

const course1 = ums.addCourse({
    name: "TypeScript",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 25
});

const course2 = ums.addCourse({
    name: "Java",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.Second,
    faculty: Faculty.Computer_Science,
    maxStudents: 20
})

const course3 = ums.addCourse({
    name: "Economics",
    type: CourseType.Optional,
    credits: 3,
    semester: Semester.First,
    faculty: Faculty.Economics,
    maxStudents: 15
});

const student1 = ums.enrollStudent({
    fullName: "Андрій Іванович",
    faculty: Faculty.Computer_Science,
    year: 1,
    groupNumber: "ПД-31",
    status: StudentStatus.Active,
    enrollmentDate: new Date()
});

const student2 = ums.enrollStudent({
    fullName: "Євгеній Петрович",
    faculty: Faculty.Economics,
    year: 2,
    groupNumber: "ПД-41",
    status: StudentStatus.Active,
    enrollmentDate: new Date()
});

ums.registerForCourse(student1.id, course1.id);
ums.registerForCourse(student1.id, course2.id);

ums.registerForCourse(student2.id, course3.id);

ums.setGrade(student1.id, course1.id, Grade.Excellent);
ums.setGrade(student1.id, course2.id, Grade.Good);

ums.setGrade(student2.id, course3.id, Grade.Excellent);

// Тестування методів
const csStudents = ums.getStudentsByFaculty(Faculty.Computer_Science);
console.log("Computer Science Students:", csStudents);

const ecStudents = ums.getStudentsByFaculty(Faculty.Economics);
console.log("Economics Students:", ecStudents);

const availableCourses = ums.getAvailableCourses(Faculty.Computer_Science, Semester.First);
console.log("Available Courses for Computer Science, First Semester:", availableCourses);

const availableEcCourses = ums.getAvailableCourses(Faculty.Economics, Semester.First);
console.log("Available Courses for Economics, First Semester:", availableEcCourses);

const std1Grades = ums.getStudentGrades(student1.id);
console.log("Student 1 Grades:", std1Grades);

const std1Average = ums.calculateAverageGrade(student1.id);
console.log("Student 1 Average Grade:", std1Average);

const ecTopStudents = ums.getTopStudents(Faculty.Economics);
console.log("Top Students in Economics:", ecTopStudents);

ums.updateStudentStatus(student1.id, StudentStatus.Academic_Leave);
console.log("Student 1 status updated:", student1.status);