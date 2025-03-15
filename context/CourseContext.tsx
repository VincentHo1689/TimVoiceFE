"use client"
import React, {createContext, useContext, useState, useEffect} from "react"
import apiRequest from "~/components/general/api" // Assuming this is your API request function
import {CourseData} from "~/data/CourseData" // Your static data
import {Course} from "~/type/CourseReview"
import {Toaster /* , toaster */} from "~/components/ui/toaster"

// Create context for course data
interface CourseContextType {
	courses: Course[]
	setCourses: React.Dispatch<React.SetStateAction<Course[]>>
}

const CourseContext = createContext<CourseContextType | undefined>(undefined) // Default to undefined

// Function to sort courses
const sortCourses = (courses: Course[]): Course[] => {
	return courses.sort((a, b) => {
		if (a.Department !== b.Department) {
			return a.Department.localeCompare(b.Department)
		}
		if (a.Level !== b.Level) {
			return a.Level - b.Level
		}
		return a.CourseCode.localeCompare(b.CourseCode)
	})
}

// Create a provider for course data
export const CourseProvider = ({children}: {children: React.ReactNode}) => {
	const [courses, setCourses] = useState<Course[]>(sortCourses(CourseData)) // Start with sorted static data

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const data = await apiRequest<Course[]>("get", `course/list`)
				setCourses(sortCourses(data)) // Replace with sorted fetched data
				// toaster.create({
				// 	title: "Course List Updated",
				// 	description: "Fetched from database",
				// 	type: "success"
				// })
			} catch (error) {
				console.error("Error fetching course reviews:", error)
				// toaster.create({
				// 	title: "Course List Remains Static",
				// 	description: "Fetch failed :/",
				// 	type: "error"
				// })
			}
		}
		fetchCourses()
	}, [])

	return (
		<CourseContext.Provider value={{courses, setCourses}}>
			<Toaster />
			{children}
		</CourseContext.Provider>
	)
}

// Custom hook to access course data and setCourses function
export const useCourses = (): CourseContextType => {
	const context = useContext(CourseContext)
	if (!context) {
		throw new Error("useCourses must be used within a CourseProvider")
	}
	return context
}

// "use client"
// import React, {createContext, useContext, useState, useEffect} from "react"
// import apiRequest from "~/components/general/api" // Assuming this is your API request function
// import {CourseData} from "~/data/CourseData" // Your static data
// import {Course} from "~/type/CourseReview"
// import {Toaster /* , toaster */} from "~/components/ui/toaster"

// // Create context for course data
// interface CourseContextType {
// 	courses: Course[]
// 	setCourses: React.Dispatch<React.SetStateAction<Course[]>>
// }

// const CourseContext = createContext<CourseContextType | undefined>(undefined) // Default to undefined

// // Create a provider for course data
// export const CourseProvider = ({children}: {children: React.ReactNode}) => {
// 	const [courses, setCourses] = useState<Course[]>(CourseData) // Start with static data

// 	useEffect(() => {
// 		const fetchCourses = async () => {
// 			try {
// 				const data = await apiRequest<Course[]>("get", `course/list`)
// 				setCourses(data) // Replace with fetched data
// 				// toaster.create({
// 				// 	title: "Course List Updated",
// 				// 	description: "Fetched from database",
// 				// 	type: "success"
// 				// })
// 			} catch (error) {
// 				console.error("Error fetching course reviews:", error)
// 				// toaster.create({
// 				// 	title: "Course List Remains Static",
// 				// 	description: "Fetch failed :/",
// 				// 	type: "error"
// 				// })
// 			}
// 		}
// 		fetchCourses()
// 	}, [])

// 	return (
// 		<CourseContext.Provider value={{courses, setCourses}}>
// 			<Toaster />
// 			{children}
// 		</CourseContext.Provider>
// 	)
// }

// // Custom hook to access course data and setCourses function
// export const useCourses = (): CourseContextType => {
// 	const context = useContext(CourseContext)
// 	if (!context) {
// 		throw new Error("useCourses must be used within a CourseProvider")
// 	}
// 	return context
// }
