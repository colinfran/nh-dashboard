import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

const RowContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`

const RigStats1 = styled.div`
  background: transparent;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-left: 2px solid #282c34;
  border-top: 2px solid #282c34;
  border-bottom: 2px solid #282c34;
  color: #fff;
  padding: 0.25em 1em;
  display:flex;
  flex-direction:column;
  width: 45%;
`

const RigStats2 = styled.div`
  background: transparent;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-right: 2px solid #282c34;
  border-left: 2px solid #282c34;
  border-top: 2px solid #282c34;
  border-bottom: 2px solid #282c34;
  color: #fff;
  padding: 0.25em 1em;
  display:flex;
  flex-direction:column;
  width: 45%;
`

const fontStyle = {
  fontSize: "calc(4px + 2vmin)"
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
`

const RigContainer = styled.div`
  display:flex;
  flex-direction: row;
  margin-top: 20px;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid #282c34;
  padding: 0.25em 1em;
`
const RigItem = styled.div`
  flex: 1 1;
  display:flex;
  font-size: calc(4px + 2vmin);
`

const renderRigData = (props, speedData, powerData) => {
  const rigData = props?.rigData
  const totalDevices = rigData?.totalDevices
  const onlineDevices = rigData?.devicesStatuses.MINING
  const onlineRigs = rigData?.minerStatuses.MINING
    
  return (
    <RowContainer>
      <RigStats1>
        <div>
          <div style={{color: "#959595"}}>Rigs mining</div>
          <div style={fontStyle}>{`${onlineRigs} out of ${rigData?.totalRigs} rigs`}</div>
          <div style={fontStyle}>{`${onlineDevices} out of ${totalDevices} devices`}</div>
        </div>
      </RigStats1>
      <RigStats2>
        <div>
          <div style={{color: "#959595"}}>Rigs stats</div>
          <div style={fontStyle}>{`Total Power: ${(Number(powerData)).toFixed(2)} W`}</div>
          <div style={fontStyle}>{`Total Speed: ${(Number(speedData)).toFixed(2)} MH`}</div>
        </div>
      </RigStats2>
    </RowContainer>
  )
}

const renderRigs = (props) => {
  const rigData = props.rigData
  const rigs = rigData?.miningRigs.map((rig) => {
    let totalDevices = 0
    let onlineDevices = 0
    let totalRigSpeed = 0
    const profitability = (rig.profitability * props?.btcPrice).toFixed(2).toLocaleString("en-US")
    rig?.devices?.map((device)=>{
      if (device?.status?.enumName !== "DISABLED"){
        totalDevices += 1
      }
      return null;
    })
    rig?.devices?.map((device)=>{
      if (device?.status?.enumName === "MINING"){
        onlineDevices += 1
        device?.speeds.map(speed => {
          totalRigSpeed += parseFloat(speed?.speed)
          return null;
        });
      }
      return null;
    })
    const statusVal = rig?.minerStatus === "OFFLINE" ? "Rig offline" : `Mining (${onlineDevices}/${totalDevices})`
    return (
      <RigContainer key={rig.rigId}>
        <RigItem>{rig.name}</RigItem>
        <RigItem>{statusVal}</RigItem>
        <RigItem>{`${(totalRigSpeed.toFixed(2)).toLocaleString("en-US")} MH`}</RigItem>
        <RigItem>{`$${profitability} / 24hrs`}</RigItem>
      </RigContainer>
    )
  });

  return (
    <div>
      <div>{rigs}</div>
    </div>
  )
}

function Rigs(props) {
  const [speedData, setSpeedData] = useState(0);
  const [powerData, setPowerData] = useState(0);

  useEffect(() => {
    let speedVal = 0
    let powerVal = 0
    props.rigData?.miningRigs.map(rigs => {
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
  }, [props.rigData]);

  return (
    <Container >
      {renderRigData(props, speedData, powerData)}
      {renderRigs(props)}
    </Container>
  );
}



export default Rigs;
