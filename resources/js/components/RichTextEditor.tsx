// Editor and its extensions
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

// Icons
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Heading1,
    Heading2,
    Heading3,
    Pilcrow,
    Minus, // Divider
} from "lucide-react";

interface TiptapEditorProps {
    initialContent?: string;
    onChanged: (html: string, text: string) => void;
    placeholder?: string;
}

// Editor buttons
const ToolbarButton: React.FC<{
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
    disabled?: boolean;
}> = ({ onClick, isActive, children, title, disabled = false }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        disabled={disabled}
        className={`p-2 rounded hover:bg-secondary/15 transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
            isActive ? "bg-accent/25 text-accent" : "text-secondary hover:text-primary"
        }`}
    >
        {children}
    </button>
);

// Rich Text Editor
const RichTextEditor: React.FC<TiptapEditorProps> = ({
    initialContent = "",
    onChanged,
    placeholder = "Start typing here...",
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3], // Configured for H1, H2, H3
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            HorizontalRule,
        ],
        content: initialContent,
        onUpdate: ({ editor: currentEditor }) => {
            onChanged(currentEditor.getHTML(), currentEditor.getText());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg prose-hr:!my-8 prose-p:my-1 focus:outline-none min-h-[200px] p-3 !max-w-full  w-full",
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-primary/15 rounded-md shadow-sm bg-background-light">
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-primary/15 bg-background/15 rounded-t-md">
                {/* Toolbar buttons with their icons, and functions */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="Bold"
                    disabled={!editor.can().toggleBold()}
                >
                    <Bold size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="Italic"
                    disabled={!editor.can().toggleItalic()}
                >
                    <Italic size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                    title="Strikethrough"
                    disabled={!editor.can().toggleStrike()}
                >
                    <Strikethrough size={18} />
                </ToolbarButton>

                <div className="h-5 w-px bg-background-dark mx-1 self-center"></div>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                    title="Heading 1"
                    disabled={!editor.can().toggleHeading({ level: 1 })}
                >
                    <Heading1 size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="Heading 2"
                    disabled={!editor.can().toggleHeading({ level: 2 })}
                >
                    <Heading2 size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive("heading", { level: 3 })}
                    title="Heading 3"
                    disabled={!editor.can().toggleHeading({ level: 3 })}
                >
                    <Heading3 size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    isActive={editor.isActive("paragraph")}
                    title="Paragraph"
                    disabled={!editor.can().setParagraph()}
                >
                    <Pilcrow size={18} />
                </ToolbarButton>

                <div className="h-5 w-px bg-background-dark mx-1 self-center"></div>

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                    title="Bullet List"
                    disabled={!editor.can().toggleBulletList()}
                >
                    <List size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                    title="Ordered List"
                    disabled={!editor.can().toggleOrderedList()}
                >
                    <ListOrdered size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive("blockquote")}
                    title="Blockquote"
                    disabled={!editor.can().toggleBlockquote()}
                >
                    <Quote size={18} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Divider"
                    disabled={!editor.can().setHorizontalRule()}
                >
                    <Minus size={18} />
                </ToolbarButton>
            </div>
            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
