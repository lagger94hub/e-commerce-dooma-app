import { useEffect } from "react"
// this custom hook is used to detect if a click outside a specific ref occurs
// we pass the ref of the targeted element and the function to be called when outside click occurs
// in the UseEffect we create a clickHandler and we attach it to document so when ever the user clicks this handler will be called, and if the ref doesn't contain the clicked element then it is considered an outside click

const useOutsideClickDetector = (ref, handler, ignoreList) => {
  useEffect(() => {
    const clickHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target) && ignoreList && !ignoreList.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [ref, handler, ignoreList])
}
export default useOutsideClickDetector