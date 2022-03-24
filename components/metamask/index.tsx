import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Network, TokenInfo } from './types'
import { useEffect } from 'react'
import { Content } from '../common'
import styled from 'styled-components'

const Button = styled.button`
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  padding: 12px 32px;
  margin: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  border-radius: 50px;

  background-image: linear-gradient(to right, rgb(1 134 218), rgb(182 49 167));
  border: 0;
  color: white !important;
`

const Helper = styled.div`
  color: white;
  font-size: 16px;
  text-align: center;
`
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
      const wasAdded = await library.provider.request({
        method: "wallet_watchAsset",
        params: henkakuToken
      });

      if (wasAdded) {
        alert('wow Epic! go back to discord / これで全てが終了だおめでとう')
      }
    } catch (e) {
      console.log(e)
      alert(`something went wrong ask admin for help (なんか変だな): ${e.message}`)
    }
  }

  return (
    <Button onClick={addHenkakuToken}>Add henkaku token / Henkakuトークンを追加する</Button>
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
      alert(`something went wrong ask admin for help (なんか変だな): ${e}`)
    }
  }
  return (
    <Button onClick={addPolygonNetwork}>Add Polygon Network / Polygonのネットワークに接続する</Button>
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
    <>
      {active ? '' : (
        <Helper>
          <p>you are not connected to Metamask <br/> Metamaskに繋がっていないようだ</p>
          <Button type="button" onClick={onClick}>
            Connect Metamask / Metamaskに接続する
          </Button>
        </Helper>
      )}
      {active && chainId != 137 ? (
        <Helper>
          <p>Now, connected to Metamask <br/> Metamaskにはつながったようだ</p>
          <p>you are not connected to PolygonNetowrk. switch or Add polygon network <br/> ただ、ポリゴンのネットワークにはつながっていないようだ</p>
          <AddPolygonNetwork />
        </Helper>
      ) : ''}

      {active && chainId == 137 ? (
        <Helper>
          <p>Add Henkaku Token to your Metamask / 最後だ。Henkaku Tokenを追加してくれ</p>
          <AddHenkakuToken />
        </Helper>
      ) : ''}
    </>
  )
}

export { ConnectWallet, AddHenkakuToken, AddPolygonNetwork }
