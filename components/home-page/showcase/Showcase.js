import Image from "next/image";
import classes from "./_showcase.module.scss";
const Showcase = (props) => {
  const imagesUrlArray = props.imagesUrlArray;

  return (
    <section className={classes.grid}>
      <div className={`flex-col gap-8p`}>
        <p>Dooma</p>
        <p>Never run out of style</p>
      </div>
      {imagesUrlArray.length &&
        imagesUrlArray.map((photo) => {
          return (
            <Image
              key={photo.setting_key}
              alt="showcase-photo"
              src={photo.setting_value}
              height={1500}
              width={1500}
              layout="responsive"
            />
          );
        })}
    </section>
  );
};
export default Showcase;
