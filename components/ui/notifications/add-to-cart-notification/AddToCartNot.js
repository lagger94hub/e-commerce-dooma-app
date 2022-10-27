import { useMemo, useContext, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classes from "./_add-to-cart-not.module.scss";
import Button from "../../buttons/Button";
import { CartContext } from "../../../../store/cart-context";
import { MediaQueryContext } from "../../../../store/media-query-context";
const AddToCartNot = (props) => {
  const { imgURL, productName, price, discountAmount,notificationIndex } = useMemo(() => {
    const { imgURL, productName, price, discountAmount } = props.cartData;
    const notificationIndex = props.notificationIndex
    return { imgURL, productName, price, discountAmount, notificationIndex};
  }, [props.cartData, props.notificationIndex]);

  // close the notification after a certian amount of time is passed
  const timer = useRef(null);
  const dispatch = useContext(CartContext).dispatch;
  useEffect(() => {
      if (!timer.current) {
        timer.current = setTimeout(() => {
          dispatch({ type: 'removeAddToCartNotification' })
        }, 3000);
      }
  }, [dispatch]);
  const clearTimer = useCallback(() => {
    clearTimeout(timer.current);
  }, [timer]);
  const restartTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      dispatch({ type: 'removeAddToCartNotification' })
    }, 3000);
  }, [dispatch]);

  // get mediaquery to determine size of notification card
  const isDesktop = useContext(MediaQueryContext)

  return (
    <div className={classes.wrapper}>
      <div
      className={`${classes.base} flex-col fjust-center falign-center gap-16p`}
      onMouseEnter={clearTimer}
      onMouseLeave={restartTimer}
      style={{ top: `${notificationIndex * (isDesktop ? 214 : 184 )}px`}}
    >
      <div className={`flex-row gap-16p`}>
        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
        <span>Added to cart</span>
      </div>
      <div
        className={`flex-row gap-16p fjust-between falign-center ${classes["inner-wrapper"]}`}
      >
        <div className={`${classes["img-wrapper"]}`}>
          <Image src={imgURL} width={100} height={150} alt={productName} />
        </div>
        <div className={`${classes.details}`}>
          <span>{productName}</span>
          {discountAmount ? (
            <>
              <span className={classes.price}>
                {price - (price * discountAmount) / 100} TL
              </span>
              <span>
                <s className={classes.old}>{price} TL</s>
              </span>
              <span className={classes.discount}>{discountAmount}%</span>
            </>
          ) : (
            <span className={classes.price}>{price} TL</span>
          )}
        </div>
      </div>
      <Button
        title={`Go to cart`}
        to={"/cart"}
        styles={["dark", "thin", "full-size", "default"]}
      />
    </div>
    </div>
  );
};
export default AddToCartNot;
