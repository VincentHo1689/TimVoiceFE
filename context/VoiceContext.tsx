"use client"
import React, {createContext, useContext, useReducer, ReactNode} from "react"

type ActionType = {type: "SET_TEXT"; payload: string} | {type: "SET_VOICE_TYPE"; payload: string} | {type: "SET_RECORDED_VOICE"; payload: string} | {type: "SET_GENERATED_VOICE"; payload: string}

interface StateType {
	text: string
	speaker_id: string
	audio_buffer: string
	generatedVoice: string
}

// Initial state
const initialState: StateType = {
	text: "",
	speaker_id: "record",
	audio_buffer: "",
	generatedVoice: ""
}

// Reducer function
const reducer = (state: StateType, action: ActionType): StateType => {
	switch (action.type) {
		case "SET_TEXT":
			return {...state, text: action.payload}
		case "SET_VOICE_TYPE":
			return {...state, speaker_id: action.payload}
		case "SET_RECORDED_VOICE":
			return {...state, audio_buffer: action.payload}
		case "SET_GENERATED_VOICE":
			return {...state, generatedVoice: action.payload}
		default:
			return state
	}
}

const VoiceContext = createContext<
	| {
			state: StateType
			dispatch: React.Dispatch<ActionType>
	  }
	| undefined
>(undefined)

export const VoiceProvider = ({children}: {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <VoiceContext.Provider value={{state, dispatch}}>{children}</VoiceContext.Provider>
}

export const useVoice = () => {
	const context = useContext(VoiceContext)
	if (context === undefined) {
		throw new Error("useVoice must be used within a VoiceProvider")
	}
	return context
}
