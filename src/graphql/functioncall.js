import conf from "../conf/conf"
import axios from 'axios'

async function fetchGraphQL(operationsDoc, operationName, variables) {
    try {
      const response = await axios.post(
        conf.hasura_url,
        {
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
      return response.data
    } catch (error) {
      console.log("Error while calling ql: ", error)
      throw error
    }
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