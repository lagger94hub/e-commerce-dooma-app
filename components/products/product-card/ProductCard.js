import Link from "next/link";
import ProductCardSlider from "../../sliders/product-card-slider/ProductCardSlider";
import classes from "./_product-card.module.scss";

const ProductCard = (props) => {
  const productSlug = props.product.product_slug;
  const productName = props.product.product_name;
  const productColor = props.product.product_color;
  const colorId = props.product.color_id;
  const productFit = props.product.product_fit;
  const productPrice = props.product.product_price.split(",");
  const productDiscount = props.product.discount_amount;
  const imagesURLs = props.product.images_urls;
  console.log(props.product);

  return (
    <li>
      <Link href={`/products/${productSlug}/${colorId}`}>
        <a
          className={`flex-col gap-16p fjust-center falign-center ${classes.card}`}
        >
          <ProductCardSlider
            alt={productName}
            width={318}
            height={400}
            imagesURLs={imagesURLs}
          />
          <div
            className={`flex-col gap-8p fjust-center falign-start ${classes.details}`}
          >
            <p>{productName}</p>
            <p>{productColor}</p>
            <p>{productFit} fit</p>
            <p className={`flex-row gap-8p`}>
              {productDiscount ? (
                <>
                  <span>{productPrice[0] - productPrice[0] * 0.2}</span>
                  <span>
                    <s>{productPrice[0]}</s>
                  </span>
                  <span>%{productDiscount}</span>
                </>
              ) : (
                <span>{productPrice[0]}</span>
              )}
            </p>
          </div>
        </a>
      </Link>
      <button>Add to cart</button>
    </li>
  );
};
export default ProductCard;
