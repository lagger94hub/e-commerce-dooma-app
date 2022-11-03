import { useEffect, useContext } from "react"
import getProps from "../back-end/PropsGetters/SSG/cart-page"
import Cart from "../components/cart/Cart"
import SectionWrapper from "../components/layout/element-wrapper/SectionWrapper"
import { NavCategoriesContext } from "../store/nav-categories-context"
import { SettingsContext } from "../store/settings-context"

const CartPage = (props) => {
  const navCategories = props.navCategories
  const siteSettings = props.siteSettings

  const putSettings = useContext(SettingsContext).putSettings
  const putNavCategories = useContext(NavCategoriesContext).putNavCategories
  useEffect(() => {
    if (navCategories) putNavCategories(navCategories)
    if (siteSettings) putSettings(siteSettings)
  }, [siteSettings, navCategories, putNavCategories, putSettings])
  return(
    <SectionWrapper>
      <Cart />
    </SectionWrapper>
  )
}
CartPage.layout = 'default'
export async function getStaticProps() {
  const props = await getProps()
  return {
    props,
  }
}
export default CartPage