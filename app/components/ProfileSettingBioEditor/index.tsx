import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";

export type EditorProps = {
	onChange?: (value: string) => void;
	value?: string;
};

export const ProfileSettingBioEditor = (props: EditorProps) => {
	const [value] = useState(props.value || "");
	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({ placeholder: "Tell us more about you..." }),
		] as any,
		onUpdate: ({ editor }) => {
			props.onChange?.(editor.getHTML());
		},
		content: value,
	});

	return (
		<RichTextEditor editor={editor}>
			<RichTextEditor.Toolbar sticky stickyOffset={60}>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
				</RichTextEditor.ControlsGroup>
			</RichTextEditor.Toolbar>
			<RichTextEditor.Content />
		</RichTextEditor>
	);
};
