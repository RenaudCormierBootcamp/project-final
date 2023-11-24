import styled from "styled-components"
import { useContext,useEffect,useState } from "react"
import { AppContext } from "./AppContext"; 
import col from "./utility/colors"; 
import { GiOlive } from "react-icons/gi";
import { PiTreeDuotone } from "react-icons/pi";
import { GiCactus } from "react-icons/gi";

const CardObject = ({posX,posY}) => { 
    const {
        actions: { setCard, contextMouseOver,contextMouseStop },
        state: { boardGrid, mouseOver },
    } = useContext(AppContext);


    const [color,setColor] = useState(`rgba(255,255,255,0)`); 

    useEffect(
        ()=>{ 
            setColor(`#F9DCA0`);
            //setColor(`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`);
        }
        ,[])
 

    const patternCreate = (color,shape,patternX=0,patternY=0.05,patternW=0.6,patternH=0.2) =>{

        return (<svg id={`cardPattern`+String(posX)+`,`+String(posY)}   width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id={`pattern-circles`+String(posX)+`,`+String(posY)}
                x={`${patternX}`}
                y={`${patternY}`}
                width={`${patternW}`}
                height={`${patternH}`}
                patternUnits="objectBoundingBox"
                patternContentUnits="objectBoundingBox">
                    <rect fill={`${color}`} id={`pattern-circle`+String(posX)+`,`+String(posY)} width="0.15" height="0.05"  />
                    <rect fill={`${color}`} id={`pattern-circle`+String(posX)+`,`+String(posY)} width="0.25" height="0.05" x="0.2" y="0.05"  />
        </pattern>
        
        <rect id={`rect`+String(posX)+`,`+String(posY)} x="0" y="0" width="100%" height="100%" fill={`url(#pattern-circles${String(posX)+`,`+String(posY)})`} />
    </svg> ) 
    }

    return (
        <>
        <CardContain id="contain" style={{backgroundColor:`${color}`}}>   
        <GiCactus color="green" style={{filter:"drop-shadow(rgba(0,0,0,0.9) 0px 0px 1px)",position:"absolute",width:"40%",height:"40%"}} />        
            {patternCreate("#FF8F03")} 
            </CardContain>
        
      </>
    )

}


const CardContain = styled.div` 
 position: absolute;
 width:100%;
 height:100%;
 z-index: 5;
  
` 
const CardSecondPattern = styled.div` 
 width:100%;
 height:100%; 
`

export default CardObject