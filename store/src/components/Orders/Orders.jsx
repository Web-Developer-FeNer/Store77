import axios from "axios";
import React from "react";
import AppContext from "../../context";
import Card from "../Card/Card";


function Orders() {
    const {onAddToCart} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
      
        (async () => {
            const { data } = await axios.get('https://621cded3768a4e1020b7f289.mockapi.io//Orders')
            setOrders(data.reduce((prev, obj) => [ ... prev, ... obj.items], []))
            setIsLoading(false)
        })()
    }, [])

    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [ ... Array(8)] : orders).map((item, index) => (
                    <Card 
                    key={index}
            
                    
                  
                    loading = {isLoading}
                    
                    {...item} />
                ))}
            </div>

        </div>
    )
}

export default Orders