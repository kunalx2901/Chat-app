import logo from '../assets/StreamLine.png'

function Navbar() {
  return (
    <div className="text-2xl font-bold bg w-screen h-10 pl-5">
      <img src={logo} className='h-full'></img>
    </div>
  )
}

export default Navbar