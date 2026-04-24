require("dotenv").config({ path: ".env.deploy" });
require("dotenv").config({ path: ".env" });

const hre = require("hardhat");

async function main() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY (set it in .env.deploy)");
  }

  const name = process.env.TOKEN_NAME || "Desert Barrel";
  const symbol = process.env.TOKEN_SYMBOL || "DBRL";
  const supplyHuman = process.env.TOKEN_SUPPLY_HUMAN || "1000000000";

  const { ethers, network } = hre;

  const rpc =
    network.name === "base"
      ? process.env.BASE_RPC_URL
      : network.name === "baseSepolia"
        ? process.env.BASE_SEPOLIA_RPC_URL
        : "";

  if (!rpc) {
    throw new Error(`Missing RPC URL env var for network "${network.name}"`);
  }

  const totalSupply = ethers.parseUnits(String(supplyHuman), 18);

  const Token = await ethers.getContractFactory("DesertBarrelToken");
  const token = await Token.deploy(name, symbol, totalSupply);
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log(`Deployed DesertBarrelToken to ${address} on ${network.name}`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total supply (wei): ${totalSupply.toString()}`);

  if (process.env.BASESCAN_API_KEY) {
    console.log("Waiting for a couple confirmations before verify...");
    const deployTx = token.deploymentTransaction();
    if (deployTx) {
      const receipt = await deployTx.wait(2);
      console.log(`Confirmed in block: ${receipt?.blockNumber}`);
    }

    await hre.run("verify:verify", {
      address,
      constructorArguments: [name, symbol, totalSupply]
    });
    console.log("Verified on BaseScan (if args/network match).");
  } else {
    console.log("Skipping verify: set BASESCAN_API_KEY in .env.deploy to auto-verify.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
