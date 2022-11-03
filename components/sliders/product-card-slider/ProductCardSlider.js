import Image from "next/legacy/image"
import classes from './_product-card-slider.module.scss'
const ProductCardSlider = (props) => {
  const imagesURLs = props.imagesURLs.split(',')
  const width = props.width
  const height = props.height
  const alt = props.productName
  return (
    <div className={classes.wrapper}>
      <Image width={width} height={height} src={imagesURLs[0]} alt={alt}/>
    </div>
  )
}
export default ProductCardSlider