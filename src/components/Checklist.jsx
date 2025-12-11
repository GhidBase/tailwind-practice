import { useState, useEffect } from "react";
import "../tailwind.css";
import ChecklistItem from "./ChecklistItem";

function Checklist() {
    const [checkedItems, setCheckedItems] = useState({});
    const [checklistItems, setChecklistItems] = useState([]);

    useEffect(() => {
        fetch("https://guide-site-backend.onrender.com/checklists/1")
            .then((response) => response.json())
            .then((result) => setChecklistItems(result));
    }, []);
    console.log(checklistItems);

    function toggleItem(id) {
        const newItems = { ...checkedItems };

        if (newItems[id] !== undefined) {
            newItems[id] = !newItems[id];
        } else {
            newItems[id] = true;
        }
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
                /30 Fleas
            </p>
            <ul className="w-full px-4 flex flex-col gap-4">
                {checklistItems.map((item) => {
                    console.log(item);
                    return (
                        <ChecklistItem
                            title={item.title}
                            id={item.id}
                            inGameUrl={item.imageOne}
                            mapUrl={item.imageTwo}
                            toggleItem={toggleItem}
                            checkedItems={checkedItems}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Checklist;
