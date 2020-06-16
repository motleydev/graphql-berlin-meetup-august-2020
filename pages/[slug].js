import { GraphQLClient } from "graphql-request";

import Form from "../components/Form";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);

export async function getStaticProps({ params: variables }) {
  const { page } = await graphcms.request(
    `query page($slug: String!) {
      page(where: {slug: $slug}) {
        title
        slug
        form {
          id
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

  return <Form {...form} />;
}
