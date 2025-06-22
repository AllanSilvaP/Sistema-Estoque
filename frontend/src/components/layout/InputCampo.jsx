export default function InputCampo ({type = "text", value, onChange, placeholder, className  = ''}) {
    return (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} 
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}/>
    )
}