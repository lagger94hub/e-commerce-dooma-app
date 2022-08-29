import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { NavCategoriesContext } from "../../store/nav-categories-context";
import { SettingsContext } from "../../store/settings-context";

import RootPath from "../../components/ui/root-path/RootPath";
import getProps from "../../back-end/PropsGetters/SSR/categories/categories-catch-all";
import { FRIENDLY_ERROR_500, logError } from "../../back-end/utils/errorsLib";

import SectionWrapper from "../../components/layout/element-wrapper/SectionWrapper";
import Filter from "../../components/filtration/Filter";
import ProductsList from "../../components/products/product-list/ProductsList";
import useFilterReducer from "../../reducers/filter-reducer-hook";

const initialState = {
  boxes: [
    {
      name: "Color",
      open: false,
      items: [
        { name: "Blue", quantity: 3, checked: false },
        { name: "Yellow", quantity: 1, checked: false },
        { name: "Brown", quantity: 3, checked: false },
        { name: "Black", quantity: 1, checked: false },
        { name: "White", quantity: 3, checked: false },
        { name: "Purple", quantity: 1, checked: false },
      ],
    },
    {
      name: "Price",
      open: false,
      items: [
        { name: "100TL-200TL", quantity: 2, checked: false },
        { name: "200TL-300TL", quantity: 3, checked: false },
      ],
    },
    {
      name: "Fit",
      open: false,
      items: [
        { name: "Skinny", quantity: 10, checked: false },
        { name: "Regular", quantity: 23, checked: false },
      ],
    },
    {
      name: "Sort By",
      open: false,
      items: [
        { name: "Featured", checked: false },
        { name: "Price(High to Low)", checked: false },
        { name: "Price(Low to High)", checked: false },
        { name: "Discount Rate", checked: false },
      ],
    },
  ],

  appliedFilters: ["Skinny", "100TL-200TL", "Blue"],
};

export default function CategoryPage(props) {
  //   nav and settings data
  const navCategories = props.navCategories;
  const siteSettings = props.siteSettings;
  
  // path to root data
  const pathsToRoot = props.pathsToRoot;

  // list of featured non-filtered products
  const products = props.filteredProducts

  // filterData
  const filterData = props.filterData


  // get the path from the url to create path to the root
  const router = useRouter();

  // update nav and settings store
  const putNavCategories = useContext(NavCategoriesContext).putNavCategories;
  const putSettings = useContext(SettingsContext).putSettings;

  // initialize filtration object
  const [filter, dispatch] = useFilterReducer(initialState)

  useEffect(() => {
    if (navCategories) putNavCategories(navCategories);
    if (siteSettings) putSettings(siteSettings);
    // modify filtration object according to the url query string
    // dispatch({ type: 'calibrate', query: router.query})
  }, [putNavCategories, putSettings, dispatch, router.query, siteSettings, navCategories]);




  
  return (
    <>
      <SectionWrapper>
        <RootPath pathsToRoot={pathsToRoot} />
      </SectionWrapper>
      <SectionWrapper>
        <Filter filter={filter} dispatch={dispatch}/>
      </SectionWrapper>
      <SectionWrapper>
        <ProductsList products={products}/>
      </SectionWrapper>
    </>
  );
}
export async function getServerSideProps(context) {
  try {
    const props = await getProps(context);
    if (!props) {
      return {
        notFound: true,
      };
    }
    return {
      props,
    };
  } catch (e) {
    logError("getServerSideProps", e.message);
    // incase of 500 error redirect to not found
    return {
      notFound: true,
    };
    // throw new Error(FRIENDLY_ERROR_500);
  }
}
