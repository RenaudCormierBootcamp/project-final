import styled from "styled-components"
import { useContext,useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import HandTooltip from "./HandTooltip";

import BoardCard from "./BoardCard";


const PlayableCard = ({cardObj,gridSpan=1}) =>{
    const posX = 99;
    const posY = 99;
    const {
        actions: { chooseCard, contextMouseOver,contextMouseStop, setHandMouseOver },
        state: { boardGrid, mouseOver,cardHeight,cardWidth, currentCard,playerResources, localPlayer },
    } = useContext(AppContext); 
    const [playable,setPlayable] = useState(true);

    useEffect(()=>{
        if (playerResources[localPlayer-1][0] >= cardObj.cost[0] && playerResources[localPlayer-1][1] >= cardObj.cost[1] && playerResources[localPlayer-1][2] >= cardObj.cost[2])
        {
            setPlayable(true);
        }
        else
        {
            setPlayable(false);

        }

    },[playerResources])

    const _widtho = Math.floor(cardWidth*0.5);
    const _heighto = Math.floor(cardHeight*0.5);


    
    return (
        
        <DoubleDiv 
            style={{ 
                gridColumn:`span ${gridSpan}`,
                gridRow:`span ${gridSpan}`,
                minWidth:`${_widtho*gridSpan+8*gridSpan*gridSpan}px`,
                minHeight:`${_heighto*gridSpan+24*gridSpan*gridSpan}px`,
                maxWidth:`${_widtho*gridSpan+8*gridSpan*gridSpan}px`,
                maxHeight:`${_heighto*gridSpan+24*gridSpan*gridSpan}px`,
            }}  
            onClick={()=>{ 
                if (playable)
                {
                    chooseCard({card:cardObj});  
                }
            }}
            onMouseOver={(event)=>{
                setHandMouseOver(cardObj)
               }}
               onMouseOut={(event)=>{
                setHandMouseOver(null)
               }}
               
               {...( (currentCard != null) && (currentCard.name === cardObj.name) ?{className:"selected"}:{})} 
               {...( (playable === false) ?{ disabled:true,className:"disabled"}:{})} 
            ><div>
                
            <PlayCardDiv  
                style={{
                    minWidth:`${_widtho*gridSpan}px`,
                    minHeight:`${_heighto*gridSpan}px`,
                    maxWidth:`${_widtho*gridSpan}px`,
                    maxHeight:`${_heighto*gridSpan}px`,
                }}>
            <BoardCard cardObj={cardObj}/>
            </PlayCardDiv>
         <PlayParagraph

            style={{fontSize:`${_heighto/3.5*gridSpan}px`}}
            >{cardObj.name}</PlayParagraph></div>

        
         
         </DoubleDiv>
    )

}

const DoubleDiv = styled.div` 
padding: 8px 4px 4px 4px;
display: flex;
position: sticky;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
cursor: pointer;
text-align: center;  
max-width: 100%;
background-color: rgba(0,0,0,0.3); 
opacity: 1;
border: 2px solid black;
z-index: 10;
border-radius: 5px;
&:hover{ 
    transition: transform 100ms ease-in, background-color 150ms ease-in;
    z-index: 99;
    transform: scale(1.6);
    background-color: rgba(0,0,0,0.9);
    border: 2px solid white;
 }
 &.selected{
    border: 4px solid yellow;
    padding: 6px 2px 2px 2px; 
    &disabled{
    border: 4px solid gray;

    }
 }
 &.disabled{
    color:gray;
    filter:grayscale(0.4);
 }
`

const PlayParagraph = styled.div`
font-size: 20px;
text-align: center;
`
const PlayCardDiv = styled.div`
border: 1px solid white;
text-align: left;
position: relative;  
 width:100%;
 height:100%;
 z-index: 55;
 
`

export default PlayableCard