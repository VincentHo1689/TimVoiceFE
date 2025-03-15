import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react"

const customConfig = defineConfig({
	theme: {
		tokens: {
			colors: {
				brand: {
					main: {value: "#922E3A"},
					main_muted: {value: "#C4A46B"},
					main_subtle: {value: "#D9D9D9"},
					main_emphasized: {value: "#521821"},
					main_focused: {value: "#C4A46B"},
					main_bg: {value: "#FBFBFB"},
					card: {value: "#F8F8F8"},
					card_hover: {value: "#F0F0F0"},
					card_content: {value: "#444444"},
					text: {value: "#333333"},
					text_reverse: {value: "#F8F8F8"},
					text_grey: {value: "#666666"},
					text_warning: {value: "#FF0000"},
					text_link: {value: "#0066CC"},
					loading: {value: "#0066CC"}
				}
			}
		},
		semanticTokens: {
			colors: {
				brand: {
					//The bold fill color of the color
					solid: {value: "colors.brand.main"},

					//The text color that goes on solid color
					contrast: {value: "colors.brand.text_reverse"},

					//The foreground color used for text, icons, etc.
					fg: {value: "colors.brand.text"},

					//The muted color of the color
					muted: {value: "colors.brand.main_muted"},

					//The subtle color of the color.
					subtle: {value: "colors.brand.main_subtle"},

					//The emphasized version of the subtle color.
					emphasized: {value: "colors.brand.main_emphasized"},

					//The focus ring color when interactive element is focused.
					focusRing: {value: "colors.brand.main_focused"},

					//The background color
					bg: {value: "colors.brand.main_bg"}
				},
				star: {
					star_0_5: {solid: {value: "#ff6a3a"}},
					star_1: {solid: {value: "#ff8c5a"}}, // Red
					star_1_5: {solid: {value: "#ff9d4f"}},
					star_2: {solid: {value: "#ffb234"}}, // Orange
					star_2_5: {solid: {value: "#ffcb34"}},
					star_3: {solid: {value: "#ffd934"}}, // Yellow
					star_3_5: {solid: {value: "#d4e034"}},
					star_4: {solid: {value: "#add633"}}, // Green
					star_4_5: {solid: {value: "#74b14a"}},
					star_5: {solid: {value: "#6aa15a"}}
				}
			}
		}
	}
})

export const system = createSystem(defaultConfig, customConfig)
