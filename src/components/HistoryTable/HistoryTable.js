import React from "react";
import "./HistoryTable.css";
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

const data11 = [
  {
    id: 1,
    wallet: "1234567890",
    claimAmount: "0.005 ETH",
    date: "2 November 2024",
    time: "11:22:33",
  },
  {
    id: 2,
    wallet: "1234567890",
    claimAmount: "0.005 ETH",
    date: "2 November 2024",
    time: "11:22:33",
  },
  {
    id: 3,
    wallet: "1234567890",
    claimAmount: "0.005 ETH",
    date: "2 November 2024",
    time: "11:22:33",
  },
  {
    id: 4,
    wallet: "1234567890",
    claimAmount: "0.005 ETH",
    date: "2 November 2024",
    time: "11:22:33",
  },
  {
    id: 5,
    wallet: "1234567890",
    claimAmount: "0.005 ETH",
    date: "2 November 2024",
    time: "11:22:33",
  },
];
const url =
  "https://api.studio.thegraph.com/query/98730/evoxproperty/version/latest";
const HistoryTable = ({ propertyid, account }) => {


  const query = gql`
    query GetUserProperties($buyer: String!, $propertyId: String!) {
    claimHistroys(where: { Wallet: $buyer, PropertyID: $propertyId }) {
    ClaimAmount
    ClaimTime
    PropertyID
    Wallet
    blockNumber
    blockTimestamp
    id
    transactionHash
      }
    }
  `;

  const { data } = useQuery({
    queryKey: ["claimHistroys", account, propertyid],
    queryFn: async () => {

      if (!account) return null;
      return await request(url, query, { buyer: account.toLowerCase(), propertyId: propertyid, });
    },
    enabled: !!account && !!propertyid,
  });
  console.log(data, "claimdata");


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
              Wallet
            </TableCell>
            <TableCell className="SubmitPropertytableHeadRowCell">
              Claim Amount
            </TableCell>
            <TableCell className="SubmitPropertytableHeadRowCell">
              Date
            </TableCell>
            <TableCell sx={{
              borderTopRightRadius: "7.66px",
              borderBottomRightRadius: "7.66px",
            }} className="SubmitPropertytableHeadRowCell">
              Time
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
          {data11.map((row, index) => (
            <TableRow key={row.id}
            >
              <TableCell
                sx={{
                  borderTopLeftRadius: index === 0 ? "7.66px" : "",
                  borderBottomLeftRadius: index === data11.length - 1 ? "7.66px" : ""
                }}
                className="SubmitPropertytableBodyRowCell">
                {row.id}
              </TableCell>
              <TableCell className="SubmitPropertytableBodyRowCell1">
                {row.wallet}
              </TableCell>
              <TableCell className="SubmitPropertytableBodyRowCell2">
                {row.claimAmount}
              </TableCell>
              <TableCell className="SubmitPropertytableBodyRowCell2">
                {row.date}
              </TableCell>
              <TableCell
                sx={{
                  borderTopRightRadius: index === 0 ? "7.66px" : "",
                  borderBottomRightRadius: index === data11.length - 1 ? "7.66px" : ""
                }}
                className="SubmitPropertytableBodyRowCell2">
                {row.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
