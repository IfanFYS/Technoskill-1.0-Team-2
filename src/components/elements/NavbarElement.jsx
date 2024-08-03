import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../../assets/logo.svg";
import logout from "../../assets/logout.svg";

const navItems = [
  { id: "home", text: "Home", path: "/home", current: false },
  { id: "my-info", text: "My Info", path: "/my-info", current: false },
  { id: "new", text: "Add New Employee", path: "/new", current: false },
];

export default function NavbarElement({ bgColor, currentId }) {
  const navigate = useNavigate();
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentNavItems, setCurrentNavItems] = useState(navItems);
  const headerRef = useRef(null);
  const navMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !hamburgerRef.current.contains(e.target) &&
        !navMenuRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
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
      } ${bgColor} h-12 absolute flex top-0 left-0 right-0 m-0 p-0 shadow-md sm:h-16 font-exo2 justify-center items-center navbar-border transition-all duration-1000`}
    >
      <div className="h-full w-full flex px-12 justify-between items-center xl:justify-around">
        <div className="w-full flex items-center">
          <div className="w-9 sm:w-12 mr-4 flex items-center transition-all duration-1000">
            <img src={logo} className=" object-cover mx-auto" />
          </div>
          <button
            ref={hamburgerRef}
            id="hamburger"
            name="hamburger"
            type="button"
            className={`${
              isMenuOpen ? "hamburger-active" : ""
            } block absolute right-6 scale-90 group lg:hidden`}
            onClick={toggleMenu}
          >
            <span className="hamburger-line transition duration-500 ease-in-out"></span>
            <span className="hamburger-line transition duration-500 ease-in-out"></span>
            <span className="hamburger-line transition duration-500 ease-in-out"></span>
          </button>
          <nav
            ref={navMenuRef}
            id="nav-menu"
            className={`${
              isMenuOpen ? "" : "scale-y-0"
            } ${bgColor} w-full origin-top transition-all duration-300 absolute py-5 shadow-2xl rounded-b-lg right-0 left-0 top-full z-[9999] sm:nav-menu-blur sm:max-w-[250px] sm:right-4 sm:left-auto sm:rounded-lg lg:block lg:scale-y-100 lg:static lg:transition-none lg:max-w-full lg:h-full lg:p-0 lg:bg-transparent lg:shadow-none lg:rounded-none`}
          >
            <ul className="text-white flex flex-col items-center lg:flex-row lg:text-lg">
              {currentNavItems.map((item) => (
                <li
                  key={item.id}
                  className="group"
                  onClick={() => {
                    handleNavClick();
                    navigate(item.path);
                  }}
                >
                  <div className="py-1 mx-8 flex lg:flex-col justify-center transition-all duration-300 cursor-pointer">
                    {item.text}
                    <span
                      className={`${
                        item.current
                          ? "max-w-full transition-none"
                          : "group-hover:max-w-full transition-all duration-500"
                      } transform-none max-w-0 h-[2px] bg-white hidden lg:block`}
                      tabIndex="0"
                    ></span>
                  </div>
                </li>
              ))}
              <li
                className="mt-3 mx-auto cursor-pointer lg:mr-0 lg:mt-0"
                onClick={() => {
                  handleNavClick();
                  navigate("/login");
                }}
              >
                <div className="sm:w-12 flex items-center transition-all duration-1000">
                  <img src={logout} className="w-8 object-cover mx-auto" />
                </div>
              </li>
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
};
