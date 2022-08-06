import styled from '@emotion/styled'

const Container = styled.div`
  display:flex;
  flex-direction: row;
  margin-top: 20px;
  justify-content: center;
`

const Unpaid = styled.div`
  background: transparent;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-left: 2px solid #282c34;
  border-top: 2px solid #282c34;
  border-bottom: 2px solid #282c34;
  color: #282c34;
  padding: 0.25em 1em;
  display:flex;
  flex-direction:column;
  width: 45%;
`

const Wallet = styled.div`
  background: transparent;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-right: 2px solid #282c34;
  border-left: 2px solid #282c34;
  border-top: 2px solid #282c34;
  border-bottom: 2px solid #282c34;
  color: #282c34;
  padding: 0.25em 1em;
  display:flex;
  flex-direction:column;
  width: 45%;
`

const titleDivStyles = {
  fontSize: "calc(5px + 2vmin)", 
  color: "#959595"
}

const btcDivStyles = {
  color: "#fff"
}

const usdDivStyles = {
  fontSize: "calc(5px + 2vmin)",
  color: "#fff"
}

function Balance(props) {
  let unpaidAmount = Number(props?.rigData?.unpaidAmount)
  let walletBalance = Number(props?.walletBalance?.totalBalance)
  let btcPrice = Number(props?.btcPrice)

  return (
    <Container >
      <Unpaid>
        <div style={titleDivStyles}>Unpaid Balance</div>
        <div style={btcDivStyles}>{`${unpaidAmount} BTC`}</div>
        <div style={usdDivStyles}>{`$${parseFloat((btcPrice * unpaidAmount).toFixed(2)).toLocaleString("en-US")} USD`}</div>
      </Unpaid>
      <Wallet>
        <div style={titleDivStyles}>Wallet Balance</div>
        <div style={btcDivStyles}>{`${walletBalance} BTC`}</div>
        <div style={usdDivStyles}>{`$${parseFloat((btcPrice * walletBalance).toFixed(2)).toLocaleString("en-US")} USD`}</div>
      </Wallet>
    </Container>
  );
}



export default Balance;
