
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import "./HistoryTableDev.css"

const data11 = [
  {
    id: 1,
    depImage: "/Images/dev_viewPro/eth logo 3.png",
    DepositAmount: "1200 USDT",
    DateTime: "02/02/2025 - 21:22",
    TransactionID: "Ti2N123........45xiZ",
    status: "⏳ Pending",
  },
  {
    id: 2,
    depImage: "/Images/dev_viewPro/eth logo 3.png",
    DepositAmount: "1200 USDT",
    DateTime: "02/02/2025 - 21:22",
    TransactionID: "Ti2N123........45xiZ",
    status: "✅ Completed",
  }
  ,
  {
    id: 3,
    depImage: "/Images/dev_viewPro/eth logo 3.png",
    DepositAmount: "1200 USDT",
    DateTime: "02/02/2025 - 21:22",
    TransactionID: "Ti2N123........45xiZ",
    status: "✅ Completed",
  }
  ,
  {
    id: 4,
    depImage: "/Images/dev_viewPro/eth logo 3.png",
    DepositAmount: "1200 USDT",
    DateTime: "02/02/2025 - 21:22",
    TransactionID: "Ti2N123........45xiZ",
    status: "❌ Failed",
  }
  ,
  {
    id: 3,
    depImage: "/Images/dev_viewPro/eth logo 3.png",
    DepositAmount: "1200 USDT",
    DateTime: "02/02/2025 - 21:22",
    TransactionID: "Ti2N123........45xiZ",
    status: "✅ Completed",
  }

];
const url =
  "https://api.studio.thegraph.com/query/98730/evoxproperty/version/latest";
const HistoryTableDev = ({ propertyid, account, contractAddress }) => {
  const [DepositData, setDepositData] = useState();

  const query = gql`
    query GetDeployedProperties($propertyAddress: String!) {
    depositHistroys(where: { PropertyAddress: $propertyAddress}) { 
    DepositAmount
    DepositTime
    PropertyAddress
    PropertyID
    TransactionStatus
    blockNumber
    blockTimestamp
    id
    transactionHash
      }
    }
  `;

  const { data } = useQuery({
    queryKey: ["depositHistroys", contractAddress],
    queryFn: async () => {

      return await request(url, query, { propertyAddress: contractAddress, });
    },
  });
  console.log(data?.depositHistroys, "depositData");
  useEffect(() => {
    if (data?.depositHistroys) {
      setDepositData(data?.depositHistroys);
    }
  }, [data])
  const formatDate = (timestamp) => {
    
    const date = new Date(timestamp * 1000);
  
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };


  return (
    <TableContainer
      className="SubmitPropertyTablemaiiiiin"
      sx={{ boxShadow: "none", backgroundColor: "#EBEAEA", }}
      component={Paper}
    >
      <Table
        sx={{ minWidth: 650 }}
      >
        <TableHead
          className="gggggggggg"
        >
          <TableRow
            sx={{
              borderRadius: "20px", // Border-radius applied here
              overflow: "hidden", // Ensures TableBody respects border-radius
            }}
            className="this"

          >
            <TableCell
              sx={{
                borderTopLeftRadius: "7.66px",
                borderBottomLeftRadius: "7.66px",
              }}
              className="SubmitPropertytableHeadRowCell"
            >
              #
            </TableCell>
            <TableCell className="SubmitPropertytableHeadRowCell">
              Deposit Amount
            </TableCell>
            <TableCell className="SubmitPropertytableHeadRowCell">
              Date/Time
            </TableCell>
            <TableCell className="SubmitPropertytableHeadRowCell">
              Transaction ID
            </TableCell>
            <TableCell sx={{
              borderTopRightRadius: "7.66px",
              borderBottomRightRadius: "7.66px",
            }} className="SubmitPropertytableHeadRowCell">
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        <TableRow>
          <TableCell
            colSpan={5}
            className="gggggggggg"
            style={{
              height: "17px",
              backgroundColor: "#EBEAEA",
              borderBottom: "none",
              padding: "0px",
            }}
          ></TableCell>
        </TableRow>





        <TableBody >
          {DepositData?.map((row, index) => (
            <TableRow key={row.id}
            >
              <TableCell
                sx={{
                  borderTopLeftRadius: index === 0 ? "7.66px" : "",
                  borderBottomLeftRadius: index === data11.length - 1 ? "7.66px" : ""
                }}
                className="SubmitPropertytableBodyRowCell">
                {index + 1}
              </TableCell>
              <TableCell className="SubmitPropertytableBodyRowCell1">
                <div className="SubmitPropertytableBodyRowCell1_11">
                  <img className="trajbjaimg" src={data11[0].depImage} alt="" />
                  {row.DepositAmount / 1000000}

                </div>
              </TableCell>
              <TableCell className="SubmitPropertytableBodyRowCell2">
              {formatDate(row.DepositTime)}
              </TableCell>
              <TableCell className="SubmitPropertytableBodyRowCell2" sx={{ textDecoration: "underline !important" }}>
                {row.transactionHash ? `${row.transactionHash.slice(0, 3)}...${row.transactionHash.slice(-3)}` : ''}
              </TableCell>
              <TableCell
                sx={{
                  borderTopRightRadius: index === 0 ? "7.66px" : "",
                  borderBottomRightRadius: index === data11.length - 1 ? "7.66px" : "",
                }}
                className="SubmitPropertytableBodyRowCell2">
                <div className="bdsjbdjs">{row.TransactionStatus === 0 ? "Pending" : row.TransactionStatus === 1 ? "Completed" : "Failed"}</div>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default HistoryTableDev;
