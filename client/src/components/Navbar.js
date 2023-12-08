//functionality section
import styled from 'styled-components';  
import { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { Link } from 'react-router-dom';
//utility
import col from './utility/colors';

const Navbar = () => {

    const {
        actions: { newRegister, attemptLogin, attemptAutoCookieLogin, logOut, 
            getBasicPacks,},
        state: { windowWidth,windowHeight, cardHeight, userInfo },
    } = useContext(AppContext);

    const [displayLogin,setDisplayLogin] = useState(0);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [checkPassword,setCheckPassword] = useState("");

    useEffect(()=>{
        if (userInfo.username != null)
        {
            setDisplayLogin(0);
        }

    },[userInfo])

    useEffect(()=>{
        attemptAutoCookieLogin();
        getBasicPacks();
    },[])

    return (
        <MainNavbarDiv style={{height:`${cardHeight/3}px`}} >
            {userInfo.username === null && (
            <UserInfo style={{width:`${windowWidth/9}px`}}> 
                <p>NOT LOGGED IN  
                <LoginButton
                onClick={()=>{
                    setDisplayLogin(1);
                }}
                >Log in</LoginButton> </p>
                {displayLogin > 0 && (
                    <LoginPopup>
                        <p>User/email:   <LoginInput type="text" onChange={(event)=>{setUsername(event.target.value)}}></LoginInput></p>
                        <p>--</p>
                        <p>Password:   <LoginInput type="password" onChange={(event)=>{setPassword(event.target.value)}}></LoginInput></p>
                        <p>--</p>
                        <ManyButtonsDiv>
                         <ButtonDiv><LoginButton
                         onClick={()=>{attemptLogin({username:username,password:password})}}
                         >LOG IN</LoginButton></ButtonDiv> <ButtonDiv><LoginButton
                         onClick={()=>{setDisplayLogin(2)}}
                         >Sign Up</LoginButton></ButtonDiv>
                         </ManyButtonsDiv>
                    </LoginPopup>
                )}
                {displayLogin == 2 && (

                    <RegisterPopup>
                        <p>Username:   <LoginInput type="text" onChange={(event)=>{setUsername(event.target.value)}}></LoginInput></p>
                        <p>--</p>
                        <p>Email:   <LoginInput type="text" onChange={(event)=>{setEmail(event.target.value)}}></LoginInput></p>
                        <p>--</p>
                        <p>Password:   <LoginInput type="password" onChange={(event)=>{setPassword(event.target.value)}}></LoginInput></p>
                        <p>--</p> 
                        <p>Confirm Password:   <LoginInput type="password" onChange={(event)=>{setCheckPassword(event.target.value)}}></LoginInput></p>
                        <p>--</p>
                        <ManyButtonsDiv>
                         <ButtonDiv><LoginButton
                         onClick={()=>{setDisplayLogin(1)}}
                         >cancel</LoginButton></ButtonDiv> 
                         <ButtonDiv><LoginButton onClick={()=>{
                            if (username.length < 4)
                            {
                                alert("username must be at least 4 characters");
                            }  
                            else if (password === checkPassword)
                            {  
                                newRegister({ 
                                    username:username,password:password,email:email
                                }) 
                             }
                             else{ alert("passwords don't match")}
                         }}>REGISTER</LoginButton></ButtonDiv>
                         </ManyButtonsDiv>
                    </RegisterPopup>
                )} 
            </UserInfo> )}
            {userInfo.username != null && (<>
                <UserInfo style={{width:`${windowWidth/9}px`}}>
                    Logged in as <span style={{fontWeight:"bold"}}>{userInfo.username}</span> 
                    <LoginButton
                        onClick={()=>{
                            logOut();
                        }}
                    >{"(Logout)"}</LoginButton>
                </UserInfo>
            </>)}


            <NavLink><Link to="./"><LinkHover>Game</LinkHover></Link></NavLink>
            <NavLink><Link to="./cardMake"><LinkHover>Make Cards</LinkHover></Link></NavLink>
            <NavLink>Match history</NavLink>
            <NavLink>Weather:</NavLink>
            <NavLink style={{visibility:"hidden"}}>Just a separator</NavLink>
        </MainNavbarDiv>
    )

}
const NavLink = styled.div`
flex:1;
`
const LinkHover = styled.span`

&:hover{
    color:rgb(255,120,0);
    text-decoration: underline;
}
`


const LoginInput = styled.input`
float: right;
`

const ButtonDiv = styled.div`
position: relative;
width: fit-content;
height: fit-content;
padding:8px;
`
const ManyButtonsDiv = styled.div`
display: flex;

`

const LoginPopup = styled.div`
    padding:10px 20px 10px 20px;
    top:0px;
    position: absolute;
    min-width: 200px;
    min-height: 100px;
    background-color: #232323;
    border: 2px solid white; 
    input{
        padding:2px;
        color:black;
    }
`
const RegisterPopup = styled.div`
    padding:10px 20px 10px 20px;
    top:0px;
    position: absolute;
    min-width: 200px;
    min-height: 100px;
    background-color: #232323;
    border: 2px solid white; 
    input{
        padding:2px;
        color:black;
    }
`


const LoginButton = styled.button`
padding: 5px 10px 5px 10px;
border-radius: 5px;
border: 3px solid white;
background-color: black;
margin:1px;
&:hover{
    color:orange;
    margin:0px;
    border: 4px solid yellow;
    background-color: #222233; 
}

&:active{
    color:#995500;
    margin:2px 0px 0px 0px;
    border: 3px solid yellow;
    padding: 7px 11px 3px 11px;

}
`

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
flex:2;
padding:20px;

`

export default Navbar