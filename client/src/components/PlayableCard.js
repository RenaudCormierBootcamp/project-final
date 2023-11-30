import styled from "styled-components"
import { useContext } from "react";
import { AppContext } from "./AppContext";

import BoardCard from "./BoardCard";


const PlayableCard = ({cardObj}) =>{
    const posX = 99;
    const posY = 99;
    const {
        actions: { chooseCard, contextMouseOver,contextMouseStop },
        state: { boardGrid, mouseOver,cardHeight,cardWidth },
    } = useContext(AppContext); 

    
    return (
        <PlayCardDiv 
            onClick={()=>{ 
                chooseCard({card:cardObj});
            }}
            style={{
            height:`${cardHeight}px`,
            width:`${cardWidth}px`
        }}>
         <BoardCard cardObj={cardObj}/>
        </PlayCardDiv>
    )

}

const PlayCardDiv = styled.div`
cursor: pointer;
position: absolute;
z-index: 99;
background-color: blue; 
 width:100%;
 height:100%;
 z-index: 55;
 &:hover{
    transform: scale(1.2);
 }
`

export default PlayableCard