import React from 'react';
import NewItemForm from './NewItemForm';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import EditItemForm from './EditItemForm';

class ItemControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainItemList: [],
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
    const selectedItem = this.state.mainItemList.filter(item => item.id === id)[0];
    this.setState({ selectedItem: selectedItem });
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleEditingItemInList = (itemToEdit) => {
    const editedMainItemList = this.state.mainItemList
    .filter(item => item.id !== this.state.selectedItem.id)
    .concat(itemToEdit);
    this.setState({
      mainItemList: editedMainItemList,
      editing: false,
      selectedItem: null,
    });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState =
        <EditItemForm
          item={this.state.selectedItem} 
          onEditItem = {this.handleEditingItemInList}/>
      buttonText = "Return to Shop"
    }
    else if (this.state.selectedItem != null) {
      currentlyVisibleState =
        <ItemDetail
          item={this.state.selectedItem}
          onClickingEdit={this.handleEditClick} />;
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