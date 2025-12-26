import { usePage } from "../../contexts/PageProvider";
import { useState } from "react";

export default function SingleImageBlock({
    deleteBlock,
    block,
    updateBlock,
    adminMode,
    addBlock,
}) {
    async function uploadFile(e) {
        e.preventDefault();

        // Upload a file to amazon
        const formData = new FormData(e.target);
        const blockId = block;
        formData.append("block", JSON.stringify(block));
        const response = await fetch(currentAPI + "/files", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            console.error("upload failed");
            return;
        }
        const fileData = await response.json();

        // Create a file record in the database
        e.target.reset();
    }

    const { currentAPI } = usePage();
    const [editMode, setEditMode] = useState(false);
    console.log(block.files[0]);

    return (
        <div className="">
            <form
                onSubmit={uploadFile}
                // action={currentAPI + "/files"}
                method="post"
                encType="multipart/form-data"
            >
                <img src={!!block.files[0] && block.files[0].url} alt="" />
                <input type="hidden" name="id" value="<%= folder.id %>" />
                <input type="file" name="upload-file" />
                <button type="submit">Upload</button>
            </form>
            {adminMode && (
                <div
                    id="lower-buttons"
                    className="flex gap-2 m-2 justify-center"
                >
                    {editMode && (
                        <button
                            onClick={async () => {
                                await updateBlock(block, editorRef);
                                toggleEditorMode();
                            }}
                            className="text-amber-50 bg-(--primary) w-25 rounded px-2 py-0.5"
                        >
                            Save
                        </button>
                    )}
                    <button
                        onClick={() => toggleEditorMode()}
                        className="text-amber-50 bg-(--primary) w-25 rounded px-2 py-0.5"
                    >
                        {!editMode && "Edit"}
                        {editMode && "Cancel"}
                    </button>
                    <button
                        onClick={deleteBlock}
                        className="text-amber-50 bg-(--primary) w-25 rounded px-2 py-0.5"
                    >
                        Delete
                    </button>
                    <button
                        onClick={async () => {
                            await addBlock({ nextOrder: block.order + 1 });
                        }}
                        className="text-amber-50 bg-(--primary) w-25 rounded px-2 py-0.5"
                    >
                        Add Block
                    </button>
                </div>
            )}
        </div>
    );
}
