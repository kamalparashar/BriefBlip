import axios from 'axios'

const hasura_secret = process.env.VITE_HASURA_SECRET
const hasura_url = process.env.VITE_HASURA_URL

async function fetchGraphQL(operationsDoc, operationName, variables) {
  console.log(hasura_secret?'hava a secret':'did not have any secret')
  console.log(hasura_url)
    const result = await axios.post(hasura_url, {
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': hasura_secret,
      },
      timeout: 60000,
    })
    console.log(result)
    return result.data
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
    console.log(youtubeUrl)
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
    const youtubeUrl = event.queryStringParameters.youtubeUrl
    console.log(youtubeUrl)
    const response = await startFetchGetSummary(youtubeUrl)
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    }
  }
}