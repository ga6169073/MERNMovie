export const Message = ({ label, placeholder, register, name }) => {
    return (
        <div className="text-sm w-full">
            <label className="text-border font-semibold">
                {label}
            </label>
            <textarea className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"
                placeholder={placeholder}
                {...register}
                name={name}
                >
            </textarea>
        </div>
    )
}

export const Select = ({ label, options,
    register, name
}) => {
    return (
        <>
            <label className="text-border font-semibold">{label}</label>
            <select className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
                {...register}
                name={name}
            >
                {options.map((option, i) => (
                    <option key={i} value={option.value}>
                        {option.title}
                    </option>
                ))}
            </select>
        </>
    )
}
export const Input = ({ label, placeholder, type, background, register, name, value, onChange }) => {
    return (
        <div className="w-full text-sm">
            <label className="text-border font-semibold">{label}</label>
            <input name={name}
                value={value}
                {...register}
                type={type} placeholder={placeholder} autoComplete="on" onChange={onChange}
                className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${background ? "bg-main" : "bg-dry"
                    }`}>
            </input>
        </div>
    )
}