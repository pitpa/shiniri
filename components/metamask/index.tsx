import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Network, TokenInfo } from './types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const LinkButton = styled.a`
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
  display: inline-block;
  text-decoration: none;
`

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
  chainId: '0x89',
  rpcUrls: ['https://rpc-mainnet.matic.network/'],
  chainName: 'Matic Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  },
  blockExplorerUrls: ['https://polygonscan.com/']
}

const henkakuToken: TokenInfo = {
  type: 'ERC20',
  options: {
    address: '0xd59FFEE93A55F67CeD0F56fa4A991d4c8c8f5C4E',
    symbol: 'HENKAKU',
    decimals: 18,
    image:
      'https://raw.githubusercontent.com/henkaku-center/shiniri/main/public/henkakuToken.png'
  }
}

const AddHenkakuToken: React.VFC = () => {
  const context = useWeb3React()
  const { library } = context

  const addToken = async () => {
    if (!library) {
      return
    }
    try {
      const wasAdded = await library.provider.request({
        method: 'wallet_watchAsset',
        params: henkakuToken
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
      Add HENKAKU token / HENKAKUトークンを追加する
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
        params: [polyGonNetwork]
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

  const [isMetaMask, setIsMetaMask] = useState(false)

  const connectInjected = async () => {
    try {
      await activate(injectedConnector)
    } catch (e) {
      console.log(e)
      alert(`Something went wrong ask admin for help (なんか変だな): ${e}`)
    }
  }

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      setIsMetaMask(true)
    } else {
      console.log('Need to install MetaMask')
    }
  }, [])

  return (
    <>
      {isMetaMask ? (
        ''
      ) : (
        <Helper>
          <p>
            MetaMask is not installed. smartphone, use MetaMask in-app browser
            instead of Safari and chrome in smartphone. <br />{' '}
            MetaMaskがインストールされてません。スマートフォンの場合はMetaMaskアプリ内のブラウザーを使ってください。
          </p>
          <Link href="https://metamask.io/download/" passHref>
            <LinkButton>
              Donwload MetaMask / MetaMaskをダウンロードする
            </LinkButton>
          </Link>
        </Helper>
      )}

      {active || !isMetaMask ? (
        ''
      ) : (
        <Helper>
          <p>
            You are not connected to MetaMask <br />{' '}
            MetaMaskに繋がっていないようだ
          </p>
          <Button type="button" onClick={connectInjected}>
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
            Add HENKAKU Token to your Metamask / 最後だ。HENKAKU
            Tokenを追加してくれ
          </p>
          <AddHenkakuToken />
        </Helper>
      ) : (
        ''
      )}
    </>
  )
}

export { ConnectWallet }
