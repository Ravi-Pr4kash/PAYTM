import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSignin = async() => {
       try{
        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
            username: email,
            password
        });
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard')
       } catch(e) {
        alert("Sign-in failed! Check your credentials.");
       }
    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={'Sign in'}></Heading>
                    <SubHeading label={"Enter your credentials to access your account"}></SubHeading>

                    <InputBox placeholder={'email'} label={"Email"} onChange={(e) => (
                        setEmail(e.target.value)
                    )}></InputBox>
                    <InputBox placeholder={'password'} label={"Password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }}></InputBox>

                    <div className="pt-4">
                        <Button label={'Sign in'} onClick={handleSignin}></Button>
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}