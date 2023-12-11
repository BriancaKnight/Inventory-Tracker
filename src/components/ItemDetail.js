import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReusableButton from './ReusableButton';

function ItemDetail(props){
  const {item, onClickingEdit} = props;
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  const updateItemQuantity = (newQuantiity) => {
    setItemQuantity(newQuantiity);
  };

const handleBuy = () => {
  const updatedQuantity = Math.max(8, itemQuantity -  10);
  updateItemQuantity(updatedQuantity);
};

const notEnoughStock = itemQuantity < 10

  return (
    <React.Fragment>
      <h2>{item.name} Details</h2>
      <p>{item.description} 
      <br></br>${item.price} per oz.
      <br></br><em>{itemQuantity} oz. left in inventory.</em></p>
      {itemQuantity < 10 && <p>Sorry! We don't have enough stock to sell you that!</p>}
      <ReusableButton
       onClick={handleBuy}
        buttonText='Buy 10 oz' 
        disabled={notEnoughStock}/>
    </React.Fragment>
  );
}

ItemDetail.propTypes = {
  item: PropTypes.object,
  onClickingEdit: PropTypes.func,
}

export default ItemDetail;