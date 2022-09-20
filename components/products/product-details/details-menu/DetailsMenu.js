import Accordion from "../../../ui/accordion/Accordion";
import Button from "../../../ui/buttons/Button";
import ColorsSlider from "../../../ui/colors-slider/ColorsSlider";

import classes from './_details-menu.module.scss'

const DetailsMenu = (props) => {
  const productDetails = props.productDetails;
  const prices = productDetails.price.split(",");
  return (
    <div className={`flex-col falign-center fjust-center gap-32p ${classes.wrapper}`}>
      <div className="flex-col">
        <h3>{productDetails.product_name}</h3>
        <p>{productDetails.fit}</p>
      </div>
      <div className="flex-col">
        {productDetails.discount_amount ? (
          <>
            <p>
              <s>{prices[0]} TL</s>
              <span> {prices[0] - (prices[0] * productDetails.discount_amount) / 100}
              TL</span>
            </p>
          </>
        ) : (
          <>
            <p>{prices[0]} TL</p>
          </>
        )}
      </div>
      <ColorsSlider />
      <Button title='Add to cart'
      clickHandler={() => {}}
      styles={['default', 'dark', 'wide', 'thin']}
      />
      <Accordion />
    </div>
  );
};
export default DetailsMenu;
