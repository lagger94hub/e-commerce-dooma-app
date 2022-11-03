import {  getDisplayCategories } from "../../categories/getCategories";
import { logError } from "../../utils/errorsLib";
import {addPersistentToProps} from "../../utils/persistent-data-builder";


export default async function getProps() {
  try {
    // await updateCategoriesPaths()
    
    //  get display 0 content
    const display0 = await getDisplayCategories(0)

    //  get display 1 content
    const display1 = await getDisplayCategories(1)

    // get display 2 content
    const display2 = await getDisplayCategories(2)

    // get display 3 content
    const display3 = await getDisplayCategories(3)

    const props = {
      display0,
      display1,
      display2,
      display3
    }
    // add persistent components data to props
    await addPersistentToProps(props)

    //  other carousals and data
    return props
  } catch (e) {
    logError('getProps', e.message)
    throw e;
  }
}
