const saveCartToLocalStorage = (cartData) => {
  localStorage.setItem('cart', JSON.stringify(cartData))
}
const loadCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart'))
}
export {
  saveCartToLocalStorage,
  loadCartFromLocalStorage
}