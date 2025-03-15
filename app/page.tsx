"use client"

import {Center, Stack, Button, useBreakpointValue} from "@chakra-ui/react"
import {useRouter} from "next/navigation"
import {List, Pen} from "lucide-react"
import SearchBar from "~/components/CR/SearchBar" // Import the SearchBar
import {useEffect, useState} from "react"
import {Course} from "~/type/CourseReview"
import {useCourses} from "~/context/CourseContext"
import TermsOfServiceDialog from "~/components/general/TermsOfService"

export default function Home() {
	const router = useRouter()
	const {courses} = useCourses()
	const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses) // Start with static data

	const Course = useBreakpointValue({
		base: "Course", // For small screens (width < 500px)
		sm: "Browse Course" // For medium and larger screens (width >= 500px)
	})

	const Review = useBreakpointValue({
		base: "Review", // For small screens (width < 500px)
		sm: "Write Review" // For medium and larger screens (width >= 500px)
	})
	// Update filteredCourses once the data is fetched
	useEffect(() => {
		setFilteredCourses(courses) // Update filteredCourses after data is fetched
	}, [courses]) // Depend on 'course' and 'loading' states

	return (
		<Center h="calc(100vh - 40px)" mt="-20px" w="100%">
			<Stack w="100%" p={4} align="center">
				<TermsOfServiceDialog />
				<SearchBar courses={courses} filteredCourses={filteredCourses} setFilteredCourses={setFilteredCourses} showMenu={true} isFixed={false} fixedHeight="40% - 50px" />
				<Stack direction="row" px={4}>
					<Button size="lg" px={8} onClick={() => router.push("/course/list")}>
						<List />
						{Course}
					</Button>
					<Button size="lg" px={8} onClick={() => router.push("/review")}>
						<Pen />
						{Review}
					</Button>
				</Stack>
			</Stack>
		</Center>
	)
}
