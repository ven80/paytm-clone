export const InputBox = ({label, type, placeholder, onChange}) => {

    return <>
        <div className="flex flex-col gap-2">
            {label}
            <input onChange={onChange} type={type} placeholder={placeholder} className="border rounded p-2" />
        </div>
        
    </>
}