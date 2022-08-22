import { useCallback, useContext } from "react";
import classes from "./_dim-display.module.scss";
import { DimmerContext } from "../../../store/dimmer-context";
// this will wrap a component with dark dim
const DimDisplay = (props) => {

  const dimmerCtx = useContext(DimmerContext)
  const showContent = props.showContent
  
  const clickHandler = useCallback(() => {
    // make dim more flixable
    // close the menu associated with the dim
    showContent(false);

    dimmerCtx.toggleDimmer(false)
  }, [dimmerCtx, showContent])
  return (
    <>
      { dimmerCtx.dimmer && (
        <div className={classes.dim} onClick={clickHandler}>
        </div>
      )}
    </>
  );
};

export default DimDisplay;
