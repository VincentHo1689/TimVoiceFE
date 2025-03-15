import React from "react"
import Head from "next/head"

const AboutLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<>
			<Head>
				<title>About PolyU Course Review</title>
			</Head>
			{children}
		</>
	)
}

export default AboutLayout
