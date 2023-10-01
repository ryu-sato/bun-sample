import { useField } from "remix-validated-form";

type FormInputProps = {
  name: string;
  label: string;
  type: string;
  hidden?: boolean;
};

export const FormInput = ({ name, label, type, hidden = false }: FormInputProps) => {
  const { error, getInputProps } = useField(name);

  const noneDisplay = type === 'hidden' || hidden;
  const style = {
    display: noneDisplay ? 'none' : undefined,
  };

  return (
    <div style={ style }>
      <label htmlFor={ name } className="form-label">{ label }</label>
      <input type={ type } className="form-control" {...getInputProps({ id: name })} />
      { error && (
        <span style={{ color: "red" }}>{ error }</span>
      )}
    </div>
  );
};
