import { Box, createPolymorphicComponent } from "@mantine/core";
import { compact, isBoolean, isEmpty, isString, map } from "lodash";
import { Children, forwardRef, PropsWithChildren } from "react";
import ReactDOMServer from "react-dom/server";

type HideOnEmptyProps = {
	children?: React.ReactNode;
};

// Create intermediate component with default ref type and props
const _HideOnEmpty = forwardRef<HTMLDivElement, HideOnEmptyProps>(
	({ children, ...others }, ref) => {
		if (Children.count(children) === 0) return null;
		return (
			<Box ref={ref} {...others}>
				<>{children}</>
			</Box>
		);
	}
);

export const HideOnEmpty = createPolymorphicComponent<
	"HideOnEmpty",
	HideOnEmptyProps
>(_HideOnEmpty);

export function WillDisplay<T>({
	when,
	children,
}: PropsWithChildren<{ when: T }>) {
	if (isBoolean(when)) {
		return when ? children : null;
	}
	if (isEmpty(when)) return null;
	return <>{children}</>;
}

const childrenText = (children: any) => {
	const parser = new DOMParser();
	const htmlDoc = parser.parseFromString(
		isString(children)
			? children
			: ReactDOMServer.renderToStaticMarkup(children),
		"text/html"
	);

	return compact(
		map(htmlDoc.querySelectorAll("body > *"), (elm) => {
			return elm.textContent;
		})
	);
};

export const isChildNull = (children: any) => {
	const result = childrenText(children);
	return result.length === 0;
};

export const WithContent = (props: PropsWithChildren) => {
	if (isChildNull(props.children)) {
		return null;
	}
	return <>{props.children}</>;
};
