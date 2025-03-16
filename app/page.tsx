"use client"

import {Center, Stack, Button, Input} from "@chakra-ui/react"
import {useVoice} from "~/context/VoiceContext"
import {VoiceSelect} from "~/components/home/VoiceSelect"
import {VoiceOutput} from "~/components/home/VoiceOutput"

export default function Home() {
	const {state, dispatch} = useVoice()

	const handleGenerateVoice = () => {
		// Logic to send text and selected voice to backend and get the generated voice URL
		// Set the generated voice URL to state
		const generatedVoiceBase64 = "base64string" // Replace with actual base64 string
		dispatch({type: "SET_GENERATED_VOICE", payload: generatedVoiceBase64})
	}

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
