import * as React from "react";
import { styled as mstyled} from '@mui/material/styles';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import currencyFormatter from "currency-formatter"

const Container = mstyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: "40%"
}));

const TextWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const BalanceText = styled.div`
  font-size: calc(4px + 1.75vmin);
`

const UsdValue = styled.div`
  font-size: calc(4px + 2vmin);
`
const BtcValue = styled.div`
  font-size: calc(4px + 1.25vmin);
`


function SmallSquareTop(props) {
  let unpaidAmount = Number(props?.rigData?.unpaidAmount)
  let btcPrice = Number(props?.btcPrice)
  return (
    <Container elevation={5}>
      <TextWrapper>
        <BalanceText>Unpaid Balance</BalanceText>
        <UsdValue>{`${currencyFormatter.format(parseFloat(btcPrice * unpaidAmount), { code: 'USD' })} USD`}</UsdValue>
        <BtcValue>{`${unpaidAmount.toFixed(8)} BTC`}</BtcValue>
      </TextWrapper>
    </Container>
  );
}

export default SmallSquareTop;