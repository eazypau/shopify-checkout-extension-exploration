import React, { useEffect, useState } from "react";
import {
	useExtensionApi,
	render,
	Banner,
	useTranslate,
	useAttributes,
	Text,
	TextBlock,
	BlockStack,
	Icon,
	Heading,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

function App() {
	const { extensionPoint } = useExtensionApi();
	const translate = useTranslate();
	const attributes = useAttributes();
	const [deliveryDate, setDeliveryDate] = useState("");
	const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("");

	useEffect(() => {
		if (attributes.length > 0) {
			attributes.forEach((attribute) => {
				if (attribute.key === "delivery_date") {
					setDeliveryDate(attribute.value);
				}
				if (attribute.key === "delivery_slot") {
					setDeliveryTimeSlot(attribute.value);
				}
			});
		}
	}, [attributes]);

	return (
		<Banner title="Delivery Details">
			{/* <Text>{translate('welcome', {extensionPoint})}</Text> */}
			<BlockStack spacing={"extraTight"}>
				<Text>Delivery Date: {deliveryDate}</Text>
				<Text>Delivery Timeslot: {deliveryTimeSlot}</Text>
			</BlockStack>
		</Banner>
	);
}
