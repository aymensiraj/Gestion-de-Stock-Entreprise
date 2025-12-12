import { Link } from 'react-router-dom'
import logoImg from '../assets/images/logo.jpeg'

const styles = {
 links : {
    montserrat : "font-['Montserrat'], sans-serif",
    text_size : "text-lg",
    text_gray : "text-[#757575]",
    hover_red : "hover:text-[#c51231]",
    transition_colors : "transition-colors",
 } 
};

function NavBar(){
    const link_style = `${styles.links.montserrat} ${styles.links.text_size} ${styles.links.text_gray} ${styles.links.hover_red} ${styles.links.transition_colors}`;

    return(
    <nav style={{padding: "15px 350px"}} className="fixed top-0 left-0 w-full h-24 flex items-center justify-between bg-white shadow-sm z-50">
        <Link to={"/"}><img src={logoImg} alt="Atlas Manufacturing" className="w-40 py-3 px-3 mx-6" /></Link>
        <ul className="flex gap-10">
            <Link to={"/"} className={link_style} style={{fontVariant: "small-caps"}}>home</Link>
            <Link to={"/dashboard"} className={link_style} style={{fontVariant: "small-caps"}}>dashboard</Link>
            <Link to={"/articles"} className={link_style} style={{fontVariant: "small-caps"}}>article</Link>
            <Link to={"/movements"} className={link_style} style={{fontVariant: "small-caps"}}>mouvements</Link>
        </ul>
      </nav>
    )
}
export default NavBar