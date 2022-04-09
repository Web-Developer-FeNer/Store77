import React from 'react';
import styles from './Card.module.scss'
import ContentLoader from 'react-content-loader';
import AppContext from "../../context";



function Card({id, parentId, image, title, price, onPlus, loading = false , added = false}) {

   
    const { isItemAdded } = React.useContext(AppContext);
    const obj = { id, parentId: id, title, image, price}

    const onClickPlus = () => {
      onPlus(obj);
      

    }
    

return(
<div className={styles.card}>

{
  loading ? (<ContentLoader
  speed={2}
  width={180}
  height={265}
  viewBox='0 0 150 265'
  backgroundColor='#f3f3f3'
  foregroundColor='#ecebeb'>
  <rect x="-2" y="0" rx="10" ry="10" width="155" height="155" />
  <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
  <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
  <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
  <rect x="115" y="230" rx="10" ry="10" width="32" height="32" />
  </ContentLoader>) : 
  (<>
  <img width={180} height={190} src={image} alt="Iphone 11"/>
  <h5>{title}</h5>
  <div className="d-flex justify-between align-center">
    <div className="d-flex flex-column">
      <span>Цена: </span>
      <b>{price} руб.</b>
    </div>
    {onPlus && (
    <button className={isItemAdded(id) ? styles.buttonClick : styles.button} onClick={onClickPlus}>
      {isItemAdded(id) ? "Добавлено в корзину" : "+"}
    </button>)
    }
  </div>
  </>
)}

        

        
      </div>

);

}

export default Card