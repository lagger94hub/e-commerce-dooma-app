import { useCallback } from "react";
import { useRouter } from "next/router";
const ColorsSlider = (props) => {
  const productColors = props.productColors;
  const currentProductColor = props.currentColorId;

  const router = useRouter()

  
  const changeColor = useCallback((e) => {
    // when the color is changed navigate to the same product but with a different color
    router.push({
      pathname: '/products/[productSlug]/[colorId]',
      query: {
        productSlug: router.query.productSlug,
        colorId: e.currentTarget.value
      }
    })
  }, [router])
  return (
    <select defaultValue={currentProductColor} onChange={(e) => changeColor(e)}>
      {productColors &&
        productColors.map((color) => {
          return (
            <option
              key={color.color_id}
              value={color.color_id}
            >
              {color.color_name}
            </option>
          );
        })}
    </select>
  );
};
export default ColorsSlider;
