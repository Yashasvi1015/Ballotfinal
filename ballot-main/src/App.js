import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Ballot from './artifacts/contracts/Ballot.sol/Ballot.json';

const ballotAddress = "0x44863F234b137A395e5c98359d16057A9A1fAc55";

function App() {
  const [address, setAddress] = useState('');
  const [voteAddress, setVoteAddress] = useState('');
  const [proposal, setProposal] = useState('');
  const [delAddress, setDelAddress] = useState('');
  const [removeVoter, setRemoveVoter] = useState('');
  const [selProposal, setSelProposal] = useState('');

  async function requestAccount() {
    console.log("Requesting account...");
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Account requested.");
  }

  async function whoIsChair() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ballotAddress, Ballot.abi, provider);
    try {
      const data = await contract.chairperson();
      console.log('Chairperson: ', data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function checkProposal() {
    if (!proposal) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ballotAddress, Ballot.abi, provider);
    try {
      const data = await contract.proposals(proposal);
      console.log('Proposal Name: ', data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function rightToVote() {
    if (!address) return;
    if (typeof window.ethereum !== 'undefined') {
      try {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider });
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
        const transaction = await contract.giveRighttoVote(address);
        await transaction.wait();
        console.log('Giving Right to Vote: ', transaction);
      } catch (error) {
        console.error('Error during rightToVote:', error);
      }
    }
  }

  async function checkVoter() {
    if (!voteAddress) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ballotAddress, Ballot.abi, provider);
    try {
      const data = await contract.voters(voteAddress);
      console.log('Check Voter: ', data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function delegateAddr() {
    if (!delAddress) return;
    if (typeof window.ethereum !== 'undefined') {
      try {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider });
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
        const transaction = await contract.delegate(delAddress);
        await transaction.wait();
        console.log('Delegating Your Vote: ', transaction);
      } catch (error) {
        console.error('Error during delegateAddr:', error);
      }
    }
  }

  async function removeVotersRights() {
    if (!removeVoter) return;
    if (typeof window.ethereum !== 'undefined') {
      try {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider });
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
        const transaction = await contract.removeVotingRights(removeVoter);
        await transaction.wait();
        console.log('Removing Addresses Rights to Vote ', transaction);
      } catch (error) {
        console.error('Error during removeVotersRights:', error);
      }
    }
  }

  async function voteForProposal() {
    if (!selProposal) return;
    if (typeof window.ethereum !== 'undefined') {
      try {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log({ provider });
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
        const transaction = await contract.vote(selProposal);
        await transaction.wait();
        console.log('You voted for: ', transaction);
      } catch (error) {
        console.error('Error during voteForProposal:', error);
      }
    }
  }

  async function whoIsWinning() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ballotAddress, Ballot.abi, provider);
    try {
      const data = await contract.winningProposal();
      console.log('Who is Winning?: ', data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function whoWon() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ballotAddress, Ballot.abi, provider);
    try {
      const data = await contract.winnerName();
      console.log('Winning Proposal: ', data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Voting Application</h1>
        <h3>Contract Address: {ballotAddress}</h3>
        <button onClick={whoIsChair}>Chairperson?</button>
        <br></br>
        <button onClick={checkProposal}>Proposal Names</button>
        <input onChange={e => setProposal(e.target.value)} placeholder="Proposal Name" />
        <br></br>
        <button onClick={rightToVote}>Give Voting Rights</button>
        <input onChange={e => setAddress(e.target.value)} placeholder="Voter Address" />
        <br></br>
        <button onClick={removeVotersRights}>Remove Voting Rights</button>
        <input onChange={e => setRemoveVoter(e.target.value)} placeholder="Voter Address to Remove" />
        <br></br>
        <button onClick={delegateAddr}>Delegate Your Vote</button>
        <input onChange={e => setDelAddress(e.target.value)} placeholder="Delegate Address" />
        <br></br>
        <button onClick={checkVoter}>Check Voter</button>
        <input onChange={e => setVoteAddress(e.target.value)} placeholder="Check Voter Address" />
        <br></br>
        <button onClick={voteForProposal}>Vote for Proposal</button>
        <input onChange={e => setSelProposal(e.target.value)} placeholder="Proposal Number" />
        <br></br>
        <button onClick={whoIsWinning}>Who is Winning?</button>
        <br></br>
        <button onClick={whoWon}>Who Won?</button>
        <br></br>
      </header>
    </div>
  );
}

export default App;

