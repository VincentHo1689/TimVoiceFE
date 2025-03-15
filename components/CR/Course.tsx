"use client"

import React, {useState} from "react"
import {Box, Text, Button, Flex, Link, HStack} from "@chakra-ui/react"
import {VStack, Input, Stack, EmptyState} from "@chakra-ui/react"
import {Course, CourseWithReviews, Review} from "~/type/CourseReview" // Adjust the import path as needed
import {useRouter} from "next/navigation"
// import {HiSearch} from "react-icons/hi"
import {PopoverArrow, PopoverBody, PopoverCloseTrigger, PopoverContent, PopoverRoot, PopoverTrigger} from "~/components/ui/popover"
import {Field} from "~/components/ui/field"
import apiRequest from "~/components/general/api"

import {RatingStar} from "~/components/general/RatingStar"
import {IoDocumentAttachOutline, IoArrowBackOutline} from "react-icons/io5"
import {FaArrowRight} from "react-icons/fa6"
import {useCourses} from "~/context/CourseContext"

export const CourseCard = ({courseWithReviews}: {courseWithReviews: CourseWithReviews}) => {
	const router = useRouter()

	// Function to calculate weighted average for each rating aspect
	const calculateAverage = (reviews: Review[], aspect: keyof Review): number => {
		let totalRating = 0
		let totalReviews = 0

		reviews.forEach((review) => {
			const rating = (review[aspect] as number) || 0
			totalRating += rating
			totalReviews += 1
		})

		return totalReviews > 0 ? totalRating / totalReviews : 0
	}

	const {Course, Reviews} = courseWithReviews

	// Calculate the average for each aspect
	const averageOverall = calculateAverage(Reviews, "RatingOverall")
	const averageContent = calculateAverage(Reviews, "RatingContent")
	const averageWorkload = calculateAverage(Reviews, "RatingWorkload")
	const averageResult = calculateAverage(Reviews, "RatingResult")

	return (
		<Box w={"95%"} key={Course.CourseCode} p={4} borderWidth={2} borderRadius="xl" boxShadow="md">
			<Flex justify="space-between" align="center">
				{/* Left section: Back button */}
				<Button variant="plain" onClick={() => router.push(`/course/list`)} w="calc(2% + 15px)" h="5%" aspectRatio={1}>
					<IoArrowBackOutline size="100%" />
				</Button>

				<Text w="calc(80% - 25px)" fontSize="2xl" fontWeight="bold" textAlign="center" truncate>
					{Course.CourseCode} -- {Course.CourseName}
				</Text>

				{/* Right section: Course File link */}
				{Course.CourseFile && (
					<Link href={Course.CourseFile} w="calc(2% + 25px)" h="50px">
						<IoDocumentAttachOutline size="100%" />
					</Link>
				)}
			</Flex>

			<Flex w={"100%"} justify="center" align="center" mb={4}>
				<HStack>
					<Text fontSize="md">Department: {Course.Department}</Text>
					<Text fontSize="md">Credit: {Course.Credit}</Text>
					<Text fontSize="md">Level: {Course.Level}</Text>
				</HStack>
			</Flex>

			{/* Display weighted averages */}
			<Flex mt={2} mb={2} wrap="wrap" justifyContent="center">
				<Text fontSize="lg" fontWeight="semibold">
					Average Ratings (Weighted by Likes):
				</Text>
			</Flex>

			<Flex mt={2} mb={2} wrap="wrap" justifyContent="center">
				<HStack pr={4}>
					<Box w="75px" fontSize="md">
						Overall:
					</Box>
					<RatingStar score={averageOverall} />
					<Box w="65px" fontSize="md" ml={2}>
						Content:
					</Box>
					<RatingStar score={averageContent} />
				</HStack>
				<HStack pr={4}>
					<Box w="75px" fontSize="md">
						Workload:
					</Box>
					<RatingStar score={averageWorkload} />
					<Box w="65px" fontSize="md" ml={2}>
						Result:
					</Box>
					<RatingStar score={averageResult} />
				</HStack>
			</Flex>

			{/* Review Button */}
			<Button onClick={() => router.push(`/review?CourseCode=${Course.CourseCode}`)} width="full" variant="solid">
				Write a Review
			</Button>
		</Box>
	)
}

export const CourseButton = ({course}: {course: Course}) => {
	const router = useRouter()

	return (
		<Button
			key={course.CourseCode}
			p={4}
			bgColor={"brand.card"}
			borderRadius="md"
			boxShadow="md"
			onClick={() => router.push(`/course/${course.CourseCode}`)}
			width="100%"
			textAlign="left"
			variant="outline"
			_hover={{bg: "brand.card_hover"}} // Add hover effect
		>
			<Flex width="100%" align="center" justify="space-between">
				{/* Left Section: Course Code and Course Name */}
				<Box maxWidth="70%">
					<Text fontSize="md" fontWeight="bold" truncate>
						{course.CourseCode} - {course.CourseName}
					</Text>
				</Box>
				{/* Right Section: RatingOverall and NumReviews */}
				<Flex textAlign="right">
					{/* {course.NumReviews !== undefined && course.NumReviews > 0 && course.RatingOverall !== undefined && (
						<Text fontSize="sm">
							Rating: {course.RatingOverall.toFixed(1)}
						</Text>
					)} */}
					{course.NumReviews !== undefined && (
						<Text pr={3} fontSize="sm">
							{course.NumReviews} reviews
						</Text>
					)}
					<FaArrowRight />
				</Flex>
			</Flex>
		</Button>
	)
}

export const CourseNotFound = () => {
	const {setCourses} = useCourses()
	const [url, setUrl] = useState("")
	const [responseMessage, setResponseMessage] = useState("")

	const handleImportCourse = async () => {
		const data = {url}

		try {
			const response = await apiRequest<{
				course: Course | null
				result: string
			}>("post", "course/URL", data)

			if (response.result === "success") {
				setResponseMessage("Course imported successfully!")
				setCourses((prevCourses) => [
					...prevCourses, // Spread the existing courses
					response.course as Course // Add the new course
				])
			} else {
				setResponseMessage(response.result)
			}
		} catch (error) {
			console.error("Error importing course:", error)
			setResponseMessage("An error occurred while importing the course.")
		}
	}

	return (
		<Box textAlign="center" p={4}>
			<EmptyState.Root>
				<EmptyState.Content>
					{/* <EmptyState.Indicator>
						<HiSearch size={40} />
					</EmptyState.Indicator> */}
					<VStack textAlign="center">
						<EmptyState.Title>Course Not Found?</EmptyState.Title>
						<EmptyState.Description>Import the course with Subject Description Form!</EmptyState.Description>
					</VStack>

					{/* Popover for the Import Course button */}
					<PopoverRoot>
						<PopoverTrigger asChild>
							<Button pl={4} pr={4} variant="solid">
								Import Course
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverArrow />
							<PopoverBody>
								<Stack gap="4" p={4}>
									<Field label="URL of Subject Description Form">
										<Input pl={2} placeholder="URL have to be within polyu.edu.hk" value={url} onChange={(e) => setUrl(e.target.value)} />
									</Field>
									<Button bg="brand.solid" onClick={handleImportCourse}>
										Submit
									</Button>
									{responseMessage && (
										<Text color="brand.text_warning" mt={2}>
											{responseMessage}
										</Text>
									)}
								</Stack>
							</PopoverBody>
							<PopoverCloseTrigger />
						</PopoverContent>
					</PopoverRoot>
				</EmptyState.Content>
			</EmptyState.Root>
		</Box>
	)
}

export const AddCourseURL = () => {
	const {setCourses} = useCourses()
	const [url, setUrl] = useState("")
	const [responseMessage, setResponseMessage] = useState("")

	const handleImportCourse = async () => {
		const data = {url}

		try {
			const response = await apiRequest<{
				course: Course | null
				result: string
			}>("post", "course/URL", data)

			if (response.result === "success") {
				setResponseMessage("Course imported successfully!")
				setCourses((prevCourses) => [
					...prevCourses, // Spread the existing courses
					response.course as Course // Add the new course
				])
			} else {
				setResponseMessage(response.result)
			}
		} catch (error) {
			console.error("Error importing course:", error)
			setResponseMessage("An error occurred while importing the course.")
		}
	}

	return (
		<PopoverRoot>
			<PopoverTrigger asChild>
				<Text h="16px" color="brand.text_link" _hover={{textDecoration: "underline"}}>
					here
				</Text>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverBody>
					<Stack gap="4" p={4}>
						<Field label="URL of Subject Description Form">
							<Input pl={2} placeholder="URL have to be within polyu.edu.hk" value={url} onChange={(e) => setUrl(e.target.value)} />
						</Field>
						<Button bg="brand.solid" onClick={handleImportCourse}>
							Submit
						</Button>
						{responseMessage && (
							<Text color="brand.text_warning" mt={2}>
								{responseMessage}
							</Text>
						)}
					</Stack>
				</PopoverBody>
				<PopoverCloseTrigger />
			</PopoverContent>
		</PopoverRoot>
	)
}

