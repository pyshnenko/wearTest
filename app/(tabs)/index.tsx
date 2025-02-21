import { Image, ImageProps, ViewStyle, StyleSheet, Platform } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Box, Text } from "@react-native-material/core";
import {Dimensions} from 'react-native';
import BackStage from '@/components/BackStage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scale = 100/windowHeight;

export default function HomeScreen() {

  const [angleS, setAngleS] = useState<number>(0)
  const [angleM, setAngleM] = useState<number>(0)
  const [angleH, setAngleH] = useState<number>(0)

  const seckS = useRef(angleS);
  const seckM = useRef(angleM);
  const seckH = useRef(angleH);

  useEffect(()=>{
    console.log('width' + windowWidth)
    setInterval(()=>{
      setAngleS((new Date()).getSeconds()*6)
      setAngleM((new Date()).getMinutes()*6)
      setAngleH((new Date()).getHours()*30)
    }, 1000)
  }, [])

  useEffect(()=>{
    seckS.current = angleS
    seckM.current = angleM
    seckH.current = angleH
  }, [angleS])

  function styleF<ImageProps>(deg: number) {
    return {
      position: 'absolute',
      transform: [
        {rotateZ: `${deg}deg`},
        {scale: scale}
      ],
      maxWidth: 300
    }
  }

  const boxSX: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex'
  }

  return (
    <Box style={{height: '100%', display:'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
      <Box style={boxSX}><Image style={styleF(angleS) as ImageProps} source={require('../../assets/images/secondsNL.png')} /></Box>
      <Box style={boxSX}><Image style={styleF(angleM) as ImageProps} source={require('../../assets/images/minutesNL.png')} /></Box>
      <Box style={boxSX}><Image style={styleF(angleH) as ImageProps} source={require('../../assets/images/hoursNL.png')} /></Box>
      <BackStage style={boxSX} scale={scale} />
    </Box>
  );
}

// style={{transform: [{rotateZ: `${angle}deg`}]}}