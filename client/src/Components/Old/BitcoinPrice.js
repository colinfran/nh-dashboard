import styled from '@emotion/styled'

const Container = styled.div`
  color: "#959595";
  font-size: calc(4px + 2vmin);
`

function BitcoinPrice(props) {
  let btcPrice = Number(props?.btcPrice).toFixed(2)
  return (
    <Container >
      {`1 BTC ≈ $${parseFloat(btcPrice).toLocaleString('en-US')}`}
    </Container>
  );
}



export default BitcoinPrice;
