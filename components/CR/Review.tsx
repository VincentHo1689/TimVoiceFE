"use client"

import React, {useState, useEffect} from "react"
import {Box, Text, HStack, Flex, Button, Link} from "@chakra-ui/react"
import {Review} from "~/type/CourseReview"
import {RatingStar} from "~/components/general/RatingStar"
import {FaArrowUp, FaArrowDown} from "react-icons/fa"
import apiRequest from "~/components/general/api"
import {EmptyState, VStack} from "@chakra-ui/react"
import {HiColorSwatch} from "react-icons/hi"
import {useRouter} from "next/navigation"

export const ReviewCard = ({review, withCC = true, CN = ""}: {review: Review; withCC?: boolean; CN?: string}) => {
	const router = useRouter()
	const [likes, setLikes] = useState(review.Likes || 0)
	const [hasVoted, setHasVoted] = useState(false)
	const [likeDislike, setLikeDislike] = useState(true)

	useEffect(() => {
		const storedVote = localStorage.getItem(`vote-${review.CourseCode}-${review.TimeStamp}`)
		if (storedVote) {
			setHasVoted(true)
			setLikeDislike(storedVote === "true")
		}
	}, [review.CourseCode, review.TimeStamp])

	const handleVote = async (like: boolean) => {
		if (hasVoted) return
		const data = {
			CourseCode: review.CourseCode,
			TimeStamp: review.TimeStamp,
			Like: like
		}

		try {
			setLikes((prevLikes) => (like ? prevLikes + 1 : prevLikes - 1))
			setHasVoted(true)
			setLikeDislike(like)
			await apiRequest<{
				CourseCode: string
				TimeStamp: string
				Like: boolean
			}>("post", `like/update`, data)
			localStorage.setItem(`vote-${review.CourseCode}-${review.TimeStamp}`, like.toString())
		} catch (error) {
			console.error("Error updating likes:", error)
		}
	}

	return (
		<Box pb="20px" w="100%" display="flex" justifyContent="center">
			<Box bg="brand.card" w="calc(80% + 20px)" p={2} pl={4} pr={4} borderWidth={1} borderRadius="md" boxShadow="md" marginBottom={2}>
				{/* Title and Timestamp */}
				<HStack justifyContent="space-between" alignItems="flex-start">
					<Text fontSize="md" fontWeight="bold">
						{review.Title ? review.Title : "--"}
					</Text>
					<Text fontSize="sm">{new Date(review.TimeStamp).toLocaleDateString()}</Text>
				</HStack>
				{/* Course Code, Teacher, and Semester */}
				<Text fontSize="sm" mt={2}>
					{withCC ? (
						<Link color="brand.text_link" onClick={() => router.push(`/course/${review.CourseCode}`)}>
							{review.CourseCode + CN}
						</Link>
					) : null}{" "}
					- {review.Teacher} ({review.Semester})
				</Text>
				{/* Content Block */}
				<Box mt={2} bg="gray.50" borderRadius="md">
					<Text fontSize="md">{review.Content}</Text>
				</Box>
				{/* Result (if available) */}
				{review.Result && (
					<Box mt={4}>
						<Text fontSize="sm" fontWeight="bold">
							Result: {review.Result}
						</Text>
					</Box>
				)}
				{/* Ratings */}
				<Flex mt={2} wrap="wrap" justifyContent="flex-start">
					<HStack pr={4}>
						<Box w="63px" fontSize="sm">
							Overall:
						</Box>
						<RatingStar score={review.RatingOverall} />
						<Box w="58px" fontSize="sm" ml={2}>
							Content:
						</Box>
						<RatingStar score={review.RatingContent} />
					</HStack>
					<HStack>
						<Box w="63px" fontSize="sm">
							Workload:
						</Box>
						<RatingStar score={review.RatingWorkload} />
						<Box w="58px" fontSize="sm" ml={2}>
							Result:
						</Box>
						<RatingStar score={review.RatingResult} />
					</HStack>
					<Flex justifyContent="flex-end" alignItems="center" ml="auto">
						<Button variant="plain" size="sm" onClick={() => handleVote(true)} mr={2}>
							<FaArrowUp color={hasVoted && likeDislike == true ? "#5CB338" : "#444444"} />
						</Button>
						<Text fontSize="sm" fontWeight="bold">
							{likes}
						</Text>
						<Button variant="plain" size="sm" onClick={() => handleVote(false)} ml={2}>
							<FaArrowDown color={hasVoted && likeDislike == false ? "#FB4141" : "#444444"} />
						</Button>
					</Flex>
				</Flex>
			</Box>
		</Box>
	)
}


export const NoReview = () => {
	return (
		<Box textAlign="center" p={4}>
			<EmptyState.Root>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<HiColorSwatch size={40} />
					</EmptyState.Indicator>
					<VStack textAlign="center">
						<EmptyState.Title>No reviews available for this course.</EmptyState.Title>
						<EmptyState.Description>Be the first to leave a review!</EmptyState.Description>
					</VStack>
				</EmptyState.Content>
			</EmptyState.Root>
		</Box>
	)
}
