import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import getPaths from "../../back-end/pathsGetters/categories/categories-catch-all";
import getProps from "../../back-end/PropsGetters/categories/categories-catch-all";
import RootPath from "../../components/ui/root-path/RootPath";
import { NavCategoriesContext } from "../../store/nav-categories-context";
import { SettingsContext } from "../../store/settings-context";

export default function CategoryPage(props) {

  // update store with nav and settings data
  const navCategories = props.navCategories
  const siteSettings = props.siteSettings

  const putNavCategories = useContext(NavCategoriesContext).putNavCategories
  const putSettings = useContext(SettingsContext).putSettings

  // get the path from the url to create path to the root
  const router = useRouter()
  const paramsArr = router.query.categories

  useEffect(() => {
    if (navCategories) putNavCategories(navCategories);
    if (siteSettings) putSettings(siteSettings)
  }, [putNavCategories, putSettings, siteSettings, navCategories]);

  return (
    <>
      <RootPath paramsArr={paramsArr}/>
    </>
  );
}
export async function getStaticPaths() {
  try {
    const paths = await getPaths()
    return {
      paths,
      fallback: 'blocking'
    }
  } catch (e) {
    console.log(e)
  }
}
export async function getStaticProps(context) {
  try {
    const props = await getProps(context);
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
