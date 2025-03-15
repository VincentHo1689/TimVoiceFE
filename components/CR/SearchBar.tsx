"use client"

import React, {useState, useMemo, useRef, useCallback} from "react"
import {Input, Center, Box, Text} from "@chakra-ui/react"
import {InputGroup} from "~/components/ui/input-group"
import Fuse from "fuse.js"
import {Course} from "~/type/CourseReview"
import {IoMdSearch} from "react-icons/io"
import {useRouter} from "next/navigation" // For routing

interface SearchBarProps {
	courses: Course[] // Pass in flat Course[] instead of CourseDepartment[]
	filteredCourses: Course[]
	setFilteredCourses: React.Dispatch<React.SetStateAction<Course[]>>
	showMenu?: boolean
	fixedHeight?: string
	isFixed?: boolean // New prop to determine if the position is fixed
}

const debounce = (func: (query: string) => void, wait: number) => {
	let timeout: NodeJS.Timeout
	return (query: string) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => func(query), wait)
	}
}

const SearchBar: React.FC<SearchBarProps> = ({courses, filteredCourses, setFilteredCourses, showMenu = false, fixedHeight = "0px", isFixed = true}) => {
	const [searchQuery, setSearchQuery] = useState("")
	const [isInputFocused, setIsInputFocused] = useState(false)
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)

	const groupedCourses = useMemo(() => {
		if (!showMenu) return []
		const departments = new Map<string, {Level: number; Courses: Course[]}[]>()

		for (const course of filteredCourses) {
			if (!departments.has(course.Department)) {
				departments.set(course.Department, [])
			}

			const levels = departments.get(course.Department)!
			let levelGroup = levels.find((level) => level.Level === course.Level)

			if (!levelGroup) {
				levelGroup = {Level: course.Level, Courses: []}
				levels.push(levelGroup)
			}

			levelGroup.Courses.push(course)
		}

		return Array.from(departments, ([department, levels]) => ({
			Department: department,
			Courses: levels
		}))
	}, [filteredCourses, showMenu])

	const handleSearch = useCallback(
		debounce((query: string) => {
			if (!query || query === "") {
				//eslint-disable-next-line @typescript-eslint/no-unused-vars
				setFilteredCourses((prev) => courses)
				return
			}

			const lowerQuery = query.toLowerCase()

			// First, search for courses by department code
			const codeMatches = courses.filter((course) => course.CourseCode.toLowerCase().includes(lowerQuery))
			if (codeMatches.length > 0) {
				setFilteredCourses(codeMatches)
			} else {
				const fuse = new Fuse(courses, {
					keys: ["CourseCode", "CourseName"],
					includeScore: false,
					threshold: 0.1
				})

				const result = fuse.search(query)
				setFilteredCourses(result.map((item) => item.item))
			}
		}, 500),
		[courses, setFilteredCourses]
	)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value
		setSearchQuery(query)
		handleSearch(query)
	}

	const handleCourseClick = (courseCode: string) => {
		router.push(`/course/${courseCode}`)
	}

	const handleFocus = () => {
		setIsInputFocused(true)
	}

	const handleBlur = () => {
		setTimeout(() => {
			setIsInputFocused(false)
		}, 250)
	}

	return (
		<Center w="100%" mb={2}>
			<Box position="relative" w="80%" alignItems={"center"}>
				{/* InputGroup with conditional fixed positioning */}
				<InputGroup
					position={isFixed ? "fixed" : "sticky"} // Use isFixed prop to determine position
					top={isFixed ? `calc(${fixedHeight} + 56px)` : undefined} // Only set top if fixed
					left={isFixed ? "50%" : undefined} // Only set left if fixed
					transform={isFixed ? "translateX(-50%)" : undefined} // Only transform if fixed
					w={isFixed ? "90%" : "100%"} // Only set width if fixed
					bg="brand.bg"
					zIndex="1"
					endElement={
						<Box pr={4}>
							<IoMdSearch size={"20px"} />
						</Box>
					}
					p={2}
				>
					<Input ref={inputRef} placeholder="Search for code or name ..." value={searchQuery} variant="flushed" onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
				</InputGroup>

				{/* Display filtered and grouped courses below the search bar */}
				{searchQuery && isInputFocused && showMenu && (
					<Box
						position={isFixed ? "fixed" : "absolute"} // Use isFixed prop to determine position
						top={isFixed ? `calc(${fixedHeight} + 106px)` : undefined} // Only set top if fixed
						left={isFixed ? "50%" : undefined} // Only set left if fixed
						transform={isFixed ? "translateX(-50%)" : undefined} // Only transform if fixed
						w="96%"
						ml="2%"
						alignItems={"center"}
						maxH="300px"
						overflowY="auto"
						bg="brand.bg"
						zIndex="2"
						mt={isFixed ? 0 : 1}
						bgColor={"brand.card"}
						borderRadius="md"
					>
						{groupedCourses.map((department) => (
							<Box key={department.Department} p={2}>
								<Text fontSize="sm" fontWeight="bold">
									{department.Department}
								</Text>
								{department.Courses.map((level) => (
									<Box key={level.Level} mt={1}>
										<Text pl={1} color={"brand.text_grey"} fontSize="xs" fontWeight="bold">
											Level {level.Level}
										</Text>
										{level.Courses.filter(
											(course) => course.CourseCode.toLowerCase().includes(searchQuery.toLowerCase()) || course.CourseName.toLowerCase().includes(searchQuery.toLowerCase())
										).map((course) => (
											<Box key={course.CourseCode} p={2} _hover={{bg: "gray.100", cursor: "pointer"}} onClick={() => handleCourseClick(course.CourseCode)}>
												<Text fontSize="sm" truncate>
													{course.CourseCode} - {course.CourseName}
												</Text>
											</Box>
										))}
									</Box>
								))}
							</Box>
						))}
					</Box>
				)}
			</Box>
		</Center>
	)
}

export default SearchBar

// unused sort logic
	// Memoize the sorted courses once to avoid sorting each time
	// const sortedCourses = useMemo(() => {
	// 	return [...courses].sort((a, b) => a.Level - b.Level) // Sort by Level once
	// }, [courses])

	// Group courses by department and then by level
	// const groupedCourses = useMemo(() => {
	// 	const departments = filteredCourses.reduce((acc: Record<string, {Level: number; Courses: Course[]}[]>, course) => {
	// 		if (!acc[course.Department]) {
	// 			acc[course.Department] = []
	// 		}

	// 		const levelIndex = acc[course.Department].findIndex((level) => level.Level === course.Level)

	// 		if (levelIndex === -1) {
	// 			acc[course.Department].push({
	// 				Level: course.Level,
	// 				Courses: [course]
	// 			})
	// 		} else {
	// 			acc[course.Department][levelIndex].Courses.push(course)
	// 		}

	// 		return acc
	// 	}, {})

	// 	// Filter out departments and levels with no courses and keep courses sorted
	// 	return Object.keys(departments)
	// 		.sort((a, b) => a.localeCompare(b)) // Sort departments alphabetically
	// 		.map((department) => {
	// 			const filteredLevels = departments[department].filter((level) => level.Courses.length > 0).sort((a, b) => a.Level - b.Level) // Sort levels numerically

	// 			if (filteredLevels.length > 0) {
	// 				return {
	// 					Department: department,
	// 					Courses: filteredLevels.map((level) => ({
	// 						...level,
	// 						Courses: level.Courses.sort((a, b) => a.CourseCode.localeCompare(b.CourseCode))
	// 					}))
	// 				}
	// 			}
	// 			return null
	// 		})
	// 		.filter((department) => department !== null)
	// }, [filteredCourses])

//search logic
/* const handleSearch = (query: string) => {
		setSearchQuery(query)

		if (!query) {
			// If no search query, show all sorted courses
			setFilteredCourses(courses)
			return
		}

		const lowerQuery = query.toLowerCase()

		// First, search for courses by department code
		const deptMatches = courses.filter((course) => course.Department.toLowerCase().startsWith(lowerQuery))

		if (deptMatches.length > 0) {
			setFilteredCourses(deptMatches)
		} else {
			// If no department matches found, use Fuse.js for CourseCode and CourseName
			const fuse = new Fuse(courses, {
				keys: ["CourseCode", "CourseName"],
				includeScore: false,
				threshold: 0.1
			})

			const result = fuse.search(query)
			setFilteredCourses(result.map((item) => item.item))
		}
	} */