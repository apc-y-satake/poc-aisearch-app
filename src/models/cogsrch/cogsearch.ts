const { ChatOpenAI } = require('langchain/chat_models/openai');
const { initializeAgentExecutorWithOptions } = require('langchain/agents');
import { CogsrchTool } from './cogsrchTool';
import { DEFAULT_PREFIX, DEFAULT_SUFFIX } from '../../util/prompts';

export class CogSrch {
  static _storages = {};

  async call({ input }: { input: string }) {
    try {
      const llm = new ChatOpenAI({
        azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_GPT_DEPLOYMENT_NAME,
        azureOpenAIApiVersion: process.env.AZURE_OPENAI_GPT_API_VERSION,
        modelName: 'gpt-3.5-turb',
        temperature: 0.9,
        topP: 1,
      });

      const tools = [
        new CogsrchTool()
      ];

      const executor = await initializeAgentExecutorWithOptions(
        tools,
        llm,
        {
          agentType: 'chat-conversational-react-description',
          agentArgs: {
            systemMessage: DEFAULT_PREFIX,
            humanMessage: DEFAULT_SUFFIX
          },
          verbose: true
        }
      );

      const result = await executor.call({ input });

      return {
        output: result.output,
      };
    } catch (err) {
      console.log(err);
    }
  }
}