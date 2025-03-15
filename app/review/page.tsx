import {Suspense} from "react"
import CourseReviewForm from "~/components/CR/ReviewForm"
import {Flex, Center} from "@chakra-ui/react"

const CourseReviewPage = () => {
	return (
		<Suspense fallback={<Center>Loading...</Center>}>
			<Flex w="100%" justify="center" align="center">
				<CourseReviewForm />
			</Flex>
		</Suspense>
	)
}

export default CourseReviewPage