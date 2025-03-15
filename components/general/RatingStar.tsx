"use client"
import {RatingGroup} from "@chakra-ui/react"
import React, {useState, useEffect} from "react"
import {ControllerRenderProps} from "react-hook-form"
import {ReviewInsert} from "~/type/CourseReview"

export const RatingStar = ({
	score,
	size = "sm",
	readOnly = true
}: {
	score: number // The rating score (e.g., 3.5, 4, etc.)
	size?: "sm" | "md" | "lg" // Optional size prop
	readOnly?: boolean // Optional read-only prop
}) => {
	const [color, setColor] = useState<string>("star.star_3")

	useEffect(() => {
		const colorMap: {[key: number]: string} = {
			0.5: "star.star_0_5",
			1: "star.star_1", // Red
			1.5: "star.star_1_5",
			2: "star.star_2",
			2.5: "star.star_2_5",
			3: "star.star_3", // Yellow
			3.5: "star.star_3_5",
			4: "star.star_4",
			4.5: "star.star_4_5",
			5: "star.star_5" // Green
		}
		const getColorForScore = (score: number) => {
			// Round the score to the nearest 0.5
			const roundedScore = Math.round(score * 2) / 2.0
			return colorMap[roundedScore] || "gray.300" // Default to gray if not found
		}
		setColor(getColorForScore(score))
	}, [score])

	return (
		<RatingGroup.Root
			allowHalf // Enable half-star rendering
			colorPalette={color}
			readOnly={readOnly}
			count={5}
			value={score} // Use `value` instead of `defaultValue` for controlled behavior
			size={size}
		>
			<RatingGroup.HiddenInput />
			<RatingGroup.Control>
				{Array.from({length: 5}).map((_, index) => (
					<RatingGroup.Item key={index} index={index + 1}>
						<RatingGroup.ItemIndicator />
					</RatingGroup.Item>
				))}
			</RatingGroup.Control>
		</RatingGroup.Root>
	)
}

export const RatingInput = ({
	readOnly = false,
	field
}: {
	readOnly?: boolean // Optional read-only prop
	field: ControllerRenderProps<ReviewInsert, "RatingOverall" | "RatingContent" | "RatingResult" | "RatingWorkload">
}) => {
	const [color, setColor] = useState<string>("yellow")
	const [hoveredValue, setHoveredValue] = useState<number | null>(null) // Track hovered value

	// Function to get the color for a specific score
	const getColorForScore = (score: number) => {
		const colorMap: {[key: number]: string} = {
			0.5: "star.star_0_5",
			1: "star.star_1", // Red
			1.5: "star.star_1_5",
			2: "star.star_2",
			2.5: "star.star_2_5",
			3: "star.star_3", // Yellow
			3.5: "star.star_3_5",
			4: "star.star_4",
			4.5: "star.star_4_5",
			5: "star.star_5" // Green
		}
		// Round the score to the nearest 0.5
		const roundedScore = Math.round(score * 2) / 2.0
		return colorMap[roundedScore] || "gray.300" // Default to gray if not found
	}

	// Update color dynamically when field.value or hoveredValue changes
	useEffect(() => {
		const score = hoveredValue == -1 ? field.value : hoveredValue
		if (score) {
			setColor(getColorForScore(score))
		}
	}, [field.value, hoveredValue])

	// Handle value change and update color immediately
	const handleValueChange = (value: number) => {
		field.onChange(value) // Update the form value
		setHoveredValue(null) // Reset hovered value after selection
	}

	// Handle hover change and update color dynamically
	const handleHoverChange = ({hoveredValue}: {hoveredValue: number | null}) => {
		setHoveredValue(hoveredValue) // Update the hovered value
	}

	return (
		<RatingGroup.Root
			allowHalf
			readOnly={readOnly}
			colorPalette={color}
			count={5}
			size="lg"
			name={field.name}
			value={field.value}
			onValueChange={({value}) => handleValueChange(value)}
			onHoverChange={handleHoverChange} // Add hover handler
		>
			<RatingGroup.HiddenInput />
			<RatingGroup.Control>
				{Array.from({length: 5}).map((_, index) => (
					<RatingGroup.Item key={index} index={index + 1}>
						<RatingGroup.ItemIndicator />
					</RatingGroup.Item>
				))}
			</RatingGroup.Control>
		</RatingGroup.Root>
	)
}