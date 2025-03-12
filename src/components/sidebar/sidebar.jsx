import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Vector from "../../assets/Vector.svg";
import Dashboard from "../../assets/Dashboard.svg";
import Owner from "../../assets/Ownership.svg";
import Portfolio from "../../assets/Portfolio.svg";
import Profile from "../../assets/profile.svg";
import MOI from "../../assets/MOI.svg";
import "./sidebar.css";
import NotificationIcon from "../../assets/NotificationIcon.svg";
import Avat from "../../assets/avat.svg";
import { Avatar } from "@mui/material";
import avatarUser from "../../assets/avatarUser.svg";
import { useMediaQuery } from "react-responsive";
import blueDashboard from "../../assets/blueDashboard.svg";
import blueROI from "../../assets/blueROI.svg";
import whiteProfile from "../../assets/whiteProfile.svg";
import blueOwnership from "../../assets/blueOwnership.svg";
import bluePortfolio from "../../assets/bluePortfolio.svg";
import { useNavigate } from "react-router-dom";
// import Investorprofile from "../../pages/Investor-Profile/profile";
import blurProfile from "../../assets/blueProfile.svg"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "100%",
    overflowX: "hidden",
    padding: theme.spacing(3),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      marginLeft: open ? `${drawerWidth}px` : `-${drawerWidth}px`,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      transition: "none", 
    },
    fontFamily: "Montserrat",
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
  backgroundColor: "#323232",
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

export default function PersistentDrawerLeft({ children, showSidebar }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1000px)" });
 
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const sidebarItems = [
    {
      text: "Dashboard",
      icon: Dashboard,
      hoverIcon: blueDashboard,
      route: "/Inbox",
    },
    {
      text: "Ownership & Trading",
      icon: Owner,
      hoverIcon: blueOwnership,
      route: "/Starred",
    },
    {
      text: "Portfolio Management",
      icon: Portfolio,
      hoverIcon: bluePortfolio,
      route: "/send-email",
    },
    {
      text: "Claiming ROIs",
      icon: MOI,
      hoverIcon: blueROI,
      route: "/all-mail",
    },
    {
      text: "Profile",
      icon: whiteProfile,
      hoverIcon: Profile,
      route: "/all-mail",
    },
  ];
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#323232" }} className="body">
      <CssBaseline />
      <AppBar
        position="fixed"
        className="header"
        sx={{
          boxShadow: 0,
          backgroundColor: "#F1F1F1",
          color: "#000000 ",
          height: "80px",
        }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Profile
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div className="RightCornerHeader">
            <IconButton color="inherit">
              <img
                className="Notification"
                src={NotificationIcon}
                alt="Notification"
              />
            </IconButton>
            <IconButton color="inherit">
              <img className="Avatar" src={Avat} alt="Avatar" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: open ? drawerWidth : "0px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : "0px",
            boxSizing: "border-box",
            fontFamily: "Urbanist !important", // Applying font-family to the drawer paper
            backgroundColor: "#323232 !important", // Applying the background color
          },
          "& .MuiModal-root .MuiDrawer-paper": {
            backgroundColor: "#323232 !important", // Ensuring modal drawer has the same background color
          },
        }}
        variant={isSmallScreen ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <div className="PiqsolImage">
          <img className="PiqsolLogo" src={Vector} alt="Evox Logo" />
        </div>
        <div className="SideBarIcon">
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "23px",
              color: "#E2E2E2",
              fontFamily: "Urbanist",
              fontSize: "14px",
              lineHeight: "22.4px",
            }}
            className="ListItems"
            disablePadding
          >
            {sidebarItems.map((item, index) => (
              <ListItem className="ListItemDivs" key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleListItemClick(index)}
                  sx={{
                    ":hover": {  // Removed the "&"
                      backgroundColor: "rgba(19, 158, 213, 0.2)",
                      color: "#139ED5 !important",
                      borderRadius: "8px",
                    },
                    ...(selectedIndex === index && {
                      backgroundColor: "rgba(19, 158, 213, 0.2)",
                      color: selectedIndex === index ? "#139ED5 !important" : "#E2E2E2",
                      borderRadius: "8px",
                    }),
                  }}
                >
                  <ListItemIcon className="ListPicture">
                    <img
                      src={
                        selectedIndex === index || index === selectedIndex
                          ? item.hoverIcon
                          : item.icon
                      }
                      alt={`${item.text} Icon`}
                      className="event-icon"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontFamily: "Urbanist",
                      fontSize: "14px",
                      color: selectedIndex === index ? "#139ED5" : "#E2E2E2",
                      "&:hover": {
                        color: "#139ED5",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <Main open={open}
              sx={{
                paddingLeft: isSmallScreen ? "20px" : "0px",
              }}>
       {/* <div className="after-q-a-investor-margin">
       <Investorprofile/>
       </div> */}
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
