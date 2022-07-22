import Image from "next/image";
import classes from "./_product-card.module.scss";

const ProductCard = (props) => {
  const name = props.productName;
  const url = props.productImage;
  const width = props.width;
  const height = props.height;
  return (
    <div className={`${classes.card} flex-col gap-16p falign-center`}>
      <Image src={url} alt={name} width={width} height={height} />
      <p>{name}</p>
    </div>
  );
};
export default ProductCard;
