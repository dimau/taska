import React from "react";
import './Filter.css';
import FilterButton from "../FilterButton/FilterButton";

function Filter(props) {
   return (
       <div className='filter' onChange={props.onChangeFilter}>
           <FilterButton value='filter-all' label='All' selectedFilter={props.selectedFilter} />
           <FilterButton value='filter-active' label='Active' selectedFilter={props.selectedFilter} />
           <FilterButton value='filter-completed' label='Completed' selectedFilter={props.selectedFilter} />
       </div>
   );
}

export default Filter;