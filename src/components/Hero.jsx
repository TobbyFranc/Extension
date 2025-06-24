import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import data from "../data.json";
import Boxes from "./Boxes";

const Hero = () => {
  // State to manage light/dark mode toggle
  const [bgToggled, setBgToggled] = useState(() => {
    const saved = localStorage.getItem("bgToggled");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const handleBgToggle = () => setBgToggled((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("bgToggled", JSON.stringify(bgToggled));
  }, [bgToggled]);

  // State to hold items and filtered items
  const [items, setItems] = useState([]);
  const [filteredItems, setfilteredItems] = useState("all");

  useEffect(() => {
    // Map over data and update isActive from localStorage if present
    const removed = JSON.parse(localStorage.getItem("removedCards") || "[]");
    const updatedData = data
      .filter((card) => !removed.includes(card.name)) // filter out removed cards
      .map((card) => {
        const saved = localStorage.getItem(`toggle-${card.name}`);
        return {
          ...card,
          isActive: saved !== null ? JSON.parse(saved) : card.isActive,
        };
      });

    if (filteredItems == "all") {
      setItems(updatedData);
      return;
    } else if (filteredItems == "active") {
      setItems(updatedData.filter((card) => card.isActive));
    } else if (filteredItems == "inactive") {
      setItems(updatedData.filter((card) => !card.isActive));
    }
  }, [filteredItems]);

  // Remove handler
  const handleRemove = (name) => {
    setItems((prev) => prev.filter((card) => card.name !== name));
    // Save removed card name to localStorage
    const removed = JSON.parse(localStorage.getItem("removedCards") || "[]");
    if (!removed.includes(name)) {
      removed.push(name);
      localStorage.setItem("removedCards", JSON.stringify(removed));
    }

    console.log(`${name} card has been removed.`);
    // Optionally, remove toggle from localStorage:
    localStorage.removeItem(`toggle-${name}`);
  };

  return (
    <div
      className={`w-full relative min-h-screen h-full ${
        bgToggled ? "bg-light" : "bg-dark"
      }`}
    >
      <Navbar onBgToggle={handleBgToggle} bgToggled={bgToggled} />
      <div className="w-full py-[200px] flex flex-col justify-center items-center max-w-[90%] mx-auto text-slate-50">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <h2
            className={`capitalize text-xl md:text-2xl noto-sans-700 font-bold mb-4 md:mb-0 ${
              bgToggled
                ? "text-[var(--Neutral800)]"
                : "text-[var(--Neutral200)]"
            } tracking-wider`}
          >
            extensions list
          </h2>
          <div className="w-full flex gap-2 noto-sans-400">
            <button
              onClick={() => setfilteredItems("all")}
              className={
                bgToggled
                  ? `cursor-pointer text-[var(--Neutral800)] shadow-md rounded-full px-4 py-2 hover:bg-[var(--Red400)] ${
                      filteredItems === "all"
                        ? "bg-[var(--Red500)] text-[var(--Neutral900)]"
                        : "bg-[var(--Neutral100)] text-[var(--Neutral800)]"
                    }`
                  : `cursor-pointer text-[var(--Neutral0)] shadow-md rounded-full px-4 py-2 hover:bg-opacity-[40] ${
                      filteredItems === "all"
                        ? "bg-[var(--Red700)] text-[var(--Neutral0)]"
                        : "bg-[var(--Neutral700)] text-[var(--Neutral0)]"
                    }`
              }
            >
              All
            </button>
            <button
              onClick={() => setfilteredItems("active")}
              className={
                bgToggled
                  ? `cursor-pointer text-[var(--Neutral800)] shadow-md rounded-full px-4 py-2 hover:bg-[var(--Red400)] ${
                      filteredItems === "active"
                        ? "bg-[var(--Red500)] text-[var(--Neutral900)]"
                        : "bg-[var(--Neutral100)] text-[var(--Neutral800)]"
                    }`
                  : `cursor-pointer text-[var(--Neutral0)] shadow-md rounded-full px-4 py-2 hover:bg-opacity-[40] ${
                      filteredItems === "active"
                        ? "bg-[var(--Red700)] text-[var(--Neutral0)]"
                        : "bg-[var(--Neutral700)] text-[var(--Neutral0)]"
                    }`
              }
            >
              Active
            </button>
            <button
              onClick={() => setfilteredItems("inactive")}
              className={
                bgToggled
                  ? `cursor-pointer text-[var(--Neutral800)] shadow-md rounded-full px-4 py-2 hover:bg-[var(--Red400)] ${
                      filteredItems === "inactive"
                        ? "bg-[var(--Red500)] text-[var(--Neutral900)]"
                        : "bg-[var(--Neutral100)] text-[var(--Neutral800)]"
                    }`
                  : `cursor-pointer text-[var(--Neutral0)] shadow-md rounded-full px-4 py-2 hover:bg-opacity-[40] ${
                      filteredItems === "inactive"
                        ? "bg-[var(--Red700)] text-[var(--Neutral0)]"
                        : "bg-[var(--Neutral700)] text-[var(--Neutral0)]"
                    }`
              }
            >
              Inactive
            </button>
          </div>
        </div>
        <div className="w-full mt-12 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(auto,500px))] place-content-center">
          {items.map((card) => {
            return (
              <Boxes
                key={card.name}
                card={card}
                onRemove={handleRemove}
                onBgToggle={handleBgToggle}
                bgToggled={bgToggled}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
