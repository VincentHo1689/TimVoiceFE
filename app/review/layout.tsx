import React from "react"
import Head from "next/head"

const ReviewLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<>
			<Head>
				<title>Course Review - PolyU Course Review</title>
				<meta name="description" content="Submit your review for a PolyU course. Share your experience and help others make informed decisions." />
				<meta name="keywords" content="course review, PolyU, education, student reviews" />
				<meta name="robots" content="index, follow" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			{children}
		</>
	)
}

export default ReviewLayout
