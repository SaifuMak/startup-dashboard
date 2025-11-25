import { LuLoaderCircle } from "react-icons/lu";


function LoaderIcon({className}) {
  return (
    <LuLoaderCircle className={`${className}  text-admin-violet animate-spin`}/>
  )
}

export default LoaderIcon