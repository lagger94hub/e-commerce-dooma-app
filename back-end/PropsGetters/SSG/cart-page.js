import {addPersistentToProps} from "../../utils/persistent-data-builder"

export default async function getProps() {
  const props = {}
  // prepare persistent data 
  await addPersistentToProps(props)
  return props
}