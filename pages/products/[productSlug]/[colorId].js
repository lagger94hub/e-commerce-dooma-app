import { useRouter } from 'next/router'
import { useContext,useEffect } from 'react'

import getProps from '../../../back-end/PropsGetters/SSG/product-details-page'
import { FRIENDLY_ERROR_500 } from '../../../back-end/utils/errorsLib'
import { getCachedProducts } from '../../../back-end/pathsGetters/products-details-page'

import { NavCategoriesContext } from '../../../store/nav-categories-context'
import { SettingsContext } from '../../../store/settings-context'

import RootPath from '../../../components/ui/root-path/RootPath'
import SectionWrapper from '../../../components/layout/element-wrapper/SectionWrapper'
import ProductDetails from '../../../components/products/product-details/ProductDetails'
export default function  ProductDetailsPage(props) {

  // getting the logo and the nav categories
  const siteSettings = props.siteSettings
  const navCategories = props.navCategories

  // needed for paths to root component
  const pathsToRoot = props.pathsToRoot

  // product details
  const productDetails = props.productDetails

  // updating the settings and nav stores
  const putSettings = useContext(SettingsContext).putSettings
  const putNavCategories = useContext(NavCategoriesContext).putNavCategories

  useEffect(() => {
    putSettings(siteSettings)
    putNavCategories(navCategories)
  }, [putNavCategories, putSettings, siteSettings, navCategories])

  const router = useRouter()
  return (
    <>
      <SectionWrapper>
        <RootPath pathsToRoot={pathsToRoot}/>
      </SectionWrapper>
      <SectionWrapper>
        <ProductDetails productDetails={productDetails} />
      </SectionWrapper>
    </>
  )
}
ProductDetailsPage.layout = 'default'
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

  // if no product found return 404 page
  if (!props) {
    return {
      notFound: true
    }
  }
  return {
    props
  }
}