import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import logo from "../../assets/logo.svg";

const navItems = [
  { id: "login", text: "Log In", current: false },
  { id: "register", text: "Register", current: false },
];

export default function NavbarElement({ bgColor, currentId, toggleRegister }) {
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentNavItems, setCurrentNavItems] = useState(navItems);
  const headerRef = useRef(null);
  const navMenuRef = useRef(null);

  useEffect(() => {
    setCurrentNavItems(
      navItems.map((item) => ({
        ...item,
        current: item.id === currentId,
      }))
    );
  }, [currentId]);

  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    const fixedNav = headerRef.current.offsetTop;

    const doSomething = (scrollPos) => {
      if (scrollPos > fixedNav) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          doSomething(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`${
        isFixed ? "navbar-fixed" : ""
      } ${bgColor} h-12 absolute top-0 left-0 right-0 m-0 shadow-md sm:h-16 font-exo2 justify-center items-center navbar-border transition-all duration-1000`}
    >
      <div className="h-full w-full flex pl-12 justify-between items-center xl:justify-around">
        <div className="w-full flex items-center">
          <div className="w-9 sm:w-12 mr-4 flex items-center transition-all duration-1000">
            <img src={logo} className=" object-cover mx-auto" />
          </div>

          <nav
            ref={navMenuRef}
            id="nav-menu"
            className={`${
              isMenuOpen ? "" : "scale-y-0"
            } ${bgColor} w-full origin-top transition-all duration-300 py-5 rounded-b-lg right-0 left-0 top-full z-[9999] block scale-y-100 static transition-none max-w-full h-full p-0 bg-transparent shadow-none rounded-none`}
          >
            <ul className="text-white flex text-sm sm:text-lg">
              {currentNavItems.map((item) => (
                <li
                  key={item.id}
                  id="nav"
                  className="group"
                  onClick={() => {
                    handleNavClick();
                    toggleRegister();
                  }}
                >
                  <div className="py-2 mx-6 flex flex-col justify-center transition-all duration-300 cursor-pointer">
                    {item.text}
                    <span
                      className={`${
                        item.current
                          ? "max-w-full transition-none"
                          : "group-hover:max-w-full transition-all duration-500"
                      } transform-none max-w-0 h-[1px] sm:h-[2px] bg-white block`}
                      tabIndex="0"
                    ></span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

NavbarElement.propTypes = {
  bgColor: PropTypes.string.isRequired,
  currentId: PropTypes.string.isRequired,
  toggleRegister: PropTypes.func.isRequired,
};