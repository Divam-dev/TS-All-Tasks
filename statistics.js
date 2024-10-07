import { schedule, courses } from './data.js';
export function getClassroomUtilization(classroomNumber) {
    const totalTimeSlots = 6 * 6;
    const usedTimeSlots = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    return (usedTimeSlots / totalTimeSlots) * 100;
}
export function getMostPopularCourseType() {
    const courseTypeCounts = {
        "Lecture": 0,
        "Seminar": 0,
        "Lab": 0,
        "Practice": 0
    };
    schedule.forEach(lesson => {
        const course = courses.find(c => c.id === lesson.courseId);
        if (course) {
            courseTypeCounts[course.type]++;
        }
    });
    let mostPopularType = "Lecture";
    let maxCount = 0;
    Object.keys(courseTypeCounts).forEach(type => {
        if (courseTypeCounts[type] > maxCount) {
            maxCount = courseTypeCounts[type];
            mostPopularType = type;
        }
    });
    return mostPopularType;
}
export function getProfessorWorkload(professorId) {
    return schedule.filter(lesson => lesson.professorId === professorId).length;
}
export function getMostBusyDay() {
    const dayCounts = {
        "Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0,
        "Friday": 0, "Saturday": 0
    };
    schedule.forEach(lesson => {
        dayCounts[lesson.dayOfWeek]++;
    });
    const maxCount = Math.max(...Object.values(dayCounts));
    return Object.entries(dayCounts)
        .filter(([_, count]) => count === maxCount)
        .map(([day, _]) => day);
}
