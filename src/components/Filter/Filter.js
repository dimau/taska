import React from "react";
import './Filter.css';
import FilterButton from "../FilterButton/FilterButton";

function Filter(props) {

    const handleChange = function(e) {
        props.changeSelectedFilter(e.target.value);
    }

   return (
       <div className='filter' onChange={handleChange}>
           <FilterButton value='filter-all' label='All' selectedFilter={props.selectedFilter} />
           <FilterButton value='filter-active' label='Active' selectedFilter={props.selectedFilter} />
           <FilterButton value='filter-completed' label='Completed' selectedFilter={props.selectedFilter} />
       </div>
   );
}

export default Filter;