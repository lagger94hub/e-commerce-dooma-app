import MyPool from "../db/db";
import { logError } from "./errorsLib";
const getSiteSettings = async () => {
  try {
    const [siteSettings] = await MyPool.execute(
      `SELECT component_id, setting_key, setting_value from settings`,);
    return siteSettings
  } catch (e) {
    logError('getSiteSettings', e.message, { isSource: true })
    throw e;
  }
}
export {
  getSiteSettings
}