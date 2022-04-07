import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectWallet } from '../components/metamask'
import { Container, Content, Helper, Main, Title } from '../components/common'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { AppBanner } from '../components/appBanner'

const Home: NextPage = () => {
  const [isMetaMask, setMetaMask] = useState<Boolean>(false)

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      setMetaMask(true)
    }
  }, [])

  return (
    <div style={{ background: 'rgb(15 19 22)' }}>
      <Container>
        <Head>
          <title>PitPa Shiniri</title>
          <meta name='description' content='' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Main>
          <Title>PitPa Shiniri - 新入り</Title>
          <Content>
            <p>
              Welcome to PitPa. Set up your MetaMask.
              <br />
              ようこそ PitPa へ まずはMetaMaskの設定をしてくれ。
              たったの3クリックで完了だ。
            </p>
          </Content>
          {isMobile && !isMetaMask && <AppBanner />}
          {!isMobile && !isMetaMask && (
            <Helper>
              まずはMetaMaskのエクステンションをインストールしてね
            </Helper>
          )}
          {isMetaMask && <ConnectWallet />}
        </Main>
      </Container>
    </div>
  )
}

export default Home
