import ProductCard from "../product-card/ProductCard"
import classes from './_products-list.module.scss'

const ProductsList = (props) => {

  const products = props.products

  return (
    <ul className={`${classes.list} flex-row fjust-center`}>
      {products && products.map((product, index) => {
        return (
          <ProductCard product={product} key={index}/>
        )
      })}
    </ul>
  )
}
export default ProductsList