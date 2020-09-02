import { useFormContext } from 'react-hook-form';

export default function FormTextarea({ textareaLabel, ...rest }) {
  const { register } = useFormContext();
  const { name } = rest;

  return (
    <div className="mt-6 sm:mt-5 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2"
      >
        {textareaLabel || name}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="flex max-w-lg rounded-md shadow-sm">
          <textarea
            id="about"
            rows={3}
            className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"
            ref={register({ required: rest.required })}
            id={name}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
}
