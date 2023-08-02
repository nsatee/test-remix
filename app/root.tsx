import { withEmotionCache } from "@emotion/react";
import { MantineProvider } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import {
	isRouteErrorResponse,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from "@remix-run/react";
import { useContext, useEffect } from "react";

import ClientStyleContext from "./ClientStyleContext";

import type { LinksFunction } from "@remix-run/node";
export function ErrorBoundary() {
	let error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<Document>
				<h1>{error.status}</h1>
			</Document>
		);
	}

	return (
		<Document>
			<h1>Unknown Error</h1>
		</Document>
	);
}
export function CatchBoundary() {
	let error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<Document>
				<h1>{error.status}</h1>
			</Document>
		);
	}

	return (
		<Document>
			<h1>Unknown Error</h1>
		</Document>
	);
}

type DocumentProps = {
	children: React.ReactNode;
	title?: string;
};

const Document = withEmotionCache(
	({ children }: DocumentProps, emotionCache) => {
		const clientStyleData = useContext(ClientStyleContext);
		useEffect(() => {
			// re-link sheet container
			emotionCache.sheet.container = document.head;
			// re-inject tags
			const tags = emotionCache.sheet.tags;
			emotionCache.sheet.flush();
			tags.forEach((tag) => {
				(emotionCache.sheet as any)._insertTag(tag);
			});
			clientStyleData.reset();
		}, []);
		return (
			<MantineProvider theme={{}} withGlobalStyles withNormalizeCSS>
				<html>
					<head>
						<StylesPlaceholder />
						<Meta />
						<Links />
					</head>
					<body>
						<>
							<>{children}</>
						</>
						<ScrollRestoration />
						<LiveReload />
						<Scripts />
					</body>
				</html>
			</MantineProvider>
		);
	}
);

export default function App() {
	return (
		<MantineProvider theme={{}} withGlobalStyles withNormalizeCSS>
			<Document>
				<Outlet />
			</Document>
		</MantineProvider>
	);
}
