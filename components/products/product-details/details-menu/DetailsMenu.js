import { toFriendlyName } from "../../../../utils/user-friendly-content";
import Accordion from "../../../ui/accordion/Accordion";
import Button from "../../../ui/buttons/Button";
import ColorsSlider from "../../../ui/colors-slider/ColorsSlider";
import SelectSize from "../../../ui/combo-box/SelectSize";

import classes from "./_details-menu.module.scss";

// side menu of product details page
const DetailsMenu = (props) => {
  const productDetails = props.productDetails;
  const productFabrics = props.productFabrics;
  const productColors = props.productColors;
  const price = productDetails.price;
  const sizes = productDetails.size
    ? productDetails.size.split(",")
    : productDetails.width_length.split(",");
  const description = productDetails.description;

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
      currentColorId={productDetails.color_id} />
      <Button
        title="Add to cart"
        clickHandler={() => {}}
        styles={["default", "dark", "full-size", "thin"]}
      />
      <SelectSize sizes={sizes} />
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
