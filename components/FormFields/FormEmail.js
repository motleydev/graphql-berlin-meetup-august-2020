import { useFormContext } from 'react-hook-form';

export default function FormEmail({ inputLabel, type: enumType, ...rest }) {
  const { name } = rest;
  const type = enumType.toLowerCase();
  const { register } = useFormContext();

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {inputLabel || name}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </div>
        <input
          className="form-input block w-full pl-10 sm:text-sm sm:leading-5"
          placeholder={inputLabel || name}
          ref={register({ required: rest.required })}
          id={name}
          type={type}
          {...rest}
        />
      </div>
    </div>
  );
}
