"use client"

import {Center, Stack, Button, Input, Portal, Select, createListCollection, Flex} from "@chakra-ui/react"
import {useState} from "react"
import {useVoice} from "~/context/VoiceContext"

const voices = createListCollection({
	items: [
		{label: "Voice 1", value: "voice1"},
		{label: "Voice 2", value: "voice2"},
		{label: "Voice 3", value: "voice3"},
		{label: "Record your voice", value: "record"}
	]
})

export default function Home() {
	const {state, dispatch} = useVoice()
	const [generatedVoiceUrl, setGeneratedVoiceUrl] = useState("")

	const handleRecordVoice = () => {
		// Logic to record voice and convert to base64 string
		// Dispatch the recorded voice to context
		const recordedVoiceBase64 = "base64string" // Replace with actual base64 string
		dispatch({type: "SET_RECORDED_VOICE", payload: recordedVoiceBase64})
	}

	const handleGenerateVoice = () => {
		// Logic to send text and selected voice to backend and get the generated voice URL
		// Set the generated voice URL to state
		const generatedVoiceBase64 = "base64string" // Replace with actual base64 string
		setGeneratedVoiceUrl(generatedVoiceBase64)
		dispatch({type: "SET_GENERATED_VOICE_URL", payload: generatedVoiceBase64})
	}

	return (
		<Center h="calc(100vh - 40px)" mt="-20px" w="100%">
			<Stack w="100%" p={4} align="center">
				<Stack direction="column" px={4} w="100%" maxW="600px">
					<Input px={2} placeholder="Enter text to say" value={state.text} onChange={(e) => dispatch({type: "SET_TEXT", payload: e.target.value})} />

					<Flex direction="row" align="center" gap={4}>
						<Select.Root collection={voices} size="sm" w="100%" defaultValue={["record"]}>
							<Select.HiddenSelect />
							{/* <Select.Label>Select voice to replicate</Select.Label> */}
							<Select.Control>
								<Select.Trigger>
									<Select.ValueText px={2} placeholder="Select voice to replicate" />
								</Select.Trigger>
								<Select.IndicatorGroup>
									<Select.Indicator px={2} />
								</Select.IndicatorGroup>
							</Select.Control>
							<Portal>
								<Select.Positioner w="100%" maxW="568px">
									<Select.Content w="100%">
										{voices.items.map((voice) => (
											<Select.Item
												p={2}
												px={4}
												item={voice}
												key={voice.value}
												onSelect={() => {
													console.log(voice)
													dispatch({type: "SET_VOICE", payload: voice.value})
												}}
											>
												{voice.label}
												<Select.ItemIndicator />
											</Select.Item>
										))}
									</Select.Content>
								</Select.Positioner>
							</Portal>
						</Select.Root>

						{state.voice === "record" && <Button onClick={handleRecordVoice}>Record Voice</Button>}
					</Flex>

					<Button onClick={handleGenerateVoice}>Generate Voice</Button>

					{generatedVoiceUrl && (
						<Stack direction="row" align="center">
							<audio controls src={`data:audio/mp3;base64,${generatedVoiceUrl}`}></audio>
							<Button asChild>
								<a href={`data:audio/mp3;base64,${generatedVoiceUrl}`} download="generated-voice.mp3">
									Download
								</a>
							</Button>
						</Stack>
					)}
				</Stack>
			</Stack>
		</Center>
	)
}
