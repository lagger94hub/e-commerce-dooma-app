import classes from './_button.module.scss'
const Button = (props) => {
  const title = props.title
  const clickHandler = props.onClick
  const className = props.className
  return (
    <button 
    className={classes[className]}
    onClick={clickHandler}>{title}</button>
  )
}
export default Button