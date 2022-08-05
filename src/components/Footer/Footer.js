import React from "react";
import './Footer.css';
import Filter from "../Filter/Filter";

function Footer(props) {
    return (
        <footer className='footer'>
            <Filter selectedFilter={props.selectedFilter} onChangeFilter={props.onChangeFilter} />
        </footer>
    );
}

export default Footer;