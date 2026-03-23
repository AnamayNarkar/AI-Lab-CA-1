import { AgentExecutor, createToolCallingAgent, type AgentAction } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import { allTools } from "./tools.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BaseCallbackHandler } from "@langchain/core/callbacks/base";

if (!process.env.OPENROUTER_API_KEY){
    throw new Error("opnerouter apikey not configured")
}
const openRouterApiKey: string = process.env.OPENROUTER_API_KEY;

const SYSTEM_PROMPT: string = " you are  a hemplful agentic study/academic planner for alex, help him ahis tasks forstuying based on the tools provided to you. if query is irrelvant discard it saying u better study alex"

let executorInstance:AgentExecutor|null=null;
async function getAgentExecutor(): Promise <AgentExecutor>{
    if (executorInstance) return executorInstance;
    const llm = new ChatOpenAI({
        model :"meta-llama/llama-3.1-8b-instruct",
        temperature: 0.3,
        apiKey:openRouterApiKey,
        configuration:{
            baseURL:"https://openrouter.ai/api/v1"
        }
    })
    const prompt=ChatPromptTemplate.fromMessages([
        ["system",SYSTEM_PROMPT],
        ["human","{input}"],
        ["placeholder","{agent_scratchpad}"],
    ])

    const agent = createToolCallingAgent({llm, tools: allTools, prompt})

    executorInstance = new AgentExecutor({
        agent,
        tools: allTools,
        verbose: true,
        maxIterations: 6
    })

    return executorInstance;
}

export async function runAgent(userMessage: string) : Promise<string> {
    const executor = getAgentExecutor();
    const result = (await executor).invoke(
        {input: userMessage},
    )
    console.log(result)
    // const output = ( result.output as string).trim();
    return "test";
}