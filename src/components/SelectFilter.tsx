type Props = {
    items: string[];
    label: string;
    value?: string;
    onChange: (value: string) => void;
};

export const SelectFilter = ({ items, label, value, onChange }: Props) => {

    return (

        <select className="select w-60" defaultValue="" value={value} onChange={(e) => onChange(e.target.value)}>
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