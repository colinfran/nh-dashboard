import {useState} from "react";
import styled from '@emotion/styled'
import Transaction from './Transaction';
import WalletBalance from './WalletBalance';
import LoadingButton from '@mui/lab/LoadingButton';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
`

function Transactions(props) {
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  async function getTransactions() {
    setLoadingTransactions(true)
    try {
      await fetch(`/getWalletTransactions?timestamp=${props.transactions.transactions[props.transactions.transactions.length-1].time}`)
      .then(response => response.json())
      .then(data => {
        const oldArray = [...props.transactions.transactions]
        oldArray.pop()
        const transactionsArray = [...oldArray, ...data.transactions]
        console.log(transactionsArray)
        props.setTransactions({transactions: transactionsArray})
        setLoadingTransactions(false)
      });
    } catch (e) {
      console.error('Error fetching nicehash transaction data', e);
    };
  };

  const {transactions} = props
  const transactionsList = transactions.transactions.map((transaction, idx) => {
    if (idx === transactions.transactions.length-1) return null
    return (<Transaction key={transaction.id} transaction={transaction} {...props}/>)
  })
  
  return (
    <div>
      <div>
        <WalletBalance {...props} />
      </div>
      <Container >
        {transactionsList}
      </Container>
      <div>
        <LoadingButton
          size="small"
          onClick={()=> getTransactions()}
          loading={loadingTransactions}
          variant="contained"
          disabled={loadingTransactions}
        >
          Load more
        </LoadingButton>
      </div>
    </div>
  );
}

export default Transactions;
