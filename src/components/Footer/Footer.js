import React from "react";
import './Footer.css';
import Filter from "../Filter/Filter";

function Footer(props) {
    return (
        <footer className='footer'>
            <Filter selectedFilter={props.selectedFilter} changeSelectedFilter={props.changeSelectedFilter} />
        </footer>
    );
}

export default Footer;