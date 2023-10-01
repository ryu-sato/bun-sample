import { useState } from "react";
import { useField } from "remix-validated-form";

type Option = {
  value: number | string,
  label: string,
}

type FormInputProps = {
  name: string;
  label: string;
  options: Array<Option>;
  nullable?: boolean;
};

export const FormSelect = ({ name, label, options, nullable = true }: FormInputProps) => {
  const { error, defaultValue } = useField(name);
  const [value, setValue] = useState(defaultValue as number);

  return (
    <div>
      <label htmlFor={ name } className="form-label">{ label }</label>
      <select name={ name } className="form-control" value={ value || 0 } onChange={ (e) => setValue(Number(e.target.value)) }>
        { nullable &&
          <option value="0"></option>
        }
        { options.map(o => (
          <option key={ o.value.toString() } value={ o.value }>{ o.label }</option>
        ))}
      </select>
      { error && (
        <span style={{ color: "red" }}>{ error }</span>
      )}
    </div>
  );
};
