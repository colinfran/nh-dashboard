import Balance from '../Components/Old/Balance';
import BitcoinPrice from '../Components/Old/BitcoinPrice';
import Rigs from '../Components/Old/Rigs';
import { Fade } from '@mui/material';

function Wallet(props) {
  const {data} = props
  return (
    <>
      <Fade in={data !== undefined} timeout={2000}>
        <div>
          <div>
            <BitcoinPrice {...data}/>
            <Balance {...data}/>
          </div>
          <div>
            <Rigs {...data}/>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default Wallet;