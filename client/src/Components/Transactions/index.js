import {useState} from "react";
import styled from '@emotion/styled'
import Transaction from './Transaction';
import WalletBalance from './WalletBalance';
import LoadingButton from '@mui/lab/LoadingButton';
import { useLocation } from "react-router-dom";
import uniqid from 'uniqid';

import json from "../../demo-data/transactions.json"

const Container = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
`
const ButtonContainer = styled.div`
  padding: 1em;
` 

function Transactions(props) {
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  
  const location = useLocation();
  const isDemo = location.pathname.includes("demo");

  async function getTransactions() {
    setLoadingTransactions(true)
    if (isDemo){
      const oldArray = [...props.transactions.transactions]
      oldArray.pop()
      const newArray = json.slice(oldArray.length, oldArray.length+10)
      const transactionsArray = [...oldArray, ...newArray]
      // console.log(transactionsArray)
      props.setTransactions({transactions: transactionsArray})
      setLoadingTransactions(false)
    }else{
      try {
        await fetch(`/getWalletTransactions?timestamp=${props.transactions.transactions[props.transactions.transactions.length-1].time}`)
        .then(response => response.json())
        .then(data => {
          const oldArray = [...props.transactions.transactions]
          oldArray.pop()
          const transactionsArray = [...oldArray, ...data.transactions]
          // console.log(transactionsArray)
          props.setTransactions({transactions: transactionsArray})
          setLoadingTransactions(false)
        });
      } catch (e) {
        console.error('Error fetching nicehash transaction data', e);
      };
    }
  };

  const {transactions} = props
  const transactionsList = transactions?.transactions?.map((transaction, idx) => {
    if (idx === transactions.transactions.length-1) return null
    // console.log(transactions)
    if (transactions.transactions.length === 0) return null
    return (<Transaction key={`${uniqid()}`} transaction={transaction} {...props}/>)
  })
  
  return (
    <div>
      <div>
        <WalletBalance {...props} />
      </div>
      <Container >
        {transactionsList}
      </Container>
      <ButtonContainer>
        <LoadingButton
          size="small"
          onClick={()=> getTransactions()}
          loading={loadingTransactions}
          variant="contained"
          disabled={loadingTransactions}
        >
          Load more
        </LoadingButton>
      </ButtonContainer>
    </div>
  );
}

export default Transactions;
