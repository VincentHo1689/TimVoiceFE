import React from "react"
import Head from "next/head"

const ReviewLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<>
			<Head>
				<title>Course List - PolyU Course Review</title>
			</Head>
			{children}
		</>
	)
}

export default ReviewLayout
