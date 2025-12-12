import { useState, useEffect } from "react";
import "../tailwind.css";
import ChecklistItem from "./ChecklistItem";

function Checklist({ checklistId }) {
    const localChecked = JSON.parse(localStorage.getItem("checkedItems"));
    if (!localChecked) {
        localStorage.setItem("checkedItems", JSON.stringify({}));
    }
    const [checkedItems, setCheckedItems] = useState(localChecked);
    const [checklistItems, setChecklistItems] = useState([]);

    useEffect(() => {
        fetch(
            "https://guide-site-backend.onrender.com/checklists/" + checklistId
        )
            .then((response) => response.json())
            .then((result) =>
                setChecklistItems(
                    result.sort((a, b) => a.title.localeCompare(b.title))
                )
            );
    }, [checklistId]);

    function toggleItem(id) {
        const newItems = { ...checkedItems };

        if (newItems[id] !== undefined) {
            newItems[id] = !newItems[id];
        } else {
            newItems[id] = true;
        }
        localStorage.setItem("checkedItems", JSON.stringify(newItems));
        setCheckedItems(newItems);
    }

    return (
        <div>
            <p className="my-2">
                Checklist -{" "}
                {
                    Object.values(checkedItems).filter((checked) => checked)
                        .length
                }
                /{checklistItems.length} Fleas
            </p>
            <ul className="w-full px-4 flex flex-col gap-4">
                {checklistItems.map((item) => {
                    return (
                        <ChecklistItem
                            title={item.title}
                            id={item.id}
                            inGameUrl={item.imageOne}
                            mapUrl={item.imageTwo}
                            toggleItem={toggleItem}
                            checkedItems={checkedItems}
                            key={item.id}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Checklist;
