"use client"

import {useState} from "react"
import {useSearchParams, useRouter} from "next/navigation"
import {Box, Button, Field, VStack, HStack, Input, Textarea, Flex} from "@chakra-ui/react"
import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {z} from "zod"
import {Toaster, toaster} from "~/components/ui/toaster"

import {ReviewInsert} from "~/type/CourseReview"
import apiRequest from "~/components/general/api"
import {RatingInput} from "~/components/general/RatingStar"
import {CourseDropdown, SemesterDropdown} from "~/components/general/FormComponent"
import {AddCourseURL} from "./Course"
import {useCourses} from "~/context/CourseContext"

// Zod schema for form validation
const formSchema = z.object({
	CourseCode: z.string().min(1, "Course Code is required"),
	Teacher: z.string().optional(), //.min(1, "Teacher is required")
	Semester: z.string().min(1, "Semester is required"),
	RatingOverall: z.number({required_error: "Rating is required"}).min(0).max(5),
	RatingContent: z.number({required_error: "Rating is required"}).min(0).max(5),
	RatingWorkload: z.number({required_error: "Rating is required"}).min(0).max(5),
	RatingResult: z.number({required_error: "Rating is required"}).min(0).max(5),
	Title: z.string().optional(), //.min(1, "Title is required")
	Content: z.string().optional(), //.min(1, "Content is required")
	Result: z.enum(["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "X", ""], {invalid_type_error: "Enter your grade or leave it blank"}).optional()
})

const CourseReviewForm = () => {
	const searchParams = useSearchParams()
	const courseCodeParam = searchParams.get("CourseCode")
	const {courses} = useCourses()
	const router = useRouter()
	const {
		handleSubmit,
		control,
		formState: {errors}
	} = useForm<ReviewInsert>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			CourseCode: courseCodeParam || "",
			Teacher: "",
			Semester: "",
			RatingOverall: 3,
			RatingContent: 3,
			RatingWorkload: 3,
			RatingResult: 3,
			Title: "",
			Content: "",
			Result: ""
		}
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	const onSubmit = async (data: ReviewInsert) => {
		if (isSubmitting) return // Prevent multiple submissions

		setIsSubmitting(true) // Disable further submissions

		try {
			await apiRequest<ReviewInsert>("post", "review/insert", data)
			toaster.create({
				title: "Review Submitted",
				description: "Your review has been successfully submitted!",
				type: "success"
			})
			setTimeout(() => {
				router.push(`/course/${data.CourseCode}`)
			}, 2000)
		} catch (error) {
			console.error("Error submitting review:", error)
			toaster.create({
				title: "Submission Failed",
				description: "There was an error submitting your review. Please try again.",
				type: "error"
			})
		} finally {
			setSubmitted(true)
		}
	}

	return (
		<Box w="calc(80% + 50px)">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Toaster />
				<VStack gap="4" p="8" align="stretch">
					{/* Course Code */}
					<Field.Root invalid={!!errors.CourseCode}>
						<Field.Label>Course</Field.Label>
						<Controller name="CourseCode" control={control} render={({field}) => <CourseDropdown field={field} courses={courses} />} />
						<Field.ErrorText>{errors.CourseCode?.message}</Field.ErrorText>
						<Field.HelperText>
							<Flex align="center">
								Click{" "}
								<Box as="span" display="inline" ml={1} mr={1}>
									<AddCourseURL />
								</Box>
								to add a course if it is not found.
							</Flex>
						</Field.HelperText>
					</Field.Root>
					{/* Teacher */}
					<Field.Root invalid={!!errors.Teacher}>
						<Field.Label>Teacher</Field.Label>
						<Controller name="Teacher" control={control} render={({field}) => <Input {...field} fontSize={13} h="20px" pl={2} pt={4} pb={4} placeholder="Name of teacher (optional)" />} />
						<Field.ErrorText>{errors.Teacher?.message}</Field.ErrorText>
					</Field.Root>
					{/* Semester */}
					<Field.Root invalid={!!errors.Semester}>
						<Field.Label>Semester</Field.Label>
						<Controller name="Semester" control={control} render={({field}) => <SemesterDropdown field={field} />} />
						<Field.ErrorText>{errors.Semester?.message}</Field.ErrorText>
					</Field.Root>
					{/* Ratings */}
					<Flex mt={2} wrap="wrap" justifyContent="flex-start">
						<HStack>
							<Field.Root pr={4} invalid={!!errors.RatingOverall}>
								<Field.Label>Overall Rating</Field.Label>
								<Controller name="RatingOverall" control={control} render={({field}) => <RatingInput field={field} />} />
								<Field.ErrorText>{errors.RatingOverall?.message}</Field.ErrorText>
							</Field.Root>
							<Field.Root pr={4} invalid={!!errors.RatingContent}>
								<Field.Label>Contents </Field.Label>
								<Controller name="RatingContent" control={control} render={({field}) => <RatingInput field={field} />} />
								<Field.ErrorText>{errors.RatingContent?.message}</Field.ErrorText>
							</Field.Root>
						</HStack>
						<HStack>
							<Field.Root pr={4} invalid={!!errors.RatingWorkload}>
								<Field.Label>Workload</Field.Label>
								<Controller name="RatingWorkload" control={control} render={({field}) => <RatingInput field={field} />} />
								<Field.ErrorText>{errors.RatingWorkload?.message}</Field.ErrorText>
							</Field.Root>
							<Field.Root pr={4} invalid={!!errors.RatingResult}>
								<Field.Label>Grades</Field.Label>
								<Controller name="RatingResult" control={control} render={({field}) => <RatingInput field={field} />} />
								<Field.ErrorText>{errors.RatingResult?.message}</Field.ErrorText>
							</Field.Root>
						</HStack>
					</Flex>
					{/* Title */}
					<Field.Root invalid={!!errors.Title}>
						<Field.Label>Title</Field.Label>
						<Controller name="Title" control={control} render={({field}) => <Input {...field} fontSize={13} h="20px" pl={2} pt={4} pb={4} placeholder="Review Title (optional)" />} />
						<Field.ErrorText>{errors.Title?.message}</Field.ErrorText>
					</Field.Root>
					{/* Content */}
					<Field.Root invalid={!!errors.Content}>
						<Field.Label>Content</Field.Label>
						<Controller name="Content" control={control} render={({field}) => <Textarea {...field} fontSize={13} h="80px" p={2} placeholder="Difficulty / Workload ..." />} />
						<Field.ErrorText>{errors.Content?.message}</Field.ErrorText>
					</Field.Root>
					{/* Result */}
					<Field.Root invalid={!!errors.Result}>
						<Field.Label>Result</Field.Label>
						<Controller
							name="Result"
							control={control}
							render={({field}) => <Input {...field} fontSize={13} h="25px" pl={2} pt={4} pb={4} placeholder="Optional, 'X' for dropped course" />}
						/>
						<Field.ErrorText>{errors.Result?.message}</Field.ErrorText>
					</Field.Root>
					<Button type="submit" mt={4} disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : submitted ? "Review Submitted" : "Submit Review"}
					</Button>
				</VStack>
			</form>
		</Box>
	)
}

export default CourseReviewForm
