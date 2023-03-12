import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    rinkeby:{
      url: process.env.ALCHEMY_RINKEBY_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY as string]
    }
  }
};

export default config;
