export interface FilterAnalysisResult {
  totalRules: number;
  documentRules: number;
  subdocumentRules: number;
}

export interface Message {
  type: 'ANALYZE_FILTERS';
  urls: string[];
}

export interface ErrorResponse {
  error: string;
}

export type AnalysisResponse = FilterAnalysisResult | ErrorResponse;
