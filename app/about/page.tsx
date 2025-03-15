import {Container, Heading, Text, VStack, Box} from "@chakra-ui/react"
import {FiUsers, FiShield, FiTool, FiMessageSquare} from "react-icons/fi"

const AboutPage = () => {
	return (
		<Container maxW="container.lg" py={8}>
			<VStack align="stretch" pl={"10%"} pr={"10%"}>
				{/* Header */}
				<Box textAlign="center">
					<Heading as="h1" size="2xl" m={4}>
						About PolyU Course Review
					</Heading>
				</Box>

				{/* Origins & Inspiration */}
				<Box>
					<Heading size="lg" mb={4} display="flex" alignItems="center" gap={2}>
						<FiUsers />
						Origins & Inspiration
					</Heading>
					<Text mb={10}>
						Born from global inspiration and student-led initiatives, our platform emerged through countless discussions among peers. Motivated by the need for greater course transparency,
						we aim to empower students to make informed academic decisions. This project became reality through the dedicated efforts of countless contributors who believed in open
						information sharing.
					</Text>
				</Box>

				{/* Our Stance */}
				<Box>
					<Heading size="lg" mb={4} display="flex" alignItems="center" gap={2}>
						<FiShield />
						Our Stance
					</Heading>
					<Text mb={4}>
						PolyU Course Review operates independently without any official affiliation with The Hong Kong Polytechnic University. We maintain a strict policy of non-intervention - reviews
						are neither edited nor filtered, and their accuracy remains unverified. We encourage users who encounter questionable content to contribute their own perspectives, as we
						believe collective wisdom emerges from diverse viewpoints.
					</Text>
					<Text mb={10}>Our commitment to independence means we actively resist external influences while maintaining complete operational transparency.</Text>
				</Box>

				{/* Responsibilities */}
				<Box>
					<Heading size="lg" mb={4} display="flex" alignItems="center" gap={2}>
						<FiTool />
						Our Responsibilities
					</Heading>
					<Text mb={4}>
						While we entrust the community with content integrity, our administrators focus on technical stewardship: ensuring system stability, removing spam/duplicate content, and
						maintaining consistent data formatting. We moderate only clear violations of our ethical framework, never opinions themselves.
					</Text>
					<Text mb={10}>
						The line we defend is clear: respectful discourse must prevail. While we champion diverse opinions, personal attacks and unethical behavior find no sanctuary here.
					</Text>
				</Box>

				{/* Privacy & Participation */}
				<Box>
					<Heading size="lg" mb={4} display="flex" alignItems="center" gap={2}>
						<FiMessageSquare />
						Privacy & Participation
					</Heading>
					<Text mb={4}>
						User anonymity remains sacrosanct. We collect no personal data beyond aggregated visitation metrics. This commitment extends to all users - whether students sharing experiences
						or faculty members providing clarifications.
					</Text>
					<Text mb={10}>
						We actively welcome constructive feedback from all academic community members. Instructors wishing to respond to specific reviews will find our platform equally open.
					</Text>
				</Box>

				{/* Closing */}
				<Box textAlign="center" mt={12}>
					<Text fontSize="xl" mb={4} fontWeight="medium">
						Your voices make this initiative meaningful, and we thank you for your contributions.
					</Text>
					<Text fontSize="sm" color="brand.text_grey">
						© 2025 PolyU Course Review | Independent Student Initiative
					</Text>
				</Box>
			</VStack>
		</Container>
	)
}

export default AboutPage
