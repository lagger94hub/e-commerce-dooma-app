import classes from './_button.module.scss'
const Button = (props) => {
  const title = props.title
  const clickHandler = props.onClick
  const className = props.styles && props.styles.map((style) => classes[style]).join(' ')
  return (
    <button 
    className={className}
    onClick={clickHandler}>{title}</button>
  )
}
export default Button