import getProps from "../back-end/PropsGetters/home-page";
import HomeCarousel from "../components/carousels/home-page-carousel/HomeCarousel";

const productsArray = [
  { id: '1', name: 'shirt', image: '/images/products/1.jpg'},
  { id: '2', name: 'shirt', image: '/images/products/1.jpg'},
  { id: '3', name: 'pants', image: '/images/products/2.jpg'},
  { id: '4', name: 'pants', image: '/images/products/2.jpg'},
  { id: '5', name: 'jacket', image: '/images/products/3.jpg'},
  { id: '6', name: 'shirt', image: '/images/products/1.jpg'},
  { id: '7', name: 'pants', image: '/images/products/2.jpg'},
  { id: '8', name: 'jacket', image: '/images/products/3.jpg'},
  { id: '9', name: 'shirt', image: '/images/products/1.jpg'},
  { id: '10', name: 'pants', image: '/images/products/2.jpg'},
]
export default function Home(props) {
  return (
      <HomeCarousel 
      width={400}
      height={500}
      productsArray={productsArray} />
  )
}

export async function getStaticProps() {
  // get categories from the database
  try {
    const props = await getProps()
    // get products from the database 
    return {
      props,
    }
  } catch (e) {
    console.log(e.message)
    return {
      notFound: true
    }
  }
  
}