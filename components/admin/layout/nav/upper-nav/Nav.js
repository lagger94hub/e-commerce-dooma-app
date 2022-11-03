import classes from './_nav.module.scss'
const Nav = () => {
  return (
    <nav className={`${classes['nav']} flex-row fjust-between falign-center`}>
      <div>Other Tabs</div>
      <ul className={`${classes['icons-list']} flex-row fjust-around falign-center`}>
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
      </ul>
    </nav>
  )
}
export default Nav