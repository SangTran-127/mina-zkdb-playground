import { ZKDatabaseSmartContractWrapper } from "@zkdb/smart-contract";
import { Mina, PublicKey } from "o1js";
import "./App.css";

function App() {
  const deployToSmartContract = async () => {
    const Local = await Mina.LocalBlockchain({ proofsEnabled: true });
    Mina.setActiveInstance(Local);
    // const signer = new AuroWalletSigner();
    const { key: deployerPrivate } = Local.testAccounts[0];
    const publicKey = PublicKey.fromPrivateKey(deployerPrivate);
    // console.log(signer);
    const merkleHeight = 12;
    const zkWrapper = new ZKDatabaseSmartContractWrapper(
      merkleHeight,
      publicKey
    );
    console.log("compile run");
    const start = performance.now();
    await zkWrapper.compile();
    const end = performance.now();
    console.log("compile done ", (end - start) / 1000);

    const deployContract = await zkWrapper.createAndProveDeployTransaction(
      publicKey
    );
    // @ts-expect-error aaa
    const res = window.mina.sendTransaction(deployContract);
    console.log("🚀 deployContract:", deployContract);
    console.log("🚀 res:", res);
  };

  return (
    <>
      <button onClick={deployToSmartContract}>Create smart contract</button>
    </>
  );
}

export default App;
