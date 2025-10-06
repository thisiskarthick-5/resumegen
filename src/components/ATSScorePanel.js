import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp, Target } from 'lucide-react';
import { calculateATSScore } from '../utils/atsScoring';

const ATSScorePanel = ({ resumeData, jobDescription, atsScore, setAtsScore }) => {
  useEffect(() => {
    const result = calculateATSScore(resumeData, jobDescription);
    setAtsScore(result.score);
  }, [resumeData, jobDescription, setAtsScore]);

  const scoreResult = calculateATSScore(resumeData, jobDescription);
  const { score, issues, suggestions, keywordMatch } = scoreResult;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">ATS Score Analysis</h2>
        <div className={`px-4 py-2 rounded-lg ${getScoreBackground(score)}`}>
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-5 h-5 ${getScoreColor(score)}`} />
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {Math.round(score)}%
            </span>
            <span className={`text-sm ${getScoreColor(score)}`}>
              {getScoreLabel(score)}
            </span>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{Math.round(score)}%</div>
          <div className="text-sm text-gray-600">Overall Score</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(keywordMatch * 100)}%
          </div>
          <div className="text-sm text-gray-600">Keyword Match</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {issues.length === 0 ? '✓' : issues.length}
          </div>
          <div className="text-sm text-gray-600">
            {issues.length === 0 ? 'No Issues' : 'Issues Found'}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>ATS Compatibility</span>
          <span>{Math.round(score)}% / 100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-3 rounded-full ${
              score >= 90 ? 'bg-green-500' : 
              score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>

      {/* Issues */}
      {issues.length > 0 && (
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-lg font-medium text-red-600 mb-3">
            <AlertTriangle size={20} />
            Issues to Fix ({issues.length})
          </h3>
          <ul className="space-y-2">
            {issues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-lg font-medium text-blue-600 mb-3">
            <Target size={20} />
            Suggestions ({suggestions.length})
          </h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Success Message */}
      {score >= 90 && issues.length === 0 && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="text-green-600" size={20} />
          <div>
            <p className="font-medium text-green-800">Excellent ATS Score!</p>
            <p className="text-sm text-green-600">
              Your resume is highly optimized for ATS systems and should pass most automated screenings.
            </p>
          </div>
        </div>
      )}

      {/* ATS Tips */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">ATS Optimization Tips:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use standard section headings (Experience, Education, Skills)</li>
          <li>• Include relevant keywords from the job description</li>
          <li>• Use simple formatting without tables or graphics</li>
          <li>• Quantify achievements with numbers and percentages</li>
          <li>• Use standard fonts (Arial, Calibri, Times New Roman)</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ATSScorePanel;