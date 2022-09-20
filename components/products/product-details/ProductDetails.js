import ProductPhotoGrid from './product-photo-grid/ProductPhotoGrid'
import DetailsMenu from './details-menu/DetailsMenu'

import classes from './_product-details.module.scss'
const ProductDetails = (props) => {

  const productDetails = props.productDetails[0]
  return (
    <div className={`flex-row fjust-between falign-center ${classes.wrapper}`}>
      <ProductPhotoGrid photosUrls={productDetails.photos_urls.split(',')}/>
      <DetailsMenu productDetails={productDetails}/>
    </div>
  )
}
export default ProductDetails