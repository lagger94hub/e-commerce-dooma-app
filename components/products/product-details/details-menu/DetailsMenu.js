import { toFriendlyName } from "../../../../utils/user-friendly-content";
import Accordion from "../../../ui/accordion/Accordion";
import Button from "../../../ui/buttons/Button";
import ColorsSlider from "../../../ui/colors-slider/ColorsSlider";
import SelectSize from "../../../ui/combo-box/select-size/SelectSize";
import { useContext, useCallback, useState, useRef } from "react";

import classes from "./_details-menu.module.scss";
import { CartContext } from "../../../../store/cart-context";

// side menu of product details page
const DetailsMenu = (props) => {
  const productDetails = props.productDetails;
    const productFabrics = props.productFabrics;
    const productColors = props.productColors;
    const price = productDetails.price;
    const sizes = productDetails.size_stocks
      ? productDetails.size_stocks.split(";")
      : productDetails.width_length_stocks.split(";");
    const description = productDetails.description;
  // size select menu state
  const [openSelect, setOpenSelect] = useState(false);

  const toggleSelectMenu = useCallback(() => {
    setOpenSelect(!openSelect);
  }, [setOpenSelect, openSelect]);

  const closeSelectMenu = useCallback(() => {
    setOpenSelect(false);
  }, []);

  // select size state management
  const [selectedSize, setSelectedSize] = useState("");
  const selectSize = useCallback(
    (size) => {
      setSelectedSize(size);
    },
    [setSelectedSize]
  );

  // adding product to cart
  const dispatch = useContext(CartContext).dispatch;
  const addToCart = useCallback(() => {
    if (selectedSize) {
      dispatch({
        type: "createAddToCartNotification",
        productName: productDetails.product_name,
        productPrice: price,
        imgURL: productDetails.photos_urls.split(",")[0],
        productDiscount: productDetails.discount_amount,
      });
      dispatch({
        type: "addToCart",
        productSlug: productDetails.slug,
        colorId: productDetails.color_id,
        productName: productDetails.product_name,
        productPrice: price,
        productDiscount: productDetails.discount_amount,
        imgURL: productDetails.photos_urls.split(",")[0],
        size: selectedSize,
        linkURL: `/products/${productDetails.slug}/${productDetails.color_id}`,
      });
    } else {
      setOpenSelect(true);
    }
  }, [
    productDetails.slug,
    productDetails.color_id,
    productDetails.photos_urls,
    price,
    productDetails.product_name,
    productDetails.discount_amount,
    selectedSize,
    dispatch,
  ]);

  // referring to add button to add it later to the ignore list of the outsideclick detector, because when add button is clicked the menu is closing this is the opposite of the wanted behavior
  const addButtonRef = useRef(null);

  return (
    <div className={`flex-col gap-32p ${classes.wrapper}`}>
      <div className={`flex-col ${classes["title-wrapper"]}`}>
        <h3>{productDetails.product_name}</h3>
        <p>{toFriendlyName(productDetails.fit) + " Fit"}</p>
      </div>
      {productDetails.discount_amount ? (
        <>
          <p className={`flex-row gap-8p ${classes["price-wrapper"]}`}>
            <s>{price} TL</s>
            <span>
              {" "}
              {price - (price * productDetails.discount_amount) / 100}
              TL
            </span>
          </p>
        </>
      ) : (
        <>
          <p className={`flex-row gap-8p ${classes["price-wrapper"]}`}>
            <span>{price} TL</span>
          </p>
        </>
      )}
      <ColorsSlider
        productColors={productColors}
        currentColorId={productDetails.color_id}
      />
      <SelectSize
        openSelect={openSelect}
        selectedSize={selectedSize}
        toggleSelectMenu={toggleSelectMenu}
        closeSelectMenu={closeSelectMenu}
        selectSize={selectSize}
        sizes={sizes}
        addButtonRef={addButtonRef}
      />
      <Button
        title="Add to cart"
        onClick={addToCart}
        styles={["default", "dark", "full-size", "thin"]}
        ref={addButtonRef}
      />
      <Accordion
        dataArr={[
          { title: "Description", body: description },
          { title: "Fabric", body: productFabrics, array: true },
        ]}
      />
    </div>
  );
};
export default DetailsMenu;
