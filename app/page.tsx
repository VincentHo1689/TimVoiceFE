"use client"

import {Center, Stack, Button, Input} from "@chakra-ui/react"
import {useVoice} from "~/context/VoiceContext"
import {VoiceSelect} from "~/components/home/VoiceSelect"
import {VoiceOutput} from "~/components/home/VoiceOutput"
import {useEffect} from "react"
//import apiRequest from "~/components/general/api"

export default function Home() {
	const {state, dispatch} = useVoice()
	const handleGenerateVoice = async () => {
		// for testing purposes
		const generatedVoiceBase64 = state.recordedVoice
		dispatch({type: "SET_GENERATED_VOICE", payload: generatedVoiceBase64})

		// Check if all required state properties exist
		// if (!state.text || !state.voiceType || !state.recordedVoice) {
		// 	console.error("Missing Input")
		// 	// toaster.create({
		// 	// 	title: "Missing Input",
		// 	// 	description: "Please ensure that you have entered text, selected a voice type, and recorded your voice before generating the voice.",
		// 	// 	status: "warning",
		// 	// 	duration: 5000,
		// 	// 	isClosable: true
		// 	// })
		// 	return
		// }

		// try {
		// 	// Make the API request
		// 	const response = await apiRequest<{generatedVoice: string}, {text: string; voiceType: string; recordedVoice: string}>("post", "generate-voice", {
		// 		text: state.text,
		// 		voiceType: state.voiceType,
		// 		recordedVoice: state.recordedVoice
		// 	})

		// 	// Dispatch the generated voice to the state
		// 	dispatch({type: "SET_GENERATED_VOICE", payload: response.generatedVoice})
		// } catch (error) {
		// 	console.error("Error generating voice:", error)
		// }
	}

	useEffect(() => {
		console.log(state)
	}, [state])

	return (
		<Center h="calc(100vh - 40px)" mt="-20px" w="100%">
			<Stack w="100%" p={4} align="center">
				<Stack direction="column" px={4} w="100%" maxW="600px">
					<Input px={2} placeholder="Enter text to say" value={state.text} onChange={(e) => dispatch({type: "SET_TEXT", payload: e.target.value})} />

					<VoiceSelect />

					<Button onClick={handleGenerateVoice}>Generate Voice</Button>

					<VoiceOutput />
				</Stack>
			</Stack>
		</Center>
	)
}
