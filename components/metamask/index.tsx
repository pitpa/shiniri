import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Network, TokenInfo } from './types'
import styled from 'styled-components'
import { Helper } from '../common'

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

const polyGonNetwork: Network = {
  chainId: '0x89',
  rpcUrls: ['https://polygon-rpc.com/'],
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  blockExplorerUrls: ['https://polygonscan.com/'],
}

const pitpaToken: TokenInfo = {
  type: 'ERC20',
  options: {
    address: '0x79A579EDfD4c5C30624d66935B3FB1e73C8eAFA9',
    symbol: 'PIT',
    decimals: 18,
    image:
      'https://raw.githubusercontent.com/pitpa/shiniri/main/public/pitpaToken.png',
  },
}

const AddPitPaToken: React.VFC = () => {
  const context = useWeb3React()
  const { library } = context

  const addToken = async () => {
    if (!library) {
      return
    }
    try {
      const wasAdded = await library.provider.request({
        method: 'wallet_watchAsset',
        params: pitpaToken,
      })

      if (wasAdded) {
        alert('Wow Epic! Go back to discord / これで全てが終了だおめでとう')
      }
    } catch (e) {
      console.log(e)
      alert(`Something went wrong ask admin for help (なんか変だな): ${e}`)
    }
  }

  return (
    <Button onClick={addToken}>
      Add PitPa token(PIT) / PitPaトークンを追加する
    </Button>
  )
}

const AddPolygonNetwork: React.VFC = () => {
  const context = useWeb3React()
  const { library } = context

  const addNetwork = async () => {
    if (!library) {
      return
    }
    try {
      await library.provider.request({
        method: 'wallet_addEthereumChain',
        params: [polyGonNetwork],
      })
    } catch (e) {
      console.log(e)
      alert(`Something went wrong ask admin for help (なんか変だな): ${e}`)
    }
  }
  return (
    <Button onClick={addNetwork}>
      Add Polygon Network / Polygonのネットワークに接続する
    </Button>
  )
}

const ConnectWallet = () => {
  const injectedConnector = new InjectedConnector({})
  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>()

  const connectInjected = async () => {
    try {
      await activate(injectedConnector)
    } catch (e) {
      console.log(e)
      alert(`Something went wrong ask admin for help (なんか変だな): ${e}`)
    }
  }

  return (
    <>
      {active ? (
        ''
      ) : (
        <Helper>
          <p>
            You are not connected to MetaMask <br />{' '}
            MetaMaskに繋がっていないようだ
          </p>
          <Button type='button' onClick={connectInjected}>
            Connect MetaMask / MetaMaskに接続する
          </Button>
        </Helper>
      )}

      {active && chainId != 137 ? (
        <Helper>
          <p>
            Now, connected to MetaMask <br /> MetaMaskにはつながったようだ
          </p>
          <p>
            You are not connected to Polygon Netowrk. Switch or add polygon
            network <br />{' '}
            ただ、ポリゴンのネットワークにはつながっていないようだ
          </p>
          <AddPolygonNetwork />
        </Helper>
      ) : (
        ''
      )}

      {active && chainId == 137 ? (
        <Helper>
          <p>
            Add PitPa Token(PIT) to your Metamask / 最後だ。PitPa
            Token(PIT)を追加してくれ
          </p>
          <AddPitPaToken />
        </Helper>
      ) : (
        ''
      )}
    </>
  )
}

export { ConnectWallet }
