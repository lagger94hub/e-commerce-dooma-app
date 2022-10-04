import Image from "next/image";
import classes from './_product-photo-grid.module.scss'
const ProductPhotoGrid = (props) => {
  const photosUrls = props.photosUrls;
  return (
    <div className={`${classes.wrapper}`}>
      {photosUrls &&
        photosUrls.map((url, index) => {
          return (
            <div className={`${classes[`grid-photo-${index}-wrapper`]}`} key={index}>
              <Image
              alt={`product-photo-${index}`}
              src={url}
              width={1000}
              height={1400}
            />
            </div>
          );
        })}
    </div>
  );
};
export default ProductPhotoGrid;
