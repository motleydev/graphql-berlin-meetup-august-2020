import { useFormContext } from 'react-hook-form';

export default function FormInput({ inputLabel, type: enumType, ...rest }) {
  const { name } = rest;
  const type = enumType.toLowerCase();
  const { register } = useFormContext();

  return (
    <div>
      <label
        className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
        htmlFor={name}
      >
        {inputLabel || name}
      </label>
      <div className="rounded-md shadow-sm">
        <input
          id="name"
          placeholder={inputLabel || name}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          ref={register({ required: rest.required })}
          id={name}
          type={type}
          {...rest}
        />
      </div>
    </div>
  );
}
