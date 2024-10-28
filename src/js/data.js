export const professors = [
	{ id: 1, name: 'Юхимович Я.І.', department: 'Менеджмент' },
	{ id: 2, name: 'Гайдамака А.М.', department: "Комп'ютерні науки" },
	{ id: 3, name: 'Дінченко А.В.', department: 'Економіка' },
	{ id: 4, name: 'Шевченко О.В.', department: 'Філологія' },
	{ id: 5, name: 'Лазарук В.В.', department: 'Математика' },
];
export const classrooms = [
	{ number: '101', capacity: 30, hasProjector: true },
	{ number: '102', capacity: 25, hasProjector: false },
	{ number: '113', capacity: 50, hasProjector: true },
	{ number: '201', capacity: 35, hasProjector: true },
	{ number: '202', capacity: 40, hasProjector: false },
];
export const courses = [
	{ id: 1, name: 'Java', type: 'Lecture' },
	{ id: 2, name: 'Python', type: 'Lab' },
	{ id: 3, name: 'Розробка E-систем', type: 'Practice' },
	{ id: 4, name: 'Менеджмент', type: 'Lecture' },
	{ id: 5, name: "Комп'ютерні науки", type: 'Lab' },
];
export const schedule = [
	{
		courseId: 1,
		professorId: 1,
		classroomNumber: '113',
		dayOfWeek: 'Monday',
		timeSlot: '08:00-09:35',
	},
	{
		courseId: 4,
		professorId: 4,
		classroomNumber: '101',
		dayOfWeek: 'Monday',
		timeSlot: '09:45-11:20',
	},
	{
		courseId: 2,
		professorId: 2,
		classroomNumber: '101',
		dayOfWeek: 'Tuesday',
		timeSlot: '09:45-11:20',
	},
	{
		courseId: 3,
		professorId: 3,
		classroomNumber: '102',
		dayOfWeek: 'Tuesday',
		timeSlot: '13:30-15:05',
	},
	{
		courseId: 5,
		professorId: 5,
		classroomNumber: '202',
		dayOfWeek: 'Wednesday',
		timeSlot: '11:45-13:20',
	},
	{
		courseId: 1,
		professorId: 1,
		classroomNumber: '113',
		dayOfWeek: 'Thursday',
		timeSlot: '08:00-09:35',
	},
	{
		courseId: 2,
		professorId: 2,
		classroomNumber: '101',
		dayOfWeek: 'Thursday',
		timeSlot: '09:45-11:20',
	},
	{
		courseId: 3,
		professorId: 3,
		classroomNumber: '102',
		dayOfWeek: 'Friday',
		timeSlot: '09:45-11:20',
	},
	{
		courseId: 4,
		professorId: 4,
		classroomNumber: '201',
		dayOfWeek: 'Friday',
		timeSlot: '11:45-13:20',
	},
	{
		courseId: 5,
		professorId: 5,
		classroomNumber: '202',
		dayOfWeek: 'Friday',
		timeSlot: '13:30-15:05',
	},
];
