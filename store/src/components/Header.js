import { Link } from "react-router-dom";
import AppContext from "../context";
import React from "react";



function Header(props) {

  const {cartItems} = React.useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  

    return(
        <header className="d-flex justify-between align-center ">
        <div className="d-flex align-center">
          <Link to="">
        <img width={60} height={60} src="/logo.png"/>
        </Link>
        <div className="headerInfo">
          <h3 className="text-uppercase">Store77</h3>
         
          <p>Магазин техники Apple</p>
          
        </div>
        </div>
        
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width={14} height={14} src="/cart.jpeg"/>
            <span>{totalPrice} руб.</span>
          </li>
          <li>
            <Link to="/Orders">
            <img width={18} height={18} src="/user.png"/>
            </Link>
          </li>
        </ul>
        
      </header>
    )
}

export default Header