export interface GeminiResumeResponse {
  data: Data;
  status: number;
  statusText: string;
  headers: ResumeResponseHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: unknown;
  headers: ConfigHeaders;
  method: string;
  url: string;
  data: string;
  allowAbsoluteUrls: boolean;
}

export interface ConfigHeaders {
  Accept: string;
  'Content-Type': string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Data {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
  responseId: string;
}

export interface Candidate {
  content: Content;
  finishReason: string;
  avgLogprobs: number;
}

export interface Content {
  parts: Part[];
  role: string;
}

export interface Part {
  text: string;
}

export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  promptTokensDetails: TokensDetail[];
  candidatesTokensDetails: TokensDetail[];
}

export interface TokensDetail {
  modality: string;
  tokenCount: number;
}

export interface ResumeResponseHeaders {
  'content-encoding': string;
  'content-length': string;
  'content-type': string;
  date: string;
  server: string;
  vary: string;
}
/** #######################################################33 */



export interface GeminiResponseAPIv2 {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
  responseId: string;
}

export interface Candidate {
  content: Content;
  finishReason: string;
  avgLogprobs: number;
}

export interface Content {
  parts: Part[];
  role: string;
}

export interface Part {
  text: string;
}

export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  promptTokensDetails: TokensDetail[];
  candidatesTokensDetails: TokensDetail[];
}

export interface TokensDetail {
  modality: string;
  tokenCount: number;
}
