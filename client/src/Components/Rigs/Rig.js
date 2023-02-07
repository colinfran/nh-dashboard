import {useState, useEffect} from "react";
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import styled from '@emotion/styled'
import { styled as mstyled} from '@mui/material/styles';
import uniqid from 'uniqid';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const RigContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
  padding: 0.25em 1em;
`
const RigItem = styled.div`
  flex: 1 1;
  display:flex;
  font-size: calc(4px + 2vmin);
`

const TablePaper = mstyled(Paper)(({ theme }) => ({
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


function Rig(props) {
  const [open, setOpen] = useState(false);

  const [totalDevices, setTotalDevices] = useState(0);
  const [onlineDevices, setOnlineDevices] = useState(0);
  const [totalRigSpeed, setTotalRigSpeed] = useState(0);
  const [totalRigpower, setTotalRigPower] = useState(0);

  useEffect(() => {
    let totalDevicesVal = 0
    let onlineDevicesVal = 0
    let totalRigSpeedVal = 0
    let totalRigPowerVal = 0
    props?.rig?.devices?.map((device)=>{
      if (device?.status?.enumName !== "DISABLED"){
        totalDevicesVal += 1
      }
      return null;
    })
    props?.rig?.devices?.map((device)=>{
      if (device?.status?.enumName === "MINING"){
        onlineDevicesVal += 1
        totalRigPowerVal += device.powerUsage
        device?.speeds.map(speed => {
          totalRigSpeedVal += parseFloat(speed?.speed)
          return null;
        });
      }
      return null;
    })
    setTotalRigSpeed(totalRigSpeedVal)
    setTotalDevices(totalDevicesVal)
    setOnlineDevices(onlineDevicesVal)
    setTotalRigPower(totalRigPowerVal)
    
  }, [props.rig.devices])

  const {
    profitability,
    rig,
  } = props

  const openstyle = open ? {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  } : {}

  const statusVal = rig?.minerStatus === "OFFLINE" ? "Rig offline" : `Mining (${onlineDevices}/${totalDevices})`
  const efficiency = totalRigSpeed === 0 && totalRigpower === 0 ? 0 : (totalRigSpeed/totalRigpower).toFixed(2)

  return (
    <div>
      <OuterContainer elevation={5} onClick={()=> setOpen(!open)} openstyle={openstyle}>
        <RigContainer>
          <RigItem>{rig.name}</RigItem>
          <RigItem>{statusVal}</RigItem>
          <RigItem>{`${(totalRigSpeed?.toFixed(2))} MH`}</RigItem>
          <RigItem>{`${totalRigpower} W`}</RigItem>
          <RigItem>{`${efficiency} MH/W`}</RigItem>
          <RigItem>{`$${profitability} / 24hrs`}</RigItem>
        </RigContainer>
      </OuterContainer>
      {rig?.minerStatus !== "OFFLINE" && (
        <Collapse in={open}>
          <div>
            <TableContainer component={TablePaper} elevation={5}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {rig.devices.map((device) => {
                    const temp = device.temperature % 65536
                    const vramtemp = ~~(device.temperature / 65536)
                    const speed = parseFloat(device?.speeds[0]?.speed || 0).toFixed(2)
                    const fanSpeed = device.revolutionsPerMinutePercentage
                    const power = device.powerUsage
                    const efficiency = speed === undefined || power === -1 ? 0 : parseFloat(speed/power).toFixed(2)
                    if (device.status.enumName === "DISABLED") return null
                    return (
                      <TableRow
                        key={`${uniqid()}`}
                        sx={{ 
                          fontSize: "calc(4px + 2vmin)",
                          '&:last-child td, &:last-child th': { 
                            border: 0 
                          } }}
                      >
                        <TableCell className="TableStyle" component="th" scope="row">{device.name}</TableCell>
                        <TableCell className="TableStyle" align="right">{`Temp: ${temp}ºC`}</TableCell>
                        <TableCell className="TableStyle" align="right">{`Vram: ${vramtemp}ºC`}</TableCell>
                        <TableCell className="TableStyle" align="right">{`Fan: ${fanSpeed}%`}</TableCell>
                        <TableCell className="TableStyle" align="right">{`Speed: ${speed} MH`}</TableCell>
                        <TableCell className="TableStyle" align="right">{`Power: ${power} W`}</TableCell>
                        <TableCell className="TableStyle" align="right">{`Eff: ${efficiency} MH/W`}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Collapse>
      )}
    </div>
  );
}

export default Rig;