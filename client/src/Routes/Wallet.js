import { Fade } from '@mui/material';
import Transactions from '../Components/Transactions';
import CircularProgress from '@mui/material/CircularProgress';

function Wallet(props) {
  const {data, transactions} = props
  return (
    <div>
      {data !== undefined && transactions !== undefined ? (
        <Fade in={transactions !== undefined} timeout={2000}>
          <div>
            <Transactions {...props}/>
          </div>
        </Fade>
      ) : (
        <div>
          <CircularProgress color="inherit" />
          <div>Fetching your data</div>
        </div>
      )}
    </div>
  );
}

export default Wallet;