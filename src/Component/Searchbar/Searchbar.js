import React from "react";
import "../../scss/searchbar.scss";
import { AiOutlineSearch } from "react-icons/ai";

function Searchbar(props) {
  return (
    <div className="search-bar-content">
      <div className="search">
        <input
          type="text"
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
        />
        <AiOutlineSearch className="search-icon" onClick={props.onClick} />
      </div>
    </div>
  );
}

export default Searchbar;
