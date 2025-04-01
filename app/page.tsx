"use client"

import {Center, Stack, Button, Text, Textarea} from "@chakra-ui/react"
import {Toaster, toaster} from "~/components/ui/toaster"
import {useVoice} from "~/context/VoiceContext"
import {VoiceSelect} from "~/components/home/VoiceSelect"
import {VoiceOutput} from "~/components/home/VoiceOutput"
import {useEffect} from "react"
import apiRequest from "~/components/general/api"
import VoiceExampleCards from "~/components/home/CardRight"

export default function Home() {
	const {state, dispatch} = useVoice()
	const handleGenerateVoice = async () => {
		if (!state.text || !state.speaker_id || (state.speaker_id == "record" && !state.audio_buffer) || (state.speaker_id == "upload" && !state.audio_buffer)) {
			//console.error("Missing Input")
			toaster.create({
				title: "Missing Input",
				description: "Please entered text and record your voice",
				type: "warning"
			})
			return
		}

		// CONVERT TO ARRAY BUFFER
		interface GenerateVoiceData {
			text: string
			speaker_id: string | null
			audio_buffer?: string | null
		}

		const data: GenerateVoiceData = {
			text: state.text,
			speaker_id: state.speaker_id === "upload" || state.speaker_id === "record" ? null : state.speaker_id,
			//audio_buffer: null
			audio_buffer: state.audio_buffer ? state.audio_buffer : null
		}

		console.log("Data to send:", data)

		try {
			console.log("generate voice")
			const promise = apiRequest<{audio_buffer: string}>("post", "generate", data)

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

			console.log("Response:", response)

			const audioData = response.audio_buffer
			//const base64 = btoa(new Uint8Array(audioData).reduce((data, byte) => data + String.fromCharCode(byte), ""))

			// Dispatch the generated voice to the state
			dispatch({type: "SET_GENERATED_VOICE", payload: audioData})
		} catch (error) {
			console.log("Error generating voice:", error)

			//const generatedVoiceBase64 = state.audio_buffer
			dispatch({type: "SET_GENERATED_VOICE", payload: ""})
		}
	}

	useEffect(() => {
		console.log("state", state)
	}, [state])

	return (
		<Center h="calc(100vh - 40px)" mt="-20px" w="100%" bgGradient="linear(to-b, blue.50, white)">
			<Toaster />
			<VoiceExampleCards />
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
