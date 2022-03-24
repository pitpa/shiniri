import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectWallet } from '../components/metamask'
import { Container, Content, Main, Tiltle } from '../components/common'


const Home: NextPage = () => {
  return (
    <body style={{background: 'rgb(15 19 22)'}}>
      <Container>
        <Head>
          <title>Henkaku Shiniri</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main>
          <Tiltle>
            Henkaku Shiniri - 新入り
          </Tiltle>
          <Content>
            <p>
              welcome to Henkaku Community.
              Set up your Metamask.
              <br/>
              ようこそ 変革コミュニティへ
              まずはMetamaskの設定をしてくれ。
              たったの3クリックで完了だ。
            </p>
          </Content>
          <ConnectWallet />
        </Main>

      </Container>
    </body>
  )
}

export default Home
