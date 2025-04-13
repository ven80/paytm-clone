export const Button = ({label, onClick, bgColor}) => {

    if(bgColor === "gray"){
        return <>

        <button onClick={onClick} className="bg-gray-300 rounded p-2 text-1xl text-black p-1">
            {label}
        </button>
    </>
    }
    return <>

    <button onClick={onClick} className="bg-black rounded p-2 text-1xl text-white p-1">
        {label}
    </button>
</>
}