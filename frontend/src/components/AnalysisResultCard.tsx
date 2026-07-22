import { getRiskColor } from '../api/mockApi';
import type { AnalysisResult } from '../types';
import RedFlagChips from './RedFlagChips';

interface AnalysisResultCardProps {
  result: AnalysisResult;
}

export default function AnalysisResultCard({ result }: AnalysisResultCardProps) {
  const risk = getRiskColor(result.risk_score);
  const isHighRisk = result.risk_score > 70;

  return (
    <div className="animate-fade-in mx-1 max-w-[92%] self-start">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
        {/* Risk score header */}
        <div className={`px-4 py-3 ${risk.bg}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wide ${risk.text}`}>
              {risk.label}
            </span>
            <span className={`text-3xl font-bold tabular-nums ${risk.text}`}>
              {result.risk_score}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/60">
            <div
              className={`h-full rounded-full transition-all duration-700 ${risk.bar}`}
              style={{ width: `${result.risk_score}%` }}
            />
          </div>
        </div>

        {/* Scam type */}
        <div className="border-b border-gray-100 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Scam Type
          </p>
          <p className="mt-0.5 text-sm font-semibold text-gray-800">
            {result.scam_type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </p>
        </div>

        {/* Red flags */}
        <div className="border-b border-gray-100 px-4 py-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
            Red Flags Detected
          </p>
          <RedFlagChips flags={result.red_flags} />
        </div>

        {/* Verdict banner */}
        <div
          className={`px-4 py-3 ${
            isHighRisk
              ? 'border-t-2 border-red-400 bg-red-50'
              : result.risk_score > 40
                ? 'border-t-2 border-amber-400 bg-amber-50'
                : 'border-t-2 border-green-400 bg-green-50'
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="text-lg leading-none" aria-hidden="true">
              {isHighRisk ? '🚨' : result.risk_score > 40 ? '⚠️' : '✅'}
            </span>
            <div>
              <p
                className={`text-sm font-bold leading-snug ${
                  isHighRisk
                    ? 'text-red-800'
                    : result.risk_score > 40
                      ? 'text-amber-800'
                      : 'text-green-800'
                }`}
              >
                {result.verdict}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Recommended action:{' '}
                <span className="font-medium text-gray-700">
                  {result.action.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
