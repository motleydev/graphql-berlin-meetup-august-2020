import { useState } from 'react';
import { useForm, FormContext } from 'react-hook-form';

import * as Fields from './FormFields';

export default function Form({ id, fields, submissionLabel }) {
  if (!fields) return null;

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const { handleSubmit, ...methods } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({ id, ...values }),
      });

      if (!response.ok)
        throw new Error(`Something went wrong submitting the form.`);

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) return <p>Form submitted. We'll be in touch!</p>;

  return (
    <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
      <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
        <div className="px-4 py-8 sm:px-10">
          <FormContext {...methods}>
            <div className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {fields.map(({ __typename, ...field }, index) => {
                  const Field = Fields[__typename];

                  if (!Field) return null;

                  return <Field key={index} {...field} />;
                })}

                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    {submissionLabel}
                  </button>
                  {error && <span>{error}</span>}
                </span>
              </form>
            </div>
          </FormContext>
        </div>
        <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
          <p className="text-xs leading-5 text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Terms
            </a>
            ,{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Data Policy
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Cookies Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
