import * as React from "react";
import BigSquare from "./BigSquare";
import Grid from '@mui/material/Grid';
import SmallSquareTop from "./SmallSquareTop";
import SmallSquareBottom from "./SmallSquareBottom";


function Overview(props) {
  const {data} = props
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <BigSquare {...data}/>
        </Grid>
        <Grid item xs={4} alignItems="space-between" container direction="column" justifyContent="space-between">
          <SmallSquareTop {...data}/>
          <SmallSquareBottom {...data}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Overview;