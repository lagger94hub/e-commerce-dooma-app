import classes from './_side-nav.module.scss'
const SideNav = (props) => {
  return (
    <div className={`${classes['side-nav-wrapper']} flex-col`}>
      <li>Item1</li>
      <li>Item1</li>
      <li>Item1</li>
      <li>Item1</li>
    </div>
  )
}
export default SideNav