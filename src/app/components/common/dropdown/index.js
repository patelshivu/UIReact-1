import React from "react";
import { Dropdown } from "react-bootstrap";

/**
 * This is common dropdown menu
 * you have to pass array for dropdown item
 * pass kItemName and kItemId if have object of array otherwise pass dont pass
 * placeholder
 * selectedItem
 * onSelectItem
 * @param {*} props
 * @returns
 */
export default function CommonDropDown(props) {
  const {
    listItem,
    kItemName,
    kItemId,
    placeholder,
    selectedItem,
    onSelectItem,
  } = props;

  const renderDropdownItem = () => {
    return listItem.map((item, index) => (
      <Dropdown.Item
        onClick={() => onSelectDropdown(item)}
        key={index}
        eventKey={typeof listItem === "object" ? item[[kItemId]] : item}
      >
        {typeof listItem === "object" ? item[[kItemName]] : item}
      </Dropdown.Item>
    ));
  };

  const renderPlaceholder = () => {
    if (placeholder) {
      return (
        <Dropdown.Item
          onClick={() => onSelectDropdown(placeholder)}
          key={placeholder}
          eventKey={placeholder}
        >
          {placeholder}
        </Dropdown.Item>
      );
    }
  };

  const onSelectDropdown = (e) => {
    onSelectItem(e);
  };

  return (
    <Dropdown className="">
      <Dropdown.Toggle id="dropdown-autoclose-true">
        {typeof selectedItem === "object"
          ? selectedItem[[kItemName]]
          : selectedItem}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {renderPlaceholder()}
        {renderDropdownItem()}
      </Dropdown.Menu>
    </Dropdown>
  );
}

/***
 * Example
 * const renderAssetDropdown = () => {
    return (
      <div>
        <label>Asset</label>
        <CommonDropDown
          listItem={[
            { name: "mumbai", id: "1" },
            { name: "gujarat", id: "2" },
          ]}
          kItemName="name"
          kItemId="id"
          placeholder="--ALL--"
          selectedItem={selectedAsset}
          onSelectItem={(e) => setSelectedAsset(e)}
        />
      </div>
    );
  };
 */
