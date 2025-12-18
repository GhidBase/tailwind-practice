import { useState, useEffect, Fragment } from "react";
import TextBlock from "./blocks/TextBlock";
import { useParams, Link } from "react-router";

export default function PageBuilder() {
    const { pageId } = useParams();
    const [blocks, setBlocks] = useState([]);
    const [adminMode] = useState(true);
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        fetch("http://localhost:3000/pages/" + pageId)
            .then((response) => response.json())
            .then((result) => {
                setBlocks(result.blocks);
                setPageData(result.page);
            });
    }, [pageId]);

    async function addBlock() {
        const response = await fetch(
            "http://localhost:3000/pages/" + pageId + "/blocks",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            }
        );
        const newBlock = await response.json();
        const newBlocks = [...blocks, newBlock];
        setBlocks(newBlocks);
    }

    async function deleteBlock(block) {
        const response = await fetch(
            "http://localhost:3000/blocks/" + block.id,
            {
                method: "DELETE",
                // headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({}),
            }
        );

        const deletedBlock = await response.json();
        const newBlocks = blocks.filter((block) => {
            return block.id != deletedBlock.id;
        });
        setBlocks(newBlocks);
    }

    async function updateBlock(block, editorRef) {
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
        const newBlocks = [...blocks];
        const adjustIndex = newBlocks.findIndex(
            (block) => block.id == result.id
        );
        newBlocks[adjustIndex] = result;
        setBlocks(newBlocks);
    }

    return (
        <div
            id="page-builder"
            className="overflow-x-auto h-full w-full flex flex-col items-center justify-baseline"
        >
            <div id="page-builder-title" className="title">
                {pageData.title}
            </div>
            <div
                id="page-builder-blocks-container"
                className="bg-(--surface-background) flex flex-1 flex-col items-center gap-4 w-full p-4 border-t-4 border-(--outline)"
            >
                <div
                    id="page-builder-content-positioner"
                    className="max-w-230 w-full mt-5"
                >
                    {blocks.map((block) => {
                        // block values: id, pageId, content
                        return (
                            <TextBlock
                                key={block.id}
                                deleteBlock={() => deleteBlock(block)}
                                block={block}
                                updateBlock={updateBlock}
                                adminMode={adminMode}
                            />
                        );
                    })}
                    {adminMode && (
                        <div className="flex flex-col items-center gap-2">
                            <button
                                className="text-amber-50 bg-(--primary) w-25 rounded px-2 py-0.5"
                                onClick={() => addBlock()}
                            >
                                Add Block
                            </button>
                            <Link
                                className="text-amber-50 bg-(--primary) w-50 rounded px-2 py-0.5"
                                to={"/page-manager/"}
                            >
                                Back to Page Manager
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
