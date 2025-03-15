"use client"
import React, {useState, useEffect, useMemo, Suspense} from "react"
import {Text, Stack, Box, VStack, useBreakpointValue} from "@chakra-ui/react"
import {AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot} from "~/components/ui/accordion"
import {CourseButton, CourseNotFound} from "~/components/CR/Course"
import SearchBar from "~/components/CR/SearchBar" // Import SearchBar
import {Course, CourseDepartment} from "~/type/CourseReview"
import {Departments} from "~/type/Department"
import {useCourses} from "~/context/CourseContext"

export default function DefaultPage() {
	const {courses} = useCourses()
	const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses) // Start with static data
	const isPhone = useBreakpointValue({base: true, md: false})

	useEffect(() => {
		setFilteredCourses(courses)
	}, [courses])

	const getDepartmentName = (code: string) => {
		return Departments[code as keyof typeof Departments] || code
	}

	const groupCoursesByDepartment = (courses: Course[]): CourseDepartment[] => {
		const departmentMap = new Map<string, CourseDepartment>()

		// Define department aliases
		const departmentAliases: Record<string, string> = {
			ENG: "ENGL" // Merge ENG into ENGL
			// Add more mappings if needed
		}

		for (const course of courses) {
			const normalizedDepartment = departmentAliases[course.Department] || course.Department

			if (!departmentMap.has(normalizedDepartment)) {
				departmentMap.set(normalizedDepartment, {
					Department: normalizedDepartment,
					Courses: []
				})
			}

			const department = departmentMap.get(normalizedDepartment)!

			let levelGroup = department.Courses.find((level) => level.Level === course.Level)

			if (!levelGroup) {
				levelGroup = {Level: course.Level, Courses: []}
				department.Courses.push(levelGroup)
			}

			levelGroup.Courses.push(course)
		}
		// Convert map back to array
		const result = Array.from(departmentMap.values())
		return result
	}

	const groupedCourses = useMemo(() => {
		const result = groupCoursesByDepartment(filteredCourses)
		return result
	}, [filteredCourses])

	return (
		<React.Fragment>
			<Box position="fixed" top="56px" width="100%" zIndex="1" bg="brand.bg">
				<SearchBar courses={courses} filteredCourses={filteredCourses} setFilteredCourses={setFilteredCourses} />
			</Box>{" "}
			<VStack mt={"56px"} w="100%" display="flex" justifyContent="center">
				<Suspense fallback={<Text>Loading courses...</Text>}>
					<AccordionRoot w={"80%"} collapsible defaultValue={["b"]}>
						{groupedCourses.map((department) => (
							<AccordionItem key={department.Department} value={department.Department}>
								<AccordionItemTrigger fontSize={20} fontWeight={"bold"} pl={1} pb={3} pt={3}>
									{isPhone ? department.Department : `${getDepartmentName(department.Department)}`}
								</AccordionItemTrigger>
								<AccordionItemContent>
									{department.Courses.map((level) => (
										<Box key={level.Level} mb={4}>
											<Text color={"brand.text_grey"} fontSize="md" fontWeight="bold" pl={2}>
												Level {level.Level}
											</Text>
											<Stack p={2}>
												{level.Courses.map((course) => (
													<CourseButton key={course.CourseCode} course={course} />
												))}
											</Stack>
										</Box>
									))}
								</AccordionItemContent>
							</AccordionItem>
						))}
					</AccordionRoot>
				</Suspense>
				<CourseNotFound />
			</VStack>
		</React.Fragment>
	)
}

// unused sort logic
// const getDepartmentName = (code: string) => {
	// 	return Departments[code as keyof typeof Departments] || code
	// }

	// const groupCoursesByDepartment = (courses: Course[]): CourseDepartment[] => {
	// 	const departmentMap: {[key: string]: CourseDepartment} = {}

	// 	// Define department aliases
	// 	const departmentAliases: {[key: string]: string} = {
	// 		ENG: "ENGL" // Merge ENG into ENGL
	// 		// Add more mappings if needed
	// 	}

	// 	courses.forEach((course) => {
	// 		const normalizedDepartment = departmentAliases[course.Department] || course.Department

	// 		if (!departmentMap[normalizedDepartment]) {
	// 			departmentMap[normalizedDepartment] = {
	// 				Department: normalizedDepartment,
	// 				Courses: []
	// 			}
	// 		}

	// 		let levelGroup = departmentMap[normalizedDepartment].Courses.find((level) => level.Level === course.Level)

	// 		if (!levelGroup) {
	// 			levelGroup = {
	// 				Level: course.Level,
	// 				Courses: []
	// 			}
	// 			departmentMap[normalizedDepartment].Courses.push(levelGroup)
	// 		}

	// 		levelGroup.Courses.push(course)
	// 	})

	// 	// Sort departments and courses
	// 	const sortedDepartments = Object.values(departmentMap).sort((a, b) => a.Department.localeCompare(b.Department))

	// 	sortedDepartments.forEach((department) => {
	// 		department.Courses.sort((a, b) => a.Level - b.Level)
	// 		department.Courses.forEach((levelGroup) => {
	// 			levelGroup.Courses.sort((a, b) => a.CourseCode.localeCompare(b.CourseCode))
	// 			//levelGroup.Courses.sort((a, b) => (b.NumReviews || 0) - (a.NumReviews || 0) || a.CourseCode.localeCompare(b.CourseCode))
	// 		})
	// 	})
	// 	return sortedDepartments
	// }

	// // Memoized grouped courses, to avoid recalculating each render
	// const groupedCourses = useMemo(() => groupCoursesByDepartment(filteredCourses), [filteredCourses])