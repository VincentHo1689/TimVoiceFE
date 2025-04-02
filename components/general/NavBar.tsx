"use client"

import {Box, Flex, Text /* , Button, Link as ChakraLink, useBreakpointValue */} from "@chakra-ui/react"
import {useRouter} from "next/navigation"
import React from "react"

const NavBar = () => {
	const router = useRouter()
	// const textContent = useBreakpointValue({
	// 	base: "PolyU CR", // For small screens (width < 500px)
	// 	sm: "PolyU Course Review" // For medium and larger screens (width >= 500px)
	// })
	//const isLargeScreen = useBreakpointValue({base: false, md: true})

	return (
		<Box as="nav" position="fixed" top="0" width="100%" zIndex="1000" bg="brand.solid" color="white" p={2} pr="5%" pl="5%">
			<Flex
				justify="space-between"
				align="center"
				mx="auto"
				wrap="nowrap" // Ensure no wrapping
				overflowX="auto" // Make it scrollable if it overflows
			>
				<Flex
					as="ul"
					listStyleType="none"
					m={0}
					p={0}
					gap={4}
					justify="flex-start"
					flexWrap="nowrap" // Prevent wrapping of nav items
				>
					<Text py={1} color="brand.text_reverse" fontSize="3xl" fontWeight="bold" onClick={() => router.push("/")} cursor="pointer">
						廣東話語音生成模型 Cantonese Zero-shot TTS System
						{/* PolyU CR */}
					</Text>
				</Flex>
				{/* <Flex
					as="ul"
					listStyleType="none"
					m={0}
					p={0}
					gap={4}
					justify="flex-end"
					flexWrap="nowrap" // Prevent wrapping of nav items
				>
					<li>
						<ChakraLink onClick={() => router.push("/course/list")} _hover={{textDecoration: "none"}}>
							<Button variant="plain" color="brand.text_reverse">
								{isLargeScreen ? "Course List" : "Courses"}
							</Button>
						</ChakraLink>
					</li>
					<li>
						<ChakraLink onClick={() => router.push("/review/latest")} _hover={{textDecoration: "none"}}>
							<Button variant="plain" color="brand.text_reverse">
								{isLargeScreen ? "Latest Review" : "Latest"}
							</Button>
						</ChakraLink>
					</li>
					<li>
						<ChakraLink onClick={() => router.push("/review")} _hover={{textDecoration: "none"}}>
							<Button variant="plain" color="brand.text_reverse">
								{isLargeScreen ? "Write Review" : "Review"}
							</Button>
						</ChakraLink>
					</li>
					<li>
						<ChakraLink onClick={() => router.push("/about")} _hover={{textDecoration: "none"}}>
							<Button variant="plain" color="brand.text_reverse">
								{isLargeScreen ? "About This App" : "About"}
							</Button>
						</ChakraLink>
					</li>
				</Flex> */}
			</Flex>
		</Box>
	)
}

export default NavBar
