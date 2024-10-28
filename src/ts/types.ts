export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type TimeSlot = '08:00-09:35' | '09:45-11:20' | '11:45-13:20' | '13:30-15:05' | '15:15-16:50' | '18:45-20:20';
export type CourseType = 'Lecture' | 'Seminar' | 'Lab' | 'Practice';

export type Professor = {
	id: number;
	name: string;
	department: string;
};

export type Classroom = {
	number: string;
	capacity: number;
	hasProjector: boolean;
};

export type Course = {
	id: number;
	name: string;
	type: CourseType;
};

export type Lesson = {
	courseId: number;
	professorId: number;
	classroomNumber: string;
	dayOfWeek: DayOfWeek;
	timeSlot: TimeSlot;
};

export type ScheduleConflict = {
	type: 'ProfessorConflict' | 'ClassroomConflict';
	lessonDetails: Lesson;
};
