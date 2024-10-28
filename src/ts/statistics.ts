import { CourseType } from './types.js';
import { schedule, courses } from './data.js';

export function getClassroomUtilization(classroomNumber: string): number {
	const totalTimeSlots = 6 * 6;
	const usedTimeSlots = schedule.filter((lesson) => lesson.classroomNumber === classroomNumber).length;
	return (usedTimeSlots / totalTimeSlots) * 100;
}

export function getMostPopularCourseType(): CourseType {
	const courseTypeCounts: { [key in CourseType]: number } = {
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

	let mostPopularType: CourseType = 'Lecture';
	let maxCount = 0;

	(Object.keys(courseTypeCounts) as CourseType[]).forEach((type) => {
		if (courseTypeCounts[type] > maxCount) {
			maxCount = courseTypeCounts[type];
			mostPopularType = type;
		}
	});

	return mostPopularType;
}
