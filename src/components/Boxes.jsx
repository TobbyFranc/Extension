import devToolsLogo from "../assets/images/logo-devlens.svg";
import styleSpyLogo from "../assets/images/logo-style-spy.svg";
import speedBoost from "../assets/images/logo-speed-boost.svg";
import jsonWizard from "../assets/images/logo-json-wizard.svg";
import tabMaster from "../assets/images/logo-tab-master-pro.svg";
import viewPortBuddy from "../assets/images/logo-viewport-buddy.svg";
import markupNotes from "../assets/images/logo-markup-notes.svg";
import gridGuide from "../assets/images/logo-grid-guides.svg";
import palettePicker from "../assets/images/logo-palette-picker.svg";
import linkChecker from "../assets/images/logo-link-checker.svg";
import domSnapshot from "../assets/images/logo-dom-snapshot.svg";
import consolePlus from "../assets/images/logo-console-plus.svg";
import { useState, useEffect } from "react";

const logoMap = {
  DevLens: devToolsLogo,
  StyleSpy: styleSpyLogo,
  SpeedBoost: speedBoost,
  JSONWizard: jsonWizard,
  TabMasterPro: tabMaster,
  ViewportBuddy: viewPortBuddy,
  MarkupNotes: markupNotes,
  GridGuides: gridGuide,
  PalettePicker: palettePicker,
  LinkChecker: linkChecker,
  DOMSnapshot: domSnapshot,
  ConsolePlus: consolePlus,
};

const Boxes = ({ card, onRemove, bgToggled}) => {
  // Use card.name as a unique key for localStorage
  const storageKey = `toggle-${card.name}`;
  const [toggle, setToggle] = useState(() => {
    // On mount, check localStorage first, else use card.isActive
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? JSON.parse(saved) : card.isActive;
  });

  // Save to localStorage whenever toggle changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(toggle));
  }, [toggle, storageKey]);

  // const [toggle, setToggle] = useState(card.isActive)

  const handleToggle = () => {
      setToggle((prevToggle) => !prevToggle);
      console.log(`Toggle ${card.name} is now: ${!toggle}`);
  };

  return (
    <div className={ bgToggled ? "h-[200px] shadow-md bg-[var(--Neutral400)] border-1 border-[var(--Neutral200)] rounded-3xl p-6 flex flex-col justify-between" : "h-[200px] shadow-md bg-[var(--Neutral800)] border-1 border-[var(--Neutral600)] rounded-3xl p-6 flex flex-col justify-between"}>
      <div className="flex items-start">
        <img
          src={logoMap[card.name]}
          alt=""
          className="w-10 h-10 mr-4 rounded-sm "
        />
        <div className="flex flex-col">
          <h3 className={bgToggled ? "text-[var(--Neutral800)] noto-sans-700 text-lg font-semibold" : "text-[var(--Neutral400)] noto-sans-700 text-lg font-semibold"}>
            {card.name}
          </h3>
          <p className={bgToggled ? "text-[var(--Neutral800)] noto-sans-400 text-sm mt-1" : "text-[var(--Neutral400)] noto-sans-400 text-sm mt-1"}>
            {card.description}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center noto-sans-500">
        <button
          onClick={() => onRemove(card.name)}
          className={bgToggled ? "border-1 border-[var(--Neutral600)] text-[var(--Neutral800)] rounded-3xl py-2 px-4 hover:bg-[var(--Red500)] hover:text-[var(--Neutral900)] duration-150 cursor-pointer" : "border-1 border-[var(--Neutral0)] text-[var(--Neutral0)] rounded-3xl py-2 px-4 hover:bg-[var(--Red500)] hover:text-[var(--Neutral0)] duration-150 cursor-pointer"
          }>
          Remove
        </button>
        <div className="">
          <label
            htmlFor={`radio-${card.name}`}
            
            className={
              !toggle
                ? "cursor-pointer text-[var(--Neutral200)] w-8 h-4 bg-[var(--Neutral600)] border-1 border-[var(--Neutral200)] flex justify-center items-center rounded-full mr-2 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[14px] before:h-[14px] before:bg-[var(--Neutral200)] before:rounded-full before:border-1 before:border-[var(--Neutral0)] transition-all duration-300 before:translate-x-0"
                : "cursor-pointer text-[var(--Neutral200)] w-8 h-4 bg-[var(--Red700)] border border-[var(--Neutral0)] flex justify-center items-center rounded-full mr-2 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[14px] before:h-[14px] before:rounded-full before:translate-x-4 before:bg-[var(--Neutral0)] transition-all duration-300 "
            }
          >
            <input
              type="checkbox"
              name={`activeToggle-${card.name}`}
              id={`radio-${card.name}`}
              className="opacity-0 w-full cursor-pointer"
              checked={toggle}
              onChange={handleToggle}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
