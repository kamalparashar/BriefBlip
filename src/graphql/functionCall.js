import conf from "../conf/conf"

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
      conf.hasura_url,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret':conf.hasura_secret
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    )

    return await result.json()
  }
  
  const operationsDoc = `
  query MyQuery($youtubeUrl: String!) {
    getsummary(youtubeUrl: $youtubeUrl) {
      summary
      title
    }
  }
`;
  
  function fetchGetSummary(youtubeUrl) {
    return fetchGraphQL(
      operationsDoc,
      "MyQuery",
      {"youtubeUrl": youtubeUrl}
    )
  }
  
  async function startFetchGetSummary(youtubeUrl) {
    const { errors, data } = await fetchGetSummary(youtubeUrl)
  
    if (errors) {
      console.error("Error while calling hasura :: ", errors)
      throw errors
    }
  
    return data.getsummary
  }
  
export default startFetchGetSummary
