import { DayOfWeek, TimeSlot, Professor, Course, Lesson, CourseType } from './types.js';
import { professors, courses, classrooms, schedule } from './data.js';
import {
	addLesson,
	findAvailableClassrooms,
	getProfessorSchedule,
	reassignClassroom,
	cancelLesson,
} from './schedule.js';
import { getClassroomUtilization, getMostPopularCourseType } from './statistics.js';

function openModal(modalId: string) {
	const modal = document.getElementById(modalId);
	modal?.classList.add('open');
	modal?.setAttribute('style', 'display: block;');
}

function closeModal(modalId: string) {
	const modal = document.getElementById(modalId);
	modal?.setAttribute('style', 'display: none;');
}

function handleFindAvailableClassrooms(): void {
	const availableDay = (document.getElementById('availableDay') as HTMLSelectElement).value as DayOfWeek;
	const availableTime = (document.getElementById('availableTime') as HTMLSelectElement).value as TimeSlot;
	const availableClassrooms = findAvailableClassrooms(availableTime, availableDay);
	document.getElementById('availableClassroomsList')!.textContent = availableClassrooms.join(', ');
}

function updateProfessorList(): void {
	const professorSelect = document.getElementById('lessonTeacher') as HTMLSelectElement;
	if (professorSelect) {
		professorSelect.innerHTML = '';
		professors.forEach((professor) => {
			const option = document.createElement('option');
			option.value = professor.id.toString();
			option.textContent = professor.name;
			professorSelect.appendChild(option);
		});
	}
}

// Update Statistics
function updateStatistics(): void {
	const classroomProgressContainer = document.getElementById('classroomProgressBars');
	if (classroomProgressContainer) {
		classroomProgressContainer.innerHTML = '';

		classrooms.forEach((classroom) => {
			const utilization = getClassroomUtilization(classroom.number);

			const progressContainer = document.createElement('div');
			progressContainer.classList.add('progress-container');

			const label = document.createElement('span');
			label.classList.add('progress-label');
			label.textContent = `${classroom.number} (${utilization.toFixed(2)}%)`;

			const progressBar = document.createElement('div');
			progressBar.classList.add('progress-bar');

			const progress = document.createElement('div');
			progress.classList.add('progress');
			progress.style.width = `${utilization}%`;

			progressBar.appendChild(progress);

			progressContainer.appendChild(label);
			progressContainer.appendChild(progressBar);

			classroomProgressContainer.appendChild(progressContainer);
		});
	}

	const mostPopularType = getMostPopularCourseType();
	document.querySelector('#popularCourseType span')!.textContent = mostPopularType;

	const professorId = parseInt((document.getElementById('professorId') as HTMLInputElement).value);
	if (!isNaN(professorId)) {
		const professorSchedule = getProfessorSchedule(professorId);
		const scheduleList = professorSchedule.map((lesson) => {
			const course = courses.find((c) => c.id === lesson.courseId);
			return `${lesson.dayOfWeek}, ${lesson.timeSlot}: ${course?.name} (Аудиторія ${lesson.classroomNumber})`;
		});
		document.getElementById('professorScheduleList')!.innerHTML = scheduleList.join('<br>');
	}
}

// Update Schedule
function updateScheduleDisplay(): void {
	const tableBody = document.querySelector('#scheduleTable tbody');
	if (!tableBody) return;

	const timeSlots: TimeSlot[] = [
		'08:00-09:35',
		'09:45-11:20',
		'11:45-13:20',
		'13:30-15:05',
		'15:15-16:50',
		'18:45-20:20',
	];
	const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	tableBody.innerHTML = '';
	timeSlots.forEach((timeSlot) => {
		const row = document.createElement('tr');
		const timeCell = document.createElement('td');
		timeCell.textContent = timeSlot;
		row.appendChild(timeCell);

		days.forEach((day) => {
			const cell = document.createElement('td');
			const lessons = schedule.filter((l) => l.dayOfWeek === day && l.timeSlot === timeSlot);

			if (lessons.length > 0) {
				lessons.forEach((lesson, index) => {
					const course = courses.find((c) => c.id === lesson.courseId);
					const professor = professors.find((p) => p.id === lesson.professorId);

					const lessonDiv = document.createElement('div');
					lessonDiv.classList.add('lesson-info');
					if (index > 0) {
						lessonDiv.classList.add('additional-lesson');
					}

					lessonDiv.innerHTML = `
                        ${course?.name}<br>
                        <span>${lesson.classroomNumber} каб.</span><br>
                        ${professor?.name}
                        <div class="lesson-actions">
                            <button class="edit-btn" data-day="${day}" data-time="${timeSlot}" data-classroom="${lesson.classroomNumber}">Редагувати</button>
                            <button class="delete-btn" data-day="${day}" data-time="${timeSlot}" data-classroom="${lesson.classroomNumber}">Видалити</button>
                        </div>
                    `;

					cell.appendChild(lessonDiv);
				});
			}
			row.appendChild(cell);
		});

		tableBody.appendChild(row);
	});

	addEditDeleteListeners();
	updateStatistics();
}

function addEditDeleteListeners(): void {
	document.querySelectorAll('.edit-btn').forEach((button) => {
		button.addEventListener('click', handleEditLesson);
	});

	document.querySelectorAll('.delete-btn').forEach((button) => {
		button.addEventListener('click', handleDeleteLesson);
	});
}

function handleEditLesson(event: Event): void {
	const button = event.currentTarget as HTMLButtonElement;
	const day = button.dataset.day as DayOfWeek;
	const time = button.dataset.time as TimeSlot;
	const currentClassroom = button.dataset.classroom as string;

	openModal('editLessonModal');

	const editClassroomSelect = document.getElementById('editLessonClassroom') as HTMLSelectElement;
	editClassroomSelect.innerHTML = '';
	classrooms.forEach((classroom) => {
		const option = document.createElement('option');
		option.value = classroom.number;
		option.textContent = classroom.number;
		if (classroom.number === currentClassroom) {
			option.selected = true;
		}
		editClassroomSelect.appendChild(option);
	});

	const updateButton = document.getElementById('updateLessonButton');
	if (updateButton) {
		updateButton.replaceWith(updateButton.cloneNode(true));
		const newUpdateButton = document.getElementById('updateLessonButton');
		newUpdateButton?.addEventListener('click', () => {
			const newClassroom = editClassroomSelect.value;
			if (reassignClassroom(day, time, currentClassroom, newClassroom)) {
				closeModal('editLessonModal');
				updateScheduleDisplay();
			} else {
				alert('Не вдалося змінити аудиторію. Можливо, нова аудиторія вже зайнята в цей час.');
			}
		});
	}
}

function handleDeleteLesson(event: Event): void {
	const button = event.currentTarget as HTMLButtonElement;
	const day = button.dataset.day as DayOfWeek;
	const time = button.dataset.time as TimeSlot;
	const classroom = button.dataset.classroom as string;

	if (confirm('Ви впевнені, що хочете видалити цей урок?')) {
		cancelLesson(day, time, classroom);
		updateScheduleDisplay();
	}
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	updateScheduleDisplay();
	updateProfessorList();

	document.getElementById('addTeacher')?.addEventListener('click', () => {
		openModal('teacherModal');
	});

	document.getElementById('addTeacherButton')?.addEventListener('click', () => {
		const name = (document.getElementById('teacherName') as HTMLInputElement).value;
		const department = (document.getElementById('teacherDepartment') as HTMLInputElement).value;
		if (name && department) {
			const newProfessor: Professor = {
				id: professors.length + 1,
				name,
				department,
			};
			professors.push(newProfessor);
			closeModal('teacherModal');
			updateProfessorList();
			(document.getElementById('teacherName') as HTMLInputElement).value = '';
			(document.getElementById('teacherDepartment') as HTMLInputElement).value = '';
		}
	});

	document.getElementById('addCourse')?.addEventListener('click', () => {
		openModal('courseModal');
	});

	document.getElementById('addCourseButton')?.addEventListener('click', () => {
		const name = (document.getElementById('courseName') as HTMLInputElement).value;
		const type = (document.getElementById('courseType') as HTMLSelectElement).value as CourseType;
		if (name && type) {
			const newCourse: Course = {
				id: courses.length + 1,
				name,
				type,
			};
			courses.push(newCourse);
			closeModal('courseModal');
		}
	});

	document.getElementById('addLesson')?.addEventListener('click', () => {
		const lessonCourseSelect = document.getElementById('lessonCourse') as HTMLSelectElement;
		lessonCourseSelect.innerHTML = '';
		courses.forEach((course) => {
			const option = document.createElement('option');
			option.value = course.id.toString();
			option.textContent = course.name;
			lessonCourseSelect.appendChild(option);
		});

		const lessonClassroomSelect = document.getElementById('lessonClassroom') as HTMLSelectElement;
		lessonClassroomSelect.innerHTML = '';
		classrooms.forEach((classroom) => {
			const option = document.createElement('option');
			option.value = classroom.number;
			option.textContent = classroom.number;
			lessonClassroomSelect.appendChild(option);
		});

		const lessonTeacherSelect = document.getElementById('lessonTeacher') as HTMLSelectElement;
		lessonTeacherSelect.innerHTML = '';
		professors.forEach((professor) => {
			const option = document.createElement('option');
			option.value = professor.id.toString();
			option.textContent = professor.name;
			lessonTeacherSelect.appendChild(option);
		});

		openModal('lessonModal');
	});

	document.getElementById('addLessonButton')?.addEventListener('click', () => {
		const courseId = parseInt((document.getElementById('lessonCourse') as HTMLSelectElement).value);
		const classroomNumber = (document.getElementById('lessonClassroom') as HTMLSelectElement).value;
		const professorId = parseInt((document.getElementById('lessonTeacher') as HTMLSelectElement).value);
		const dayOfWeek = (document.getElementById('lessonDay') as HTMLSelectElement).value as DayOfWeek;
		const timeSlot = (document.getElementById('lessonTime') as HTMLSelectElement).value as TimeSlot;

		const newLesson: Lesson = {
			courseId,
			professorId,
			classroomNumber,
			dayOfWeek,
			timeSlot,
		};

		const success = addLesson(newLesson);
		if (success) {
			closeModal('lessonModal');
			updateScheduleDisplay();
		} else {
			alert('Конфлікт в розкладі!');
		}
	});

	// Close Modals
	document.getElementById('closeTeacherModal')?.addEventListener('click', () => closeModal('teacherModal'));
	document.getElementById('closeCourseModal')?.addEventListener('click', () => closeModal('courseModal'));
	document.getElementById('closeLessonModal')?.addEventListener('click', () => closeModal('lessonModal'));
	document.getElementById('closeEditLessonModal')?.addEventListener('click', () => closeModal('editLessonModal'));

	document.getElementById('findAvailableClassrooms')?.addEventListener('click', handleFindAvailableClassrooms);
	document.getElementById('getProfessorSchedule')?.addEventListener('click', updateStatistics);
});
