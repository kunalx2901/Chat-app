import { LoaderIcon } from "react-hot-toast"

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-center ">
            <LoaderIcon className="scale-200"/>
        </div>
    </div>
  )
}

export default Loader