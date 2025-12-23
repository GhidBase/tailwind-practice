import { usePage } from "../../contexts/PageProvider";
import { useState } from "react";

export default function SingleImageBlock({
    deleteBlock,
    block,
    updateBlock,
    adminMode,
    addBlock,
}) {
    const { currentAPI } = usePage();
    const [editMode, setEditMode] = useState(false);

    return (
        <div className="">
            <form action="/upload" method="post" encType="multipart/form-data">
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
