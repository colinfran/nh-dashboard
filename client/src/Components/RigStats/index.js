import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { styled as mstyled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Container = mstyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: "40%",
  marginTop: 32
}));

const RowContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`

const RigStats1 = styled.div`
  background: transparent;
  padding: 0.25em 1em;
  display:flex;
  flex-direction:column;
  width: 45%;
`

const RigStats2 = styled.div`
  background: transparent;
  padding: 0.25em 1em;
  display:flex;
  flex-direction:column;
  width: 45%;
`

const fontStyle = {
  fontSize: "calc(4px + 2vmin)"
}

const Wrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const renderRigData = (props, speedData, powerData) => {
  const rigData = props?.data?.rigData
  const totalDevices = rigData?.totalDevices
  const onlineDevices = rigData?.devicesStatuses.MINING
  const onlineRigs = rigData?.minerStatuses.MINING
    
  return (
    <RowContainer>
      <RigStats1>
        <div>
          <div style={{color: "#959595"}}>Mining</div>
          <div style={fontStyle}>{`${onlineRigs} / ${rigData?.totalRigs} rigs`}</div>
          <div style={fontStyle}>{`${onlineDevices} / ${totalDevices} devices`}</div>
        </div>
      </RigStats1>
      <RigStats2>
        <div>
          <div style={{color: "#959595"}}>Stats</div>
          <div style={fontStyle}>{`Total Power: ${(Number(powerData)).toFixed(2)} W`}</div>
          <div style={fontStyle}>{`Total Speed: ${(Number(speedData)).toFixed(2)} MH`}</div>
        </div>
      </RigStats2>
    </RowContainer>
  )
}


function RigStats(props) {
  const [speedData, setSpeedData] = useState(0);
  const [powerData, setPowerData] = useState(0);
  useEffect(() => {
    let speedVal = 0
    let powerVal = 0
    props?.data?.rigData?.miningRigs.map(rigs => {
      return rigs?.devices.map(device => {
        if (device?.status?.enumName === "MINING"){
          powerVal += device.powerUsage
          return device?.speeds.map(speed => {
            return speedVal += parseFloat(speed?.speed)
          });
        }
        return 0
      });
    });
    setSpeedData(speedVal)
    setPowerData(powerVal)
  }, [props.data.rigData]);

  return (
    <Container>
      <Wrapper>
        {renderRigData(props, speedData, powerData)}
      </Wrapper>
    </Container>
    
  );
}



export default RigStats;
