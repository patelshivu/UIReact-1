import React from "react";
import "./styles.css";
import * as FlatIcon from "react-icons/fc";

export default function LeftMenu(props) {
  const { isOpen } = props;
  return (
    <div
      className={
        isOpen ? "div-left-menu" : "div-left-menu-small div-left-menu-close"
      }
    >
      <ul>
        <li>
          <FlatIcon.FcBarChart size={20} onClick={() => alert("click")} />
          <label className={!isOpen ? "hidden-txt" : "show-text"}>Home</label>
        </li>
        <li>
          <FlatIcon.FcBearish size={20} />
          <label className={!isOpen ? "hidden-txt" : "show-text"}>Home</label>
        </li>
        <li>
          <FlatIcon.FcAssistant size={20} />
          <label className={!isOpen ? "hidden-txt" : "show-text"}>Home</label>
        </li>
        <li>
          <FlatIcon.FcDatabase size={20} />
          <label className={!isOpen ? "hidden-txt" : "show-text"}>Home</label>
        </li>
      </ul>
    </div>
  );
}
