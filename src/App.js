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
import Explore from "./pages/auth/Explore/Explore";
import Investorprofile from "./pages/Investor-Profile/profile";
import ExploreDetail from "./pages/ExpoloreDetails/ExploreDetail";
import ResetVerifyAccount from "./pages/auth/resetPassVerification";
import "bootstrap/dist/css/bootstrap.min.css";
import PersistentDrawerLeft from "./components/sidebar/sidebar";
import NewMain from "./pages/HomePage/NewMain";

import Explore_Images from "./components/Explore_Images/Explore_Images";
import SubmitProperty from "./pages/MyProperties/submitProperty";
import InvestorStaking from "./pages/InvestorStaking/InvestorStaking";
import ViewProperty from "./pages/ViewProperty/viewProperty";
import MyProperty from "./pages/MyProperties/MyProperty";
import KycInfo from "./pages/Kyc/kycInfo";
import LiveProjects from "./pages/LiveProjects/LiveProjects";
import SubmitProperty_1 from "./pages/submitProperty/submitProperty";
import MarketReport from "./pages/MarketReports/MarketReports";
import {
  hooks as walletConnectV2Hooks,
  walletConnectV2,
} from "./utils/Web3Connection/connectors/walletConnectV2";
import {
  hooks as metaMaskHooks,
  metaMask,
} from "./utils/Web3Connection/connectors/metaMask";
import { Web3ReactProvider } from "@web3-react/core";
import useEagerConnect from "./hooks/Web3Connection/useEagerConnector";
import DeveloperReset from "./pages/auth/resetPassword/DeveloperReset";
import DevResetVerifyAccount from "./pages/auth/resetPassVerification/DevResetVerifyAccount";
import DevNewPass from "./pages/auth/newPassword/DevNewPass";
import Roi from "./components/ExploreDetail/ROI/Roi";
import VerifyAccountDeveloper from "./pages/auth/VerifyAccountPropertyDeveloper/verifyAccountDeveloper";
import SideDrawer from "./components/Side Drawer/Sidedrawer";
import SidedrawerInvestor from "./components/Investor Side Drawer/SidedrawerInvestor";
import Project from "./pages/Project/Project";
import PortfolioManagement from "./pages/Portfolio/PortfolioManagement";
import ContactttUS from "./pages/ContactttUS/ContactttUS";
import PropertyDevloperprofile from "./pages/PropertyDeveloperProfile/PropertyDeveloperprofile";
import AbboutUs from "./pages/AbboutUs/AbboutUs";
import PropertyUpdates from "./pages/propertyUpdates/propertyUpdates";
import SubmitPropertyUpdates from "./pages/submitPropertyUpdates/submitPropertyUpdates";
import NotificationDetail from "./pages/NotificationDetail/notificationDetail";
import NotificationInvestorDetail from "./pages/NotificationInvestor/notificationInvestor";
import ProtectedRoute from "./utils/ProtectedRoute/ProtectedRoute";
import ProtectedRouteInvestor from "./utils/ProtectedRoute/ProtectedRouteInvestor";
import SocialProfile from "./components/livechat/Livechat";
import Livechat from "./components/livechat/Livechat";
import Chat from "./components/livechat/chat/Chat";
import MarketRepoetDetails from "./pages/MarketReports/Details/MarketRepoetDetails";
import ExploreDetailPortfolio from "./pages/ExploreDetailPortfolio/ExploreDetailPortfolio";

import KycDeveloperStep4 from "./components/KycDeveloperStep4/KycDeveloperStep4";
import KycApprovedDetail from "./components/KycApprovedDetail/KycApprovedDetail";

import SupportRequest from "./pages/Support-Request-Property/Support-PropertyDev";
import Developer_ViewProperty from "./pages/Developer_ViewProperty/Developer_ViewProperty";
import SupportChat from "./pages/Support-Chat/SupportChat.js";
const connectors = [
  [walletConnectV2, walletConnectV2Hooks],
  [metaMask, metaMaskHooks],
];

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
    <Web3ReactProvider connectors={connectors}>
      <Router>
        <Routes>
          {/* {tokenDev ? ( */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/kyc-info"
              element={
                <ProtectedRoute>
                  <KycInfo />
                </ProtectedRoute>
              }
            />

            <Route
              path="/kyc-preview"
              element={
                <ProtectedRoute>
                  <KycApprovedDetail />
                </ProtectedRoute>
              }
            />
           
            <Route
              path="/property-developer-profile"
              element={
                <ProtectedRoute>
                  <PropertyDevloperprofile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/property-updates"
              element={
                <ProtectedRoute>
                  <PropertyUpdates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit-property-updates/:propertyid"
              element={
                <ProtectedRoute>
                  <SubmitPropertyUpdates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/support-requests"
              element={
                <ProtectedRoute>
                  < SupportRequest/>
                </ProtectedRoute>
              }
            />
            <Route path="/submit-property" element={<SubmitProperty_1 />} />
            <Route
              path="/submit-property"
              element={
                <ProtectedRoute>
                  <SubmitProperty_1 />
                </ProtectedRoute>
              }
            />
           {/*   <Route
              path="/ViewAllMyProperties"
              element={
                <ProtectedRoute>
                  <MyProperty />
                </ProtectedRoute>
              }
            />*/}
            <Route path="/LiveProjects" element={<LiveProjects />} />
            <Route
              path="/Project"
              element={
                <ProtectedRoute>
                  <Project />
                </ProtectedRoute>
              }
            />
             <Route path="/Support-Chat" element={<ProtectedRoute>
              <SupportChat/>
              </ProtectedRoute>}/>
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
            <Route
              path="/view-property/:p_Id"
              element={
                <ProtectedRoute>
                  <ViewProperty />
                </ProtectedRoute>
              }
            />
            <Route path="/devnewPassword/:email" element={<DevNewPass />} />
            <Route path="/ContactttUS" element={<ContactttUS />} />
            <Route path="/AbboutUs" element={<AbboutUs />} />
            <Route path="/" element={<NewMain />} />
            <Route
              path="/explore"
              element={
                // <ProtectedRouteInvestor>
                <Explore />
                // </ProtectedRouteInvestor>
              }
            />
            <Route
              path="/explore-detail/:id"
              element={
                // <ProtectedRouteInvestor>
                <ExploreDetail />
                // </ProtectedRouteInvestor>
              }
            />
            <Route
              path="/Explore-Detail-Portfolio/:id"
              element={
                <ProtectedRouteInvestor>
                  <ExploreDetailPortfolio />
                </ProtectedRouteInvestor>
              }
            />
            <Route element={<DashboardLayoutInvestor />}>
              <Route
                path="/investor-profile"
                element={
                  <ProtectedRouteInvestor>
                    <Investorprofile />
                  </ProtectedRouteInvestor>
                }
              />
              <Route
                path="/Staking"
                element={
                  <ProtectedRouteInvestor>
                    <InvestorStaking />
                  </ProtectedRouteInvestor>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <ProtectedRouteInvestor>
                    <PortfolioManagement />
                  </ProtectedRouteInvestor>
                }
              />

              <Route
                path="/MarketReport"
                element={
                  <ProtectedRouteInvestor>
                    <MarketReport />
                  </ProtectedRouteInvestor>
                }
              />

              <Route
                path="/market-detail/:id"
                element={<MarketRepoetDetails />}
              />
              <Route
                path="/notification-investor"
                element={
                  <ProtectedRouteInvestor>
                    <NotificationInvestorDetail />
                  </ProtectedRouteInvestor>
                }
              />
            </Route>
          </>
          {/* )} */}
          <Route path="/Roi" element={<Roi />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyaccount/:email" element={<VerifyAccount />} />
          <Route path="/resetPasswordVerify" element={<ResetVerifyAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/" element={<NewMain />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/explore-detail" element={<ExploreDetail />} />
          <Route path="/Explore_Images" element={<Explore_Images />} />
          <Route path="/ViewAllProperties" element={<MyProperty />} />
          <Route path="/Staking" element={<InvestorStaking />} />
          <Route path="/view-property" element={<ViewProperty />} />
          {/* <Route path="/kyc-info" element={<KycInfo />} /> */}
          <Route path="/live-chat" element={<Livechat />} />
          <Route path="/LiveProjects" element={<LiveProjects />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/Developer_ViewProperty/:id"
            element={<Developer_ViewProperty />}
          />
        </Routes>
      </Router>
    </Web3ReactProvider>
  );
};

export default App;
