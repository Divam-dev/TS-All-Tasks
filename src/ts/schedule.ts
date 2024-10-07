import { DayOfWeek, TimeSlot, Lesson, ScheduleConflict } from './types.js';
import { schedule, courses, professors, classrooms } from './data.js';

export function addLesson(lesson: Lesson): boolean {
    const conflict = validateLesson(lesson);

    if (!conflict) {
        schedule.push(lesson);
        return true;
    } else {
        console.log(`Конфлікт у розкладі: ${conflict.type}`);
        console.log("Деталі конфліктного заняття:", conflict.lessonDetails);
        return false;
    }
}

export function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot)
        .map(lesson => lesson.classroomNumber);

    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}

export function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}

function validateLesson(lesson: Lesson): ScheduleConflict | null {
    const conflictingLesson = schedule.find(existingLesson => 
        existingLesson.dayOfWeek === lesson.dayOfWeek && 
        existingLesson.timeSlot === lesson.timeSlot &&
        (existingLesson.classroomNumber === lesson.classroomNumber ||
         existingLesson.professorId === lesson.professorId)
    );

    if (conflictingLesson) {
        if (conflictingLesson.professorId === lesson.professorId) {
            return {
                type: "ProfessorConflict",
                lessonDetails: conflictingLesson
            };
        } else if (conflictingLesson.classroomNumber === lesson.classroomNumber) {
            return {
                type: "ClassroomConflict",
                lessonDetails: conflictingLesson
            };
        }
    }

    return null;
}

export function reassignClassroom(dayOfWeek: DayOfWeek, timeSlot: TimeSlot, oldClassroomNumber: string, newClassroomNumber: string): boolean {
    const lessonIndex = schedule.findIndex(lesson => 
        lesson.dayOfWeek === dayOfWeek && 
        lesson.timeSlot === timeSlot && 
        lesson.classroomNumber === oldClassroomNumber
    );
    
    if (lessonIndex === -1) {
        console.log(`Заняття не знайдено: ${dayOfWeek}, ${timeSlot}, аудиторія ${oldClassroomNumber}.`);
        return false;
    }

    const isNewClassroomFree = !schedule.some(lesson =>
        lesson.dayOfWeek === dayOfWeek &&
        lesson.timeSlot === timeSlot &&
        lesson.classroomNumber === newClassroomNumber
    );

    if (!isNewClassroomFree) {
        console.log(`Аудиторія ${newClassroomNumber} вже зайнята в цей час.`);
        return false;
    }

    schedule[lessonIndex].classroomNumber = newClassroomNumber;
    console.log(`Аудиторію для заняття змінено з ${oldClassroomNumber} на ${newClassroomNumber}.`);
    return true;
}

export function cancelLesson(dayOfWeek: DayOfWeek, timeSlot: TimeSlot, classroomNumber: string): void {
    const lessonIndex = schedule.findIndex(lesson => 
        lesson.dayOfWeek === dayOfWeek && 
        lesson.timeSlot === timeSlot && 
        lesson.classroomNumber === classroomNumber
    );
    if (lessonIndex === -1) {
        console.log(`Заняття не знайдено: ${dayOfWeek}, ${timeSlot}, аудиторія ${classroomNumber}.`);
        return;
    }

    schedule.splice(lessonIndex, 1);
    console.log(`Заняття видалено з розкладу: ${dayOfWeek}, ${timeSlot}, аудиторія ${classroomNumber}.`);
}
