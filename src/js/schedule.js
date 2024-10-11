import { schedule, classrooms } from './data.js';
export function addLesson(lesson) {
	const conflict = validateLesson(lesson);
	if (!conflict) {
		schedule.push(lesson);
		return true;
	} else {
		return false;
	}
}
export function findAvailableClassrooms(timeSlot, dayOfWeek) {
	const occupiedClassrooms = schedule
		.filter((lesson) => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot)
		.map((lesson) => lesson.classroomNumber);
	return classrooms
		.filter((classroom) => !occupiedClassrooms.includes(classroom.number))
		.map((classroom) => classroom.number);
}
export function getProfessorSchedule(professorId) {
	return schedule.filter((lesson) => lesson.professorId === professorId);
}
function validateLesson(lesson) {
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
export function reassignClassroom(dayOfWeek, timeSlot, oldClassroomNumber, newClassroomNumber) {
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
export function cancelLesson(dayOfWeek, timeSlot, classroomNumber) {
	const lessonIndex = schedule.findIndex(
		(lesson) =>
			lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot && lesson.classroomNumber === classroomNumber,
	);
	if (lessonIndex === -1) {
		return;
	}
	schedule.splice(lessonIndex, 1);
}
