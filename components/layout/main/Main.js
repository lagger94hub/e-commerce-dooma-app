import classes from './_main.module.scss'
const Main = (props) => {
  const mode = props.mode
  return (
    <main className={classes[`main-${mode}`]}>
    {props.children}
    </main>
  )
}
export default Main