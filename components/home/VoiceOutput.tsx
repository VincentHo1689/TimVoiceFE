import {Box, Flex, Stack} from "@chakra-ui/react"
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
				<Stack w="100%" direction="row" align="center">
					<Box w="100%" p={4} borderRadius="md" bg="gray.50" border="1px" borderColor="gray.200">
						<audio controls src={`data:audio/mp3;base64,${state.generatedVoice}`} style={{width: "100%"}}></audio>
					</Box>
				</Stack>
			)}
		</Flex>
	)
}
