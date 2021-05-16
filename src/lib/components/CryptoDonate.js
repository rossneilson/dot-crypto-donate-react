import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { fetchContractData, donateWithEther } from "../helper/ether";

const Container = styled.section`
  width: 100%;
  margin-top: 50px;
`;

const Title = styled.h1`
  text-align: left;
  font-size: smaller;
  margin: 0px;
  padding: 2%;
  width: 25%;
  background-color: ${(props) => props.colors.secondary};
`;

const Input = styled.section`
  display: flex;
  background-color: ${(props) => props.colors.secondary};
  width: 100%;
`;

const CcySelector = styled.select`
  border: 0px solid #fff;
  background-color: ${(props) => props.colors.primary};
  color: ${(props) => props.colors.text};
  border-radius: 5px 0px 0px 5px;
  margin: auto 0px;
  height: 50px;
`;
const AmountInput = styled.input`
  border: 0px solid #fffbfb;
  background-color: ${(props) => props.colors.primary};
  color: ${(props) => props.colors.text};
  height: 50px;
  width: 70%;
`;

const DonateButton = styled.button`
  transition: 0.2s;
  height: 50px;
  background-color: ${(props) => props.colors.button};
  color: ${(props) => props.colors.text};
  justify-content: space-around;
  font-size: ${(props) => props.theme.fontSizes.r};
  font-weight: 500;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: auto;
  border-radius: 0px 5px 5px 0px;
  width: 30%;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHoverColor};
  }
  &:focus {
    background-color: ${(props) => props.theme.colors.buttonHoverColor};
  }
`;

const Output = styled.section`
  width: 100%;
  margin: auto;
  padding: 2%;
  background-color: ${(props) => (props.error ? "#f7b7ad" : "#cfebdf")};
`;

export default function CryptoDonate({
  cryptoDomain,
  infuraApi,
  colors,
  text,
}) {
  const [addressBook, setAddressBook] = useState({});
  const [selectedCcy, setSelectedCcy] = useState("ETH");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [amount, setAmount] = useState("0.0");

  useEffect(() => {
    async function fetchAddresses() {
      setAddressBook(await fetchContractData(cryptoDomain, infuraApi));
    }
    fetchAddresses();
  }, []);

  const donate = async () => {
    try {
      const donation = await donateWithEther(addressBook["ETH"], amount);
      if (donation) {
        setError(null);
        setSuccess(donation);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container>
      <Title colors={colors}>{text.title}</Title>
      <Input colors={colors} style={{ padding: "6%" }}>
        <CcySelector
          name="crypto"
          id="crypto"
          value={selectedCcy}
          onChange={(event) => setSelectedCcy(event.target.value)}
          colors={colors}
        >
          <option value="ETH">ETH</option>
          <option value="BTC">BTC</option>
        </CcySelector>
        {selectedCcy === "ETH" ? (
          <Input colors={colors}>
            <AmountInput
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              step="0.1"
              min="0"
              colors={colors}
            />
            <DonateButton
              onClick={donate}
              colors={colors}
              aria-label="Send ethereum"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginTop: "4px" }}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 12l6 -9l6 9l-6 9z" />
                <path d="M6 12l6 -3l6 3l-6 2z" />
              </svg>
            </DonateButton>
          </Input>
        ) : (
          <Input colors={colors}>
            <AmountInput
              style={{ width: "75%" }}
              type="text"
              id="address"
              name="address"
              value={addressBook[selectedCcy]}
              colors={colors}
            />
            <DonateButton
              aria-label="Copy address"
              onClick={() => {
                navigator.clipboard.writeText(addressBook[selectedCcy]);
                setError(null);
                setSuccess(text.copied);
              }}
              colors={colors}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginTop: "6px" }}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
              </svg>
            </DonateButton>
          </Input>
        )}
      </Input>
      {error ? (
        <Output error={true}>{error.message}</Output>
      ) : success ? (
        <Output>
          {text.thanks}
          <br />
          {selectedCcy === "ETH" ? (
            <a href={`https://etherscan.io/tx/${success.hash}`} target="_blank">
              {success.hash}
            </a>
          ) : (
            <div>{text.copied}</div>
          )}
        </Output>
      ) : null}
    </Container>
  );
}
