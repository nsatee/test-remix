import { useEffect, useState } from "react";

export function useIsElementOffscreen(
	ref: React.RefObject<HTMLElement>
): boolean {
	const [isOffscreen, setIsOffscreen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (ref.current) {
				const { top, bottom } = ref.current.getBoundingClientRect();
				const windowHeight =
					window.innerHeight || document.documentElement.clientHeight;

				setIsOffscreen(top > windowHeight || bottom < 0);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [ref]);

	return isOffscreen;
}
