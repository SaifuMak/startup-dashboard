import { LuLoaderCircle } from "react-icons/lu";


function LoaderIcon({className}) {
  return (
    <LuLoaderCircle className={`${className}  animate-spin`}/>
  )
}

export default LoaderIcon