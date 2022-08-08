import classes from './_section-wrapper.module.scss'
const SectionWrapper = (props) => {
  return (
    <section className={classes.wrapper}>{props.children}</section>
  )
}
export default SectionWrapper