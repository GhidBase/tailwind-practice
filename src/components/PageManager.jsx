import "../tailwind.css";
import { Fragment, useEffect, useState } from "react";
import PagesItem from "./PagesItem";

// http://localhost:3000/pages
// https://guide-site-backend.onrender.com/pages/

export default function PageManager() {
    const [pages, setPages] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/pages")
            .then((response) => response.json())
            .then((result) => setPages(result));
    }, []);

    async function createPage(title) {
        if (!title?.trim()) {
            console.log("Error - title cannot be empty");
            return;
        }

        let response;
        try {
            response = await fetch("http://localhost:3000/pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
        } catch (err) {
            console.error("Error", err);
            return;
        }

        if (!response.ok) {
            try {
                await response.json();
            } catch {
                ("");
            }
            console.error("Create page failed");
            return;
        }

        const newPage = await response.json();
        const newPages = [...pages];
        newPages.push(newPage);
        setPages(newPages);
        setTitle("");
    }

    function deletePage(id) {
        if (!+id) {
            console.log("Error - Invalid ID " + +id);
            return;
        }

        fetch("http://localhost:3000/pages/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(),
        });
    }

    async function updatePageTitle(id, title, index) {
        if (!+id) {
            console.log("Error - Invalid ID " + +id);
            return;
        }

        await fetch("http://localhost:3000/pages/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });

        const newPages = [...pages];
        newPages[index].title = title;
        setPages(newPages);
    }

    const isAdmin = true;

    return (
        isAdmin && (
            <div
                id="Page Manager"
                className="p-4 bg-(--surface-background) max-w-230 w-full text-(--text-color) h-200 rounded-xl shadow-2xl"
            >
                <h1 className="text-5xl">Page Manager</h1>

                <div className="mt-4 flex justify-between items-center mx-auto gap-2">
                    <h1>Pages:</h1>
                    <form action="" className="flex gap-2">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="bg-(--red-brown) min-w-0 text-white px-2 box-border rounded ml-auto"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Page Title"
                        />
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                createPage(title);
                            }}
                            className="text-amber-50 bg-(--primary) w-38 rounded px-2 py-0.5"
                        >
                            Create Page
                        </button>
                    </form>
                </div>
                <ul className="">
                    {pages.map((page, pageIndex) => {
                        return (
                            <PagesItem
                                key={page.id}
                                pageIndex={pageIndex}
                                page={page}
                                pages={pages}
                                setPages={setPages}
                                deletePage={deletePage}
                                updatePageTitle={updatePageTitle}
                            />
                        );
                    })}
                </ul>
            </div>
        )
    );
}
