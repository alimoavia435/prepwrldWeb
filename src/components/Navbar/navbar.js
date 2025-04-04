import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Flex } from "antd";
import { toast } from "react-toastify";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";

const pages = [
  { name: "Home", route: "/" },
  { name: "About Us", route: "/AbboutUs" },
  { name: "Properties", route: "/explore" },
  { name: "Contact Us", route: "/ContactttUS" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [activePage, setActivePage] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:899px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  // React.useEffect(() => {
  //   const currentPath = location.pathname.substring(1);
  //   const active = pages.find((page) => page.route === currentPath)?.name;
  //   setActivePage(active || "");
  // }, [location.pathname]);

  const iconStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    padding: "11.11px",
    transition: "background-color 0.3s",
    cursor: "pointer",
  };

  const IconsDiv = {
    marginTop: "80%",
    display: "flex",
    gap: "4.44px",
  };

  const iconStyleInner = {
    color: "#fff", // Icon color
    fontSize: "18px", // Icon size
  };

  useEffect(() => {
    // Function to handle clicks outside the drawer
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false); // Close the drawer if clicked outside
      }
    };

    // Adding the event listener for 'mousedown'
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleAuthenticate = () => {
      if (
        localStorage.getItem("token") !== null ||
        localStorage.getItem("tokendev") !== null
      ) {
        setIsAuthenticated(true);
      }
    };

    handleAuthenticate();
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (page) => {
    setActivePage(page.name);
    navigate(`/${page.route}`);
    handleCloseNavMenu();
  };
  const handleLogoutMain = () => {

    const token = localStorage.getItem("tokendev");
    if (!token) {
      setIsAuthenticated(false);
    }
    setIsAuthenticated(false)
    localStorage.clear();
    navigate('/');
    setTimeout(() => {
      toast.success("Logout Successfully!");
    }, 500);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokendev");
    if (!token) {
      setIsAuthenticated(false);
    }
  }, [])


  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Container className="navbar__header___main__div">
        <Toolbar disableGutters>
          {/* big screen logo */}
          <div className="navbar__main__div">
            <Box>
              <img
                className="logo__image__header"
                src="/prepwrld/Images/Explore/navbarlogo.svg"
                alt="igmage"
              />
            </Box>
            <Box
              className="navbar__items__container"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {pages.map((page) => (
                <Button
                  className={
                    location.pathname === page.route ? "activebtn" : ""
                  }
                  key={page.name}
                  onClick={() => navigate(page.route)}
                  sx={{
                    my: 2,
                    fontFamily: "Urbanist",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "21px",
                    textTransform: 'none',
                    display: "block",
                    color:
                      location.pathname === page.route ? "#FFFFFF" : "#C4C4C4",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {!isAuthenticated && !isSmallScreen ? (
              <Box
                className="buttons__navbar_container"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <button
                  className="register__navbar__button"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </button>
                <button
                  className="signin__navbar__button"
                  onClick={() => navigate("/SignIn")}
                >
                  Sign In
                </button>
              </Box>
            ) : (
              !isSmallScreen && (
                <button className="ProfileButton" onClick={handleOpenNavMenu}>
                  <img src="/prepwrld/Images/Evox/UserIcon.svg" alt="Profile" />
                </button>
              )
            )}
          </div>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              zIndex: "100",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setIsDrawerOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {isAuthenticated ? (
              <Box>
                {!isSmallScreen ? (
                  // Profile button with menu for big screens
                  <button className="ProfileButton" onClick={handleOpenNavMenu}>
                    <img src="/prepwrld/Images/Evox/UserIcon.svg" alt="Profile" />
                  </button>
                ) : (
                  // Profile button with menu for small screens (already implemented)
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: "block", md: "none" } }}
                  >
                    <MenuItem onClick={() => navigate("/investor-profile")}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontFamily: "urbanist-medium",
                          fontSize: "12px",
                          lineHeight: "19.2px",
                          color: "#000000"
                        }}
                      >
                        <img src="/prepwrld/Images/Evox/Enter.svg" alt="enter arrow" />
                        Dashboard
                      </Typography>
                    </MenuItem>

                    <MenuItem >
                      <Typography
                        onClick={() => handleLogoutMain()}
                        sx={{
                          textAlign: "center",
                          fontFamily: "urbanist-medium",
                          fontSize: "12px",
                          lineHeight: "19.2px",
                          color: "#FF3F3F",
                        }}
                      >
                        <img
                          src="/prepwrld/Images/Evox/Exit.svg"
                          alt="exit arrow"
                          width={20}
                          height={20}
                        />{" "}
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                )}

                {/* Menu logic for big screens */}
                <Menu
                   className="dropdown__nav__main__div"
                  id="menu-appbar-big"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={!isSmallScreen && Boolean(anchorElNav)} // Open menu only for big screens
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <MenuItem onClick={() => navigate("/portfolio")}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontFamily: "urbanist-medium",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        color: "#000000"
                      }}>
                      <img src="/prepwrld/Images/Evox/Enter.svg" alt="enter arrow" />{" "}
                      Dashboard
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      onClick={() => handleLogoutMain()}
                      sx={{
                        textAlign: "center",
                        fontFamily: "urbanist-medium",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        color: "#FF3F3F"
                      }}
                    >
                      <img
                        src="/prepwrld/Images/Evox/Exit.svg"
                        alt="exit arrow"
                        width={20}
                        height={20}
                      />{" "}
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              !isSmallScreen && (
                <Box
                  className="buttons__navbar_container"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <button
                    className="register__navbar__button"
                    onClick={() => navigate("/signup")}
                  >
                    Register
                  </button>
                  <button
                    className="signin__navbar__button"
                    onClick={() => navigate("/SignIn")}
                  >
                    Sign In
                  </button>
                </Box>
              )
            )}
            {isSmallScreen && (
              <Drawer
                ref={drawerRef}
                onClose={() => setIsDrawerOpen(false)}
                anchor="right"
                open={isDrawerOpen}
                PaperProps={{
                  sx: {
                    width: "80vw",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "space-between",
                    height: "100%"
                  },
                }}
                ModalProps={{
                  sx: {
                    "& .MuiBackdrop-root": {
                      backdropFilter: "blur(8px)", // Apply the blur effect
                      backgroundColor: "rgba(255, 255, 255, 0.4)", // Light semi-transparent overlay
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/prepwrld/Images/Explore/navbarlogoBlue.svg"
                    alt="logo"
                    width="53px"
                    height="57px"
                  />
                  <img
                    src="/prepwrld/Images/Evox/Close.svg"
                    alt="exit"
                    onClick={() => setIsDrawerOpen(false)}
                  />
                </Box>
                <List
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  {pages.map((item, index) => (
                    <ListItem
                      button
                      key={item.name}
                      onClick={() => navigate(item.route)}
                      sx={{ paddingLeft: 0 }}
                      autoFocus={index === 0}
                    >
                      <ListItemText
                        sx={{
                          color: "#000",
                          "& .MuiTypography-root": {
                            fontFamily: "Urbanist !important",
                            fontSize: "15.56px",
                          },
                        }}
                        primary={item.name}
                      />
                    </ListItem>
                  ))}
                </List>
                <hr />
                {!isAuthenticated ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",

                    }}
                  >
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#139ED5",
                        textAlign: "left",
                        fontFamily: "Urbanist",
                        fontSize: "15.56px",
                        paddingTop: "8px",
                        paddingBottom: "8px"
                      }}
                      onClick={() => navigate("/signup")}
                    >
                      Register
                    </button>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#000",
                        textAlign: "left",
                        fontFamily: "Urbanist",
                        fontSize: "15.56px",
                        paddingTop: "8px",
                        paddingBottom: "8px"
                      }}
                      onClick={() => navigate("/SignIn")}
                    >
                      Sign in
                    </button>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",

                    }}
                  >
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#139ED5",
                        textAlign: "left",
                        fontFamily: "Urbanist",
                        fontSize: "15.56px",
                        paddingTop: "8px",
                        paddingBottom: "8px"
                      }}
                      onClick={() => navigate("/investor-profile")}
                    >
                      Dashboard
                    </button>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#FF3F3F",
                        textAlign: "left",
                        fontFamily: "Urbanist",
                        fontSize: "15.56px",
                        paddingTop: "8px",
                        paddingBottom: "8px"
                      }}
                      onClick={() => handleLogoutMain()}
                    >
                      Logout
                    </button>
                  </Box>
                )}
                <div
                  style={IconsDiv}
                  ref={(el) => {
                    if (el)
                      el.style.setProperty("margin-top", "30%", "important");
                  }}
                >
                  <div
                    style={{ ...iconStyle, backgroundColor: "#139ED5" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        "https://www.instagram.com/evox.token/?fbclid=IwZXh0bgNhZW0CMTEAAR2lp9m3bnCTjpf06m6Up8JdAdaPNE25NTkyuJpfO34bVLS0s0TS3hONQT0_aem_Koc2xR2nywzOAMi6L3RFXA",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    <InstagramIcon style={iconStyleInner} />
                  </div>
                  <div
                    style={{ ...iconStyle, backgroundColor: "#323232" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        "https://t.me/evoxtoken",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    <TelegramIcon style={iconStyleInner} />
                  </div>
                  <div
                    style={{ ...iconStyle, backgroundColor: "#323232" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        "https://x.com/EvoxToken",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    <XIcon style={iconStyleInner} />{" "}
                    {/* X is represented by TwitterIcon */}
                  </div>
                </div>
              </Drawer>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
