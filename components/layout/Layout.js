import Header from "./header/Header"
import classes from './_layout.module.scss'
const Layout = (props) => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        {props.children}
      </main>
    </>
  )
}
export default Layout