import { useFormContext } from 'react-hook-form';

export default function FormCheckbox({ checkboxLabel, ...rest }) {
  const { name } = rest;
  const { register } = useFormContext();

  return (
    <div className="flex">
      <input
        ref={register({ required: rest.required })}
        id={name}
        type="checkbox"
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        {...rest}
      />
      <label
        htmlFor={name}
        className="ml-2 block text-sm leading-5 text-gray-900"
      >
        {checkboxLabel || name}
      </label>
    </div>
  );
}
