import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";




export const Signup = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Signup"}></Heading>
                <SubHeading label={"Enter your infromation to create an account"}></SubHeading>
                <InputBox label={"Email"} placeholder={"Enter your email"} onChange={e => {
                    setUserName(e.target.value)
                }}></InputBox>
                <InputBox label={"First Name"} placeholder={"Enter your first name"} onChange={e => {
                    setFirstName(e.target.value)
                }}></InputBox>
                <InputBox label={"Last Name"} placeholder={"Enter your last name"} onChange={e => {
                    setLastName(e.target.value)
                }}></InputBox>
                <InputBox label={"Password"} placeholder={"Enter your password"} onChange={e => {
                    setPassword(e.target.value)
                }}></InputBox>
                <div>
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            firstname,
                            lastname,
                            password
                        });
                        localStorage.setItem("token",response.data.token);
                        localStorage.removeItem
                        navigate('/dashboard')
                    }} label={"Signup"}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
}