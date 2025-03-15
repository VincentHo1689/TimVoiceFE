"use client"

import React, {useEffect, useState} from "react"
import {useParams, useRouter} from "next/navigation"
import {Text, Center, Stack, Flex} from "@chakra-ui/react"
import apiRequest from "~/components/general/api"
import {CourseWithReviews} from "~/type/CourseReview" // Adjust the import path as needed
import {ReviewCard, NoReview} from "~/components/CR/Review"
import {CourseCard} from "~/components/CR/Course"

export default function CoursePage() {
	const params = useParams()
	const router = useRouter()
	const courseCode = params.courseCode as string
	const [courseWithReviews, setCourseWithReviews] = useState<CourseWithReviews | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const data = await apiRequest<CourseWithReviews>("get", `review/${courseCode}`)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				setCourseWithReviews((prev) => {
					return data
				})
			} catch (error) {
				console.error("Error fetching course reviews:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchReviews()
	}, [courseCode])

	useEffect(() => {
		if (!courseWithReviews && !loading) {
			const timer = setTimeout(() => {
				router.push("/")
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [router, courseWithReviews, loading])

	if (loading) {
		return (
			<Center height="100vh" flexDirection="column">
				<Text fontSize="2xl" mb={4}>
					Loading course reviews...
				</Text>
			</Center>
		)
	}

	if (!courseWithReviews) {
		return (
			<Center height="100vh" flexDirection="column">
				<Text fontSize="2xl" mb={4}>
					No reviews found for course {courseCode}.
				</Text>
				<Text fontSize="lg">Redirecting to the home page in 3 seconds...</Text>
			</Center>
		)
	}

	return (
		<React.Fragment>
			<Flex pt={2} pb={4} width="100%" align="center" justify="center">
				<CourseCard courseWithReviews={courseWithReviews} />
			</Flex>
			<Stack w="100%">
				{courseWithReviews.Reviews.length === 0 ? (
					<NoReview />
				) : (
					courseWithReviews.Reviews.map((review) => <ReviewCard key={review.CourseCode + review.TimeStamp} review={review} withCC={false} />)
				)}
			</Stack>
		</React.Fragment>
	)
}
