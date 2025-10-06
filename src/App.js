import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import ATSScorePanel from './components/ATSScorePanel';
import ExportButtons from './components/ExportButtons';
import { useResumeData } from './hooks/useResumeData';

function App() {
  const { resumeData, updateResumeData, saveToLocalStorage } = useResumeData();
  const [atsScore, setAtsScore] = useState(0);
  const [jobDescription, setJobDescription] = useState('');

  useEffect(() => {
    saveToLocalStorage();
  }, [resumeData, saveToLocalStorage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">ATS Resume Generator</h1>
          <p className="text-sm text-gray-600 mt-1">Generate ATS-friendly resumes with 90%+ scoring</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <ResumeForm 
                resumeData={resumeData}
                updateResumeData={updateResumeData}
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
              />
            </motion.div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* ATS Score Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ATSScorePanel 
                  resumeData={resumeData}
                  jobDescription={jobDescription}
                  atsScore={atsScore}
                  setAtsScore={setAtsScore}
                />
              </motion.div>

              {/* Export Buttons */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ExportButtons resumeData={resumeData} />
              </motion.div>

              {/* Resume Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm border"
              >
                <ResumePreview resumeData={resumeData} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;