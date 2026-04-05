type Props = {
    items: string[];
    label: string;
    value?: string;
    onChange: (value: string) => void;
    overrideSelectClasses?: string 
};

export const SelectFilter = ({ items, label, value, onChange, overrideSelectClasses = "select select-sm w-60" }: Props) => {

    return (
        <select className={overrideSelectClasses} defaultValue="" value={value} onChange={(e) => onChange(e.target.value)}>
            <option disabled value="">
                {label}
            </option>

            {items.map((item: string) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};