import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.jpeg';
import { HiMenu, HiX } from 'react-icons/hi'; // icons for burger

const styles = {
  links: {
    montserrat: "font-['Montserrat'], sans-serif",
    text_size: "text-lg",
    text_gray: "text-[#757575]",
    hover_red: "hover:text-[#c51231]",
    transition_colors: "transition-colors",
  },
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleMenu() {setIsOpen(!isOpen)}

  const link_style = `
    ${styles.links.montserrat}
    ${styles.links.text_size}
    ${styles.links.text_gray}
    ${styles.links.hover_red}
    ${styles.links.transition_colors}
  `;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="flex items-center justify-between h-24 px-4 sm:px-8 md:px-16 lg:px-[350px]">
        <Link to={"/"}>
            <img src={logoImg} alt="Atlas Manufacturing" className="w-32 sm:w-36 md:w-40 py-3"/>
        </Link>

        <ul className="hidden md:flex gap-10">
          <Link to={"/"} className={link_style} style={{ fontVariant: "small-caps" }}>home</Link>
          <Link to={"/dashboard"} className={link_style} style={{ fontVariant: "small-caps" }}>dashboard</Link>
          <Link to={"/articles"} className={link_style} style={{ fontVariant: "small-caps" }}>article</Link>
          <Link to={"/movements"} className={link_style} style={{ fontVariant: "small-caps" }}>mouvements</Link>
        </ul>

        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </div>
      </div>

      {isOpen && (
        <ul className="flex flex-col gap-6 px-6 pb-6 md:hidden bg-white shadow-md">
          <Link to={"/"} className={link_style} style={{ fontVariant: "small-caps" }} onClick={() => setIsOpen(false)}>home</Link>
          <Link to={"/dashboard"} className={link_style} style={{ fontVariant: "small-caps" }} onClick={() => setIsOpen(false)}>dashboard</Link>
          <Link to={"/articles"} className={link_style} style={{ fontVariant: "small-caps" }} onClick={() => setIsOpen(false)}>article</Link>
          <Link to={"/movements"} className={link_style} style={{ fontVariant: "small-caps" }} onClick={() => setIsOpen(false)}>mouvements</Link>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
