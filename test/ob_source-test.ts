import { expect } from "chai";
import { starknet } from "hardhat";
import {
  StarknetContract,
  StarknetContractFactory,
} from "hardhat/types/runtime";
import { Contract, ec, Signer } from "starknet";
import { TIMEOUT } from "./constants";
import l2_abi_erc20 from "./l2_abi_erc20.json";

const OK_TX_STATUSES = ["PENDING", "ACCEPTED_ON_L2", "ACCEPTED_ON_L1"];
const ETH_ADDRESSES = {
  goerli: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
};

describe("Starknet", function () {
  this.timeout(TIMEOUT);
  it("should work for a fresh deployment", async function () {
    console.log("Started deployment");

    // const contract = new Contract(<any>l2_abi_erc20, ETH_ADDRESSES.goerli);

    // const balanceOf = await contract.balanceOf(
    //   "0x2915b56d17db6ef371df3acbe645587c543f031104a39f3af8dd515cbcfb45d"
    // );
    // console.warn("contract: ", balanceOf.balance.low + "");

    // const signer = new Signer(ec.getKeyPair('0x5fff72ce2c8657594746d0ab88c534521e0b27ddb2da34a417c3dc18fcac732'))
    // console.warn('signer: ', await signer.getPubKey());
    

    const contractFactory: StarknetContractFactory = await starknet.getContractFactory("ob_source");
    const contract: StarknetContract = await contractFactory.deploy();
    console.log("Deployed at", contract.address);

    // const { res: balanceBefore } = await contract.call("get_balance");
    // expect(balanceBefore).to.deep.equal(0n);

    // await contract.invoke("increase_balance", { amount1: 10, amount2: 20 });
    // console.log("Increased by 10 + 20");

    // const { res: balanceAfter } = await contract.call("get_balance");
    // expect(balanceAfter).to.deep.equal(30n);
  });
});
