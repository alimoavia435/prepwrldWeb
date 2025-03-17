import { configureStore } from "@reduxjs/toolkit";

import getFolder from "./reducer/getFolder";
import getExploreDetail from "./reducer/getExploreInvestor";
import investorProfile from "./reducer/investorProfile";
import getProjectDetailById from "./reducer/getProjectDetailById";
import getkyc from "./reducer/getkyc";
import getDevLiveProjects from "./reducer/devGetLiveProjects";
import developerAllSubmissions from "./reducer/devAllProjects";
import devGetProjectByID from "./reducer/devGetProjectByID";
import getAllSubmissions from "./reducer/viewAllSubmissions";
import featuredProp from "./reducer/featuredProp";
import portfoliomanagement from "./reducer/portfoliomanagement";
import propertyDeveloperProfile from "./reducer/propertyDeveloperProfile";
import getROI from "./reducer/getROI";
// import getinvesnotification from "./reducer/getinvesnotification";
import getdevnotification from "./reducer/getdevnotification";
import getMarketDetailReducer from "./reducer/getmarketdetail";
import getCMS from "./reducer/getCMS";
import getinvesnotification from "./reducer/getinvesnotification"
// import getdevnotification from "./reducer/getdevnotification"
import readallNotification from "./reducer/readallNotification"
// import getCourseWithType from "./reducer/getCourseWithType";
import readallnotifyDev from "./reducer/readallnotifyDev"
import kycDataDev from "./reducer/kycDataDev"
import getDevPropertyDetailById from "./reducer/getDevPropertyDetailById";
import getAllrooms from "./reducer/getAllrooms"
import getroomByid from "./reducer/getroomByid"
import getAlldata from "./reducer/getAlldata"
import getexams from "./reducer/getexams"
import getexamdetail from "./reducer/getexamdetail"
import getStudentExams from "./reducer/getStudentExams"
import getStudentquestions from "./reducer/getStudentquestions"
export const store = configureStore({
  reducer: {
    getFolder: getFolder,
    getExploreDetail: getExploreDetail,
    getMarketDetail: getMarketDetailReducer,
    investorProfile: investorProfile,
    // getProjectDetailById: getProjectDetailById
    getProjectDetailById: getProjectDetailById,
    getkyc: getkyc,
    // getProjectDetailById: getProjectDetailById,
    getDevLiveProjects: getDevLiveProjects,
    developerAllSubmissions: developerAllSubmissions,
    devGetProjectByID: devGetProjectByID,
    getAllSubmissions: getAllSubmissions,
    portfoliomanagement: portfoliomanagement,
    propertyDeveloperProfile: propertyDeveloperProfile,
    featuredProp: featuredProp,
    getROI: getROI,
    getinvesnotification: getinvesnotification,
    getdevnotification: getdevnotification,
    // getROI:getROI,
    getCMS: getCMS,
    // getinvesnotification:getinvesnotification,
    // getdevnotification:getdevnotification,
    readallNotification: readallNotification,
    readallnotifyDev: readallnotifyDev,
    kycDataDev: kycDataDev,
    DevPropertyDetail: getDevPropertyDetailById,
    getAllrooms: getAllrooms,
    getroomByid: getroomByid,
    getAlldata: getAlldata,
    getexams: getexams,
    getexamdetail: getexamdetail,
    getStudentExams: getStudentExams,
    getStudentquestions: getStudentquestions
  },
});
