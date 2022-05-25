import { Account, Contract, ec, Provider, Signer, uint256 } from "starknet";
import { getSelectorFromName } from "starknet/dist/utils/hash";
import { compileCalldata } from "starknet/dist/utils/stark";
import { BigNumberish, hexToDecimalString } from "starknet/utils/number";
import ob_source_abi from "../starknet-artifacts/contracts/ob_source.cairo/ob_source_abi.json";
import { TIMEOUT } from "./constants";
import l2_abi_erc20 from "./l2_abi_erc20.json";
import argent_accounts from "./argent_accounts.json";
import { starknet } from "hardhat";

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
  return { type: "struct" as const, ...uint256.bnToUint256(String(bn)) };
}

describe("Starknet", function () {
  this.timeout(TIMEOUT);
  it("Test ob_source", async function () {
    const provider = new Provider({ network: "goerli-alpha" });
    const userSender = new Account(
      provider,
      argent_accounts["alpha-goerli"].address,
      ec.getKeyPair(argent_accounts["alpha-goerli"].private_key)
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
      OB_SOURCE_ADDRESSES.goerli,
      userSender
    );

    const balanceSender = await ethContract.balanceOf(userSender.address);
    console.warn("balanceSender.balance: ", balanceSender.balance.low + "");

    // const balanceRecipient = await ethContract.balanceOf(userRecipientAddress);
    // console.warn(
    //   "balanceRecipient.balance: ",
    //   balanceRecipient.balance.low + ""
    // );

    // Approve
    // const approveResp = await ethContract.call("approve", [
    //   OB_SOURCE_ADDRESSES.goerli,
    //   getUint256CalldataFromBN(10 ** 20),
    // ]);
    // console.warn("approveResp: ", approveResp);

    // console.warn(
    //   compileCalldata({
    //     recipient:
    //       "0x066ad0b56a9e2b29513b88849bfd942f085d242aeb9faad3a5f2a05d9228aabc",
    //     amount: getUint256CalldataFromBN(String(10 ** 12)),
    //   })
    // );

    // const approveResp = await userSender.callContract({
    //   contractAddress: ETH_ADDRESSES.goerli,
    //   entrypoint: "transfer",
    //   calldata: compileCalldata({
    //     recipient:
    //       "0x066ad0b56a9e2b29513b88849bfd942f085d242aeb9faad3a5f2a05d9228aabc",
    //     amount: getUint256CalldataFromBN(String(10 ** 12)),
    //   }),
    // });

    // const approveResp = await userSender.callContract({
    //   contractAddress: ETH_ADDRESSES.goerli,
    //   entrypoint: "balanceOf",
    //   calldata: compileCalldata({
    //     account:
    //       "0x066ad0b56a9e2b29513b88849bfd942f085d242aeb9faad3a5f2a05d9228aabc",
    //   }),
    // });

    // const approveResp = await userSender.execute({
    //   contractAddress: ETH_ADDRESSES.goerli,
    //   entrypoint: "approve",
    //   calldata: compileCalldata({
    //     spender: OB_SOURCE_ADDRESSES.goerli,
    //     amount: getUint256CalldataFromBN(String(10 ** 20)),
    //   }),
    // });

    const approveResp = await ethContract.approve(
      OB_SOURCE_ADDRESSES.goerli,
      getUint256CalldataFromBN(String(10 ** 20))
    );

    console.warn("approveResp: ", approveResp);

    // const amount = 10 ** 14;
    // const ext = "0x1234567890000000";
    // const resp = await userSender.callContract({
    //   contractAddress: OB_SOURCE_ADDRESSES.goerli,
    //   entrypoint: "transferERC20",
    //   calldata: compileCalldata({
    //     _token: ETH_ADDRESSES.goerli,
    //     _to: "0x066ad0b56a9e2b29513b88849bfd942f085d242aeb9faad3a5f2a05d9228aabc",
    //     _amount: getUint256CalldataFromBN(amount),
    //     _ext: ext,
    //   }),
    // });
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
