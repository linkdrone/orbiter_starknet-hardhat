import {
  Account,
  Contract,
  ec,
  Provider, uint256
} from "starknet";
import { getSelectorFromName } from "starknet/dist/utils/hash";
import { BigNumberish } from "starknet/utils/number";
import ob_source_abi from "../starknet-artifacts/contracts/ob_source.cairo/ob_source_abi.json";
import { TIMEOUT } from "./constants";
import l2_abi_erc20 from "./l2_abi_erc20.json";

const OK_TX_STATUSES = ["PENDING", "ACCEPTED_ON_L2", "ACCEPTED_ON_L1"];
const ETH_ADDRESSES = {
  mainnet: "",
  goerli: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
};
const OB_SOURCE_ADDRESSES = {
  mainnet: "",
  goerli: "0x0457bf9a97e854007039c43a6cc1a81464bd2a4b907594dabc9132c162563eb3",
};

function getUint256CalldataFromBN(bn: BigNumberish) {
  return { type: "struct", ...uint256.bnToUint256(String(bn)) };
}

describe("Starknet", function () {
  this.timeout(TIMEOUT);
  it("Test ob_source", async function () {
    const userSender = new Account(
      new Provider({ network: "goerli-alpha" }),
      "0x5752bd526744a191056b5dc5a04f5d726b223097f5d5364adca48f0c557e18c",
      ec.getKeyPair(
        "0x5fff72ce2c8657594746d0ab88c534521e0b27ddb2da34a417c3dc18fcac732"
      )
    );
    const userRecipientAddress =
      "0x04a6a84c3235fedbb0c782de55a5146e04cceeb6261b19791e325767fdf8ddbd";
    const ethContract = new Contract(
      <any>l2_abi_erc20,
      ETH_ADDRESSES.goerli,
      userSender
    );
    const obSourceContract = new Contract(
      <any>ob_source_abi,
      ETH_ADDRESSES.goerli,
      userSender
    );

    const balanceSender = await ethContract.balanceOf(userSender.address);
    console.warn("balanceSender.balance: ", balanceSender.balance.low + "");

    const balanceRecipient = await ethContract.balanceOf(userRecipientAddress);
    console.warn(
      "balanceRecipient.balance: ",
      balanceRecipient.balance.low + ""
    );

    // Approve
    // const approveResp = await ethContract.call("approve", [
    //   OB_SOURCE_ADDRESSES.goerli,
    //   getUint256CalldataFromBN(10 ** 20),
    // ]);
    // console.warn("approveResp: ", approveResp);

    console.warn(getSelectorFromName('approve'));
    
    const approveResp = await ethContract.approve(
      OB_SOURCE_ADDRESSES.goerli,
      getUint256CalldataFromBN(10 ** 20)
    );

    console.warn("approveResp: ", approveResp);

    // const amount = 10 ** 14;
    // const ext = "0x1234567890000000";
    // getUint256CalldataFromBN;
    // const resp = await obSourceContract.transferERC20(
    //   ETH_ADDRESSES.goerli,
    //   userRecipientAddress,
    //   getUint256CalldataFromBN(amount),
    //   ext
    // );
    // console.warn("resp: ", resp);

    // const signer =
    // console.warn('signer: ', await signer.getPubKey());

    // const contractFactory: StarknetContractFactory =
    //   await starknet.getContractFactory("ob_source");
    // const contract: StarknetContract = contractFactory.getContractAt(
    //   OB_SOURCE_ADDRESSES.goerli
    // );
    // console.log(
    //   "Deployed at",
    //   await contract.call("balanceOf", {
    //     account:
    //       "0x066ad0b56a9e2b29513b88849bfd942f085d242aeb9faad3a5f2a05d9228aabc",
    //   })
    // );

    // const { res: balanceBefore } = await contract.call("get_balance");
    // expect(balanceBefore).to.deep.equal(0n);

    // await contract.invoke("increase_balance", { amount1: 10, amount2: 20 });
    // console.log("Increased by 10 + 20");

    // const { res: balanceAfter } = await contract.call("get_balance");
    // expect(balanceAfter).to.deep.equal(30n);
  });
});
