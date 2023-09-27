/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'n8n-workflow';
import { HuggingFaceInferenceEmbeddings } from 'langchain/embeddings/hf';
import { logWrapper } from '../../../utils/logWrapper';

export class EmbeddingsHuggingFaceInference implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Embeddings Hugging Face Inference',
		name: 'embeddingsHuggingFaceInference',
		icon: 'file:huggingface.svg',
		group: ['transform'],
		version: 1,
		description: 'Use HuggingFace Inference Embeddings',
		defaults: {
			name: 'Embeddings HuggingFace Inference',
		},
		credentials: [
			{
				name: 'huggingFaceApi',
				required: true,
			},
		],
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Embeddings'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference/',
					},
				],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiEmbedding],
		outputNames: ['Embeddings'],
		properties: [
			{
				displayName:
					'Each model is using different dimensional density for embeddings. Please make sure to use the same dimensionality for your vector store. The default model is using 768-dimensional embeddings.',
				name: 'notice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Model Name',
				name: 'modelName',
				type: 'string',
				default: 'sentence-transformers/distilbert-base-nli-mean-tokens',
				description: 'The model name to use from HuggingFace library',
			},
		],
	};

	async supplyData(this: IExecuteFunctions): Promise<SupplyData> {
		this.logger.verbose('Supply data for embeddings HF Inference');
		const model = this.getNodeParameter(
			'modelName',
			0,
			'sentence-transformers/distilbert-base-nli-mean-tokens',
		) as string;
		const credentials = await this.getCredentials('huggingFaceApi');
		const embeddings = new HuggingFaceInferenceEmbeddings({
			apiKey: credentials.apiKey as string,
			model,
		});

		return {
			response: logWrapper(embeddings, this),
		};
	}
}