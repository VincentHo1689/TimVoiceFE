"use client"

import {Box, Flex, Heading, Text, Grid} from "@chakra-ui/react"
import {FaMicrophone, /* FaRegLightbulb, */ FaVolumeUp, FaHeadphones} from "react-icons/fa"
import React from "react"
import {SAMPLE_VOICES} from "../samples/sampleVoice"

// Static base64 encoded audio samples
// Replace these with your actual encoded audio samples

export const VoiceExampleCards: React.FC = () => {
	return (
		<Box w="100%" maxW="1200px" p={4} id="examples">
			<Heading as="h2" fontSize="4xl" textAlign="center" mb={8}>
				輸入參考 Input Examples
			</Heading>

			<Grid templateColumns={{base: "1fr", lg: "1fr 1fr"}} gap={8} px={4}>
				<VoiceExampleCard
					icon={<FaMicrophone size={20} />}
					title="例子 1 Example 1"
					description="可錄製口語語音檔，生成語音。"
					inputLabel="輸入語音 Input"
					inputVoice={SAMPLE_VOICES.input1}
					inputVoiceLabel="‘粵語書寫並唔係咩新事物，清末已經有傳教士用粵語寫故仔。’"
					outputLabel="生成語音 Output"
					outputVoice={SAMPLE_VOICES.output1}
					outputVoiceLabel="‘我係香港人。’"
				/>

				<VoiceExampleCard
					icon={<FaMicrophone size={20} />}
					title="例子 2 Example 2"
					description="可輸入書面語音檔，生成語音。"
					inputLabel="輸入語音 Input"
					inputVoiceLabel="‘我根據西方觀念衡量，真不曉得為什麼他們一直不開發？’"
					inputVoice={SAMPLE_VOICES.input2}
					outputLabel="生成語音 Output"
					outputVoice={SAMPLE_VOICES.output2}
					outputVoiceLabel="‘其實，我係語音生成模型。’"
				/>
			</Grid>
		</Box>
	)
}

interface VoiceExampleCardProps {
	icon: React.ReactNode
	title: string
	description: string
	inputLabel: string
	inputVoice: string
	inputVoiceLabel?: string
	outputLabel: string
	outputVoice: string
	outputVoiceLabel?: string
}

const VoiceExampleCard: React.FC<VoiceExampleCardProps> = ({icon, title, description, inputLabel, inputVoice, inputVoiceLabel, outputLabel, outputVoice, outputVoiceLabel}) => {
	return (
		<Box
			p={6}
			borderWidth="1px"
			borderRadius="lg"
			boxShadow="md"
			bg="white"
			transition="all 0.3s"
			_hover={{
				transform: "translateY(-5px)",
				boxShadow: "lg"
			}}
		>
			<Flex align="center" mb={4}>
				<Flex align="center" justify="center" w="40px" h="40px" borderRadius="full" bg="blue.100" color="blue.600">
					{icon}
				</Flex>
				<Heading as="h3" size="xl" pl={4}>
					{title}
				</Heading>
			</Flex>

			<Text mb={6}>{description}</Text>

			<Grid templateColumns="1fr" gap={4}>
				<Box p={4} borderRadius="md" bg="gray.50" border="1px" borderColor="gray.200">
					<Flex align="center" mb={2}>
						<Box as={FaVolumeUp} mr={2} color="blue.500" />
						<Text fontWeight="medium">{inputLabel}</Text>
					</Flex>
					<audio controls src={`data:audio/wav;base64,${inputVoice}`} style={{width: "100%"}} />
					<Text px={2} fontWeight="medium">
						{inputVoiceLabel}
					</Text>
				</Box>

				<Box p={4} borderRadius="md" bg="blue.50" border="1px" borderColor="blue.200">
					<Flex align="center" mb={2}>
						<Box as={FaHeadphones} mr={2} color="blue.600" />
						<Text fontWeight="medium">{outputLabel}</Text>
					</Flex>
					<audio controls src={`data:audio/wav;base64,${outputVoice}`} style={{width: "100%"}} />
					<Text px={2} fontWeight="medium">
						{outputVoiceLabel}
					</Text>
				</Box>
			</Grid>
		</Box>
	)
}

export default VoiceExampleCards
