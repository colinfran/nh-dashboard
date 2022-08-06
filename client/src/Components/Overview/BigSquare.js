import * as React from "react";
import { styled as mstyled} from '@mui/material/styles';
import styled from '@emotion/styled'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import btcImage from "./btc.png"
import currencyFormatter from "currency-formatter"

const Container = mstyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  justifyContent:"center",
  alignItems:"center",
}));

const OuterGrid = mstyled(Grid)(({ theme }) => ({
  height: 250,
  margin: 0,
  paddingRight: 16
}));

const Image = styled.img`
  transform: rotate(20deg);
  height: 75%;
  width: 75%;
`

const CurrentlyMiningText = styled.div`
  font-size: calc(4px + 3vmin);
`

const CurrentlyMiningValue = styled.div`
  font-size: calc(4px + 4vmin);
`
const BtcPrice = styled.div`
  font-size: calc(2px + 2.75vmin);
`
const Left = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Right = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`



function BigSquare(props) {
  let btcPrice = Number(props?.btcPrice).toFixed(2)
  let totalProf = props?.rigData?.totalProfitability
  return (
    <Container elevation={16}>
      <OuterGrid container spacing={2} columns={16}  justifyContent="space-evenly" alignItems="space-evenly">
        <Left>
          <div>
            <CurrentlyMiningText>Daily mining profit</CurrentlyMiningText>
            <CurrentlyMiningValue>{`${currencyFormatter.format(parseFloat(btcPrice * totalProf), { code: 'USD' })} / 24hrs`}</CurrentlyMiningValue>
            <BtcPrice>{`1 BTC ≈ ${currencyFormatter.format(parseFloat(btcPrice), { code: 'USD' })}`}</BtcPrice>
          </div>
        </Left>
        <Right>
          <ImgContainer>
            <Image src={btcImage} alt="btc logo" />
          </ImgContainer>
        </Right>
      </OuterGrid>
    </Container>
  );
}

export default BigSquare;