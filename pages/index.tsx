import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectWallet } from '../components/metamask'
import { Container, Content, Helper, Main, Tiltle } from '../components/common'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { AppBanner } from '../components/appBanner'

interface Window {
  ethereum?: {
    isMetaMask?: true
  }
}

const Home: NextPage = () => {
  const [isMetaMask, setMemtaMask] = useState<Boolean>(false)

  useEffect(() => {
    console.log(isMetaMask, isMobile)
    if (window.ethereum && window.ethereum.isMetaMask) {
      setMemtaMask(true)
    }
    console.log('not hash metamask')
  }, [])

  return (
    <body style={{ background: 'rgb(15 19 22)' }}>
      <Container>
        <Head>
          <title>Henkaku Shiniri</title>
          <meta name='description' content='' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Main>
          <Tiltle>Henkaku Shiniri - 新入り</Tiltle>
          <Content>
            <p>
              welcome to Henkaku Community. Set up your Metamask.
              <br />
              ようこそ 変革コミュニティへ まずはMetamaskの設定をしてくれ。
              たったの3クリックで完了だ。
            </p>
          </Content>
          {isMobile && !isMetaMask && <AppBanner />}
          {!isMobile && !isMetaMask && (
            <Helper>
              まずはMetamaskのエクステンションをインストールしてね
            </Helper>
          )}
          {isMetaMask && <ConnectWallet />}
        </Main>
      </Container>
    </body>
  )
}

export default Home
