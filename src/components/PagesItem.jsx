import { useState } from "react";

export default function PagesItem({
    page,
    pageIndex,
    setPages,
    deletePage,
    pages,
    updatePageTitle,
}) {
    const [inputText, setInputText] = useState("");
    const [editMode, setEditMode] = useState(false);

    function toggleEditMode() {
        setInputText(page.title);
        setEditMode(!editMode);
    }

    async function updatePageItem(pageId, inputText) {
        await updatePageTitle(pageId, inputText, pageIndex);
        toggleEditMode();
    }

    return (
        <li className="mt-4 w-full flex items-center" key={page.id}>
            {!editMode && <p>{page.title}</p>}
            {editMode && (
                <input
                    className="bg-(--red-brown) min-w-0 text-white px-2 box-border rounded flex-1 max-w-100 mr-2"
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
            )}
            {editMode && (
                <button
                    className="ml-auto mr-2 text-amber-50 bg-neutral-600 w-22 rounded px-2 py-0.5"
                    onClick={() => {
                        updatePageItem(page.id, inputText);
                    }}
                >
                    Save
                </button>
            )}
            <button
                className={`${
                    !editMode && "ml-auto"
                } mr-2 text-amber-50 bg-neutral-600 w-22 rounded px-2 py-0.5`}
                onClick={() => {
                    toggleEditMode();
                }}
            >
                {(!editMode && "Edit") || "Cancel"}
            </button>
            <button
                onClick={async () => {
                    await deletePage(page.id);
                    const newPages = [...pages];
                    newPages.splice(pageIndex, 1);
                    setPages(newPages);
                }}
                className="text-amber-50 bg-neutral-600 w-22 rounded px-2 py-0.5"
            >
                Delete
            </button>
        </li>
    );
}
