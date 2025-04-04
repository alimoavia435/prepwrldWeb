import "./Drawer.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { toast, ToastContainer } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import NotificationComponent from "../Notifications/notificationComponent";
import Avatar from "@mui/material/Avatar";
import { getinvesnotification } from "../../services/redux/middleware/getinvesnotification";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { Menu, MenuItem, makeStyles } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { borderBottom, borderRight, display, minHeight } from "@mui/system";
import Header from "../Header/Header";
import { getkyc } from "../../services/redux/middleware/getkyc";
const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "100%",
    overflowX: "hidden",

    padding: "50px 36px 40px 32px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      fontFamily: "Montserrat",
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "white",
  zIndex: "2",
}));

const AvatarTopDiv = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.up("md")]: {
    width: "100%",
    minWidth: 768,
  },
  [theme.breakpoints.down("sm")]: {
    top: theme.spacing(1),
    left: theme.spacing(1),
    right: "auto",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",

    gap: theme.spacing(2),
  },
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  padding: "26px 24px",
  borderBottom: "none",
  zIndex: "2",
}));

const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const themeMui = createTheme({
  typography: {
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
    lineHeight: "22.4px",
    color: "#E2E2E2",
    fontWeightMedium: "400px",
  },
  palette: {
    primary: {
      main: "#E2E2E2",
    },
    text: {
      primary: "#E2E2E2",
    },
  },
});

function getHeaderName(pathname) {
  switch (true) {



    case pathname === "/StudentExams":
      return "Student Exams";
    case pathname === "/Questions":
      return "Custom Exams";
    // case pathname === "/subjects":
    //   return "Class Rooms";
    // case pathname === "/users":
    //   return "Students";
    // case pathname === "/Exams":
    //   return "Exams";

    default:
      return "";
  }
}

export default function SidedrawerInvestor({ children, showSidebar, PageName }) {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [selectedSubItem, setSelectedSubItem] = useState(1);
  const [active, setactive] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);
  const modalRef = React.useRef(null);
  // const { login } = useAuth();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage")
  );

  const [openWalletModal, setOpenWalletModal] = useState(false);
  const handleOpen = () => setOpenWalletModal(true);
  const handleWalletClose = () => setOpenWalletModal(false);
  const currentPath = location.pathname;
  const kycapproval = localStorage.getItem("kycapproval");

  const [status, setStatus] = useState(kycapproval);

  const kycData = useSelector(
    (state) => state?.getkyc?.getkyc?.data?.developer
  );
  console.log("kycData", kycData?.developerKYC);

  useEffect(() => {
    localStorage.setItem("kycapproval", kycData?.developerKYC);
    setStatus(kycData?.developerKYC); // Update state to reflect changes in UI
  }, [kycData]);

  useEffect(() => {
    const checkProfileImageChange = () => {
      const newProfileImage = localStorage.getItem("profileImage");
      if (newProfileImage !== profileImage) {
        setProfileImage(newProfileImage);
      }
    };

    const intervalId = setInterval(checkProfileImageChange, 1000);
    return () => clearInterval(intervalId);
  }, [profileImage]);
  const handle_accordian = (abc) => {
    setactive(active === abc ? "" : abc);
  };
  const [selectedBorder, setSelectedBorder] = useState(false);
  const handleSubItemClick = (index, text) => {
    console.log("checking", index);
    setSelectedSubItem(index);
    setSelectedBorder(true);
  };
  console.log("dfdsjfhkf", selectedBorder);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery({
    query: "(max-width: 1064px)",
  });

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // localStorage.setItem("SelectedOption", null);
  }, []);

  const [selectedotherItem, setSelectedOtherItem] = useState(null);

  const handleListItemClick = (index, text) => {
    console.log("clicked", index);
    setSelectedSubItem(null);
    setSelectedOtherItem(null);
    setSelectedItem(index);

    localStorage.setItem("selectedItemIndex", index);
    localStorage.setItem("selectedItemText", text);

    if (window.innerWidth < 1030) {
      setOpen(false);
      setMobileOpen((prevState) => !prevState);
    }

    if (text === "Skainet Academy") {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    if (window.location.pathname === "/property-developer-profile") {
      const savedIndex = localStorage.getItem("selectedItemIndex");
      const savedText = localStorage.getItem("selectedItemText");

      if (savedIndex === "3" && savedText === "KYC & Profile") {
        setSelectedItem(3);
      }
    }
  }, []);

  const handleOtherListItemClick = (index) => {
    console.log("clicked", index);
    setSelectedItem(null);
    setSelectedOtherItem(index);
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    console.log("Drawer Open,,,!");
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    console.log("Drawer closed,,!");
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    console.log("closing");
  };

  const handleLogout = () => {
    handleClose();
  };
  const handleLogoutMain = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("Id");
    localStorage.clear();

    navigate("/");
    setTimeout(() => {
      toast.success("Logout Successfully!");
    }, 500);
  };


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    // {
    //   text: "KYC",
    //   path: "/kyc-info",
    //   disabled: false,
    // },
    // {
    //   text: "Properties",
    //   path: "ViewAllMyProperties",
    //   disabled: false,
    // },
    {
      text: "StudentExams",
      path: "/StudentExams",
      disabled: false,
    },
    // {
    //   text: "Students",
    //   path: "/users",
    //   disabled: false,
    // },
    // {
    //   text: "Exams",
    //   path: "/Exams",
    //   disabled: false,
    // },
    // {
    //   text: "Support",
    //   path: "/support-requests",
    //   disabled: false,
    // },
  ];

  const dashicons = [
    // "/Images/Dashboard/PropertySubmission.svg",
    // "/Images/Dashboard/ProjectIcon.svg",
    // "Images/Dashboard/profileIcon.svg",
    // "Images/Dashboard/updates.svg",
    // "/Images/Dashboard/support.svg",


    // "/Images/Dashboard/ProjectIcon.svg",
    // "/Images/Dashboard/PropertySubmission.svg",
    // "/Images/Dashboard/profile-2user (1).svg",
    "https://nclextc.com/Images/exam1.png",
    // "Images/Dashboard/updates.svg"

  ];
  const activeDashicons = [
    // "/Images/Dashboard/UserIconBlue.svg",
    // "/Images/Dashboard/ProjectIconBlue.svg",
    // "/Images/Dashboard/blueProfile.svg",

    // "/Images/Dashboard/blue-Support.svg",



    // "/Images/Dashboard/ProjectIconBlue.svg",
    // "/Images/Dashboard/ProjectIconBlue.svg",
    // "/Images/Dashboard/profile-2user.svg",
    "https://nclextc.com/Images/exam1.png",
    // "/Images/Dashboard/blueUpdates.svg",
    // "/Images/Dashboard/UserIconBlue.svg",


  ];
  const OthermenuItems = [{}, {}];
  const otherdashicons = ["", ""];

  let users = JSON.parse(localStorage.getItem("user"));

  let filteredMenuItems = [];
  let filteredOtherMenuItems = [];

  if (users?.role === 1) {
    filteredMenuItems = menuItems.filter((item) =>
      ["Home", "File Manager", "Admin"].includes(item.text)
    );
  } else {
    filteredMenuItems = menuItems.filter((item) => item.text !== "Admin");
    filteredOtherMenuItems = OthermenuItems.filter(
      (item) => item.text !== "Admin"
    );
  }

  // for connect wallet
  const [wallet, SetWallet] = useState(false);
  // const { account, chainId } = useWeb3React();
  // const { logout } = useAuth();
  const connectorId =
    typeof window !== "undefined" ? localStorage.getItem("connectorId") : null;
  async function handleConnect() {
    // if (!account) {
    //   SetWallet(true);
    // } else {
    //   await logout(connectorId);
    //   localStorage.clear();
    // }
  }

  useEffect(() => {
    // Function to check if the screen is mobile-sized
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (open && isMobile) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = "auto"; // Enable body scroll
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // useEffect(() => {

  //     const pathToActive = {
  //         '/Empty': 0,
  //         '/Empty1': 1,
  //         "/contentlibrary": 2,
  //         "/Empty2": 3,
  //         '/instagramcourses': 0,
  //         '/twittercourses': 0,
  //     };

  //     setSelectedItem(pathToActive[location.pathname]);
  //     console.log("selected", selectedItem);

  // }, []);

  useEffect(() => {
    const pathToActive = {
      "/instagramcourses": 1,
      "/twittercourses": 2,
    };

    setSelectedSubItem(pathToActive[location.pathname] || "");
  }, [location.pathname, handleListItemClick]);

  const closeDrawerOnOutsideClick = (event) => {
    // Close the drawer if the click is outside the Drawer area
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setMobileOpen(false);
    }
  };

  async function connect() {

  }

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("mousedown", closeDrawerOnOutsideClick);
    } else {
      document.removeEventListener("mousedown", closeDrawerOnOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", closeDrawerOnOutsideClick);
    };
  }, [mobileOpen]);

  useEffect(() => {
    dispatch(getkyc());
  }, []);

  return (
    <>
      <ThemeProvider theme={themeMui}>
        {showSidebar && (
          <Box
            sx={{
              paddingLeft: open
                ? isMobile
                  ? "0px" // Padding when the drawer is open on mobile
                  : `${drawerWidth}px` // Padding when the drawer is open on larger screens
                : isMobile
                  ? "0px" // Padding when the drawer is closed on mobile
                  : "28px", // Padding when the drawer is closed on larger screens
              transition: "padding-left 0.3s ease", // Smooth transition when opening/closing drawer
            }}
          >
            <CssBaseline />
            <AppBar
              position="fixed"
              open={open}
              style={{
                zIndex: "10",
                padding: "10px 32px",
                boxShadow: "none",
                borderBottom: "1.34px solid #F1F1F1",
                backgroundColor: "#F1F1F1",
              }}
              className="sidebar__top-main"
            >
              <Toolbar
                style={{
                  display: "flex",
                  position: "relative",
                  zIndex: "2",
                  padding: "0px",
                  minHeight: "59px",
                }}
                sx={{
                  borderBottom: "none",
                }}
              >
                <IconButton
                  color="#000000"
                  aria-label="open drawer"
                  onClick={isMobile ? handleDrawerToggle : handleDrawerOpen}
                  edge="start"
                  sx={{
                    mr: 2,
                    ...(open && { display: "none" }),
                    position: "absolute",
                    color: "#000000",
                    zIndex: 999,

                    "&:hover": {
                      backgroundColor: "transparent", // Removes hover background
                    },
                  }}
                  style={{ height: "32px", width: "32px" }}
                >
                  {/* <MenuIcon
                                        style={{
                                            position: "relative",
                                            zIndex: 999,

                                        }}
                                        className="toggle"
                                        color={"black"}
                                    /> */}
                  <img
                    src="https://nclextc.com/Images/Dashboard/sideBarIcon22.svg"
                    style={{
                      position: "relative",
                      zIndex: 999,
                    }}
                    className={opens ? "toggle2" : "toggle"}
                    alt=""
                  />
                </IconButton>

                <div style={{ padding: "0px" }}>
                  <AvatarTopDiv
                    style={{ zIndex: 1, width: "100%", right: "0" }}
                  >
                    <div
                      id="basic-button"
                      className="Avatar-top-div"
                      aria-controls={opens ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={opens ? "true" : undefined}
                    >
                      <div
                        className={open ? "opening" : "closing"}
                        style={{ background: "transparent" }}
                      >
                        <p>
                          <Header
                            headername={getHeaderName(location.pathname)}
                          />
                        </p>
                      </div>
                      <div
                        className={`notify-search ${mobileOpen ? "blurred" : ""
                          }`}
                      >
                        <NotificationComponent />

                        {/* <img src="/Images/Dashboard/line.svg" alt="" /> */}

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        // onClick={() => navigate('/profile')}
                        >
                          <Avatar
                            alt=""
                            src={
                              profileImage
                                ? profileImage
                                : "https://nclextc.com/Images/Dashboard/Profile.svg"
                            }
                            sx={{ width: 48, height: 48 }}
                            className="avatar-img"
                          />
                          {/* <img src={profileImage ? profileImage : '/Images/Dashboard/Profile.svg'} className={profileImage ? 'Navbar-Profile' : ''} alt="" /> */}
                        </div>
                      </div>

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={opens}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      ></Menu>
                    </div>
                  </AvatarTopDiv>
                </div>
              </Toolbar>
            </AppBar>
            {!isMobile && (
              <Drawer
                PaperProps={{
                  sx: {
                    backgroundColor: "#323232",
                    borderRight: "1.33px solid #323232",
                    display: "flex",
                    justifyContent: "space-between",
                  },
                }}
                style={{ zIndex: 1, position: "relative" }}
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,

                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                BackdropProps={{
                  invisible: true,
                }}
              >
                <div className="drawer__main__container1">
                  <div>
                    <DrawerHeader style={{ background: "aliceblue" }}>

                      <img
                        src="https://nclextc.com/Images/auth/preplog.png"
                        className="logo__container1"
                        alt="Logo"
                      />
                      {/* </a> */}
                      <IconButton
                        onClick={handleDrawerClose}
                        style={{
                          visibility: "none",
                          color: "#000000",
                          height: "32px",
                          width: "32px",
                        }}
                      >
                        {theme.direction === "ltr" ? (
                          <img
                            src="https://nclextc.com/Images/Dashboard/sideBarIcon1.svg"
                            className="toggle2"
                            alt=""
                          />
                        ) : (
                          // <ChevronLeftIcon style={{ color: "#000000" }} />
                          // <ChevronRightIcon style={{ color: "#000000" }} />
                          <img
                            src="https://nclextc.com/Images/Dashboard/sideBarIcon22.svg"
                            className="toggle"
                            alt=""
                          />
                        )}
                      </IconButton>
                    </DrawerHeader>

                    <List className="List-div">
                      {filteredMenuItems?.map(
                        ({ text, path, disabled }, index) => (
                          <React.Fragment key={index}>
                            <ListItem
                              selected={index === selectedItem}
                              disabled={disabled}
                              disablePadding
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                lineHeight: "22.4px",
                                backgroundColor:
                                  index === selectedItem
                                    ? "#139ED533"
                                    : "transparent",
                                borderRadius: "8px",
                              }}
                            >
                              <ListItemButton
                                component={Link}
                                to={path}
                                onClick={() => handleListItemClick(index, text)}
                                sx={{
                                  padding: "12px 16px 12px 16px ",
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                  },
                                }}
                              >
                                <ListItemIcon
                                  minWidth={"24px"}
                                  sx={{
                                    "& ..MuiListItemIcon-root": {
                                      minWidth: "24px",
                                    },
                                  }}
                                >
                                  <img
                                    src={
                                      index === selectedItem
                                        ? activeDashicons[index]
                                        : dashicons[index]
                                    }
                                    alt={`Icon ${index + 1}`}
                                    className="icon-size"
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={text}
                                  className="texticon"
                                  sx={{
                                    color:
                                      index === selectedItem
                                        ? "#139ED5"
                                        : "#E2E2E2",
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          </React.Fragment>
                        )
                      )}
                    </List>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLogoutMain()}
                    className="Logout-div"
                  >
                    <img
                      src="https://nclextc.com/Images/Dashboard/LogoutNew.svg"
                      className="icon-size"
                      alt="Logout-icon"
                    />

                    <p className="Logout-txt">Logout</p>
                  </div>
                </div>
              </Drawer>
            )}

            {isMobile && (
              <Drawer
                ref={modalRef}
                PaperProps={{
                  sx: {
                    backgroundColor: "#323232",
                  },
                }}
                sx={{
                  width: 250,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="persistent"
                anchor="left"
                open={mobileOpen}
                onClose={() => handleDrawerToggle}
              >
                <div>
                  <DrawerHeader style={{ background: "aliceblue" }}>
                    <img
                      src="https://nclextc.com/Images/auth/preplog.png"
                      className="logo__container1"
                      alt="Logo"
                    />
                    <IconButton
                      onClick={handleDrawerClose}
                      style={{
                        visibility: "none",
                        color: "#000000",
                        height: "32px",
                        width: "32px",
                      }}
                    >
                      {theme.direction === "ltr" ? (
                        <img
                          src="https://nclextc.com/Images/Dashboard/sideBarIcon1.svg"
                          className="toggle2"
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://nclextc.com/Images/Dashboard/sideBarIcon22.svg"
                          className="toggle"
                          alt=""
                        />
                      )}
                    </IconButton>
                  </DrawerHeader>
                  {/* <Divider /> */}
                  <List className="List-div">
                    {filteredMenuItems?.map(
                      ({ text, path, disabled }, index) => (
                        <React.Fragment key={index}>
                          <ListItem
                            selected={index === selectedItem}
                            disabled={disabled}
                            disablePadding
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              lineHeight: "22.4px",
                              backgroundColor:
                                index === selectedItem
                                  ? "#139ED533"
                                  : "transparent",
                              borderRadius: "8px",
                            }}
                          >
                            <ListItemButton
                              component={Link}
                              to={path}
                              onClick={() => handleListItemClick(index, text)}
                              sx={{
                                "&:hover": {
                                  backgroundColor: "transparent",
                                },
                              }}
                            >
                              <ListItemIcon
                                minWidth={"24px"}
                                sx={{
                                  "& ..MuiListItemIcon-root": {
                                    minWidth: "24px",
                                  },
                                }}
                              >
                                <img
                                  src={
                                    index === selectedItem
                                      ? activeDashicons[index]
                                      : dashicons[index]
                                  }
                                  alt={`Icon ${index + 1}`}
                                  className="icon-size"
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={text}
                                sx={{
                                  color:
                                    index === selectedItem
                                      ? "#139ED5"
                                      : "#E2E2E2",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        </React.Fragment>
                      )
                    )}
                  </List>
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLogoutMain()}
                  className="Logout-div"
                >
                  <img
                    src="https://nclextc.com/Images/Dashboard/LogoutNew.svg"
                    className="icon-size"
                    alt="Logout-icon"
                  />

                  <p className="Logout-txt">Logout</p>
                </div>
              </Drawer>
            )}

            <Main
              className="sssssssssssssss"
              open={open}
              sx={{
                overflowY: "auto",
                overflowX: "hidden",
                height: "100vh",
                fontFamily: "Urbanist",
                scrollbarWidth: "none", // For Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // For Chrome, Safari, and Edge
                },
                "@media (max-width: 768px)": {
                  padding: "50px 20px 40px 20px",
                },
                "@media (max-width: 500px)": {
                  filter: mobileOpen ? "blur(5px)" : "none",
                },
              }}
              style={{
                msOverflowStyle: "none", // For Internet Explorer and Edge
              }}
            >
              <DrawerHeader />


              {children}

            </Main>
          </Box>
        )}
      </ThemeProvider>

    </>
  );
}
