import { useRouter } from 'next/router'
import { useContext,useEffect } from 'react'

import { SettingsContext } from '../../../store/settings-context'
import { getCachedProducts } from '../../../back-end/pathsGetters/products-details-page'
import { FRIENDLY_ERROR_500 } from '../../../back-end/utils/errorsLib'
import getProps from '../../../back-end/PropsGetters/SSG/product-details-page'
import { NavCategoriesContext } from '../../../store/nav-categories-context'

export default function  ProductDetails(props) {

  // getting the logo and the nav categories
  const siteSettings = props.siteSettings
  const navCategories = props.navCategories

  const putSettings = useContext(SettingsContext).putSettings
  const putNavCategories = useContext(NavCategoriesContext).putNavCategories

  // updating the settings and nav stores
  useEffect(() => {
    putSettings(siteSettings)
    putNavCategories(navCategories)
  }, [putNavCategories, putSettings, siteSettings, navCategories])

  const router = useRouter()
  console.log(router.query)
  return (
    <h1>Hello from productDetails</h1>
  )
}
export async function getStaticPaths() {
  try {
    const paths = await getCachedProducts()
    return {
      paths,
      fallback: 'blocking'
    }
  } catch (e) {
    throw new Error(FRIENDLY_ERROR_500)
  }
}
export async function getStaticProps(context) {
  // const productDetails = await getProductDetails()
  const { productSlug, colorId } = context.params
  const props = await getProps(productSlug, colorId)
  return {
    props
  }
}