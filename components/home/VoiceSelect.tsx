import {Flex, Select, Portal, createListCollection} from "@chakra-ui/react"
import {useVoice} from "~/context/VoiceContext"
import dynamic from "next/dynamic"
//import {RecordButton} from "~/components/home/RecordButton"

const RecordButton = dynamic(() => import("./RecordButton"), {ssr: false})
const UploadButton = dynamic(() => import("./UploadButton"), {ssr: false})

export const voices = createListCollection({
	items: [
		{label: "語音 1 Voice 1", value: "LTTS_1"},
		{label: "語音 2 Voice 2", value: "LTTS_2"},
		//{label: "Voice 3", value: "voice3"},
		{label: "上傳音檔 Upload Voice  (.wav)", value: "upload"},
		{label: "錄製聲音 Record Voice", value: "record"}
	]
})

export const VoiceSelect = () => {
	const {state, dispatch} = useVoice()

	return (
		<Flex direction="row" align="center" gap={4}>
			<Select.Root
				collection={voices}
				size="lg"
				w="100%"
				defaultValue={["record"]}
				onValueChange={(value) => {
					//console.log(value)
					dispatch({type: "SET_VOICE_TYPE", payload: value.value[0]})
					if (value.value[0] === "LTTS_1" || value.value[0] === "LTTS_2") {
						//console.log("Selected voice:", value.value[0])
						dispatch({type: "SET_RECORDED_VOICE", payload: ""})
					}
				}}
			>
				<Select.HiddenSelect />
				<Select.Control>
					<Select.Trigger>
						<Select.ValueText px={2} placeholder="可選擇語音模型或錄製自己的聲音。 Choose voice or record your own voice." />
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

			{state.speaker_id === "upload" && <UploadButton />}
			{state.speaker_id === "record" && <RecordButton />}
		</Flex>
	)
}
