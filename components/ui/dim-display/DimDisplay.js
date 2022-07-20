import classes from './_dim-display.module.scss'


// this will wrap a component with dark dim
const DimDisplay = (props) => {
  
  const clickHandler = () => {
    // make dim more flixable

    // close the menu associated with the dim
    props.setShowMenu(false)
  }
  return(
    <div className={classes.dim} onClick={clickHandler}>
      {props.children}
    </div>
  )
}

export default DimDisplay