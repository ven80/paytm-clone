import { NavBar } from "../components/NavBar"
import { User } from "../components/User"
import { useEffect, useState } from "react"
import axios from "axios"

export const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [balance, setBalance] = useState(0)
    const [filter, setFilter] = useState("")

    useEffect(() => {
       axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then((res)=> {    setUsers(res.data.user) })
       axios.get("http://localhost:3000/api/v1/account/balance?userId=" + localStorage.getItem("userId"),
            {
                headers:{
                    "Authorization": "Bearer "+localStorage.getItem("token")
                }
            }
        ).then((res)=> {    
        console.log("Hitting Balance");
        
        setBalance(res.data.balance) })
    
    }, [filter])

    return <>
        <NavBar></NavBar>
        <div className="flex h-screen bg-red-00 ">
            <div className="flex flex-col bg-green-00 w-full p-8 gap-8">
                <div className="flex text-xl">
                    Balance : {"$"+balance}
                </div>
                <div className="w-full flex items-center bg-white gap-2 p-3 border-2 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input onChange={(e) => {
                        setFilter(e.target.value)
                    }} className="w-full focus: outline-none" type="text"  placeholder="Search Users"  />
                </div>
                <div className="flex flex-col gap-12 bg-green-00 flex">
                   {users.map(user => <User user={user} key={user.userID}/>)}
                </div>
                
            </div> 
            
        </div>
        

    </>
}