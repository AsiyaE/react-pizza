import React,{useContext, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';


const Home = () => {
  const dispatch = useDispatch();

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext)


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0,0);
  }
  
  useEffect(()=> {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map((pizza) => <PizzaBlock key = {pizza.id} {...pizza} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
  <div className="container">
    <div className="content__top">
      <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
      <Sort />
    </div>
    <h2 className="content__title">Все пиццы</h2>
    {
      status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
    ) : (
        <div className="content__items"> { status === 'loading' ? skeletons : pizzas } </div>
    )}
    <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
  </div>
  )
}

export default Home;
