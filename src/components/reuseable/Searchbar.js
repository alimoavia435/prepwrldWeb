import React from "react";
import './Searchbar.css'

function Searchbar() {
  return (
    <div className="Mesges_container_div1_searchTopp COMPOSE_HEADER">
      <div className="Mesges_container_div1_search1">
        <input
          type="text"
          placeholder="Search"
          className="Mesges_container_div1_search_input1"
        //   onChange={handleOnChange}
        />
        <img
          src="/Images/livechat/search-normal.svg"
          alt="searchIcon"
          className="searchIcon"
        />
      </div>
    </div>
  );
}

export default Searchbar;
