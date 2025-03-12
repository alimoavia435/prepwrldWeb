import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import SignIn from "./pages/auth/SignIn/signIn";
import SignUp from "./pages/auth/SignUp/signUp";
import VerifyAccount from "./pages/auth/VerifyAccount/verifyAccount";
import ResetPassword from "./pages/auth/resetPassword/resetPassword";
import NewPassword from "./pages/auth/newPassword/newPassword";
import ResetVerifyAccount from "./pages/auth/resetPassVerification";
import "bootstrap/dist/css/bootstrap.min.css";
import DevNewPass from "./pages/auth/newPassword/DevNewPass";
import { Web3ReactProvider } from "@web3-react/core";
import DeveloperReset from "./pages/auth/resetPassword/DeveloperReset";
import DevResetVerifyAccount from "./pages/auth/resetPassVerification/DevResetVerifyAccount";
import VerifyAccountDeveloper from "./pages/auth/VerifyAccountPropertyDeveloper/verifyAccountDeveloper";
import SideDrawer from "./components/Side Drawer/Sidedrawer";
import SidedrawerInvestor from "./components/Investor Side Drawer/SidedrawerInvestor";
import NotificationDetail from "./pages/NotificationDetail/notificationDetail";
import NotificationInvestorDetail from "./pages/NotificationInvestor/notificationInvestor";
import RoomPage from "./pages/Subjects/Subjects";






const App = () => {
  const DashboardLayout = () => (
    <>
      <SideDrawer showSidebar={true} style={{ overflowX: "hidden" }}>
        <Outlet />
      </SideDrawer>
    </>
  );

  const DashboardLayoutInvestor = () => (
    <>
      <SidedrawerInvestor showSidebar={true} style={{ overflowX: "hidden" }}>
        <Outlet />
      </SidedrawerInvestor>
    </>
  );

  return (

    <Router>
      <Routes>
        {/* {tokenDev ? ( */}
        <Route
          element={

            <DashboardLayout />

          }
        >




          <Route
            path="/notifications"
            element={

              <NotificationDetail />

            }
          />
          <Route
            path="/subjects"
            element={

              <RoomPage />

            }
          />




        </Route>
        {/* ) : ( */}
        <>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyaccount/:email" element={<VerifyAccount />} />
          <Route
            path="/resetPasswordVerify/:email/:userType"
            element={<ResetVerifyAccount />}
          />
          <Route
            path="/DevresetPasswordVerify/:email"
            element={<DevResetVerifyAccount />}
          />
          <Route
            path="/verifyaccountdeveloper/:email"
            element={<VerifyAccountDeveloper />}
          />
          <Route
            path="/reset-password/:userType"
            element={<ResetPassword />}
          />
          <Route
            path="/developer-reset-password"
            element={<DeveloperReset />}
          />
          <Route
            path="/newPassword/:email/:userType"
            element={<NewPassword />}
          />
          <Route path="/devnewPassword/:email" element={<DevNewPass />} />
          <Route element={<DashboardLayoutInvestor />}>
          </Route>
        </>

        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyaccount/:email" element={<VerifyAccount />} />
        <Route path="/resetPasswordVerify" element={<ResetVerifyAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />

      </Routes>
    </Router>

  );
};

export default App;
