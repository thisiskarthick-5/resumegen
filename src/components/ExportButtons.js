import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Save } from 'lucide-react';
import { exportToPDF, exportToDocx } from '../utils/exportUtils';

const ExportButtons = ({ resumeData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState('');

  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportType('PDF');
    try {
      await exportToPDF(resumeData);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  const handleExportDocx = async () => {
    setIsExporting(true);
    setExportType('DOCX');
    try {
      await exportToDocx(resumeData);
    } catch (error) {
      console.error('Error exporting DOCX:', error);
      alert('Error exporting DOCX. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType('');
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('ats-resume-data', JSON.stringify(resumeData));
    alert('Resume draft saved successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <h2 className="text-xl font-semibold mb-4">Export Resume</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PDF Export */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex flex-col items-center p-6 border-2 border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <FileText className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Download PDF</h3>
          <p className="text-sm text-gray-600 text-center">
            ATS-friendly PDF format
          </p>
          {isExporting && exportType === 'PDF' && (
            <div className="mt-2 text-xs text-red-600">Exporting...</div>
          )}
        </motion.button>

        {/* DOCX Export */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportDocx}
          disabled={isExporting}
          className="flex flex-col items-center p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <Download className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Download DOCX</h3>
          <p className="text-sm text-gray-600 text-center">
            Editable Word document
          </p>
          {isExporting && exportType === 'DOCX' && (
            <div className="mt-2 text-xs text-blue-600">Exporting...</div>
          )}
        </motion.button>

        {/* Save Draft */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveDraft}
          className="flex flex-col items-center p-6 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <Save className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Save Draft</h3>
          <p className="text-sm text-gray-600 text-center">
            Save to local storage
          </p>
        </motion.button>
      </div>

      {/* Export Information */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Export Features:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• PDF: ATS-optimized with proper font embedding</li>
          <li>• DOCX: Fully editable Microsoft Word format</li>
          <li>• Both formats use ATS-friendly single-column layout</li>
          <li>• No graphics, tables, or formatting that breaks ATS parsing</li>
          <li>• Standard fonts (Arial) for maximum compatibility</li>
        </ul>
      </div>

      {/* File Naming Convention */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>File naming:</strong> Files will be saved as "YourName_ATS.pdf" or "YourName_ATS.docx" 
          for professional presentation.
        </p>
      </div>
    </motion.div>
  );
};

export default ExportButtons;