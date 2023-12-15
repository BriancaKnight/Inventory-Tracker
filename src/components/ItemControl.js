import React from 'react';
import NewItemForm from './NewItemForm';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import EditItemForm from './EditItemForm';
import CoreItems from './CoreItems';
import ReusableButton from './ReusableButton';


class ItemControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainItemList: [...CoreItems],
      selectedItem: null,
      editing: false,
    };
  }

  handleClick = () => {
    if (this.state.selectedItem != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedItem: null,
        editing: false
      });
    }
    else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleAddingNewItem = (newItem) => {
    const newMainItemList = this.state.mainItemList.concat(newItem);
    this.setState({
      mainItemList: newMainItemList,
      formVisibleOnPage: false
    });
  }

  handleChangingSelectedItem = (id) => {
    const selectedItem = this.state.mainItemList.find(item => item.id === id);
    this.setState({ selectedItem: selectedItem });
  };

  updateMainItemList = (itemId, newQuantity) => {
    this.setState(prevState => ({
      mainItemList: prevState.mainItemList.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleEditingItemInList = (itemToEdit) => {
    const editedMainItemList = this.state.mainItemList.map((item) => {
      if (item.id === itemToEdit.id) {
        return itemToEdit;
      }
      return item;
    });

    this.setState({
      mainItemList: editedMainItemList,
      editing: false,
      selectedItem: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState =
        <React.Fragment>
          <ItemDetail
            item={this.state.selectedItem} />
          <EditItemForm
            item={this.state.selectedItem}
            onEditItem={this.handleEditingItemInList}
          />
        </React.Fragment>
      buttonText = "Return to Shop"
    }
    else if (this.state.selectedItem != null) {
      currentlyVisibleState =
        <React.Fragment>
          <ItemDetail
            item={this.state.selectedItem}
            onClickingEdit={this.handleEditClick}
            updateMainItemList={this.updateMainItemList}
          />
          <ReusableButton
            onClick={this.handleEditClick}
            buttonText='Update Item'
          />
        </React.Fragment>
      buttonText = "Return to Shop";
    }
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState =
        <NewItemForm
          onNewItemCreation={this.handleAddingNewItem} />;
      buttonText = "Return to Shop";
    }
    else {
      currentlyVisibleState =
        <ItemList
          itemList={this.state.mainItemList}
          onItemSelection={this.handleChangingSelectedItem} />;
      buttonText = "Add Item to Inventory";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default ItemControl;