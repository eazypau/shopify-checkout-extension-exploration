import React, { useEffect, useState } from "react";
import {
	useExtensionApi,
	render,
	Banner,
	BlockStack,
	TextField,
	useMetafield,
	useApplyMetafieldsChange,
	Select,
	Grid,
	useExtensionCapabilities,
	useBuyerJourneyIntercept,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::DeliveryAddress::RenderBefore", () => <App />);

function App() {
	const typeOfResidence = useMetafield({
		namespace: "custom_attributes",
		key: "type_of_residence",
	});

	const customFields = {
		"House/Unit/Apartment": [
			{
				label: "Unit Number",
				placeholder: "Unit Number",
			},
		],
		"Hotel/Retirement Village": [
			{
				label: "Establishment Name",
				placeholder: "Establishment Name",
			},
			{
				label: "Room Number",
				placeholder: "Room Number",
			},
		],
		"Hospital (employee)": [
			{
				label: "Hospital Name",
				placeholder: "Hospital Name",
			},
			{
				label: "Ward Number",
				placeholder: "Ward Number",
			},
		],
		"Hospital (patient)": [
			{
				label: "Hospital Name",
				placeholder: "Hospital Name",
			},
			{
				label: "Room Number",
				placeholder: "Room Number",
			},
		],
		"Office/Business": [
			{
				label: "Business Name",
				placeholder: "Business Name",
			},
		],
		School: [
			{
				label: "School Name",
				placeholder: "School Name",
			},
		],
		"University (student residence)": [
			{
				label: "University Name",
				placeholder: "University Name",
			},
		],
		"University (staff)": [
			{
				label: "University Name",
				placeholder: "University Name",
			},
		],
	};

	const options = [
		{
			value: "House/Unit/Apartment",
			label: "House/Unit/Apartment",
		},
		{
			value: "Hotel/Retirement Village",
			label: "Hotel/Retirement Village",
		},
		{
			value: "Hospital (employee)",
			label: "Hospital (employee)",
		},
		{
			value: "Hospital (patient)",
			label: "Hospital (patient)",
		},
		{
			value: "Office/Business",
			label: "Office/Business",
		},
		{
			value: "School",
			label: "School",
		},
		{
			value: "University (student residence)",
			label: "University (student residence)",
		},
		{
			value: "University (staff)",
			label: "University (staff)",
		},
	];

	const buildingName = useMetafield({
		namespace: "custom_attributes",
		key: "building_name",
	});

	const roomNumberProperty = useMetafield({
		namespace: "custom_attributes",
		key: "room_number",
	});

	const applyMetafieldsChange = useApplyMetafieldsChange();
	const [residenceType, setResidenceType] = useState("House/Unit/Apartment");
	const [apartmentName, setApartmentName] = useState(buildingName?.value ? buildingName.value : "");
	const [buildingNameLabel, setBuildingNameLabel] = useState("-");
	const [roomNumber, setRoomNumber] = useState("");
	const [roomNumberLabel, setRoomNumberLabel] = useState("Unit Number");
	const [disabledApartmentName, setDisabledApartmentName] = useState(true);
	const [disabledRoomNumber, setDisabledRoomNumber] = useState(false);
	const [hasEmptyFields, setHasEmptyFields] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Building Name is required");
	// Define the metafield namespace and key
	const canBlockProgress = useExtensionCapabilities("block_progress");
	// const { showBanner, setShowBanner, bannerContent, setBannerContent } = useBanner();

	function onSelectChange(value) {
		applyMetafieldsChange({
			type: "updateMetafield",
			namespace: "type_of_residence",
			key: "typeOfResidence",
			valueType: "string",
			value,
		});

		setResidenceType(value);

		if (customFields[value].length > 1) {
			setBuildingNameLabel(customFields[value][0].label);
			setRoomNumberLabel(customFields[value][1].label);
		} else if (customFields[value].length === 1 && value !== "House/Unit/Apartment") {
			setBuildingNameLabel(customFields[value][0].label);
		}

		if (value !== "House/Unit/Apartment") {
			setDisabledApartmentName(false);
			if (
				[
					"Office/Business",
					"School",
					"University (student residence)",
					"University (staff)",
				].includes(value)
			) {
				setDisabledRoomNumber(true);
				setRoomNumberLabel("-");
			} else {
				setDisabledRoomNumber(false);
			}
		} else {
			setBuildingNameLabel("-");
			setRoomNumberLabel("Unit Number");
			setDisabledApartmentName(true);
			setDisabledRoomNumber(false);
		}
	}

	useEffect(() => {
    if (typeOfResidence?.value) {
      onSelectChange(typeOfResidence?.value);
    }
	}, [typeOfResidence?.value]);

	useBuyerJourneyIntercept(() => {
		if (!disabledApartmentName && !apartmentName) {
			return {
				behavior: "block",
				reason: "Building Name is required",
				perform: (result) => {
					if (result.behavior === "block") {
						setHasEmptyFields(true);
						setErrorMessage(`${buildingNameLabel} is required`);
					}
				},
			};
		}

		return {
			behavior: "allow",
			perform: () => {
				setHasEmptyFields(false);
			},
		};
	});

	return (
		<BlockStack>
			{hasEmptyFields ? <Banner status="critical">{errorMessage}</Banner> : ""}
			<Grid columns={["auto", "auto", "auto"]} spacing="base">
				<Select
					label="Type of Residence"
					value={typeOfResidence?.value}
					options={options}
					onChange={onSelectChange}
				/>
				<TextField
					label={buildingNameLabel}
					multiline={1}
					required={!disabledApartmentName}
					disabled={disabledApartmentName}
					onChange={(value) => {
						setApartmentName(value);
						applyMetafieldsChange({
							type: "updateMetafield",
							namespace: "building_name",
							key: "buildingName",
							valueType: "string",
							value,
						});
					}}
					value={buildingName?.value}
				/>
				<TextField
					label={roomNumberLabel}
					multiline={1}
					disabled={disabledRoomNumber}
					onChange={(value) => {
						applyMetafieldsChange({
							type: "updateMetafield",
							namespace: "room_number",
							key: "roomNumber",
							valueType: "string",
							value,
						});
					}}
					value={roomNumberProperty?.value}
				/>
			</Grid>
		</BlockStack>
	);
}
