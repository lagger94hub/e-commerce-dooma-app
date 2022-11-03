import classes from './_main.module.scss'
const Main = (props) => {
  return (
    <main className={classes.main}>
    {props.children}
    </main>
  )
}
export default Main