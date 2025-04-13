import { Button } from "./Button"
import { useNavigate } from "react-router-dom"

export const User = ({user, onClic}) => {
    const navigate = useNavigate()
    return <div >
        <div className="flex justify-between w-full items-center">
            <div className="flex flex-row items-center gap-4">
                <div className="cursor-pointer bg-black rounded-full h-12 w-12">
                <div className="flex flex-col h-full  justify-center items-center text-2xl text-white">{user.firstName[0]}</div>
                </div>
                <div>
                    {user.firstName}
                    
                </div>
            </div>

            
            <Button onClick={(e) => {navigate("/send?id="+ user.userID + "&name=" + user.firstName)}} label="Send Money"></Button>
        </div>   
    </div>
}