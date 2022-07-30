import classes from './_element-wrapper.module.scss'
const ElementWrapper = (props) => {
  return (
    <div className={classes.wrapper}>{props.children}</div>
  )
}
export default ElementWrapper