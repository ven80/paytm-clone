import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"


export const SendMoney = () => {
    const [amount, setAmount] = useState(0)

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id") 
    const name = searchParams.get("name") 
    return <> <div className="flex h-screen justify-center">
            <div className="w-80 flex flex-col justify-center gap-12">
                
                <Heading label={"Send Money"}></Heading>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-4">
                            <div className="cursor-pointer bg-black rounded-full h-12 w-12">
                                <div className="flex flex-col h-full  justify-center items-center text-2xl text-white">{name[0].toUpperCase()}</div>
                            </div>
                            <div>
                                {name}  
                            </div>
                        </div>
                        <InputBox onChange={(e) => {setAmount(e.target.value)}} type="number" placeholder="Enter amount"></InputBox>
                    </div>
                    <Button label={"Send"} onClick={async () => {
                        
                        const res = await axios.post("http://localhost:3000/api/v1/account/transfer",
                            
                            {    
                                to: id,
                                amount: amount
                            },
                            {
                                headers: {
                                    "authorization": "Bearer " + localStorage.getItem("token")
                                }
                            }                            
                        )

                    }}></Button>    
                    <Button label={"Cancel"} bgColor={"gray"} onClick={(e) => {navigate("/dashboard")}}></Button>
                </div>
               
            </div>
            
        </div> 
    </>
}