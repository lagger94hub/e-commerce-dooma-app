import ProductPhotoGrid from "./product-photo-grid/ProductPhotoGrid";
import DetailsMenu from "./details-menu/DetailsMenu";

import classes from "./_product-details.module.scss";
const ProductDetails = (props) => {
  const productDetails = props.productDetails[0];
  const productFabrics = props.productDetails[1];
  const productColors = props.productDetails[2];
  return (
    <div className={`flex-col fjust-between  ${classes.wrapper}`}>
      <ProductPhotoGrid photosUrls={productDetails.photos_urls.split(",")} />
      <DetailsMenu
        productDetails={productDetails}
        productFabrics={productFabrics}
        productColors={productColors}
      />
    </div>
  );
};
export default ProductDetails;
