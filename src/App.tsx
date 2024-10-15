import { ZKDatabaseSmartContractWrapper } from "@zkdb/smart-contract";
import { Mina, PublicKey } from "o1js";
import "./App.css";

function App() {
  const deployToSmartContract = async () => {
    const Local = await Mina.LocalBlockchain({ proofsEnabled: true });
    Mina.setActiveInstance(Local);

    const { key: deployerPrivate } = Local.testAccounts[0];

    const publicKey = PublicKey.fromPrivateKey(deployerPrivate);

    const merkleHeight = 12;
    const zkWrapper = new ZKDatabaseSmartContractWrapper(
      merkleHeight,
      publicKey
    );
    // The compile will stuck here
    await zkWrapper.compile();

    const deployContract = await zkWrapper.createAndProveDeployTransaction(
      publicKey
    );
    console.log("🚀 ~ deployToSmartContract ~ deployContract:", deployContract);
  };

  return (
    <>
      <button onClick={deployToSmartContract}>Create smart contract</button>
    </>
  );
}

export default App;
