import * as React from "react";
import { styled as mstyled} from '@mui/material/styles';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import currencyFormatter from "currency-formatter"
import { useTimer } from 'react-timer-hook';

const Container = mstyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
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
  let countdownTimestamp = props?.rigData?.nextPayoutTimestamp

  const {
    seconds,
    minutes,
    hours,
    isRunning,
  } = useTimer({ expiryTimestamp: new Date(countdownTimestamp)});
  
  const countdownRender = isRunning ? <span>{`${hours}hr ${minutes}m ${seconds}s `}</span> : <span>Payout in progress.</span>

  return (
    <Container elevation={5}>
      <TextWrapper>
        <BalanceText>Unpaid Balance</BalanceText>
        <UsdValue>{`${currencyFormatter.format(parseFloat(btcPrice * unpaidAmount), { code: 'USD' })} USD`}</UsdValue>
        <BtcValue>{`${unpaidAmount.toFixed(8)} BTC`}</BtcValue>
        <div>{countdownRender}</div>
      </TextWrapper>
    </Container>
  );
}

export default SmallSquareTop;