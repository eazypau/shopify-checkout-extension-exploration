import React, { useEffect, useState } from "react";
import {
	useExtensionApi,
	render,
	Banner,
	useTranslate,
	BlockStack,
	TextField,
	useMetafield,
	useApplyMetafieldsChange,
	Select,
	Grid,
	useExtensionCapabilities,
	useBuyerJourneyIntercept,
	PhoneField,
	Checkbox,
	Link,
	TextBlock,
	Text,
	useAttributes,
} from "@shopify/checkout-ui-extensions-react";

// for terms and conditions, suggest to have checkbox at shipping step
// render("Checkout::ShippingMethods::RenderAfter", () => <TermsAndConditionsCheckboxAndText />);

// function TermsAndConditionsCheckboxAndText() {
// 	// const MySwal = withReactContent(Swal);
// 	// const { setShowBanner, setBannerContent } = useBanner();
// 	const [isChecked, setIsChecked] = useState(false);
// 	const [showError, setShowError] = useState(false);
// 	const [deliveryInstruction, setDeliveryInstruction] = useState("");
// 	const metafieldNamespace = "custom_attributes";
// 	const canBlockProgress = useExtensionCapabilities("block_progress");

// 	const acceptedTerms = useMetafield({
// 		namespace: metafieldNamespace,
// 		key: "accepted_terms",
// 	});

// 	const deliveryInstructions = useMetafield({
// 		namespace: metafieldNamespace,
// 		key: "delivery_instructions",
// 	});

// 	const applyMetafieldsChange = useApplyMetafieldsChange();

// 	useBuyerJourneyIntercept(() => {
// 		if (!isChecked) {
// 			// console.log("blocked");
// 			return {
// 				behavior: "block",
// 				reason: "You are required to accept temrs and conditions to procede.",
// 				perform: (result) => {
// 					if (result.behavior === "block") {
// 						// setBannerContent("Please accept the terms and conditions to continue.");
// 						// setShowBanner(true);
// 						// MySwal.fire({
// 						// 	title: "Oops...",
// 						// 	width: 1200,
// 						// 	text: "Please accept the terms and conditions to continue.",
// 						// 	confirmButtonColor: "#ee4382",
// 						// });
// 						setShowError(true);
// 					}
// 				},
// 			};
// 		}

// 		return {
// 			behavior: "allow",
// 			perform: () => {
// 				setShowError(false);
// 			},
// 		};
// 	});

// 	return (
// 		<BlockStack>
// 			<TextField
// 				label="Delivery Instructions"
// 				value={deliveryInstructions?.value}
// 				onInput={(value) => setDeliveryInstruction(value)}
// 				onChange={(value) => {
// 					applyMetafieldsChange({
// 						type: "updateMetafield",
// 						namespace: metafieldNamespace,
// 						key: "delivery_instructions",
// 						valueType: "string",
// 						value,
// 					});
// 				}}
// 			></TextField>
// 			<TextBlock appearance="info">
// 				We're here to help you make someone's day, not be the fun police... but here's some
// 				important stuff we have to be clear about. Whilst we do our very best to get your gifts
// 				delivered on time, we are reliant upon third party couriers and there are some things we
// 				can't control like the weather or major traffic delays. However, we will always do
// 				everything we can to assist you. Re-delivery fees will apply to incorrect addresses and
// 				undeliverables.
// 			</TextBlock>
// 			<Checkbox
// 				checked={acceptedTerms?.value === "checked" ? true : false}
// 				onChange={(value) => {
// 					setIsChecked(value);
// 					applyMetafieldsChange({
// 						type: "updateMetafield",
// 						namespace: metafieldNamespace,
// 						key: "accepted_terms",
// 						valueType: "string",
// 						value: value ? "checked" : "declined",
// 					});
// 				}}
// 			>
// 				I agree to{" "}
// 				<Link to="https://www.lvly.com.au/pages/terms-conditions">LVLY's terms and conditions</Link>
// 			</Checkbox>
// 			{showError ? (
// 				<Text appearance="critical">*Please accept the terms and conditions to continue.</Text>
// 			) : (
// 				""
// 			)}
// 		</BlockStack>
// 	);
// }

// import { useBanner } from "./global";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";

// render("Checkout::Dynamic::Render", () => <App />);

// function App() {
// 	const { extensionPoint } = useExtensionApi();
// 	const translate = useTranslate();
// 	const deliveryDate = useAttributes()["delivery_date"];

// 	return (
// 		<Banner title="Flowerchimp">
// 			<Text>{deliveryDate}</Text>
// 			{translate("welcome", { extensionPoint })}
// 		</Banner>
// 	);
// }

// render sender phone, this is mainly used for LVLY AU and BL
// render("Checkout::Contact::RenderAfter", () => <SenderPhoneField />);

// function SenderPhoneField() {
// 	const metafieldNamespace = "custom_attributes";
// 	const metafieldKey = "sender_phone";

// 	const senderPhone = useMetafield({
// 		namespace: metafieldNamespace,
// 		key: metafieldKey,
// 	});
// 	const [phoneNumber, setPhoneNumber] = useState("1 (555) 555-5555");

// 	const applyMetafieldsChange = useApplyMetafieldsChange();

// 	return (
// 		<BlockStack>
// 			<PhoneField
// 				label="Sender Phone"
// 				value={senderPhone?.value}
// 				onInput={(value) => setPhoneNumber(value)}
// 				onChange={(value) => {
// 					applyMetafieldsChange({
// 						type: "updateMetafield",
// 						namespace: metafieldNamespace,
// 						key: metafieldKey,
// 						valueType: "string",
// 						value,
// 					});
// 				}}
// 			></PhoneField>
// 		</BlockStack>
// 	);
// }

// type of residence
// render("Checkout::DeliveryAddress::RenderBefore", () => <App />);

// function App() {
// 	const [residenceType, setResidenceType] = useState("House/Unit/Apartment");
// 	const [apartmentName, setApartmentName] = useState("");
// 	const [buildingNameLabel, setBuildingNameLabel] = useState("-");
// 	const [roomNumber, setRoomNumber] = useState("");
// 	const [roomNumberLabel, setRoomNumberLabel] = useState("Unit Number");
// 	const [disabledApartmentName, setDisabledApartmentName] = useState(true);
// 	const [disabledRoomNumber, setDisabledRoomNumber] = useState(false);
// 	const [hasEmptyFields, setHasEmptyFields] = useState(false);
// 	const [errorMessage, setErrorMessage] = useState("Building Name is required");
// 	// Define the metafield namespace and key
// 	const canBlockProgress = useExtensionCapabilities("block_progress");
// 	// const { showBanner, setShowBanner, bannerContent, setBannerContent } = useBanner();

// 	const typeOfResidence = useMetafield({
// 		namespace: "type_of_residence",
// 		key: "typeOfResidence",
// 	});

// 	const customFields = {
// 		"House/Unit/Apartment": [
// 			{
// 				label: "Unit Number",
// 				placeholder: "Unit Number",
// 			},
// 		],
// 		"Hotel/Retirement Village": [
// 			{
// 				label: "Establishment Name",
// 				placeholder: "Establishment Name",
// 			},
// 			{
// 				label: "Room Number",
// 				placeholder: "Room Number",
// 			},
// 		],
// 		"Hospital (employee)": [
// 			{
// 				label: "Hospital Name",
// 				placeholder: "Hospital Name",
// 			},
// 			{
// 				label: "Ward Number",
// 				placeholder: "Ward Number",
// 			},
// 		],
// 		"Hospital (patient)": [
// 			{
// 				label: "Hospital Name",
// 				placeholder: "Hospital Name",
// 			},
// 			{
// 				label: "Room Number",
// 				placeholder: "Room Number",
// 			},
// 		],
// 		"Office/Business": [
// 			{
// 				label: "Business Name",
// 				placeholder: "Business Name",
// 			},
// 		],
// 		School: [
// 			{
// 				label: "School Name",
// 				placeholder: "School Name",
// 			},
// 		],
// 		"University (student residence)": [
// 			{
// 				label: "University Name",
// 				placeholder: "University Name",
// 			},
// 		],
// 		"University (staff)": [
// 			{
// 				label: "University Name",
// 				placeholder: "University Name",
// 			},
// 		],
// 	};

// 	const options = [
// 		{
// 			value: "House/Unit/Apartment",
// 			label: "House/Unit/Apartment",
// 		},
// 		{
// 			value: "Hotel/Retirement Village",
// 			label: "Hotel/Retirement Village",
// 		},
// 		{
// 			value: "Hospital (employee)",
// 			label: "Hospital (employee)",
// 		},
// 		{
// 			value: "Hospital (patient)",
// 			label: "Hospital (patient)",
// 		},
// 		{
// 			value: "Office/Business",
// 			label: "Office/Business",
// 		},
// 		{
// 			value: "School",
// 			label: "School",
// 		},
// 		{
// 			value: "University (student residence)",
// 			label: "University (student residence)",
// 		},
// 		{
// 			value: "University (staff)",
// 			label: "University (staff)",
// 		},
// 	];

// 	const buildingName = useMetafield({
// 		namespace: "building_name",
// 		key: "buildingName",
// 	});

// 	const roomNumberProperty = useMetafield({
// 		namespace: "room_number",
// 		key: "roomNumber",
// 	});

// 	const applyMetafieldsChange = useApplyMetafieldsChange();

// 	function onSelectChange(value: string) {
// 		applyMetafieldsChange({
// 			type: "updateMetafield",
// 			namespace: "type_of_residence",
// 			key: "typeOfResidence",
// 			valueType: "string",
// 			value,
// 		});

// 		setResidenceType(value);

// 		if (customFields[value].length > 1) {
// 			setBuildingNameLabel(customFields[value][0].label);
// 			setRoomNumberLabel(customFields[value][1].label);
// 		} else if (customFields[value].length === 1 && value !== "House/Unit/Apartment") {
// 			setBuildingNameLabel(customFields[value][0].label);
// 		}

// 		if (value !== "House/Unit/Apartment") {
// 			setDisabledApartmentName(false);
// 			if (
// 				[
// 					"Office/Business",
// 					"School",
// 					"University (student residence)",
// 					"University (staff)",
// 				].includes(value)
// 			) {
// 				setDisabledRoomNumber(true);
// 				setRoomNumberLabel("-");
// 			} else {
// 				setDisabledRoomNumber(false);
// 			}
// 		} else {
// 			setBuildingNameLabel("-");
// 			setRoomNumberLabel("Unit Number");
// 			setDisabledApartmentName(true);
// 			setDisabledRoomNumber(false);
// 		}
// 	}

// 	useEffect(() => {
// 		onSelectChange(typeOfResidence?.value);
// 	}, [typeOfResidence?.value]);

// 	useBuyerJourneyIntercept(() => {
// 		if (!disabledApartmentName && !buildingName?.value) {
// 			return {
// 				behavior: "block",
// 				reason: "Building Name is required",
// 				perform: (result) => {
// 					if (result.behavior === "block") {
// 						setHasEmptyFields(true);
// 						setErrorMessage(`${buildingNameLabel} is required`);
// 					}
// 				},
// 			};
// 		}

// 		return {
// 			behavior: "allow",
// 			perform: () => {
// 				setHasEmptyFields(false);
// 			},
// 		};
// 	});

// 	return (
// 		<BlockStack>
// 			{hasEmptyFields ? <Banner status="critical">{errorMessage}</Banner> : ""}
// 			<Grid columns={["auto", "auto", "auto"]} spacing="base">
// 				<Select
// 					label="Type of Residence"
// 					value={typeOfResidence?.value}
// 					options={options}
// 					onChange={onSelectChange}
// 				/>
// 				<TextField
// 					label={buildingNameLabel}
// 					multiline={1}
// 					required={!disabledApartmentName}
// 					disabled={disabledApartmentName}
// 					onInput={(value) => setApartmentName(value)}
// 					onChange={(value) => {
// 						applyMetafieldsChange({
// 							type: "updateMetafield",
// 							namespace: "building_name",
// 							key: "buildingName",
// 							valueType: "string",
// 							value,
// 						});
// 					}}
// 					value={buildingName?.value}
// 				/>
// 				<TextField
// 					label={roomNumberLabel}
// 					multiline={1}
// 					disabled={disabledRoomNumber}
// 					onChange={(value) => {
// 						setRoomNumber(value);
// 						applyMetafieldsChange({
// 							type: "updateMetafield",
// 							namespace: "room_number",
// 							key: "roomNumber",
// 							valueType: "string",
// 							value,
// 						});
// 					}}
// 					value={roomNumberProperty?.value}
// 				/>
// 			</Grid>
// 		</BlockStack>
// 	);
// }

// render delivery instructions, suggest to do it in shipping step
// render("Checkout::Actions::RenderBefore", () => <DeliveryInstructions />);

// function DeliveryInstructions() {
// 	const [deliveryInstruction, setDeliveryInstruction] = useState("");
// 	const metafieldNamespace = "custom_attributes";
// 	const metafieldKey = "sender_phone";

// 	const senderPhone = useMetafield({
// 		namespace: metafieldNamespace,
// 		key: metafieldKey,
// 	});

// 	const applyMetafieldsChange = useApplyMetafieldsChange();

// 	return (
// 		<BlockStack>
// 			<TextField
// 				label="Delivery Instructions"
// 				value={deliveryInstruction}
// 				onInput={(value) => setDeliveryInstruction(value)}
// 				onChange={(value) => {
// 					applyMetafieldsChange({
// 						type: "updateMetafield",
// 						namespace: metafieldNamespace,
// 						key: metafieldKey,
// 						valueType: "string",
// 						value,
// 					});
// 				}}
// 			></TextField>
// 		</BlockStack>
// 	);
// }
