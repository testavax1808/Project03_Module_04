import React, { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import ercABI from "../artifacts/contracts/Assessment.sol/MY_ERC_Token.json";
import "bootstrap/dist/css/bootstrap.min.css";
import NewForm from "./validateForm";
import NewForm2 from "./mintForm";
import NewForm3 from "./balanceForm";
import NewForm4 from "./transferForm";
import NewForm5 from "./burnForm";
import NewForm6 from "./redeemForm";
import { Row , Col } from 'reactstrap';

export default function HomePage() {

  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  const [stuModal, setStuModal] = useState(false);
  const [stuInfo, setStuInfo] = useState({});

  const [stuModal2, setStuModal2] = useState(false);
  const [stuInfo2, setStuInfo2] = useState({});

  const [stuModal3, setStuModal3] = useState(false);
  const [stuInfo3, setStuInfo3] = useState({});
                          
  const [stuModal4, setStuModal4] = useState(false);
  const [stuInfo4, setStuInfo4] = useState({});

  const [stuModal5, setStuModal5] = useState(false);
  const [stuInfo5, setStuInfo5] = useState({});

  const [stuModal6, setStuModal6] = useState(false);
  const [stuInfo6, setStuInfo6] = useState({});

  const [supply, setSupply] = useState();

  const contractAddress = "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65";
  const abi = ercABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  useEffect(()=> {
    setSupply(contract.totalSupply());
  },[contract.totalSupply()]) 

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    getContract();
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);

    setContract(contractInstance);
  };

  const ValidateAccount = async (stuAddress) => {
    if (contract) {
      const tx = await contract.validateAccount(stuAddress);
      await tx.wait();
      alert("Account Validated");
    }
  };

  useMemo(() => {
    console.log(stuInfo.address);
    ValidateAccount(stuInfo.address);
  },[stuInfo])

  const mint = async (mintAddress, mintValue) => {
    if (contract) {
      const tx = await contract.mint(mintAddress, mintValue);
      await tx.wait();
      alert(" Minted ");
    }
  };

  useMemo(() => {
    mint(stuInfo2.address, stuInfo2.value);
  },[stuInfo2])

  const balance = async (studentAddress) => {
    if (contract) {
      const val = await contract.balanceOf(studentAddress);
      alert("Amount : " + val);
    }
  };

  useMemo(() => {
    balance(stuInfo3.address);
  },[stuInfo3])

  const Transfer = async (_to, value) => {
    if (contract) {
      const tx = await contract.transfer(_to, value);
      await tx.wait();
      alert("Tranfered " + value);
    }
  };

  useMemo(() => {
    Transfer(stuInfo4._to,stuInfo4.val);
  },[stuInfo4])

  const Burn = async (_from) => {
    if (contract) {
      const tx = await contract.burn(_from);
      await tx.wait();
      alert("Burned Tokens");
    }
  };

  useMemo(() => {
    Burn(stuInfo5.address);
  },[stuInfo5])

  const Redeem = async (_from,val) => {
    if (contract) {
      const tx = await contract.redeem(_from,val);
      await tx.wait();
      alert("Tokens Redeemed ");
    }
  };

  useMemo(() => {
    Redeem(stuInfo6.address);
  },[stuInfo6])

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this application.</p>
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask Wallet</button>
    }

    return (
      <div style={{padding: "20px", backgroundColor: "grey"}}>
        <p>Your Account: {account}</p>
        <p> TokenName : DEGEN    TokenSymbol : DGN </p>
        <p>Total Supply : {supply}</p>
          <Row style={{margin: "20px"}}>
            <Col md={3}>
              <button style={{width: "60%", backgroundColor: "rgb(218, 215, 215)" ,borderRadius: "5px"}} onClick={() => setStuModal(true)}>Validate Account</button>
            </Col>
            <Col md={3}>
            <button style={{width: "60%",  backgroundColor: "rgb(218, 215, 215)", borderRadius: "5px"}} onClick={() => setStuModal2(true)}>Mint</button>
            </Col>
            <Col md={3}>
            <button style={{width: "60%",  backgroundColor: "rgb(218, 215, 215)", borderRadius: "5px"}} onClick={() => setStuModal3(true)}>Balance</button>
            </Col>
            <Col md={3}>
            <button style={{width: "60%",  backgroundColor: "rgb(218, 215, 215)", borderRadius: "5px"}} onClick={() => setStuModal4(true)}>Transfer</button>
            </Col>
          </Row>

          <Row style={{margin: "20px"}}>
            <Col md={6}>
              <button style={{width: "35%", backgroundColor: "rgb(218, 215, 215)" ,borderRadius: "5px"}} onClick={() => setStuModal5(true)}>Burn</button>
            </Col>
            <Col md={6}>
            <button style={{width: "35%",  backgroundColor: "rgb(218, 215, 215)", borderRadius: "5px"}} onClick={() => setStuModal6(true)}>Redeem</button>
            </Col>
          </Row>
      </div>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container" style={{backgroundColor: "rgb(218, 215, 215)", width: "100vw", padding: "20px"}}>
      <header><h1>DEGEN TOKEN</h1></header>
      {initUser()}
      { stuModal && (
        <NewForm stuModal={stuModal} setStuModal={setStuModal} stuInfo={stuInfo} setStuInfo={setStuInfo} />)
      }
      { stuModal2 && (
        <NewForm2 stuModal2={stuModal2} setStuModal2={setStuModal2} stuInfo2={stuInfo2} setStuInfo2={setStuInfo2}/>)
      }
      { stuModal3 && (
        <NewForm3 stuModal3={stuModal3} setStuModal3={setStuModal3} stuInfo3={stuInfo3} setStuInfo3={setStuInfo3}/>)
      }
      { stuModal4 && (
        <NewForm4 stuModal4={stuModal4} setStuModal4={setStuModal4} stuInfo4={stuInfo4} setStuInfo4={setStuInfo4}/>)
      }
      { stuModal5 && (
        <NewForm5 stuModal5={stuModal5} setStuModal5={setStuModal5} stuInfo5={stuInfo5} setStuInfo5={setStuInfo5}/>)
      }
      { stuModal6 && (
        <NewForm6 stuModal6={stuModal6} setStuModal6={setStuModal6} stuInfo6={stuInfo6} setStuInfo6={setStuInfo6}/>)
      }
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
