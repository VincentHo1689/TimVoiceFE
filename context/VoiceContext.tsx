"use client"
import React, {createContext, useContext, useReducer, ReactNode} from "react"

// Define action types
type ActionType = {type: "SET_TEXT"; payload: string} | {type: "SET_VOICE"; payload: string} | {type: "SET_RECORDED_VOICE"; payload: string} | {type: "SET_GENERATED_VOICE_URL"; payload: string}

// Define state type
interface StateType {
	text: string
	voice: string
	recordedVoice: string
	generatedVoiceUrl: string
}

// Initial state
const initialState: StateType = {
	text: "",
	voice: "record",
	recordedVoice: "",
	generatedVoiceUrl: ""
}

// Reducer function
const reducer = (state: StateType, action: ActionType): StateType => {
	switch (action.type) {
		case "SET_TEXT":
			return {...state, text: action.payload}
		case "SET_VOICE":
			return {...state, voice: action.payload}
		case "SET_RECORDED_VOICE":
			return {...state, recordedVoice: action.payload}
		case "SET_GENERATED_VOICE_URL":
			return {...state, generatedVoiceUrl: action.payload}
		default:
			return state
	}
}

// Create context
const VoiceContext = createContext<
	| {
			state: StateType
			dispatch: React.Dispatch<ActionType>
	  }
	| undefined
>(undefined)

// Provider component
export const VoiceProvider = ({children}: {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <VoiceContext.Provider value={{state, dispatch}}>{children}</VoiceContext.Provider>
}

// Custom hook to use the VoiceContext
export const useVoice = () => {
	const context = useContext(VoiceContext)
	if (context === undefined) {
		throw new Error("useVoice must be used within a VoiceProvider")
	}
	return context
}
