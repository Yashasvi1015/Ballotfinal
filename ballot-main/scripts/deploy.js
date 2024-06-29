async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Ballot = await ethers.getContractFactory("Ballot");
  const proposalNames = [
    ethers.utils.formatBytes32String("Party"),
    ethers.utils.formatBytes32String("Bachelor"),
    ethers.utils.formatBytes32String("Carnival")
  ];
  const ballot = await Ballot.deploy(proposalNames);

  console.log("Ballot deployed to:", ballot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
