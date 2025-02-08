import logo from '../assets/StreamLine.png'

function Navbar() {
  return (
    <div className="text-2xl font-bold h-10 pl-5 z-10 absolute w-full">
      <img src={logo} className='h-full'></img>
    </div>
  )
}

export default Navbar