"use client";
import React, { forwardRef, useImperativeHandle } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

export interface BlockNoteEditorRef {
    getContent: () => Promise<string>;
}

const BlockNoteEditor = forwardRef<BlockNoteEditorRef>((props, ref) => {
    // Initialize BlockNote editor
    const editor = useCreateBlockNote({
        initialContent: [
            {
                type: "paragraph",
                content: "Start writing your blog post here...",
            },
        ],
    });

    // Expose methods to parent component through ref
    useImperativeHandle(ref, () => ({
        getContent: async () => {
            try {
                const htmlContent = await editor.blocksToHTMLLossy();
                return htmlContent;
            } catch (error) {
                console.error("Error converting blocks to HTML:", error);
                return "";
            }
        }
    }));

    return (
        <BlockNoteView
            editor={editor}
            theme="light"
            className="min-h-[400px]"
        />
    );
});

BlockNoteEditor.displayName = "BlockNoteEditor";

export default BlockNoteEditor;