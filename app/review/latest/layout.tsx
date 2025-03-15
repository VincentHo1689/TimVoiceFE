import React from "react"
import Head from "next/head"

const LatestReviewLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<>
			<Head>
				<title>Latest Reviews - PolyU Course Review</title>
			</Head>
			{children}
		</>
	)
}

export default LatestReviewLayout
