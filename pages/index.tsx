import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectWallet } from '../components/metamask'
import { Container, Content, Main, Title } from '../components/common'

const Home: NextPage = () => {
  return (
    <div style={{ background: 'rgb(15 19 22)' }}>
      <Container>
        <Head>
          <title>HENKAKU Shiniri</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main>
          <Title>HENKAKU Shiniri - 新入り</Title>
          <Content>
            <p>
              Welcome to HENKAKU Community. Set up your MetaMask.
              <br />
              ようこそ 変革コミュニティへ まずはMetaMaskの設定をしてくれ。
              たったの3クリックで完了だ。
            </p>
          </Content>
          <ConnectWallet />
        </Main>
      </Container>
    </div>
  )
}

export default Home
