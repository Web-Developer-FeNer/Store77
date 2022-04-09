import Info from "./Info"
import React from "react"
import AppContext from "../context"
import axios from "axios"


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = []}) {

  const {cartItems, setCartItems} = React.useContext(AppContext)
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  const onClickOrder = async () => {
   try {
     setIsLoading(true)
    const {data} = await axios.post('https://621cded3768a4e1020b7f289.mockapi.io/Orders', {
      items: cartItems,
    })
   
    setOrderId(data.id)
    setIsOrderComplete(true)
    setCartItems([])
    
   } catch(error){
     alert('Не удалось создать заказ')
   }
   setIsLoading(false)
  }

    return(
        <div className="overlay">
        <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">Корзина <button onClick={onClose} >x</button></h2>

        {
            items.length > 0 ? (
            
            <div className="d-flex flex-column flex">
                <div className="items">


{items.map((obj) =>(

    <div key={obj.id} className="cartItem d-flex align-center mb-20">
  
  
  <div style={{backgroundImage: `url(${obj.image})`}} className="cartItemImg">

  </div>

  <div className="mr-20 flex">
    <p className="mb-5">{obj.title}</p>
    <b>{obj.price}</b>
    
  </div>
  <button onClick={() => onRemove(obj.id)}>x</button>
</div>





        
    ))}


    

</div>   

<div className="cartTotalBlock">
<ul>
  <li>
    <span>Итого</span>
    <div></div>
    <b>{totalPrice} руб.</b>
  </li>
  <li>
    <span>Налог 10%</span>
    <div></div>
    <b>{totalPrice * 0.1} руб.</b>
  </li>
</ul>
<button className="greenButton" disabled = {isLoading} onClick={onClickOrder}>Оформить заказ <span><b>→</b></span> </button>
</div>
            </div>

            ) : (
              <Info title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"} description={ isOrderComplete ?
                `Ваш заказ №${orderId}. Ожидайте звонка менеджера` : "Добавьте хотя бы один товар"} image={isOrderComplete ? "/oformlen.png" :"/korzina.jpeg"} />
            
            )
        }

        
      

        

       



      </div>
      </div>
    )

}

export default Drawer