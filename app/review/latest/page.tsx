"use client"

import {useEffect, useState} from "react"
import {Text, Center, Stack} from "@chakra-ui/react"
import apiRequest from "~/components/general/api"
import {Review} from "~/type/CourseReview" // Adjust the import path as needed
import {ReviewCard} from "~/components/CR/Review"

export default function DefaultPage() {
	const [reviews, setReviews] = useState<Review[] | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const latestReviews = await apiRequest<Review[]>("get", "review/latest")
				setReviews(latestReviews)
			} catch (error) {
				console.error("Error fetching reviews:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchReviews()
	}, [])

	if (loading) {
		return (
			<Center height="100vh" flexDirection="column">
				<Text fontSize="2xl" mb={4}>
					Loading latest reviews...
				</Text>
			</Center>
		)
	}

	if (!reviews) {
		return (
			<Center height="100vh" flexDirection="column">
				<Text fontSize="2xl" mb={4}>
					No reviews found.
				</Text>
			</Center>
		)
	}

	return (
		<Stack pt={4}>
			<Text fontWeight={"bold"} fontSize={"xl"} pl={"10%"}>
				{" "}
				Latest Review:
			</Text>
			{reviews.map((review) => (
				<ReviewCard key={review.CourseCode + review.TimeStamp} review={review} withCC={true} />
			))}
		</Stack>
	)
}
