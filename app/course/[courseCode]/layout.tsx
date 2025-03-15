import React from "react"
import Head from "next/head"

const CourseLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<>
			<Head>
				<title>Course Details - PolyU Course Review</title>
			</Head>
			{children}
		</>
	)
}

export default CourseLayout
