import { useEffect, useContext } from "react"
import getProps from "../../back-end/PropsGetters/SSG/admin/dashboard-page"
import { SettingsContext } from "../../store/settings-context"
export default function DashboardPage(props) {
  const siteSettings = props.siteSettings
  const putSettings = useContext(SettingsContext).putSettings
  useEffect(() => {
    if (siteSettings) {
      putSettings(siteSettings)
    }
  }, [siteSettings, putSettings])
 return (
  <h1>AdminPage</h1>
 )
}
export async function getStaticProps() {
  const props = await getProps()
  return {
    props
  }
}
DashboardPage.layout = 'admin'