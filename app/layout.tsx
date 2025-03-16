import "./globals.css" // Import global styles
import React from "react"
import {Provider} from "~/components/ui/provider" // Your custom ChakraProvider
import NavBar from "~/components/general/NavBar" // Your NavBar component
import {Box, Theme} from "@chakra-ui/react" // Chakra UI Box component
import type {Metadata} from "next" // Next.js metadata type
import {VoiceProvider} from "~/context/VoiceContext"
// Define metadata for the page
export const metadata: Metadata = {
	title: "Voice Clone",
	description: "A platform for clone voice"
}

// RootLayout component
export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Provider forcedTheme="light" defaultTheme="light" enableSystem>
					<VoiceProvider>
						<Theme appearance="light" colorPalette={"brand"}>
							<Box pt="60px" bg={"brand.bg"} minH={"100%"}>
								<NavBar />
								{children}
							</Box>
						</Theme>
					</VoiceProvider>
				</Provider>
			</body>
		</html>
	)
}
