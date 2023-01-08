import React,{useEffect, useState} from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(()=> {
		fetch('https://63b5cb8258084a7af3a08c7f.mockapi.io/items')
		.then((res) => res.json())
		.then((arr) => {
			setItems(arr);
			setIsLoading(false);
		});
	}, [])
	
	return (
	<>
		<div className="content__top">
			<Categories />
			<Sort />
		</div>
		<h2 className="content__title">Все пиццы</h2>
		<div className="content__items">
			{ isLoading ?
				[...new Array(6)].map((_, index) => 
					<Skeleton key={index}/>)
				: items.map((pizza) => (
					<PizzaBlock key={pizza.id} {...pizza} />
				))
			}
		</div>
	</>
  )
}

export default Home;
