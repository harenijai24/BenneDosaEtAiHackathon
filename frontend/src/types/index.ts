export interface AnalysisResult {
  risk_score: number;
  scam_type: string;
  red_flags: string[];
  verdict: string;
  action: string;
}

export interface NoteCheckResult {
  verdict: 'likely_genuine' | 'likely_fake' | 'uncertain';
  confidence: number;
  notes: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
}
