import {Flex, Select, Portal, Button, createListCollection} from "@chakra-ui/react"
import {useVoice} from "~/context/VoiceContext"

export const voices = createListCollection({
	items: [
		{label: "Voice 1", value: "voice1"},
		{label: "Voice 2", value: "voice2"},
		{label: "Voice 3", value: "voice3"},
		{label: "Record your voice", value: "record"}
	]
})

export const VoiceSelect = () => {
	const {state, dispatch} = useVoice()

	const handleRecordVoice = () => {
		// Logic to record voice and convert to base64 string
		// Dispatch the recorded voice to context
		const recordedVoiceBase64 = "base64string" // Replace with actual base64 string
		dispatch({type: "SET_RECORDED_VOICE", payload: recordedVoiceBase64})
	}

	// useEffect(() => {
	// 	console.log(state)
	// }, [state])

	return (
		<Flex direction="row" align="center" gap={4}>
			<Select.Root
				collection={voices}
				size="sm"
				w="100%"
				defaultValue={["record"]}
				onValueChange={(value) => {
					console.log(value)
					dispatch({type: "SET_VOICE_TYPE", payload: value.value[0]})
				}}
			>
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
								<Select.Item p={2} px={4} item={voice} key={voice.value}>
									{voice.label}
									<Select.ItemIndicator />
								</Select.Item>
							))}
						</Select.Content>
					</Select.Positioner>
				</Portal>
			</Select.Root>

			{state.voice === "record" && (
				<Button size={"sm"} px={2} onClick={handleRecordVoice}>
					Record Voice
				</Button>
			)}
		</Flex>
	)
}
