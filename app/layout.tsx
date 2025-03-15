import "./globals.css" // Import global styles
import React from "react"
import {Provider} from "~/components/ui/provider" // Your custom ChakraProvider
import NavBar from "~/components/general/NavBar" // Your NavBar component
import {Box, Theme} from "@chakra-ui/react" // Chakra UI Box component
import type {Metadata} from "next" // Next.js metadata type
import Head from "next/head" // Next.js Head component
import {CourseProvider} from "~/context/CourseContext"
// Define metadata for the page
export const metadata: Metadata = {
	title: "PolyU Course Review",
	description: "A platform for reviewing courses at PolyU"
}

// RootLayout component
export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Head>
				<title>PolyU Course Review - Your Guide to PolyU Courses and Feedback</title>
				<meta name="description" content="Welcome to PolyU Course Review. Browse and review PolyU courses. Find detailed course information and share your experiences." />
				<meta name="keywords" content="PolyU, courses, course reviews, education, student feedback" />
				<meta name="google-site-verification" content="BXNknUeYJyRH0qFi9NETKrUBfo8A1h5EUlEzplsyvec" />
			</Head>
			<body>
				<Provider forcedTheme="light" defaultTheme="light" enableSystem>
					<CourseProvider>
						<Theme appearance="light" colorPalette={"brand"}>
							<Box pt="60px" bg={"brand.bg"} minH={"100%"}>
								<NavBar />
								{children}
							</Box>
						</Theme>
					</CourseProvider>
				</Provider>
			</body>
		</html>
	)
}
