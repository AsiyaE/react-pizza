import React, { useState } from 'react'

function Categories(){
	const [activeIndex, setActiveIndex] =useState(0);

	const onClickCateory = (index) => {
		setActiveIndex(index);
	}
	return(
	  <div className="categories">
		<ul>
			<li onClick={() => onClickCateory(0)} 
			  className = {activeIndex === 0 ? "active":''}>Все</li>
			<li onClick={() => onClickCateory(1)} 
			  className = {activeIndex === 1 ? "active":''}>Мясные</li>
			<li onClick={() => onClickCateory(2)} 
			  className = {activeIndex === 2 ? "active":''}>Вегетарианские</li>
			<li onClick={() => onClickCateory(3)} 
			  className = {activeIndex === 3 ? "active":''}>Гриль</li>
			<li onClick={() => onClickCateory(4)} 
			  className = {activeIndex === 4 ? "active":''}>Острые</li>
			<li onClick={() => onClickCateory(5)} 
			  className = {activeIndex === 5 ? "active":''}>Закрытые</li>
		</ul>
	  </div>
	)
}

export default Categories;