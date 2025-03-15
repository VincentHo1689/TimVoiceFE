export interface ReviewInsert {
	CourseCode: string
	Teacher?: string
	Semester: string
	RatingOverall: number
	RatingContent: number
	RatingWorkload: number
	RatingResult: number
	Title?: string
	Content?: string
	Result?: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F" | "X" | ""
}

export interface Review {
	CourseCode: string
	Teacher: string
	Semester: string
	RatingOverall: number
	RatingContent: number
	RatingWorkload: number
	RatingResult: number
	Title: string
	Content: string
	Result?: "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F" | "X" | ""
	TimeStamp: string
	Likes?: number
}

export interface CourseWithReviews {
	Course: Course
	Reviews: Review[]
}

export interface Course {
	CourseCode: string
	CourseName: string
	Department: string
	CourseFile?: string
	Level: number
	Credit: number
	Tags?: string[]
	RatingOverall?: number
	NumReviews?: number
}

export interface CourseDepartment {
	Department: string
	Courses: CourseLevel[]
}

export interface CourseLevel {
	Level: number
	Courses: Course[]
}
