import { useState } from "react";

export const useBanner = () => {
	const [showBanner, setShowBanner] = useState(false);
	const [bannerContent, setBannerContent] = useState("");
	return { showBanner, setShowBanner, bannerContent, setBannerContent };
};
