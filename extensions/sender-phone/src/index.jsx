import React, { useState } from "react";
import {
	useExtensionApi,
	render,
	useMetafield,
	useApplyMetafieldsChange,
	PhoneField,
	BlockStack
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Contact::RenderAfter", () => <App />);

function App() {
	const metafieldNamespace = "custom_attributes";
	const metafieldKey = "sender_phone";

	const senderPhone = useMetafield({
		namespace: metafieldNamespace,
		key: metafieldKey,
	});
	const [phoneNumber, setPhoneNumber] = useState("1 (555) 555-5555");

	const applyMetafieldsChange = useApplyMetafieldsChange();

	return (
		<BlockStack>
			<PhoneField
				label="Sender Phone"
				value={senderPhone?.value}
				onInput={(value) => setPhoneNumber(value)}
				onChange={(value) => {
					applyMetafieldsChange({
						type: "updateMetafield",
						namespace: metafieldNamespace,
						key: metafieldKey,
						valueType: "string",
						value,
					});
				}}
			></PhoneField>
		</BlockStack>
	);
}
