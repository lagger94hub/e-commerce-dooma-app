import { addSiteSettings } from "../../../utils/persistent-data-builder"
const getProps = async () => {
  const props = {}
  await addSiteSettings(props)
  return props
}
export default getProps