import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Network, TokenInfo } from './types'
import { useEffect } from 'react'

const polyGonNetwork: Network = {
  chainId: "0x89",
  rpcUrls: ["https://rpc-mainnet.matic.network/"],
  chainName: "Matic Mainnet",
  nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
  },
  blockExplorerUrls: ["https://polygonscan.com/"]
}

const henkakuToken: TokenInfo = {
  type: 'ERC20',
  options: {
    address: '0xd59FFEE93A55F67CeD0F56fa4A991d4c8c8f5C4E',
    symbol: 'HENKAKU',
    decimals: 18,
    image: 'https://compoundinc.jp/cms2/wp-content/uploads/2022/03/HENKAKU_works-01.jpg'
  },
}

const AddHenkakuToken: React.VFC = () => {
  const { library } = useWeb3React<Web3Provider>()
  const addHenkakuToken = async () => {
    try {
      await library.provider.request({
        method: "wallet_watchAsset",
        params: henkakuToken
      });
    } catch (e) {
      console.log(e)
      alert(`something went wrong ask admin for help ${e.message}`)
    }
  }

  return (
    <button onClick={addHenkakuToken}>Add henkaku token</button>
  )
}

const AddPolygonNetwork: React.VFC =  () => {
  const { library } = useWeb3React<Web3Provider>()

  const addPolygonNetwork = async() => {
    try {
      await library.provider.request({
        method: "wallet_addEthereumChain",
        params: [polyGonNetwork]
      });
    } catch (e) {
      console.log(e)
      alert(`something went wrong ask admin for help ${e}`)
    }
  }
  return (
    <button onClick={addPolygonNetwork}>Add Polygon Network</button>
  )
}

const ConnectWallet = () => {
  const injectedConnector = new InjectedConnector({supportedChainIds: [1,137],})
  const { chainId, account, activate, active,library } = useWeb3React<Web3Provider>()
  const onClick = () => {
    activate(injectedConnector)
  }

  useEffect(() => {
    console.log(chainId, account, active)
    },);

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? '' : (
        <>
          <p>you are not connected to Metamask</p>
          <button type="button" onClick={onClick}>
            Connect Metamask
          </button>
        </>
      )}
      {active && chainId != 137 ? (
        <>
          <p>you are not connected to PolygonNetowrk. switch or Add polygon network</p>
          <AddPolygonNetwork />
        </>
      ) : ''}

      {active && chainId == 137 ? (
        <>
          <p>Add Henkaku Token to your Metamask</p>
          <AddHenkakuToken />
        </>
      ) : ''}
    </div>
  )
}

export { ConnectWallet, AddHenkakuToken, AddPolygonNetwork }
