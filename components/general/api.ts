"use server"
import axios, {AxiosResponse} from "axios"

// Base URL and API Key
const API_URL = process.env.API_URL as string
const API_KEY = process.env.API_KEY as string

// Helper function to make API requests
const apiRequest = async <T, D = unknown>(method: "get" | "post", endpoint: string, data?: D): Promise<T> => {
	try {
		const url = `${API_URL}/${endpoint}`
		const response: AxiosResponse<T> = await axios({
			method,
			url,
			headers: {
				"Content-Type": "application/json",
				access_token: API_KEY
			},
			data // for POST requests
		})
		return response.data
	} catch (error) {
		console.error(`Error with API request to ${endpoint}:`, error)
		throw error
	}
}

export default apiRequest
