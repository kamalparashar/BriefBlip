// import conf from '../src/conf/conf.js'
const fetch = require('node-fetch')
const hasura_secret = process.env.VITE_HASURA_SECRET
const hasura_url = process.env.VITE_HASURA_URL

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(
      hasura_url,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': hasura_secret
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

exports.handler = async (event, context) => {
  try {
    const youtubeUrl = event.queryStingParameters.youtubeUrl
    const response = await startFetchGetSummary(youtubeUrl); // Replace with your API URL
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
