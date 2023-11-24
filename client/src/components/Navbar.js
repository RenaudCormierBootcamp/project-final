//functionality section
import styled from 'styled-components';  
import { useContext } from 'react';
import { AppContext } from './AppContext';
//utility
import col from './utility/colors';

const Navbar = () => {

    const {
        actions: {  },
        state: { windowWidth,windowHeight },
    } = useContext(AppContext);

    return (
        <MainNavbarDiv>
            <UserInfo>
                NOT LOGGED IN
            </UserInfo>
            <div>CAT</div>
            <div>CAT</div>
            <div>CAT</div>
            <div>CAT</div>
            <div>CAT</div>
        </MainNavbarDiv>
    )

}


const MainNavbarDiv = styled.div`
position: relative;
padding: 5px 15px 5px 15px;
width:calc(100%-30px); 
height:60px;

display:flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

color:white;
background-color: ${col.goodGrey}; 

box-shadow: rgb(255, 110, 0) 0px 0px 0px 3px, rgb(255, 255, 255) 0px 0px 0px 5px,  rgb(23, 23, 23) 0px 0px 0px 7px;  
z-index: 99;
 
`
const UserInfo = styled.div`
padding:20px;

`

export default Navbar