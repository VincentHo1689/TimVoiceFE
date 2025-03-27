"use client"

import {Flex, Button, IconButton} from "@chakra-ui/react"
import {useVoice} from "~/context/VoiceContext"
import React, {useState, useRef, useEffect} from "react"
import {FaUpload, FaTimes, FaPlay} from "react-icons/fa"
import {toaster} from "../ui/toaster"

export const UploadButton: React.FC = () => {
	const {dispatch} = useVoice()
	const [uploadPhase, setUploadPhase] = useState<1 | 2>(1) // 1: No file selected, 2: File selected
	const [fileName, setFileName] = useState<string>("")
	const [audioUrl, setAudioUrl] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		if (file.type !== "audio/wav" && file.type !== "audio/x-wav") {
			alert("Please upload a .wav file")
			return
		}

		setFileName(file.name)

		setUploadPhase(2)

		const base64String = await convertFileToBase64(file)
		const cleanBase64 = base64String.split(",")[1]
		dispatch({type: "SET_RECORDED_VOICE", payload: cleanBase64})
		setAudioUrl(URL.createObjectURL(file))
	}

	const convertFileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadend = () => {
				resolve(reader.result as string)
			}
			reader.onerror = reject
		})
	}

	useEffect(() => {
		if (fileName) {
			toaster.create({
				title: `Uploaded ${fileName}`,
				description: "You have successfully uploaded the voice file.",
				type: "success"
			})
		}
	}, [fileName])

	const handleCancel = () => {
		setUploadPhase(1)
		setFileName("")
		setAudioUrl(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ""
		}
	}

	return (
		<Flex gap={2} alignItems="center">
			<input type="file" accept=".wav" ref={fileInputRef} style={{display: "none"}} onChange={handleFileChange} />

			{uploadPhase === 1 && (
				<Button colorScheme="blue" onClick={() => fileInputRef.current?.click()}>
					<FaUpload />
				</Button>
			)}

			{uploadPhase === 2 && (
				<Flex gap={2} align="center">
					<IconButton
						colorScheme="blue"
						aria-label="Play audio"
						onClick={() => {
							if (audioUrl) {
								new Audio(audioUrl).play()
							}
						}}
					>
						<FaPlay />
					</IconButton>
					<IconButton colorScheme="red" aria-label="Clear upload" onClick={handleCancel}>
						<FaTimes />
					</IconButton>
				</Flex>
			)}
		</Flex>
	)
}

export default UploadButton
