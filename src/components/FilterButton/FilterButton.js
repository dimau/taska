import React from "react";
import './FilterButton.css';

function FilterButton(props) {
    return (
        <label className='filter-button' htmlFor={props.value}>
            <input
                type='radio'
                className='filter-button__input'
                id={props.value}
                name='filter'
                value={props.value}
                checked={props.selectedFilter === props.value}
                onChange={()=>{}} // we will handle this event on the Filter component level, so it's just to remove warning in browser
            />
            <div className='filter-button__control'>
                {props.label}
            </div>
        </label>
    );
}

export default FilterButton;