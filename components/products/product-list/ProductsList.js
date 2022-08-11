import ProductCard from "../product-card/ProductCard"

const ProductsList = (props) => {

  const products = props.products

  return (
    <ul className={`flex-row gap-16p fjust-start`}>
      {products && products.map((product, index) => {
        return (
          <ProductCard product={product} key={index}/>
        )
      })}
    </ul>
  )
}
export default ProductsList