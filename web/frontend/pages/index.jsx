import {
	Card,
	Page,
	Layout,
	TextContainer,
	Image,
	Stack,
	Link,
	Heading,
	List,
	DescriptionList,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { checkoutUIExp, trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
	const descriptionList = [
		{
			term: "My Checkout UI Extension",
			description:
				"This is a banner that be rendered dynamically at anywhere. However, this is mainly used to display delivery date and delivery timeslot",
		},
		{
			term: "Sender Phone",
			description:
				"This is phone number input field specifically render at after the checkbox below the email.",
		},
		{
			term: "Type of Residence",
			description:
				"This is a select input and custom input fields specifically render at beginning of shipping address form for customer to choose their residence type, providing the building name and unit/room number. Customers are require to select and at least provide building name (if applicable) in order to proceed.",
		},
		{
			term: "Terms & Conditions Checkbox, Delivery Instruction and Disclaimer Text Content",
			description:
				"This is component used to show terms & conditions disclaimer, checkbox and delivery instruction input specifically render at Shipping Step after the delivery method options. Customer would need to tick this in order to proceed.",
		},
	];

	return (
		<Page>
			<TitleBar title="Custom Input Fields" primaryAction={null} />
			<Layout>
				<Layout.Section>
					<Card sectioned>
						<Stack wrap={false} spacing="extraTight" distribution="trailing" alignment="center">
							<Stack.Item fill>
								<TextContainer spacing="loose">
									<Heading>Nice work on building a Shopify app 🎉</Heading>
									<p>
										Your app is ready to explore! It contains everything you need to get started
										including the{" "}
										<Link url="https://polaris.shopify.com/" external>
											Polaris design system
										</Link>
										,{" "}
										<Link url="https://shopify.dev/api/admin-graphql" external>
											Shopify Admin API
										</Link>
										, and{" "}
										<Link url="https://shopify.dev/apps/tools/app-bridge" external>
											App Bridge
										</Link>{" "}
										UI library and components.
									</p>
									<p>
										Ready to go? Start populating your app with some sample products to view and
										test in your store.{" "}
									</p>
									<p>
										Learn more about building out your app in{" "}
										<Link url="https://shopify.dev/apps/getting-started/add-functionality" external>
											this Shopify tutorial
										</Link>{" "}
										📚{" "}
									</p>
								</TextContainer>
							</Stack.Item>
							<Stack.Item>
								<div style={{ padding: "0 20px" }}>
									<Image
										source={trophyImage}
										alt="Nice work on building a Shopify app"
										width={120}
									/>
								</div>
							</Stack.Item>
						</Stack>
					</Card>
				</Layout.Section>
				<Layout.Section>
					<Card sectioned>
						<Stack spacing="loose">
							<Stack.Item>
								<TextContainer>
									<Heading>
										Here is a simple description on what custom fields are available created with
										Checkout UI Extension
									</Heading>
									<DescriptionList items={descriptionList} />
								</TextContainer>
							</Stack.Item>
							<Stack.Item fill>
								<div style={{ width: "100%", height: "100%", padding: "20px 20px" }}>
									<Image
										style={{ width: "100%", height: "auto", boxShadow: "13px 14px 14px -8px rgba(77, 76, 76, 0.27)", border: "1px solid #bebebe", borderRadius: "10px" }}
										source={checkoutUIExp}
										alt="Example Checkout UI With Apps"
										width={1200}
                    height={589}
									/>
								</div>
							</Stack.Item>
						</Stack>
					</Card>
				</Layout.Section>
				{/* <Layout.Section>
          <ProductsCard />
        </Layout.Section> */}
			</Layout>
		</Page>
	);
}
