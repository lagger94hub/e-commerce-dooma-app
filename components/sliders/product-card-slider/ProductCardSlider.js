import Image from "next/image"
const ProductCardSlider = (props) => {
  const imagesURLs = props.imagesURLs.split(',')
  const width = props.width
  const height = props.height
  const alt = props.productName
  return (
    <Image width={width} height={height} src={imagesURLs[0]} alt={alt}/>
  )
}
export default ProductCardSlider