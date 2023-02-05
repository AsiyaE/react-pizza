import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63b5cb8258084a7af3a08c7f.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка ...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="пицца" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
