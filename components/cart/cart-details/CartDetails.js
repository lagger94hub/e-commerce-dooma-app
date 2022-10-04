import DataTable from '../../ui/data-table/DataTable'
import classes from './_cart-details.module.scss'
const cartData = [
  { productName: 'T-shirt-test-1', price: 50, Quantity: 5, url: '/products/test-shirt-1/2', imgURL: '/_next/image?url=%2Fimages%2Fproducts%2F1%2Fcolor-2%2Fp1-c2-1.jpg&w=1080&q=75'},
  { productName: 'T-shirt-test-2', price: 60, Quantity: 3, url: '/products/test-shirt-2/3', imgURL: '/_next/image?url=%2Fimages%2Fproducts%2F2%2Fcolor-3%2Fp2-c3-1.jpg&w=1080&q=75'},
  { productName: 'T-shirt-test-3', price: 100, Quantity: 1, url: '/products/test-shirt-3/2', imgURL: '/_next/image?url=%2Fimages%2Fproducts%2F3%2Fcolor-2%2Fp3-c2-1.jpg&w=1080&q=75'}
]
const row = [' ', ]
const CartDetails = () => {
  return (
    <div className={`flex-col gap-16p ${classes.wrapper}`}>
      <h3>Your Cart</h3>
      <DataTable 
        columnsTitles={[' ', 'Product', 'Price', 'Quantity', 'Total', ' ']}
        rows={cartData}
      />
    </div>
  )
}
export default CartDetails