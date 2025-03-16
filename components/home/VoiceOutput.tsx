import {Flex, Stack} from "@chakra-ui/react"
import {useEffect} from "react"
import {useVoice} from "~/context/VoiceContext"

export const VoiceOutput = () => {
	const {state} = useVoice()

	useEffect(() => {
		console.log(state.generatedVoice)
	}, [state.generatedVoice])

	return (
		<Flex direction="row" align="center" gap={4} w="100%">
			{state.generatedVoice && (
				<Stack direction="row" align="center">
					<audio controls src={`data:audio/mp3;base64,${state.generatedVoice}`}></audio>
				</Stack>
			)}
		</Flex>
	)
}
