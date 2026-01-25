import { useState, useEffect, Fragment } from "react";
import TextBlock from "./blocks/TextBlock";
import { useParams, Link, useNavigate } from "react-router";
import { usePage } from "../hooks/usePage";
import SingleImageBlock from "./blocks/SingleImageBlock";
import { useAuth } from "../hooks/useAuth";
import { Pencil } from "lucide-react";
import PendingReviewNotification from "./notifications/PendingReviewNotification";

export default function PageBuilder() {
    const navigate = useNavigate();
    const { pageTitle } = useParams();
    const { user } = useAuth();

    const [blocks, setBlocks] = useState([]);
    const [unsavedBlocks, setUnsavedBlocks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [pageData, setPageData] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const pageId = pageData?.id;
    const orders = blocks.map((block) => (block.order ? block.order : 0));
    const highestOrder = orders.length > 0 ? Math.max(...orders) : 0;

    const { title, setTitle, currentAPI, gameId: contextGameId } = usePage();

    const isAdmin = user?.role === "ADMIN";

    async function deleteBlock(block) {
        const response = await fetch(currentAPI + "/blocks/" + block.id, {
            method: "DELETE",
            credentials: "include",
        });

        if (response.status === 202) {
            setShowNotification(true);
            return;
        }

        const deletedBlock = await response.json();
        setBlocks((prev) => prev.filter((b) => b.id !== deletedBlock.id));
    }

    useEffect(() => {
        async function loadPageByName(name) {
            if (!name) {
                loadHomepage();
                return;
            }
            const apiUrl =
                currentAPI +
                "/pages/" +
                name +
                "?type=title&gameId=" +
                contextGameId;

            const response = await fetch(apiUrl);
            const result = await response.json();
            const { page, blocks } = result;
            if (page == null) {
                navigate("/404", { replace: true });
            } else {
                setBlocks(blocks);
                setPageData(page);
            }
        }
        async function loadHomepage() {
            const responseGameData = await fetch(
                currentAPI + "/games/" + contextGameId,
            );
            if (responseGameData.ok) {
                const resultGameData = await responseGameData.json();
                const { slug } = resultGameData;

                const apiUrl =
                    currentAPI +
                    "/pages/" +
                    slug +
                    "?type=title&gameId=" +
                    contextGameId;

                const responsePageData = await fetch(apiUrl);
                if (responsePageData.ok) {
                    const resultPageData = await responsePageData.json();

                    const { page, blocks } = resultPageData;
                    setBlocks(blocks);
                    setPageData(page);
                }
            }
        }

        if (pageTitle && pageTitle !== "null" && pageTitle !== "undefined") {
            loadPageByName(pageTitle);
        } else {
            loadHomepage();
        }
    }, [pageTitle, contextGameId, currentAPI, navigate]);

    useEffect(() => {
        if (pageData && title !== pageData.title && pageData.title) {
            setTitle(pageData.title);
        }
    }, [pageData, title, setTitle]);

    function isOrderTaken(order) {
        return blocks.find((block) => block.order === order) !== undefined;
    }

    // async function addBlock({ nextOrder = highestOrder + 1, type } = {}) {
    //     if (!pageId) {
    //         return;
    //     }
    //
    //     const orderTaken = isOrderTaken(nextOrder);
    //
    //     if (orderTaken) {
    //         await shiftBlocks(nextOrder);
    //     }
    //
    //     const response = await fetch(
    //         currentAPI + "/pages/" + pageId + "/blocks",
    //         {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             credentials: "include",
    //             body: JSON.stringify({ order: nextOrder, type }),
    //         },
    //     );
    //
    //     if (response.status === 202) {
    //         setShowNotification(true);
    //         return;
    //     }
    //
    //     const newBlock = await response.json();
    //     const newBlocks = [...blocks, newBlock];
    //     setBlocks(newBlocks);
    // }

    function createUnsavedBlock({ nextOrder = highestOrder + 1, type } = {}) {
        if (!pageId) {
            return;
        }

        const tempId = `temp-${Date.now()}`;
        const newUnsavedBlock = {
            id: tempId,
            order: nextOrder,
            type: type || null,
            content: { content: "" },
            content2: null,
            isUnsaved: true,
        };

        setUnsavedBlocks((prev) => [...prev, newUnsavedBlock]);
    }

    async function saveUnsavedBlock(tempBlock, content) {
        const orderTaken = isOrderTaken(tempBlock.order);
        if (orderTaken) {
            const offsetResponse = await fetch(
                currentAPI + "/pages/" + pageId + "/blocks",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        type: tempBlock.type,
                        order: tempBlock.order,
                        content: content,
                    }),
                },
            );

            if (offsetResponse.status === 202) {
                setShowNotification(true);
                return;
            }
        }

        const response = await fetch(
            currentAPI + "/pages/" + pageId + "/blocks",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    order: tempBlock.order,
                    type: tempBlock.type,
                    content: content,
                }),
            },
        );

        if (response.status === 202) {
            setShowNotification(true);
            setUnsavedBlocks((prev) =>
                prev.filter((b) => b.id !== tempBlock.id),
            );
            return;
        }

        const newBlock = await response.json();

        const updateResponse = await fetch(
            currentAPI + "/blocks/" + newBlock.id,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ content }),
            },
        );

        if (updateResponse.status === 202) {
            setShowNotification(true);
        }

        const updatedBlock = await updateResponse.json();

        setUnsavedBlocks((prev) => prev.filter((b) => b.id !== tempBlock.id));
        setBlocks((prev) => [...prev, updatedBlock]);
    }

    function cancelUnsavedBlock(tempId) {
        setUnsavedBlocks((prev) => prev.filter((b) => b.id !== tempId));
    }

    // async function shiftBlocks(order) {
    //     if (!pageId) {
    //         return;
    //     }
    //
    //     const response = await fetch(
    //         currentAPI + "/pages/" + pageId + "/blocks",
    //         {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             credentials: "include",
    //             body: JSON.stringify({ type: "offset", order }),
    //         },
    //     );
    //
    //     if (response.status === 202) {
    //         setShowNotification(true);
    //         return;
    //     }
    //
    //     if (!response.ok) {
    //         throw new Error("Request failed");
    //     }
    //     const newBlocks = blocks.map((block) => {
    //         if (block.order >= order) {
    //             return { ...block, order: block.order + 1 };
    //         }
    //         return block;
    //     });
    //     setBlocks(newBlocks);
    // }

    async function updateBlockWithEditorData(block, editorRef) {
        const content = editorRef.current.getContent();
        const content2 = block.content2;

        const response = await fetch(currentAPI + "/blocks/" + block.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ content, content2 }),
        });

        if (response.ok && response.status !== 202) {
            const result = await response.json();
            const newBlocks = [...blocks];
            const adjustIndex = newBlocks.findIndex(
                (block) => block.id == result.id,
            );
            newBlocks[adjustIndex] = result;
            setBlocks(newBlocks);
        }
    }

    async function refreshBlock(id) {
        const response = await fetch(currentAPI + "/blocks/" + id);

        const result = await response.json();
        const newBlocks = [...blocks];
        const adjustIndex = newBlocks.findIndex(
            (block) => block.id == result.id,
        );
        newBlocks[adjustIndex] = result;
        setBlocks(newBlocks);
    }

    return (
        <Fragment>
            <div className="flex justify-center gap-2 mt-4 mb-4">
                <button
                    onClick={() => setEditMode(!editMode)}
                    className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-amber-50 rounded font-semibold cursor-pointer hover:opacity-90"
                >
                    <Pencil size={18} />
                    {editMode ? "Done Editing" : "Edit"}
                </button>
            </div>
            {editMode && (
                <div className="flex justify-center gap-2 mt-4">
                    <button
                        onClick={() => {
                            createUnsavedBlock({
                                nextOrder: 0,
                                type: "text",
                            });
                        }}
                        disabled={!pageId}
                        className="text-amber-50 bg-(--primary) w-37 rounded px-2 py-0.5 cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        + Text Block
                    </button>
                    <button
                        onClick={() => {
                            createUnsavedBlock({
                                nextOrder: 0,
                                type: "single-image",
                            });
                        }}
                        disabled={!pageId}
                        className="text-amber-50 bg-(--primary) w-37 rounded px-2 py-0.5 cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        + Image Block
                    </button>
                </div>
            )}
            {[...blocks, ...unsavedBlocks]
                .sort((a, b) => a.order - b.order)
                .map((block) => {
                    let blockType;
                    const buttons = editMode ? (
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={() => {
                                    createUnsavedBlock({
                                        nextOrder: block.order + 1,
                                        type: "text",
                                    });
                                }}
                                disabled={!pageId}
                                className="text-amber-50 bg-(--primary) w-37 rounded px-2 py-0.5 cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                + Text Block
                            </button>
                            <button
                                onClick={() => {
                                    createUnsavedBlock({
                                        nextOrder: block.order + 1,
                                        type: "single-image",
                                    });
                                }}
                                disabled={!pageId}
                                className="text-amber-50 bg-(--primary) w-37 rounded px-2 py-0.5 cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                + Image Block
                            </button>
                        </div>
                    ) : null;
                    switch (block.type) {
                        case null:
                        case "text":
                            blockType = (
                                <Fragment key={block.id}>
                                    <TextBlock
                                        deleteBlock={() =>
                                            block.isUnsaved
                                                ? cancelUnsavedBlock(block.id)
                                                : deleteBlock(block)
                                        }
                                        block={block}
                                        updateBlockWithEditorData={
                                            updateBlockWithEditorData
                                        }
                                        saveUnsavedBlock={saveUnsavedBlock}
                                        editMode={editMode}
                                        user={user}
                                    />
                                    {buttons}
                                </Fragment>
                            );
                            break;
                        case "single-image":
                            blockType = (
                                <Fragment key={block.id}>
                                    <SingleImageBlock
                                        deleteBlock={() =>
                                            block.isUnsaved
                                                ? cancelUnsavedBlock(block.id)
                                                : deleteBlock(block)
                                        }
                                        block={block}
                                        refreshBlock={refreshBlock}
                                        editMode={editMode}
                                        user={user}
                                    />
                                    {buttons}
                                </Fragment>
                            );
                            break;
                        default:
                            blockType = null;
                    }
                    return blockType;
                })}
            {isAdmin && (
                <div className="flex flex-col items-center mt-2 gap-2">
                    <Link
                        className="text-amber-50 bg-(--primary) w-50 rounded px-2 py-0.5 cursor-pointer hover:opacity-90"
                        to={"/page-manager/"}
                    >
                        Back to Page Manager
                    </Link>
                </div>
            )}
            <PendingReviewNotification
                visible={showNotification}
                onDismiss={() => setShowNotification(false)}
            />
        </Fragment>
    );
}
