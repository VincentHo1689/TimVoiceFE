"use client"

import {Center, Stack, Button, Text, Textarea} from "@chakra-ui/react"
import {Toaster, toaster} from "~/components/ui/toaster"
import {useVoice} from "~/context/VoiceContext"
import {VoiceSelect} from "~/components/home/VoiceSelect"
import {VoiceOutput} from "~/components/home/VoiceOutput"
import {useEffect} from "react"
import apiRequest from "~/components/general/api"

export default function Home() {
	const {state, dispatch} = useVoice()
	const handleGenerateVoice = async () => {
		// for testing purposes
		// const generatedVoiceBase64 = state.recordedVoice
		// dispatch({type: "SET_GENERATED_VOICE", payload: generatedVoiceBase64})

		if (!state.text || !state.voiceType || (state.voiceType == "record" && !state.recordedVoice)) {
			//console.error("Missing Input")
			toaster.create({
				title: "Missing Input",
				description: "Please entered text and record your voice",
				type: "warning"
			})
			return
		}

		try {
			// Make the API request
			// const response = await apiRequest<{generatedVoice: string}, {text: string; voiceType: string; recordedVoice: string}>("post", "generate-voice", {
			// 	text: state.text,
			// 	voiceType: state.voiceType,
			// 	recordedVoice: state.recordedVoice
			// })

			const promise = apiRequest<{generatedVoice: string}, {text: string; voiceType: string; recordedVoice: string}>("post", "generate-voice", {
				text: state.text,
				voiceType: state.voiceType,
				recordedVoice: state.recordedVoice
			})

			toaster.promise(promise, {
				success: {
					title: "Voice Generated",
					description: "The voice has been successfully generated."
				},
				error: {
					title: "Generation Failed",
					description: "There was an error generating the voice."
				},
				loading: {title: "Generating Voice...", description: "Please wait"}
			})

			const response = await promise

			// Dispatch the generated voice to the state
			dispatch({type: "SET_GENERATED_VOICE", payload: response.generatedVoice})
		} catch (error) {
			console.log("Error generating voice:", error)
			// toaster.create({
			// 	title: "Cannot Generate Voice",
			// 	description: `${error}`,
			// 	type: "error"
			// })
			const generatedVoiceBase64 = state.recordedVoice
			dispatch({type: "SET_GENERATED_VOICE", payload: generatedVoiceBase64})
		}
	}

	useEffect(() => {
		console.log(state)
	}, [state])

	return (
		<Center h="calc(100vh - 40px)" mt="-20px" w="100%" bgGradient="linear(to-b, blue.50, white)">
			<Toaster />
			<Stack w="100%" p={4} align="center">
				<Text as="h1" fontSize="4xl" fontWeight="bold">
					Cantonese Voice Cloning
				</Text>
				<Stack direction="column" w="100%" maxW="600px" p={6} borderRadius="xl" boxShadow="lg" bg="white">
					<Stack>
						<Text fontWeight="medium">Text to speak</Text>
						<Textarea
							p={3}
							placeholder="Enter text to say"
							value={state.text}
							onChange={(e) => dispatch({type: "SET_TEXT", payload: e.target.value})}
							size="lg"
							minH="200px"
							_focus={{borderColor: "blue.400"}}
						/>
					</Stack>

					<Stack>
						<Text fontWeight="medium">Voice selection</Text>
						<VoiceSelect />
					</Stack>

					<Button
						colorScheme="blue"
						size="lg"
						onClick={handleGenerateVoice}
						py={6}
						borderRadius="md"
						_hover={{transform: "translateY(-2px)", boxShadow: "md"}}
						transition="all 0.2s"
						w="100%"
					>
						Generate Voice Clone
					</Button>

					<VoiceOutput />
				</Stack>
			</Stack>
		</Center>
	)
}
