import Link from 'next/link'
import { useState, useMemo, useContext, useCallback } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons'
import classes from './_side-nav.module.scss'
import Logo from '../../../../layout/logo/Logo'
import { SettingsContext } from '../../../../../store/settings-context'

const sideNavLinks = [
  { id: '0', title: 'Products', links: [
    { name: 'All Products', href: `/admin/products`},
    { name: 'Add Prodcut', href: `/admin/add-product`},
  ]},
  { id: '1', title: 'Categories', links: [
    { name: 'Categories', href: `/admin/Categories`},
    { name: 'Add Category', href: `/admin/add-category`},
  ]},
  { id: '2', title: 'Other', links: [
    { name: 'All Other', href: `/admin/other`},
    { name: 'Add Other', href: `/admin/add-other`},
  ]},
]
const SideNav = (props) => {
  const [sideNavData, setSideNavData] = useState(sideNavLinks)
  const [openMenu, setOpenMenu] = useState(null)
  const siteSettings = useContext(SettingsContext).siteSettings

  // filtering header settings of all settings
  const headerSettings = useMemo(() => {
    if (!siteSettings) return
    return siteSettings.filter((setting) => {
      return setting.component_id === 3;
    })
  }, [siteSettings])
    

  // bring the setting of the logo from the header settings
  const logoSetting = useMemo(() => {
    if (!headerSettings) return
    return headerSettings.find((headerSetting) => {
      return headerSetting.setting_key === "logoPath";
    });
  }, [headerSettings])

  const openMenuHandler = useCallback((menuId) => {
    if (menuId === openMenu) return setOpenMenu(null)
    setOpenMenu(menuId)
  }, [openMenu])

  return (
    <div className={`${classes['side-nav-wrapper']} flex-col`}>
      <Link href="/admin" className={classes['logo-link']}>
          <Logo
            src={logoSetting && logoSetting.setting_value}
            alt={"site logo"}
            height={200}
            width={200}
            className={"logo"}
          />
      </Link>
      {sideNavData.length !== 0 && sideNavData.map((navLink) => {
        return (
          
          <div key={navLink.id} className={`flex-col ${classes['link-list-wrapper']}`}>
            <p onClick={() => openMenuHandler(navLink.id)}>
              <FontAwesomeIcon icon={faCircle} className={classes['before-icon']} />
              {navLink.title} 
              <FontAwesomeIcon icon={faChevronRight} className={classes['after-icon']}/>
            </p>
            {openMenu === navLink.id && <ul  className={classes['link-list']}>
            {navLink.links.length !== 0 && navLink.links.map((subLink, index) => {
              return (
                <li key={`${navLink.id}-${index}`}><Link href={subLink.href}>{subLink.name}</Link></li>
              )
            })}
          </ul>}
          </div>
        )
      })}
    </div>
  )
}
export default SideNav