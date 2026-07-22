import type { AnalysisResult, NoteCheckResult } from '../types';

const MOCK_DELAY_MS = 1000;

export async function analyzeMessage(_text: string): Promise<AnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  return {
    risk_score: 87,
    scam_type: 'digital_arrest',
    red_flags: ['impersonation_of_cbi', 'urgency_and_secrecy', 'otp_request'],
    verdict:
      'This is a scam. Hang up. Report at cybercrime.gov.in or call 1930. Do not pay.',
    action: 'block_and_report',
  };
}

export async function checkNote(_imageFile: File): Promise<NoteCheckResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  return {
    verdict: 'likely_genuine',
    confidence: 78,
    notes:
      'Security thread and latent image position appear consistent with a genuine note. Could not fully verify micro-lettering due to image resolution.',
  };
}

export function getRiskColor(score: number): {
  bg: string;
  text: string;
  bar: string;
  label: string;
} {
  if (score <= 40) {
    return {
      bg: 'bg-green-50',
      text: 'text-green-700',
      bar: 'bg-green-500',
      label: 'Low Risk',
    };
  }
  if (score <= 70) {
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      bar: 'bg-amber-500',
      label: 'Medium Risk',
    };
  }
  return {
    bg: 'bg-red-50',
    text: 'text-red-700',
    bar: 'bg-red-500',
    label: 'High Risk',
  };
}

export function formatScamType(type: string): string {
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatRedFlag(flag: string): string {
  return flag
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getNoteVerdictStyle(verdict: NoteCheckResult['verdict']): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  switch (verdict) {
    case 'likely_genuine':
      return {
        bg: 'bg-green-50',
        text: 'text-green-800',
        border: 'border-green-300',
        label: 'Likely Genuine',
      };
    case 'likely_fake':
      return {
        bg: 'bg-red-50',
        text: 'text-red-800',
        border: 'border-red-300',
        label: 'Likely Fake',
      };
    case 'uncertain':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-300',
        label: 'Uncertain',
      };
  }
}
