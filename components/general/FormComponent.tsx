import {Input, Box, Text, Select, createListCollection} from "@chakra-ui/react"
import {useState, useMemo} from "react"
import {ControllerRenderProps} from "react-hook-form"
import {Course, ReviewInsert} from "~/type/CourseReview"

import Fuse from "fuse.js"

export const SemesterDropdown = ({field}: {field: ControllerRenderProps<ReviewInsert, "Semester">}) => {
	const currentYear = new Date().getFullYear()
	const currentMonth = new Date().getMonth() // January is 0, December is 11
	const semesters = []

	// Function to get semester label
	const getSemesterLabel = (year: number, semester: string) => {
		switch (semester) {
			case "summer":
				return `${year - 1}/${year} Summer Semester`
			case "semester2":
				return `${year - 1}/${year} Semester 2`
			case "semester1":
				return `${year - 1}/${year} Semester 1`
			default:
				return ""
		}
	}

	// Generate semesters for the last 5 years (current year and previous 4)
	for (let i = 0; i < 5; i++) {
		const year = currentYear - i

		if (currentYear > year) {
			semesters.push(
				{label: getSemesterLabel(year + 1, "semester1"), value: getSemesterLabel(year + 1, "semester1")},
				{label: getSemesterLabel(year, "summer"), value: getSemesterLabel(year, "summer")},
				{label: getSemesterLabel(year, "semester2"), value: getSemesterLabel(year, "semester2")}
			)
		} else if (currentMonth >= 8) {
			semesters.push(
				{label: getSemesterLabel(year + 1, "semester1"), value: getSemesterLabel(year + 1, "semester1")},
				{label: getSemesterLabel(year, "summer"), value: getSemesterLabel(year, "summer")},
				{label: getSemesterLabel(year, "semester2"), value: getSemesterLabel(year, "semester2")}
			)
		} else if (currentMonth >= 4) {
			semesters.push({label: getSemesterLabel(year, "summer"), value: getSemesterLabel(year, "summer")}, {label: getSemesterLabel(year, "semester2"), value: getSemesterLabel(year, "semester2")})
		} else if (currentMonth >= 1) {
			semesters.push({label: getSemesterLabel(year, "semester2"), value: getSemesterLabel(year, "semester2")})
		}
	}

	// Create the list collection for semesters
	const semester = createListCollection({
		items: semesters
	})

	return (
		<Select.Root
			size="xs"
			collection={semester}
			name={field.name}
			value={[field.value]}
			onValueChange={({value}) => {
				console.log(value[0])
				field.onChange(value[0])
			}}
			onInteractOutside={() => field.onBlur()}
		>
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText fontSize={13} pl={2} placeholder="Select a semester" />
				</Select.Trigger>
			</Select.Control>
			<Select.Positioner w="100%">
				<Select.Content bgColor={"brand.card"}>
					{semester.items.map((semester) => (
						<Select.Item p={1} pl={2} item={semester} key={semester.value} _hover={{bgColor: "brand.card_hover"}}>
							{semester.label}
						</Select.Item>
					))}
				</Select.Content>
			</Select.Positioner>
		</Select.Root>
	)
}

export const CourseDropdown = ({field, courses}: {field: ControllerRenderProps<ReviewInsert, "CourseCode">; courses: Course[]}) => {
	const [searchQuery, setSearchQuery] = useState("")
	const [isOpen, setIsOpen] = useState(false)

	// Memoize sorted courses by CourseCode
	const sortedCourses = useMemo(() => [...courses].sort((a, b) => a.CourseCode.localeCompare(b.CourseCode)), [courses])

	// Configure Fuse.js for CourseCode and CourseName
	const fuse = useMemo(
		() =>
			new Fuse(sortedCourses, {
				keys: ["CourseCode", "CourseName"],
				threshold: 0.2,
				includeScore: true
			}),
		[sortedCourses]
	)

	// Stable filtered courses with improved search logic:
	// 1. If searchQuery is empty, show all sorted courses.
	// 2. Otherwise, first try to find courses with a matching Department.
	// 3. If no department matches are found, fall back to Fuse.js search.
	const filteredCourses = useMemo(() => {
		if (!searchQuery) return sortedCourses

		const lowerQuery = searchQuery.toLowerCase()
		const deptMatches = sortedCourses.filter((course) => course.Department.toLowerCase().startsWith(lowerQuery))

		if (deptMatches.length > 0) {
			return deptMatches
		}

		return fuse.search(searchQuery).map((result) => result.item)
	}, [searchQuery, fuse, sortedCourses])

	// Stable collection reference for dropdown items
	const coursesCollection = useMemo(
		() =>
			createListCollection({
				items: filteredCourses.map((course) => ({
					label: `${course.CourseCode} - ${course.CourseName}`,
					value: course.CourseCode
				}))
			}),
		[filteredCourses]
	)

	return (
		<Box position="relative" w="100%">
			<Select.Root
				w="100%"
				size="xs"
				collection={coursesCollection}
				name={field.name}
				value={[field.value]}
				onOpenChange={(state) => setIsOpen(state.open)}
				onValueChange={({value}) => {
					field.onChange(value[0])
					setSearchQuery("")
				}}
			>
				<Select.Control>
					<Select.Trigger>
						<Select.ValueText fontSize={13} pl={2} placeholder="Select a course or Type to search" />
					</Select.Trigger>
				</Select.Control>

				<Select.Positioner w="100%">
					{isOpen && (
						<Select.Content>
							{/* Search Input - Placed outside the floating content */}
							<Box p={2} position="sticky" top={0} bg={"brand.card"} zIndex={1}>
								<Box position="sticky" top={2} zIndex={1}>
									<Input pl={2} placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} size="sm" autoFocus />
								</Box>
								{/* Course List */}
								<Box pt={2} maxH="300px" overflowY="auto">
									{coursesCollection.items.map((course) => (
										<Select.Item key={course.value} item={course} _hover={{bgColor: "brand.card_hover"}}>
											<Text w="75vw" p={2} fontSize={13} truncate>
												{course.label}
											</Text>
										</Select.Item>
									))}

									{coursesCollection.items.length === 0 && (
										<Text p={2} fontSize={13} color="brand.text_grey">
											No courses found
										</Text>
									)}
								</Box>
							</Box>
						</Select.Content>
					)}
				</Select.Positioner>
			</Select.Root>
		</Box>
	)
}
