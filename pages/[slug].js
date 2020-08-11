import { GraphQLClient } from 'graphql-request';

import Form from '../components/Form';
import Footer from '../components/Footer.js';

export async function getStaticProps({ params: variables }) {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);
  const { page } = await graphcms.request(
    `query page($slug: String!) {
      page(where: {slug: $slug}) {
        title
        slug
        form {
          id
          submissionLabel
          fields {
            __typename
            ... on FormInput {
              name
              type
              inputLabel: label
              placeholder
              required
            }
            ... on FormTextarea {
              name
              textareaLabel: label
              placeholder
              required
            }
            ... on FormCheckbox {
              name
              checkboxLabel: label
              required
            }
            ... on FormSelect {
              name
              selectLabel: label
              options {
                value
                option
              }
              required
            }
          }
        }
      }
    }
    `,
    variables
  );

  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const { pages } = await graphcms.request(`{
    pages {
      slug
    }
  }`);

  return {
    paths: pages.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export default function Index({ page }) {
  const { form } = page;

  return (
    <main className="">
      <div className="relative bg-gray-800 overflow-hidden">
        <div className="hidden sm:block sm:absolute sm:inset-0">
          <svg
            className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-gray-700 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
            width={364}
            height={384}
            viewBox="0 0 364 384"
            fill="none"
          >
            <defs>
              <pattern
                id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width={364}
              height={384}
              fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
            />
          </svg>
        </div>
        <div className="relative pt-6 pb-12 sm:pb-32">
          <nav className="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#" aria-label="Home">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                    alt="Logo"
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"
                    id="main-menu"
                    aria-label="Main menu"
                    aria-haspopup="true"
                  >
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="hidden space-x-10 md:flex md:ml-10">
                <a
                  href="#"
                  className="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  Product
                </a>
                <a
                  href="#"
                  className="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  Company
                </a>
              </div>
            </div>
            <div className="hidden md:flex">
              <a
                href="https://app.graphcms.com/signup"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray focus:border-gray-700 active:bg-gray-700 transition duration-150 ease-in-out"
              >
                Try GraphCMS!
              </a>
            </div>
          </nav>
          {/*
Mobile menu, show/hide based on menu open state.

Entering: "duration-150 ease-out"
  From: "opacity-0 scale-95"
  To: "opacity-100 scale-100"
Leaving: "duration-100 ease-in"
  From: "opacity-100 scale-100"
  To: "opacity-0 scale-95"
    */}
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-md">
              <div
                className="rounded-lg bg-white shadow-xs overflow-hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="main-menu"
              >
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                      alt
                    />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                      aria-label="Close menu"
                    >
                      <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-1 px-2 pt-2 pb-3">
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Product
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Company
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
          <main className="mt-8 sm:mt-16 md:mt-20 lg:mt-24">
            <div className="mx-auto max-w-screen-xl">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                  <div>
                    <a
                      href="https://jobs.graphcms.com"
                      className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                    >
                      <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full">
                        We're hiring
                      </span>
                      <span className="ml-4 text-sm leading-5">
                        Visit our careers page
                      </span>
                      <svg
                        className="ml-2 w-5 h-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <h2 className="mt-4 text-4xl tracking-tight leading-10 font-extrabold text-white sm:mt-5 sm:leading-none sm:text-6xl lg:mt-6 lg:text-5xl xl:text-6xl">
                      Data to enrich your
                      <br className="hidden md:inline" />
                      <span className="text-indigo-400">online business</span>
                    </h2>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo. Elit sunt amet fugiat
                      veniam occaecat fugiat aliqua ad ad non deserunt sunt.
                    </p>
                    <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">
                      Used by
                    </p>
                    <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                      <div className="flex flex-wrap items-start justify-between">
                        <div className="flex justify-center px-1">
                          <img
                            className="h-9 sm:h-10"
                            src="https://tailwindui.com/img/logos/tuple-logo.svg"
                            alt="Tuple"
                          />
                        </div>
                        <div className="flex justify-center px-1">
                          <img
                            className="h-9 sm:h-10"
                            src="https://tailwindui.com/img/logos/workcation-logo.svg"
                            alt="Workcation"
                          />
                        </div>
                        <div className="flex justify-center px-1">
                          <img
                            className="h-9 sm:h-10"
                            src="https://tailwindui.com/img/logos/statickit-logo.svg"
                            alt="StaticKit"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Form {...form} />
              </div>
            </div>
          </main>
        </div>
      </div>
      <section className="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24">
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <svg
            className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            role="img"
            aria-labelledby="svg-workcation"
          >
            <title id="svg-workcation">Workcation</title>
            <defs>
              <pattern
                id="ad119f34-7694-4c31-947f-5c9d249b21f3"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
            />
          </svg>
          <div className="relative">
            <svg className="mx-auto h-10" fill="none" viewBox="0 0 180 40">
              <path
                fill="#2D3748"
                d="M59.267 32.642h3.718L66.087 21.7l3.126 10.94h3.718l4.642-16.576h-3.434l-3.173 12.29-3.481-12.29H64.69l-3.457 12.29-3.174-12.29h-3.433l4.641 16.576zM83.551 32.973c3.481 0 6.276-2.723 6.276-6.252 0-3.528-2.794-6.252-6.276-6.252-3.48 0-6.252 2.724-6.252 6.252 0 3.529 2.771 6.252 6.252 6.252zm0-2.984c-1.8 0-3.197-1.35-3.197-3.268 0-1.918 1.398-3.268 3.197-3.268 1.824 0 3.221 1.35 3.221 3.268 0 1.918-1.397 3.268-3.22 3.268zM95.031 22.837v-2.036h-3.055v11.84h3.055v-5.66c0-2.486 2.013-3.196 3.6-3.007v-3.41c-1.492 0-2.984.663-3.6 2.273zM111.334 32.642l-4.902-5.992 4.76-5.85h-3.647l-4.073 5.21v-9.946h-3.055v16.578h3.055v-5.376l4.31 5.376h3.552z"
              />
              <path
                fill="#5850EC"
                fillRule="evenodd"
                d="M42.342 17.45l-7.596-4.385v20.371h8.88v1.974H.21v-1.974h3.947v-12.55l-3.678.92L0 19.89l20.81-5.202h3.08a9.421 9.421 0 00-.67 2.525l-.477 3.922 5.096-2.942v15.243h4.933v-20.37l-7.594 4.385a7.402 7.402 0 012.531-4.736h-4.064a7.39 7.39 0 016.557-2.933l-5.517-3.186a7.388 7.388 0 016.607.397 7.366 7.366 0 012.468 2.316 7.363 7.363 0 012.467-2.316 7.39 7.39 0 016.608-.397l-5.518 3.186a7.389 7.389 0 016.558 2.933h-4.066a7.399 7.399 0 012.533 4.735zm-18.45 6.119h-5.92v9.867h5.92v-9.867zm-10.854 1.973a1.974 1.974 0 11-3.947 0 1.974 1.974 0 013.947 0z"
                clipRule="evenodd"
              />
              <path
                fill="#5850EC"
                d="M118.495 32.973c2.321 0 4.334-1.232 5.352-3.079l-2.652-1.515c-.474.97-1.492 1.563-2.723 1.563-1.824 0-3.174-1.35-3.174-3.221 0-1.895 1.35-3.244 3.174-3.244 1.207 0 2.226.615 2.699 1.586l2.629-1.54c-.971-1.823-2.984-3.054-5.305-3.054-3.599 0-6.252 2.723-6.252 6.252 0 3.528 2.653 6.252 6.252 6.252zM134.277 20.8v1.398c-.853-1.066-2.131-1.729-3.86-1.729-3.15 0-5.755 2.723-5.755 6.252 0 3.528 2.605 6.252 5.755 6.252 1.729 0 3.007-.663 3.86-1.729v1.397h3.055v-11.84h-3.055zm-3.292 9.26c-1.871 0-3.268-1.35-3.268-3.34 0-1.988 1.397-3.338 3.268-3.338 1.895 0 3.292 1.35 3.292 3.339 0 1.99-1.397 3.339-3.292 3.339zM146.875 23.737v-2.936h-2.676v-3.316l-3.055.924V20.8h-2.06v2.936h2.06v4.926c0 3.197 1.445 4.452 5.731 3.978v-2.77c-1.752.094-2.676.07-2.676-1.208v-4.926h2.676zM150.544 19.38c1.042 0 1.895-.853 1.895-1.871s-.853-1.895-1.895-1.895c-1.018 0-1.87.877-1.87 1.895a1.89 1.89 0 001.87 1.87zm-1.515 13.261h3.055v-11.84h-3.055v11.84zM160.516 32.973c3.481 0 6.276-2.724 6.276-6.252 0-3.529-2.795-6.252-6.276-6.252s-6.252 2.723-6.252 6.252c0 3.528 2.771 6.252 6.252 6.252zm0-2.984c-1.8 0-3.197-1.35-3.197-3.268 0-1.918 1.397-3.268 3.197-3.268 1.824 0 3.221 1.35 3.221 3.268 0 1.918-1.397 3.268-3.221 3.268zM175.524 20.469c-1.586 0-2.818.592-3.528 1.658V20.8h-3.055v11.84h3.055v-6.394c0-2.06 1.113-2.936 2.605-2.936 1.373 0 2.344.829 2.344 2.439v6.891H180v-7.27c0-3.15-1.966-4.902-4.476-4.902z"
              />
            </svg>
            <blockquote className="mt-8">
              <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
                <p>
                  “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  expedita voluptas culpa sapiente alias molestiae. Numquam
                  corrupti in laborum sed rerum et corporis.”
                </p>
              </div>
              <footer className="mt-8">
                <div className="md:flex md:items-center md:justify-center">
                  <div className="md:flex-shrink-0">
                    <img
                      className="mx-auto h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt
                    />
                  </div>
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div className="text-base leading-6 font-medium text-gray-900">
                      Judith Black
                    </div>
                    <svg
                      className="hidden md:block mx-1 h-5 w-5 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>
                    <div className="text-base leading-6 font-medium text-gray-500">
                      CEO, Workcation
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
