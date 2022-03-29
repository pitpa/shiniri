import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import styled from 'styled-components'

const Link = styled.a`
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
  text-decoration: none;
`

const AppBanner: React.VFC = () => {
  return (
    <>
      <Link
        href='https://metamask.app.link/dapp/shiniri.vercel.app/'
        style={{ color: 'white' }}
      >
        Open Metamask Browser/ Metamaskのアプリで開く
      </Link>
    </>
  )
}

export { AppBanner }
