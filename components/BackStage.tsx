import { Image, ImageProps, ViewStyle, StyleSheet, Platform } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Box, Text } from "@react-native-material/core";

interface Props {
    scale: number,
    style: ViewStyle
}

interface ImgPos{
    angl: number,
    left: number,
    top: number
}

const strips = (scale: number = 1) => {
    let buf: {img: ImageProps, box: ViewStyle}[] = [];
    const style = (rotate: number) => {
        return {img: {
                transform: [
                    {scale: scale/7.5},
                    {rotateZ: `${(rotate*30 + 90)}deg`}
                ]
            },
            box: {
                position: 'absolute',
                transform: [
                    {translateY: -110*Math.sin(rotate*30*Math.PI/180)},
                    {translateX: -110*Math.cos(rotate*30*Math.PI/180)}
                ]
            }
        }
    }
    for (let i = 0; i < 12; i++)
        buf.push(style(i) as {img: ImageProps, box: ViewStyle})
    return buf
}

function StripsEl({style}: {style: {img: ImageProps, box: ViewStyle}}) {
    return (
        <Box style={style.box}>
            <Image style={style.img} source={require('@/assets/images/spamigorLogoL.png')} />
        </Box>
    )
}

export default function BackStage (props: Props) {

    const face: {img: ImageProps, box: ViewStyle}[] = strips(props.scale);

    return (
        <Box style={{...props.style, position: 'absolute'}}>
            <Box style={{alignItems: 'center', justifyContent: 'center', position:'absolute'}}>
                {face.map((item: {img: ImageProps, box: ViewStyle}, index: number)=>{
                    return (<StripsEl key={index} style={item as {img: ImageProps, box: ViewStyle}} />)}
                )}
            </Box>
        </Box>
    )
}