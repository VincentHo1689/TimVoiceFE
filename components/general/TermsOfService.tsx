import {useState, useEffect} from "react"
import {Button, Flex} from "@chakra-ui/react"
import {DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger} from "~/components/ui/dialog" // Ensure the correct import path

const TermsOfServiceDialog = () => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const hasAccepted = localStorage.getItem("termsAccepted")

		if (!hasAccepted) {
			setIsOpen(true) // Open dialog if the terms haven't been accepted
		}
	}, [])

	const handleAccept = () => {
		localStorage.setItem("termsAccepted", "true")
		setIsOpen(false) // Close the dialog
	}

	// This function will be called when the open state of the dialog changes
	const handleDialogStateChange = (details: {open: boolean}) => {
		setIsOpen(details.open)
	}

	return (
		<DialogRoot
			open={isOpen}
			onOpenChange={handleDialogStateChange} // Properly handle the state change
			closeOnEscape={false}
			closeOnInteractOutside={false}
			modal={true}
			preventScroll={true}
			trapFocus={true}
			motionPreset="slide-in-bottom"
			size="md"
			placement="center"
		>
			<DialogContent w={"calc(40% + 120px)"} p={6}>
				<DialogHeader>
					<DialogTitle fontSize={20} pb={3} textAlign={"center"}>
						Terms of Service
					</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<p>
						<strong>1. Unofficial Platform</strong>
						<br />
						This website is an <strong>unofficial</strong> course review platform and is not affiliated with or endorsed by <strong>HKPolyU</strong>. It is an independent project aimed at
						helping students share their experiences.
					</p>

					<p>
						<br />
						<strong>2. User-Generated Content</strong>
						<br />
						To maintain the authenticity of reviews, all submissions remain unmodified. The website does not edit, filter, or alter reviews in any way. As such, we do <strong>
							not
						</strong>{" "}
						take responsibility for the opinions, accuracy, or legality of user-submitted content.
					</p>

					<p>
						<br />
						<strong>3. Anonymity and Privacy</strong>
						<br />
						All reviews are submitted <strong>anonymously</strong>. No personal information is collected, stored, or shared.
					</p>

					<p>
						<br />
						<strong>4. Acceptance of Terms</strong>
						<br />
						By using this website, you acknowledge that you have read, understood, and accepted these terms.
					</p>
				</DialogBody>
				<DialogFooter>
					<Flex pt={6} width="100%" justify="center">
						<DialogActionTrigger asChild>
							<Button fontWeight={"bold"} fontSize={15} pl={4} pr={4} variant="outline" onClick={handleAccept}>
								Agree and Continue
							</Button>
						</DialogActionTrigger>
					</Flex>
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	)
}

export default TermsOfServiceDialog
