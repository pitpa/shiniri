import styled from 'styled-components'

const Container = styled.div`
  background: rgb(15 19 22);
  font-family: Inter, sans-serif;
`
const Main = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Title = styled.div`
  background-image: linear-gradient(225deg, #28d8ff, #032eff) !important;

  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-weight: 700;
  font-size: 2.5rem;
  float: left;
  -webkit-box-decoration-break: clone;
  overflow: visible;
`

const Content = styled.div`
  background-image: linear-gradient(225deg, #ff2828, #032eff) !important;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-weight: 700;
  font-size: 1rem;
  -webkit-box-decoration-break: clone;
  overflow: visible;
`

const Helper = styled.div`
  color: white;
  font-size: 16px;
  text-align: center;
`

export { Container, Main, Title, Content, Helper }
