
import Image from 'next/image'

import classes from './_logo.module.scss'


const Logo = (props) => {
  return (
    <div className={classes[props.className]}><Image src={props.src} alt={props.alt}  width={props.width} height={props.height}/></div>
  )
}
export default Logo

