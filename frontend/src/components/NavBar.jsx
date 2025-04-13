import PaytmLogo from "../assets/PaytmLogo.svg"

export const NavBar = () => {
    return <>
        <div className="flex justify-between items-center p-4">
            <div>
                <img src={PaytmLogo} alt="Paytm logo" width={"100"} height={"100"} />
            </div>
           <div className="flex gap-4 items-center">
            <div >Hello, {"username"}</div>
            <div className="cursor-pointer bg-black rounded-full h-12 w-12">
                <div className="flex flex-col h-full  justify-center items-center text-2xl text-white">{}</div>
            </div>
           </div>
            
        </div>
    </>
}