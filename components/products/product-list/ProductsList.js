import ProductCard from "../product-card/ProductCard"

const ProductsList = (props) => {
  // const productsArr = props.productsArr
  const productsArr = [{}]

  return (
    <ul>
      {productsArr && productsArr.map((product) => {
        return (
          <ProductCard product={product} key={product.id}/>
        )
      })}
    </ul>
  )
}
export default ProductsList