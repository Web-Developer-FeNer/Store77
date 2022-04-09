import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from 'axios';

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import AppContext from "./context";
import Orders from "./components/Orders/Orders"




function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)

 
 


  React.useEffect(() =>{
    
  async function fetchData() {
   setIsLoading(true)
   const cartResponse = await axios.get("https://621cded3768a4e1020b7f289.mockapi.io/cart");
   const itemsResponse = await axios.get("https://621cded3768a4e1020b7f289.mockapi.io/items");

   setIsLoading(false)
  

   setCartItems(cartResponse.data)
   setItems(itemsResponse.data)
   
  }

  fetchData();

  }, [])

  const onAddToCart = (obj) => {

    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
    
    if (findItem) {
      
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
      axios.delete(`https://621cded3768a4e1020b7f289.mockapi.io/cart/${findItem.id}`);
      
      
    } else {
      
      
      const {data} = axios.post('https://621cded3768a4e1020b7f289.mockapi.io/cart', obj);
      setCartItems((prev) => [ ... prev, obj]);
        
    };

    
    
  };

  const onRemoveItem = (id) => {

   axios.delete(`https://621cded3768a4e1020b7f289.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item=>Number(item.id) !== Number(id)))
  }
  

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
   return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }


  return (
    <AppContext.Provider value={{ cartItems, items, onAddToCart, isItemAdded, setCartOpened, setCartItems }}>


          <div className="wrapper clear">

                  
            {cartOpened ? <Drawer items={cartItems} onClose= {() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}



            <Header onClickCart = {() => setCartOpened(true) } />

            <Routes>

              <Route path="/" element={<Home
              cartItems={cartItems}
              items={items} 
              searchValue={searchValue} 
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
              
              
              />} 
              
              />

              <Route path="/Orders" element={< Orders />} 
              
              />

              </Routes>

              

       </div>

    </AppContext.Provider>
    
  );
}

export default App;
