"use server"
import axios, {AxiosResponse} from "axios"

const API_URL = process.env.API_URL as string

const apiRequest = async <T, D = unknown>(method: "get" | "post", endpoint: string, data?: D): Promise<T> => {
	const url = `${API_URL}/${endpoint}`

	try {
		const response: AxiosResponse<T> = await axios({
			method,
			url,
			headers: {
				"Content-Type": "application/json"
			},
			data
		})
		return response.data
	} catch (error) {
		console.error(`Error with API request to ${endpoint}:`, error)
		throw error
	}
}

export default apiRequest
