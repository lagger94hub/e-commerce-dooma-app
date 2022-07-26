import { useContext, useEffect } from "react";
import getProps from "../back-end/PropsGetters/home-page";
import HomeCarousel from "../components/carousels/home-page-carousel/HomeCarousel";
import { CategoriesContext } from "../store/categories-context";

export default function Home(props) {
  const putCategoreis = useContext(CategoriesContext).putCategories;
  // first carousal data
  const dataArray = props.carousal0

  useEffect(() => {
    if (props.categories) putCategoreis(props.categories);
  }, [putCategoreis, props.categories]);
  return (
    // carousal 0
    <HomeCarousel width={400} height={500} dataArray={dataArray} /> 
  );
}

export async function getStaticProps() {
  
  try {
    // get main page props and categories
    const props = await getProps();
    return {
      props,
    };
  } catch (e) {
    console.log(e.message);
    return {
      notFound: true,
    };
  }
}
