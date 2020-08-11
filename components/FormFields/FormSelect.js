import { useFormContext } from 'react-hook-form';

export default function FormSelect({ selectLabel, options, ...rest }) {
  if (!options) return null;

  const { register } = useFormContext();
  const { name } = rest;

  return (
    <div>
      <label
        className="block text-sm leading-5 font-medium text-gray-700"
        htmlFor={name}
      >
        {selectLabel || name}
      </label>
      <select
        className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        ref={register({ required: rest.required })}
        id={name}
        {...rest}
      >
        {options.map(({ option, ...opt }, index) => (
          <option key={index} {...opt}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
