
import Image from 'next/image'

import classes from './_logo.module.scss'


const Logo = (props) => {
    
  const className = props.className
  // in first render the src comming from props can be null
  const src = props.src ? props.src : '/'
  const alt = props.alt
  const width = props.width
  const height = props.height

  return (
    <div className={classes[className]}><Image src={src} alt={alt}  width={width} height={height}/></div>
  )
}
export default Logo

