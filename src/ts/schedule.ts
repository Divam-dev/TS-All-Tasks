import { DayOfWeek, TimeSlot, Lesson, ScheduleConflict } from './types.js';
import { schedule, classrooms } from './data.js';

export function addLesson(lesson: Lesson): boolean {
	const conflict = validateLesson(lesson);

	if (!conflict) {
		schedule.push(lesson);
		return true;
	} else {
		return false;
	}
}

export function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
	const occupiedClassrooms = schedule
		.filter((lesson) => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot)
		.map((lesson) => lesson.classroomNumber);

	return classrooms
		.filter((classroom) => !occupiedClassrooms.includes(classroom.number))
		.map((classroom) => classroom.number);
}

export function getProfessorSchedule(professorId: number): Lesson[] {
	return schedule.filter((lesson) => lesson.professorId === professorId);
}

function validateLesson(lesson: Lesson): ScheduleConflict | null {
	const conflictingLesson = schedule.find(
		(existingLesson) =>
			existingLesson.dayOfWeek === lesson.dayOfWeek &&
			existingLesson.timeSlot === lesson.timeSlot &&
			(existingLesson.classroomNumber === lesson.classroomNumber || existingLesson.professorId === lesson.professorId),
	);

	if (conflictingLesson) {
		if (conflictingLesson.professorId === lesson.professorId) {
			return {
				type: 'ProfessorConflict',
				lessonDetails: conflictingLesson,
			};
		} else if (conflictingLesson.classroomNumber === lesson.classroomNumber) {
			return {
				type: 'ClassroomConflict',
				lessonDetails: conflictingLesson,
			};
		}
	}

	return null;
}

export function reassignClassroom(
	dayOfWeek: DayOfWeek,
	timeSlot: TimeSlot,
	oldClassroomNumber: string,
	newClassroomNumber: string,
): boolean {
	const lessonIndex = schedule.findIndex(
		(lesson) =>
			lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot && lesson.classroomNumber === oldClassroomNumber,
	);

	if (lessonIndex === -1) {
		return false;
	}

	const isNewClassroomFree = !schedule.some(
		(lesson) =>
			lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot && lesson.classroomNumber === newClassroomNumber,
	);

	if (!isNewClassroomFree) {
		return false;
	}

	schedule[lessonIndex].classroomNumber = newClassroomNumber;
	return true;
}

export function cancelLesson(dayOfWeek: DayOfWeek, timeSlot: TimeSlot, classroomNumber: string): void {
	const lessonIndex = schedule.findIndex(
		(lesson) =>
			lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot && lesson.classroomNumber === classroomNumber,
	);
	if (lessonIndex === -1) {
		return;
	}

	schedule.splice(lessonIndex, 1);
}
