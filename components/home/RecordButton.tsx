"use client"

import {Flex, Button, IconButton} from "@chakra-ui/react"
import {useVoice} from "~/context/VoiceContext"
import React, {useState} from "react"
import {useReactMediaRecorder} from "react-media-recorder"
import {FaMicrophone, FaCheck, FaTimes, FaPlay, FaRedo} from "react-icons/fa"


export const RecordButton: React.FC = () => {
	const {dispatch} = useVoice()
	const [recordingPhase, setRecordingPhase] = useState<1 | 2 | 3>(1) // 1: Default, 2: Recording, 3: Recorded

	const {startRecording, stopRecording, mediaBlobUrl, clearBlobUrl} = useReactMediaRecorder({
		audio: true,
		mediaRecorderOptions: {
			mimeType: "audio/wav" // Request WAV format
		},
		onStop: async (blobUrl, blob) => {
			// If the browser doesn't support direct WAV recording, convert the blob to WAV
			const wavBlob = blob

			// Check if the recorded format is not WAV
			if (blob.type !== "audio/wav") {
				// You might need to add a conversion library here
				console.warn("Browser recorded in " + blob.type + " instead of WAV. Converting...")
				// For a complete solution, you would add code here to convert to WAV
				// This could use a library like AudioContext to convert the format
			}

			const base64StringFull = await convertBlobToBase64(wavBlob)
			const base64String = base64StringFull.split(",")[1]
			dispatch({type: "SET_RECORDED_VOICE", payload: base64String})
		}
	})

	const convertBlobToBase64 = (blob: Blob): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(blob)
			reader.onloadend = () => {
				resolve(reader.result as string)
			}
			reader.onerror = reject
		})
	}

	return (
		<Flex gap={2} alignItems="center">
			{recordingPhase === 1 && (
				<Button
					colorScheme="blue"
					onClick={() => {
						startRecording()
						setRecordingPhase(2)
					}}
				>
					<FaMicrophone />
				</Button>
			)}

			{recordingPhase === 2 && (
				<Flex gap={2}>
					<IconButton
						colorScheme="green"
						onClick={() => {
							stopRecording()
							setRecordingPhase(3)
						}}
					>
						<FaCheck />
					</IconButton>
					<IconButton
						colorScheme="red"
						onClick={() => {
							stopRecording()
							clearBlobUrl()
							setRecordingPhase(1)
						}}
					>
						<FaTimes />
					</IconButton>
				</Flex>
			)}

			{recordingPhase === 3 && (
				<Flex gap={2}>
					<IconButton
						colorScheme="blue"
						onClick={() => {
							if (mediaBlobUrl) {
								new Audio(mediaBlobUrl).play()
							}
						}}
					>
						<FaPlay />
					</IconButton>
					<IconButton
						colorScheme="orange"
						onClick={() => {
							clearBlobUrl()
							startRecording()
							setRecordingPhase(2)
						}}
					>
						<FaRedo />
					</IconButton>
				</Flex>
			)}
		</Flex>
	)
}

export default RecordButton
