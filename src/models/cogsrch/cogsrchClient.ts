const axios = require('axios');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');

export class CogsrchClient {
  async searchText(text: any, options = {}) {
    const serviceName = process.env.AZURE_COGSRCH_SERVICE_NAME;
    const adminKey = process.env.AZURE_COGSRCH_ADMIN_KEY;
    const indexName = process.env.AZURE_COGSRCH_INDEX_NAME;
    const url = new URL(`https://${serviceName}.search.windows.net`);
    url.searchParams.append('api-version', '2023-07-01-Preview');
    url.pathname = `/indexes/${indexName}/docs/search`;

    const res = await axios({
      method: 'POST',
      url: url.toString(),
      headers: {
        'Content-Type': 'application/json',
        'api-key': adminKey
      },
      data: {
        search: text,
        select: 'id, title, content',
        ...options
      }
    });
    return res;
  }

  async searchVector(text: any, options = {}) {
    const serviceName = process.env.AZURE_COGSRCH_SERVICE_NAME;
    const adminKey = process.env.AZURE_COGSRCH_ADMIN_KEY;
    const indexName = process.env.AZURE_COGSRCH_INDEX_NAME;
    const url = new URL(`https://${serviceName}.search.windows.net`);
    url.searchParams.append('api-version', '2023-07-01-Preview');
    url.pathname = `/indexes/${indexName}/docs/search`;

    const model = new OpenAIEmbeddings({
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_EMBED_DEPLOYMENT_NAME,
      azureOpenAIApiVersion: process.env.AZURE_OPENAI_EMBED_API_VERSION
    });
    const vector = await model.embedQuery(text);

    const res = await axios({
      method: 'POST',
      url: url.toString(),
      headers: {
        'Content-Type': 'application/json',
        'api-key': adminKey
      },
      data: {
        search: text,
        vectors: [{
          value: vector,
          k: 5,
          fields: 'contentVector'
        }],
        select: 'id, title, content',
        ...options
      }
    });
    return res;
  }
}