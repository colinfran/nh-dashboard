import {useState} from "react";
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import styled from '@emotion/styled'
import { styled as mstyled} from '@mui/material/styles';
import currencyFormatter from "currency-formatter"


const RigContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  padding: 0.25em 1em;
`
const Item = styled.div`
  flex: 1 1;
  display:flex;
  font-size: calc(4px + 2vmin);
`

const ItemDropdown = styled.div`
  display:flex;
  font-size: calc(4px + 2vmin);
`

const ItemWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em 1em;
  align-items: center;

  `

const DataContainer = mstyled(Paper)(({ theme }) => ({
  backgroundColor: "lightgrey",
  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0
}));

const OuterContainer = mstyled(Paper)(({ theme, openstyle }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: "40%",
  marginTop: 16,
  ...openstyle
}));

function Transaction(props) {
  const [open, setOpen] = useState(false);

  const {transaction, data} = props

  const openstyle = open ? {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  } : {}

  //  "DEPOSIT", "WITHDRAWAL", "HASHPOWER", "MINING", "EXCHANGE", "UNPAID_MINING", "CRYPTO_BUY_SELL", "PAYMENT", "OTHER"
  let transactionType = ""
  if (transaction?.type === "MINING"){
    transactionType = "Mining payment"
  }
  if (transaction?.type === "DEPOSIT"){
    transactionType = "Deposit"
  }
  if (transaction?.type === "WITHDRAWAL"){
    transactionType = "Withdrawal"
  }
  // console.log(transaction)
  const timestamp = new Date(transaction?.time)
  const btcPrice = props?.data?.btcPrice
  const payment = Number(transaction?.amount)
  const transactionFee = Number(transaction?.feeAmount)
  const transactionFinal = payment-transactionFee
  return (
    <div>
      <OuterContainer elevation={5} onClick={()=> setOpen(!open)} openstyle={openstyle}>
        <RigContainer>
          <Item>{`${timestamp.toLocaleDateString()}`}</Item>
          <Item>{transactionType}</Item>
          <Item>{`${currencyFormatter.format(parseFloat(btcPrice * transactionFinal), { code: 'USD' })} USD`}</Item>
        </RigContainer>
      </OuterContainer>
      <Collapse in={open}>
        <div>
          <DataContainer>
            <ItemWrapper>
              <ItemDropdown>{`${timestamp.toLocaleDateString()}\u00A0\u00A0${timestamp.toLocaleTimeString()}`}</ItemDropdown>
              <ItemDropdown>{`TransactionID: ${transaction?.id}`}</ItemDropdown>
              <ItemDropdown>{`Payment: ${payment?.toFixed(8)} BTC`}</ItemDropdown>
              <ItemDropdown>{`Mining fee: ${transactionFee?.toFixed(8)} BTC`}</ItemDropdown>
              <ItemDropdown>{`Final total: ${transactionFinal?.toFixed(8)} BTC`}</ItemDropdown>
              <ItemDropdown>{`Final in USD: ${currencyFormatter.format(parseFloat(btcPrice * transactionFinal), { code: 'USD' })} USD`}</ItemDropdown>
            </ItemWrapper>
          </DataContainer>
        </div>
      </Collapse>
    </div>
  );
}

export default Transaction;