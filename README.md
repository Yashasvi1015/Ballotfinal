#voting application
##ballot

Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run scripts/deploy.js --network volta
5. Back in the first terminal, type npm start to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 < 0.9.0;

//create a smart contract call Ballot
contract Ballot{
//This struct function is a variable that contains many features
//define a voter in this ballot

struct Voter{
    uint weight;
    bool voted;
    address delegate;
    uint vote;
}
````
Line 16: This specifies the license under which the contract is released.
Line 17: Specifies that the code is written in Solidity version 0.7.0 or higher but lower than 0.9.0.
Line 20: The smart contract named Ballot is declared.
Line 24-29: Start defining the Voter struct, which will represent a voter.
```solidity
struct Proposal{
    bytes32 name; //the name of proposal
    uint voteCount; //how many votes that specific proposal received
}
```
The Proposal struct is defined, representing a proposal.
name is the name of the proposal (stored as a bytes32 type).
voteCount is the number of votes this proposal has received.
```solidity
address public chairperson;
mapping (address => Voter) public voters;

Proposal[] public proposals;
```
chairperson is a public address that represents the chairperson of the ballot.
voters is a public mapping from an address to a Voter struct, keeping track of all voters.
proposals is a public array of Proposal structs.
```solidity
constructor(bytes32[] memory proposalNames){
    chairperson = msg.sender;
    voters[chairperson].weight = 1;

    for (uint i = 0; i<proposalNames.length; i++){
        proposals.push(Proposal({
            name: proposalNames[i],
            voteCount:0
        }));
    }
}
```
The constructor takes an array of proposal names as input.
Sets the chairperson to the address that deployed the contract (msg.sender).
Gives the chairperson a voting weight of 1.
Initializes the proposals array with the given proposal names, each starting with a voteCount of 0.
```solidity
function giveRighttoVote(address voter) external {
    require(
        msg.sender == chairperson,
        "Only Chairperson allowed to assign voting rights."
    );

    require(
        !voters[voter].voted,
        "Voter already voted once."
    );
    require(voters[voter].weight == 0);

    voters[voter].weight = 1;
}
```
 giveRighttoVote is an external function to give voting rights to an address
 ```solidity
function removeVotingRights(address voter) external {
    require(msg.sender == chairperson, "Only Chairperson allowed to remove voting rights.");
    require(!voters[voter].voted, "Voter cannot be removed while vote is active.");
    require(voters[voter].weight == 1);
    voters[voter].weight = 0;
}
```
removeVotingRights is an external function to remove voting rights from an address.
```solidity
function delegate(address to) external {
    Voter storage sender = voters[msg.sender];
    require(!sender.voted, "You already voted once.");
    require(to != msg.sender, "Self-delegation is not allowed.");

    while (voters[to].delegate != address(0)){
        to = voters[to].delegate;
        require(to != msg.sender, "Found loop during Delegation.");
    }

    sender.voted = true;
    sender.delegate = to;
    Voter storage delegate_ = voters[to];
    if (delegate_.voted){
        proposals[delegate_.vote].voteCount += sender.weight;
    } else {
        delegate_.weight += sender.weight;
    }
}
```
delegate is an external function to delegate the caller's vote to another voter.
```solidity
function vote(uint proposal) external {
    Voter storage sender = voters[msg.sender];
    require(sender.weight != 0, "No right to vote");
    require(!sender.voted, "Already voted once.");
    sender.voted = true;
    sender.vote = proposal;

    proposals[proposal].voteCount += sender.weight;
}
```
vote is an external function to cast a vote for a proposal.
```solidity
function winningProposal() public view
    returns (uint winningProposal_)
{
    uint winningVoteCount = 0;
    for (uint p = 0; p < proposals.length; p++){
        if(proposals[p].voteCount > winningVoteCount){
            winningVoteCount = proposals[p].voteCount;
            winningProposal_ = p;
        }
    }
}
```
winningProposal is a public view function that returns the index of the winning proposal.
```solidity
function winnerName() external view
    returns (bytes32 winnerName_)
{
    winnerName_ = proposals[winningProposal()].name;
}
```
winnerName is an external view function that returns the name of the winning proposal.
Calls winningProposal() to get the index of the winning proposal and returns its name.
## Authors

Yashasvi
[yashasvisharma846@gmail.com]
[22BCS11802@cuchd.in]

