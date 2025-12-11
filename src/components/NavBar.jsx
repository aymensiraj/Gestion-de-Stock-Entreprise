import { Link } from 'react-router-dom'
import logoImg from '../assets/images/logo.jpeg'
function NavBar(){
  const link_style = "text-[#757575] font-['Montserrat'] text-sm tracking-wide hover:text-[#c51231] transition-colors"

    return(
    <nav className="flex items-center justify-between w-full px-10 py-4 bg-white shadow-sm">
        <img src={logoImg} alt="Atlas Manufacturing" className="w-40 py-3 px-3 mx-6" />
        <ul className="flex gap-10">
            <Link to={"/"} className={link_style}>home</Link>
            <Link className={link_style}>dashboard</Link>
            <Link className={link_style}>article</Link>
            <Link className={link_style}>mouvements</Link>
        </ul>
      </nav>
    )
}
export default NavBar