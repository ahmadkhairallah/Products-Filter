import React, { useState, useEffect } from 'react';
import './Card.scss';

function Card () {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
          .then(response => response.json())
          .then(json => {
              setData(json);
              setFilteredData(json);
          });
    }, []);

    const filterhandler = (event) => {
        const filter = event.target.value.toLowerCase();
        const filtered = data.filter((item) => item.title.toLowerCase().includes(filter));
        setFilteredData(filtered);
    }

    return (
        <>
            <div className='search'>
                <input type="text" placeholder="Search..." onChange={filterhandler} />
            </div>

            <div className='cards-container'>
            {filteredData.map((item) => (
                <div className='card' key={item.id}>
                    <div className='image-container'>
                        <img src={item.image} alt={item.title} />
                    </div>
                    <div className='info'>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.category}</p>
                    <h4>{`Price: $${item.price}`}</h4>
                    <button>Buy</button>
                    </div>
                </div>
            ))}
            </div>
        </>
    );
}

export default Card;
