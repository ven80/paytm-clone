import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    return <>
        <div className="flex h-screen justify-center">
            <div className="w-80 flex flex-col justify-center gap-8">
                <div className="flex flex-col gap-2">
                <Heading label={"Signup"}></Heading>
                <div>Enter your details below to get registered.</div>
                </div>
                <div className="flex flex-col gap-6">
                    <InputBox onChange={(e) => {setFirstName(e.target.value)}} label="First Name" type="text" placeholder="John"></InputBox>
                    <InputBox onChange={(e) => {setLastName(e.target.value)}} label="Last Name" type="text" placeholder="Doe"></InputBox>
                    <InputBox onChange={(e) => {setUserName(e.target.value)}} label="Email" type="text" placeholder="johndoe@gmail.com"></InputBox>
                    <InputBox onChange={(e) => {setPassword(e.target.value)}} label="Password" type="text" placeholder=""></InputBox>
                </div>
                <Button label={"Signup"} onClick={async () => {
                    const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        firstName,
                        lastName,
                        userName,
                        password

                    },{
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("userId", res.data.userId)
                    navigate("/dashboard")
                }}>
                </Button>    
                <div className="flex flex-row justify-center space-x-2">
                    <div>Already have an account?</div>
                    <Link to={"/signin"} className="pointer underline font-bold">
                        Signin
                    </Link>
                </div>

            </div>
            
        </div> 
    </>
}