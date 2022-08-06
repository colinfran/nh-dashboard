import "../App.css";
import CircularProgress from '@mui/material/CircularProgress';
import { Fade } from '@mui/material';
import Overview from "../Components/Overview";
import RigStats from "../Components/RigStats";
import Rigs from "../Components/Rigs";

function Home(props) {
  const {data} = props
  return (
    <div>
      {data === undefined ? (
        <div>
          <CircularProgress color="inherit" />
          <div>Fetching your data</div>
        </div>
      ) : (
        <Fade in={data !== undefined} timeout={2000}>
          <div>
           <Overview {...props}/>
           <RigStats {...props}/>
           <Rigs {...props}/>
          </div>
        </Fade>
      )}
    </div>
  );
}

export default Home;