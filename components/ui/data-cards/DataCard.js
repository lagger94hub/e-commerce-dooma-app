import Image from "next/image";
import classes from "./_data-card.module.scss";
import React from "react";

const DataCard = React.forwardRef((props, ref) => {
  const itemName = props.itemName;
  const itemPhotoURL = props.itemPhotoURL;
  const width = props.width;
  const height = props.height;
  const discountAmount = props.discountAmount
  const discountName = props.discountName
  const bordered = props.bordered
  
  return (
    <a href={props.href} ref={ref}>
      <div className={`${bordered ? classes.bordered : classes.normal} flex-col gap-16p falign-center`}>
      <Image src={itemPhotoURL} alt={itemName} width={width} height={height} />
      {!discountAmount &&
      <p>{itemName}</p>
      }
      {discountAmount &&
      <p>{itemName}{` - ${discountAmount}% ${discountName}`}</p>
      }
    </div>
    </a>
  )
})
DataCard.displayName = "DataCard"
export default DataCard
// export default DataCard;
