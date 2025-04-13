import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export const Signin = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    return <>
       <div className="flex h-screen justify-center">
                   <div className="w-80 flex flex-col justify-center gap-8">
                       <div className="flex flex-col gap-2">
                       <Heading label={"Signin"}></Heading>
                       <div>Enter your details to get singed in.</div>
                       </div>
                       <div className="flex flex-col gap-6">
                           <InputBox onChange={(e) => {setUserName(e.target.value)}} label="Username" type="text" placeholder="johndoe@gmail.com"></InputBox>
                           <InputBox onChange={(e) => {setPassword(e.target.value)}} label="Password" type="text" placeholder=""></InputBox>
                       </div>
                       <Button label={"Signin"} onClick={async () => {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            userName,
                            password

                        },{
                            headers: {
                                'authorization': "Bearer " + localStorage.getItem("token")
                            }
                        }) 
                        localStorage.setItem("userId", res.data.userId)                       
                        navigate("/dashboard")
                        }}>
                        </Button>    
                       <div className="flex flex-row justify-center space-x-2">
                        <div>New user?</div>
                        <Link to={"/signup"} className="pointer underline font-bold">
                            Signup
                        </Link>
                       </div>
                   </div>       
        </div> 
    </>
}