import styled from "styled-components";
import { useEffect,useContext } from "react";
import { AppContext } from "./AppContext"; 
import BoardCard from "./BoardCard";

const StartGameMenu = () => {

    const {
        actions: {  
            setPackCategory, setGamePacks,
            goStartGame,
        },
        state: {  CDAT,
            customPacks,
            cardWidth,cardHeight,
            startGamePackCategory, startGameSelectedPacks,
            boardHeight,
        },
    } = useContext(AppContext);


    return (
        <GameMenuDiv>
             <Separator/>
            <MenuDiv style={{flex:2}}><NoGameDiv>No game in progress</NoGameDiv></MenuDiv>
            <Separator/>
            <MenuDiv><StartGameButton
                 {...( (startGameSelectedPacks[0]===null || startGameSelectedPacks[1]===null) ?{disabled:true,className:"disabled"}:{})}
                    onClick={(event)=>{
                        goStartGame();
                    }}
                >Start New Game</StartGameButton></MenuDiv>
            <Separator/>
            <BigMenuDiv > 
                <div style={{display:"flex",flexDirection:"row"}}>   
                     
                        {startGameSelectedPacks[0] === null && (<div><CardContain  style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}><EmptyCardDiv>Pack 1 not chosen</EmptyCardDiv></CardContain>---</div>  ) 
                            || ( <div><CardContain  style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}><BoardCard  
                                        cardObj={startGameSelectedPacks[0].greatLand}
                                        /></CardContain>  {startGameSelectedPacks[0].packName}</div> 
                                        )}
                        {startGameSelectedPacks[1] === null && (<div><CardContain  style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}><EmptyCardDiv>Pack 2 not chosen</EmptyCardDiv></CardContain>---</div> ) 
                            || ( <div><CardContain  style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}><BoardCard  
                                        cardObj={startGameSelectedPacks[1].greatLand}
                                        /></CardContain>  {startGameSelectedPacks[1].packName}</div> 
                                        )}
                        
                     </div>




                <div>    - <PackCategoryCardButton
                        {...( startGamePackCategory==="default" ?{className:"currentselect"}:{})}
                        onClick={(event)=>{

                            setPackCategory("default"); }}
                    >Default Packs</PackCategoryCardButton> - 
                    <PackCategoryCardButton
                        {...( startGamePackCategory==="custom" ?{className:"currentselect"}:{})}
                        onClick={(event)=>{
                            setPackCategory("custom"); }}
                    >Custom Packs</PackCategoryCardButton> -  
                    <PackCategoryCardButton
                        {...( startGamePackCategory==="team30" ?{className:"currentselect"}:{})}
                        onClick={(event)=>{
                            setPackCategory("team30"); }}
                    >Team 30 Packs</PackCategoryCardButton> - </div>
                <PackChoiceDiv
                    style={{maxHeight:`${boardHeight/4}px`}}
                    >   
                    {startGamePackCategory === "default" && (
                        <>
                        {CDAT.BasicPacks.map((_pack,_packIndex)=>{
                            
                            return(
                            <PackChoiceButton
                            {...( ((startGameSelectedPacks[0] === _pack) || 
                            (startGameSelectedPacks[1] === _pack)) ?{className:"currentselect"}:{})}
                                onClick={(event)=>{
                                    setGamePacks(_pack);
                                    }}
                                >
                                <CardContain
                                    style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}
                                    >
                                    <BoardCard 
                                        cardObj={_pack.greatLand}
                                        />
                                </CardContain>
                                {_pack.packName}
                            
                            </PackChoiceButton>)
                        }
                        )}     
                        </>
                    ) } 

                    {startGamePackCategory === "custom" && (
                        <>
                        {customPacks.map((_pack,_packIndex)=>{
                            
                            return(
                            <PackChoiceButton
                            {...( ((startGameSelectedPacks[0] === _pack) || 
                            (startGameSelectedPacks[1] === _pack)) ?{className:"currentselect"}:{})}
                                onClick={(event)=>{
                                    setGamePacks(_pack);
                                    }}
                                >
                                <CardContain
                                    style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}
                                    >
                                    <BoardCard 
                                        cardObj={_pack.greatLand}
                                        />
                                </CardContain>
                                {_pack.packName}
                            
                            </PackChoiceButton>)
                        }
                        )}     
                        </>
                    ) } 
                </PackChoiceDiv>
            </BigMenuDiv> 
            <Separator/>
            <Separator/>
            <Separator/>
            <Separator/> 
            <Separator/> 
            <Separator/> 
            <Separator/> 
        </GameMenuDiv>
    )

}


const StartGameButton = styled.button`
font-size: 50px;
border: 2px solid black;
border-radius: 20px;
padding: 40px 90px 40px 90px;
background-color: #DDDDDD;
&:hover{
    cursor: pointer;
    filter:brightness(0.9); 
}
&:active{
    filter:brightness(0.7); 
}
&.disabled{   
    cursor: not-allowed;
    filter:brightness(0.6);
}
`

const PackChoiceButton = styled.button`
cursor: pointer;
border: 1px solid black;
border-radius: 6px;
padding: 12px 12px 12px 12px; 
margin:4px 4px 4px 4px;
&.currentselect{
    padding: 8px 8px 8px 8px; 
    border: 5px solid yellow; 
}
`

const CardContain = styled.div` 
text-align: left;
margin:5px;
position: relative;
width:100%;
height:300px;
border: 4px solid black;
`

const PackChoiceDiv = styled.div`
overflow-y: auto;  
`

const EmptyCardDiv = styled.div`
font-size: 22px;
width:100%;
height:100%;
background-color: white;
text-align: center;

`


const GameMenuDiv = styled.div`
color:yellow;
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
min-width: 100%; 
min-height: 100%;
z-index: 5;
margin:20px 10px 10px 10px;
`

const NoGameDiv = styled.div` 
font-size:60px;
`

const PackCategoryCardButton = styled.button`
cursor: pointer;
border-radius: 10px;
border: 1px solid black;
padding: 20px 60px 20px 60px; 
&.currentselect{
    
    border: 5px solid yellow;
}
`

const BigMenuDiv = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
color:black;
width:60%;
max-height:10%;
border-radius: 22px;
padding:10px;
background-color: rgba(255,255,255,0.8);
flex:5;

`
const MenuDiv = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
color:black;
width:60%;
max-height:10%;
border-radius: 22px;
padding:10px;
background-color: rgba(255,255,255,0.8);
flex:3;

`

const Separator = styled.div`
flex:1;
`

export default StartGameMenu