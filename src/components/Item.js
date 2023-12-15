import React from "react";
import PropTypes from "prop-types";

function Item(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenItemClicked(props.id)}>
        <h3>{props.name}</h3>
        <p>${props.price} per oz</p>
      </div>
    </React.Fragment>

  );
}

Item.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  description: PropTypes.string,
  id: PropTypes.string,
  whenItemClicked: PropTypes.func,
};

export default Item;