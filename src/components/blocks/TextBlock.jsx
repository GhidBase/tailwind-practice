import TextEditor from "../MCEComponent.jsx";
import { useRef, useState } from "react";

export default function TextBlock({ deleteBlock, block }) {
    const editorRef = useRef(null);
    const [editMode, setEditMode] = useState(false);

    function log() {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
        console.log("Block: " + block.id);
    }

    async function saveChanges() {
        const content = editorRef.current.getContent();

        const response = await fetch(
            "http://localhost:3000/blocks/" + block.id,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            }
        );

        const result = await response.json();
        console.log(result);
    }

    function toggleEditorMode() {
        setEditMode(!editMode);
    }

    return (
        <div className="bg-(--surface-background) rounded-md w-full text-(--text-color)">
            {editMode && <TextEditor editorRef={editorRef}></TextEditor>}
            {!editMode && <p className="h-100">Hi</p>}
            <div id="lower-buttons" className="flex gap-2 m-2 justify-center">
                <button
                    onClick={() => log()}
                    className="text-amber-50 bg-neutral-600 w-25 rounded px-2 py-0.5"
                >
                    Log
                </button>
                {editMode && (
                    <button
                        onClick={() => saveChanges()}
                        className="text-amber-50 bg-neutral-600 w-25 rounded px-2 py-0.5"
                    >
                        Save
                    </button>
                )}
                <button
                    onClick={() => toggleEditorMode()}
                    className="text-amber-50 bg-neutral-600 w-25 rounded px-2 py-0.5"
                >
                    {!editMode && "Edit"}
                    {editMode && "Cancel"}
                </button>
                <button
                    onClick={deleteBlock}
                    className="text-amber-50 bg-neutral-600 w-25 rounded px-2 py-0.5"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
