import prismic from 'prismic-javascript';

const REPOSITORY = `steezy`;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
const DEFAULT_LANG = `cs-cz`;

export const prismicClient = prismic.client(REF_API_URL, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
});

export async function fetchData(query, { previewData, variables } = {}) {
  const prismicApi = await prismicClient.getApi();

  const res = await fetch(`${GRAPHQL_API_URL}?query=${query}`, {
    headers: {
      'Prismic-Ref': previewData?.ref || prismicApi.masterRef.ref,
    },
  });

  if (res.status !== 200) throw new Error('Failed to fetch API');

  const json = await res.json();

  if (json.errors) throw new Error('Failed to fetch API');

  return json.data;
}

export async function getProjects(lang = DEFAULT_LANG, previewData) {
  const projects = await fetchData(
    `
    {
    allProjects(lang: "cs-cz") {
      edges {
        node {
          project_name
          perex
          intro_image
          company_name
          hero_image
          client {
            ... on Client {
              name
              position
              photo
            }
          }
          hero_loop {
            ... on _FileLink {
              url
            }
          }
          filter_tags {
            filter_tag {
              ... on Service {
                _meta {
                  uid
                }
              }
            }
          }
          reference_quote
          roles_group {
            header
            content
          }
          body {
            ... on ProjectBodyText {
              fields {
                blockquote
              }
            }
            ... on ProjectBodyVimeo_id {
              fields {
                vimeo_id
              }
            }
            ... on ProjectBodyImage_row {
              fields {
                image
                lottie {
                  ... on Project_lottie_element {
                    lottie_name
                    assets {
                      asset
                    }
                    json {
                      ... on _FileLink {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          _meta {
            id
            uid
            alternateLanguages {
              uid
              id
            }
            type
          }
        }
      }
    }
  }
  `,
    { previewData }
  );
  return projects.allProjects.edges;
}

export async function getAbout(lang = DEFAULT_LANG, previewData) {
  const about = await fetchData(
    `
  {
    allAbouts(lang: "${lang}") {
      edges {
        node {
          page_name
          hero_claim
          hero_image
          perex
          humans {
            header
            content
          }
          body {
            ... on AboutBodyBlockquote {
              fields {
                blockquote
              } 
            }
            ... on AboutBodyImages {
              fields {
                image
              }
            }
          }
        }
      }
    }
  }
  `,
    { previewData }
  );

  return about.allAbouts.edges[0].node;
}

export async function getHomapage(lang = DEFAULT_LANG, previewData) {
  const homepage = await fetchData(
    `
  {
    allHomepages(lang: "cs-cz") {
      edges {
        node {
          page_name
          hero_header
          hero_tags {tag}
          hero_poster
          hero_loop {
            ...on _FileLink {
              url
            }
          }
          perex
          services {
            service {
              ...on Service {
                service_name
                _meta {
                  id
                  uid
                }
                bullets {
                  header
                }
              }
            }
          }
          about_studio
          about_studio_img
          body {
            ...on HomepageBodyProject {
              fields {
                project {
                  ...on Project {
                    intro_image
                    project_name
                    company_name
                    _meta {
                      uid
                      id
                    }
                  }
                }
              }
            }
            ...on HomepageBodyReference {
              fields {
                reference {
                  ...on Project {
                    reference_quote
                    project_name
                    company_name
                    client {
                      ...on Client {
                        name
                        position
                        photo
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `,
    { previewData }
  );

  return homepage.allHomepages.edges[0].node;
}

export async function getServices(lang = DEFAULT_LANG, previewData) {
  const services = await fetchData(
    `
{
  allServicess(lang: "${lang}") {
    edges {
      node {
        page_name
        hero_header
        hero_image
        services {
          service {
            ... on Service {
              service_name
              lottie_icon {
                ... on _FileLink {
                  url
                }
              }
              perex
              bullets {
                header
                content
              }
              projects {
                project {
                  ... on Project {
                    project_name
                    intro_image
                    company_name
                    _meta {
                      id
                      uid
                    }
                  }
                }
              }
              _meta {
                uid
                id
              }
            }
          }
        }
      }
    }
  }
}
  `,
    { previewData }
  );

  return services.allServicess.edges[0].node;
}
