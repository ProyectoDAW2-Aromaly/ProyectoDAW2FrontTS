type Props = {
    items: string[];
    label: string;
    value?: string;
    onChange: (value: string) => void;
    sobreescribirClasesSelect?: string;
};

export const SelectFiltro = ({
    items,
    label,
    value,
    onChange,
    sobreescribirClasesSelect = "select select-sm w-60",
}: Props) => {
    return (
        <select
            className={sobreescribirClasesSelect}
            defaultValue=""
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
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

export const SelectFilter = SelectFiltro;
