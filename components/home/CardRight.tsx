"use client"

import {Box, Flex, Heading, Text, Grid} from "@chakra-ui/react"
import {FaMicrophone, /* FaRegLightbulb, */ FaVolumeUp, FaHeadphones} from "react-icons/fa"
import React from "react"
import {SAMPLE_VOICES} from "../samples/sampleVoice"

// Static base64 encoded audio samples
// Replace these with your actual encoded audio samples

export const VoiceExampleCards: React.FC = () => {
	return (
		<Box w="100%" maxW="1200px" py={10} id="examples">
			<Heading as="h2" fontSize="3xl" textAlign="center" mb={8}>
				Voice Cloning Examples
			</Heading>

			<Grid templateColumns={{base: "1fr", lg: "1fr 1fr"}} gap={8} px={4}>
				<VoiceExampleCard
					icon={<FaMicrophone size={20} />}
					title="Example 1"
					description="Original voice sample and the cloned output."
					inputLabel="Original Recording"
					inputVoice={SAMPLE_VOICES.input1}
					outputLabel="Cloned Voice"
					outputVoice={SAMPLE_VOICES.output1}
				/>

				<VoiceExampleCard
					icon={<FaHeadphones size={20} />}
					title="Example 2"
					description="Another voice cloning demonstration with different text."
					inputLabel="Original Recording"
					inputVoice={SAMPLE_VOICES.input2}
					outputLabel="Cloned Voice"
					outputVoice={SAMPLE_VOICES.output2}
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
	outputLabel: string
	outputVoice: string
}

const VoiceExampleCard: React.FC<VoiceExampleCardProps> = ({icon, title, description, inputLabel, inputVoice, outputLabel, outputVoice}) => {
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
				<Heading as="h3" size="md" pl={4}>
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
				</Box>

				<Box p={4} borderRadius="md" bg="blue.50" border="1px" borderColor="blue.200">
					<Flex align="center" mb={2}>
						<Box as={FaHeadphones} mr={2} color="blue.600" />
						<Text fontWeight="medium">{outputLabel}</Text>
					</Flex>
					<audio controls src={`data:audio/wav;base64,${outputVoice}`} style={{width: "100%"}} />
				</Box>
			</Grid>
		</Box>
	)
}

export default VoiceExampleCards
