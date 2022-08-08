import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { NavCategoriesContext } from "../../store/nav-categories-context";
import { SettingsContext } from "../../store/settings-context";

import RootPath from "../../components/ui/root-path/RootPath";
import getProps from "../../back-end/PropsGetters/SSR/categories/categories-catch-all";
import { FRIENDLY_ERROR_500, logError } from "../../back-end/utils/errorsLib";

import SectionWrapper from "../../components/layout/element-wrapper/SectionWrapper";
import Filter from "../../components/filtration/Filter";

export default function CategoryPage(props) {
  // update store with nav and settings data
  const navCategories = props.navCategories;
  const siteSettings = props.siteSettings;
  const pathsToRoot = props.pathsToRoot;

  const putNavCategories = useContext(NavCategoriesContext).putNavCategories;
  const putSettings = useContext(SettingsContext).putSettings;

  // get the path from the url to create path to the root
  const router = useRouter();

  useEffect(() => {
    if (navCategories) putNavCategories(navCategories);
    if (siteSettings) putSettings(siteSettings);
  }, [putNavCategories, putSettings, siteSettings, navCategories]);

  return (
    <>
      <SectionWrapper>
        <RootPath pathsToRoot={pathsToRoot} />
      </SectionWrapper>
      <SectionWrapper>
        <Filter></Filter>
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
    throw new Error(FRIENDLY_ERROR_500);
  }
}
