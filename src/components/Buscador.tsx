export const Buscador = ({
    value,
    onChange
}: {
    value: string;
    onChange: (v: string) => void
}) => {
    return (
        <label className="input w-full max-w-6xl mx-auto flex items-center gap-2 mb-6">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input 
                className="w-full" 
                type="search" 
                placeholder="Buscar"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    )
}