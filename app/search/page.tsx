"use client"

import {useEffect} from "react"
import {useRouter} from "next/navigation"
import {Text, Center} from "@chakra-ui/react"

export default function DefaultPage() {
	const router = useRouter()

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/")
		}, 3000)

		return () => clearTimeout(timer)
	}, [router])

	return (
		<Center height="100vh" flexDirection="column">
			<Text fontSize="2xl" mb={4}>
				&apos;Not all those who wander are lost.&apos; - J.R.R. Tolkien
			</Text>
			<Text fontSize="lg">Redirecting to the home page in 3 seconds...</Text>
		</Center>
	)
}
