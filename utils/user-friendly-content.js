import { faTurkishLira } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const toFriendlyBoxName = (boxName) =>
  boxName[0].toUpperCase() + boxName.slice(1);

const toFriendlyBoxItemName = (boxName, itemName) => {
  if (boxName === "sort") {
    switch (itemName) {
      case "latest":
        return "Latest";
      case "price-asc":
        return "Price(low->high)";
      case "price-desc":
        return "Price(high->low)";
      case "ds-rate":
        return "Discount Rate";
      default:
        return itemName;
    }
  }
  if (boxName === "price") {
    return (
      <>
        {itemName.split("-")[0].replace("TL", "")}
        <FontAwesomeIcon icon={faTurkishLira} />-
        {itemName.split("-")[1].replace("TL", "")}
        <FontAwesomeIcon icon={faTurkishLira} />
      </>
    );
  }
  return itemName[0].toUpperCase() + itemName.slice(1);
};

export {
  toFriendlyBoxName,
  toFriendlyBoxItemName
}