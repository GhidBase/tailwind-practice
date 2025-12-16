import "../tailwind.css";
import { Fragment, useEffect, useState } from "react";

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
    }

    function deletePage(id) {
        if (!+id) {
            console.log("Error - Invalid ID " + +id);
            return;
        }

        fetch("http://localhost:3000/pages", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
    }

    const isAdmin = true;

    return (
        <div className="">
            {isAdmin && (
                <div className="p-4">
                    <h1>Admin Tools</h1>

                    <div className="flex justify-between items-center mx-auto gap-2">
                        <h1>Pages:</h1>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="bg-neutral-200 min-w-0 text-black px-2 box-border rounded ml-auto"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <button
                            onClick={() => createPage(title)}
                            className="text-amber-50 bg-neutral-600 w-38 rounded px-2 py-0.5"
                        >
                            Create Page
                        </button>
                    </div>
                    <ul className="">
                        {pages.map((page, pageIndex) => {
                            return (
                                <li
                                    className="mt-4 w-full flex justify-between"
                                    key={page.id}
                                >
                                    <p>{page.title}</p>
                                    <button
                                        onClick={() => {
                                            const newPages = [...pages];
                                            newPages.splice(pageIndex, 1);
                                            setPages(newPages);
                                            deletePage(page.id);
                                        }}
                                        className="text-amber-50 bg-neutral-600 w-22 rounded px-2 py-0.5"
                                    >
                                        Delete
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
