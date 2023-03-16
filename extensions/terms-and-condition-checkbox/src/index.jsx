import React, { useEffect, useState } from "react";
import {
	useExtensionApi,
	render,
	BlockStack,
	TextField,
	useMetafield,
	useApplyMetafieldsChange,
	useExtensionCapabilities,
	useBuyerJourneyIntercept,
	Checkbox,
	Link,
	TextBlock,
	Text,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::ShippingMethods::RenderAfter", () => <App />);

function App() {
  const metafieldNamespace = "custom_attributes";
	const acceptedTerms = useMetafield({
		namespace: metafieldNamespace,
		key: "accepted_terms",
	});

	const deliveryInstructions = useMetafield({
		namespace: metafieldNamespace,
		key: "delivery_instructions",
	});

	const applyMetafieldsChange = useApplyMetafieldsChange();
	const [isChecked, setIsChecked] = useState(false);
	const [showError, setShowError] = useState(false);
	const [deliveryInstruction, setDeliveryInstruction] = useState("");
	const canBlockProgress = useExtensionCapabilities("block_progress");

	useEffect(() => {
		if (acceptedTerms?.value) {
			if (acceptedTerms.value === "checked") setIsChecked(true);
			else setIsChecked(false);
		}
	}, [acceptedTerms?.value]);

	useBuyerJourneyIntercept(() => {
		if (!isChecked) {
			return {
				behavior: "block",
				reason: "You are required to accept temrs and conditions to procede.",
				perform: (result) => {
					if (result.behavior === "block") {
						setShowError(true);
					}
				},
			};
		}

		return {
			behavior: "allow",
			perform: () => {
				setShowError(false);
			},
		};
	});

	return (
		<BlockStack>
			<TextField
				label="Delivery Instructions"
				value={deliveryInstructions?.value}
				onInput={(value) => setDeliveryInstruction(value)}
				onChange={(value) => {
					applyMetafieldsChange({
						type: "updateMetafield",
						namespace: metafieldNamespace,
						key: "delivery_instructions",
						valueType: "string",
						value,
					});
				}}
			></TextField>
			<TextBlock appearance="info">
				We're here to help you make someone's day, not be the fun police... but here's some
				important stuff we have to be clear about. Whilst we do our very best to get your gifts
				delivered on time, we are reliant upon third party couriers and there are some things we
				can't control like the weather or major traffic delays. However, we will always do
				everything we can to assist you. Re-delivery fees will apply to incorrect addresses and
				undeliverables.
			</TextBlock>
			<Checkbox
				checked={isChecked}
				onChange={(value) => {
					setIsChecked(value);
					applyMetafieldsChange({
						type: "updateMetafield",
						namespace: metafieldNamespace,
						key: "accepted_terms",
						valueType: "string",
						value: value ? "checked" : "declined",
					});
				}}
			>
				I agree to{" "}
				<Link to="https://www.lvly.com.au/pages/terms-conditions">LVLY's terms and conditions</Link>
			</Checkbox>
			{showError ? (
				<Text appearance="critical">*Please accept the terms and conditions to continue.</Text>
			) : (
				""
			)}
		</BlockStack>
	);
}
