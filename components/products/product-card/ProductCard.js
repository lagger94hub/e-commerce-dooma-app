import Link from "next/link";
import { useCallback, useState } from "react";

import ProductCardSlider from "../../sliders/product-card-slider/ProductCardSlider";
import classes from "./_product-card.module.scss";

import Button from "../../ui/buttons/Button";

const ProductCard = (props) => {
  const productSlug = props.product.product_slug;
  const productName = props.product.product_name;
  const productColor = props.product.product_color;
  const colorId = props.product.color_id;
  const productFit = props.product.product_fit;
  const productPrice = props.product.product_price.split(",");
  const productDiscount = props.product.discount_amount;
  const imagesURLs = props.product.images_urls;

  // presentable fit-name creation
  const fit = (productFit[0].toUpperCase() + productFit.slice(1)).replace(
    "-",
    " "
  );
  // add to cart state
  const [button, setButton] = useState(false);
  const showButton = useCallback(() => {
    setButton(true);
  }, []);
  const hideButton = useCallback(() => {
    setButton(false);
  }, []);

  return (
    <li
      onMouseEnter={showButton}
      onMouseLeave={hideButton}
      className={classes.wrapper}
    >
      {button && (
        <Button title={"Add to cart"} styles={["absolute", "light", "wide"]} />
      )}

      <Link href={`/products/${productSlug}/${colorId}`}>
        <a className={`flex-col gap-16p fjust-center  ${classes.card}`}>
          <ProductCardSlider
            alt={productName}
            // width={318}
            // height={420}
            width={1000}
            height={1300}
            imagesURLs={imagesURLs}
          />
          <div
            className={`flex-col gap-8p fjust-center falign-start ${classes.details}`}
          >
            <p className={classes.name}>{productName}</p>
            <p className={classes.color}>{productColor}</p>
            <p className={classes.fit}>{fit} fit</p>
            <p className={`flex-row gap-8p`}>
              {productDiscount ? (
                <>
                  <span className={classes.price}>
                    {productPrice[0] - productPrice[0] * 0.2} TL
                  </span>
                  <span>
                    <s className={classes.old}>{productPrice[0]} TL</s>
                  </span>
                  <span className={classes.discount}>{productDiscount}%</span>
                </>
              ) : (
                <span className={classes.price}>{productPrice[0]} TL</span>
              )}
            </p>
          </div>
        </a>
      </Link>
    </li>
  );
};
export default ProductCard;
