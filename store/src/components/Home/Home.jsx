
import React from "react";
import Card from "../Card/Card";


function Home({ items,  searchValue, setSearchValue, onChangeSearchInput, onAddToCart, isLoading}) {
    
    

    const renderItems = () =>{

        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))

        return  (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
           key={index}
            
               onPlus={(obj) => onAddToCart(obj)} 
             
               loading = {isLoading}
               
               {...item}
               />
          )
        
          )

        
    }
    
    
    return (
        <div className="content">
        <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}"` : 'Вся техника Apple'}</h1>
        <div className="search-block d-flex">
          <img width={15} height={15} src="/poisk.png" alt="Search" />
          <input onChange={onChangeSearchInput}  placeholder="Поиск ..."></input>
        </div>
        </div>
        
<div className="d-flex justify-between flex-wrap">

  {renderItems()}

  
  


      </div>

      </div>
    );
}

export default Home;