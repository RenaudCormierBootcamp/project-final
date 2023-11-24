//functionality section
import { useEffect, useContext } from 'react';
import {styled, keyframes} from 'styled-components';
//utilities section
import GlobalStyles from './GlobalStyles';
import col from './utility/colors';
//components section
import Navbar from './Navbar';
import GameBoard from './GameBoard';
import { AppContext } from './AppContext';
 
import starUrl from '../assets/star_background.png';

function App() {

  const {
    actions: { contextDimensions, setMousePos },
    state: { windowWidth,windowHeight },
} = useContext(AppContext);

  ///keep track of resizing the window
  const updateDimensions = () =>{ 
    contextDimensions([window.innerWidth, window.innerHeight]); 
  }
  useEffect(()=>{
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
    ,[])
  ///---------------------------- 


  return (
    
    <>
    <GlobalStyles/> 
    <MainAppDiv   style={{minHeight: `${windowHeight}px`,minWidth: `${windowWidth}px`}}>
      <Navbar />
        <div>
      <StarBackground>
      </StarBackground>
          <GameBoard/>
        </div>
        
    </MainAppDiv>
    
    </> 
  ); 


}

//--styled components start here ---
const spaceAnim = keyframes`  
  50%{ background-color: rgb(6,0,4); } 
` 
const starAnim = keyframes`  
  10%{ 
    filter: drop-shadow(3px 0 0 #ff5500) drop-shadow(-3px 0 0 #ff5500);
    } 
  20%{ 
    filter: none
    } 
` 

const MainAppDiv = styled.div`  
position: fixed;
width:100%;   
height:100%;
background-color: rgb(8,0,18);
animation: ${spaceAnim} 12s infinite;
`
const StarBackground = styled.div`
position: absolute;
min-width:100%;
min-height:100%;
background-image: url(${starUrl}); 
background-repeat: round;
filter: none;
animation: ${starAnim} 12s infinite;
z-index: 2;
`



export default App;