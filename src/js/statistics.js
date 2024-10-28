import { schedule, courses } from './data.js';
export function getClassroomUtilization(classroomNumber) {
	const totalTimeSlots = 6 * 6;
	const usedTimeSlots = schedule.filter((lesson) => lesson.classroomNumber === classroomNumber).length;
	return (usedTimeSlots / totalTimeSlots) * 100;
}
export function getMostPopularCourseType() {
	const courseTypeCounts = {
		Lecture: 0,
		Seminar: 0,
		Lab: 0,
		Practice: 0,
	};
	schedule.forEach((lesson) => {
		const course = courses.find((c) => c.id === lesson.courseId);
		if (course) {
			courseTypeCounts[course.type]++;
		}
	});
	let mostPopularType = 'Lecture';
	let maxCount = 0;
	Object.keys(courseTypeCounts).forEach((type) => {
		if (courseTypeCounts[type] > maxCount) {
			maxCount = courseTypeCounts[type];
			mostPopularType = type;
		}
	});
	return mostPopularType;
}
