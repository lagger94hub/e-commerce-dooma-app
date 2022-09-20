import Image from "next/image";
import classes from './_product-photo-grid.module.scss'
const ProductPhotoGrid = (props) => {
  const photosUrls = props.photosUrls;
  return (
    <div className={`${classes.wrapper}`}>
      {photosUrls &&
        photosUrls.map((url, index) => {
          return (
            <Image
              key={index}
              alt={`product-photo-${index}`}
              src={url}
              width={300}
              height={300}
            />
          );
        })}
    </div>
  );
};
export default ProductPhotoGrid;
