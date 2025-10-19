# ATS Resume Generator

A fully-fledged React-based ATS Resume Generator that produces resumes scoring 90%+ in any Applicant Tracking System.

## Features

### Core Functionality
- Generate resumes in .docx and PDF formats (ATS-readable)
- Single-column, reverse-chronological format (most ATS-friendly)
- No tables, text boxes, headers/footers, graphics, icons, or images
- Standard resume sections: Contact Info, Summary, Skills, Experience, Education, Projects, Certifications

### ATS Optimization
- ATS-friendly fonts: Arial, Calibri, Times New Roman, Helvetica
- Proper font sizes: 10–12pt body, 14–16pt headings
- Plain text headings (not styled images)
- Standard date formats (MM/YYYY or Month YYYY)
- Optimal length: 1 page for freshers, max 2 pages for experienced

### Scoring & Analysis
-  Real-time ATS score calculation (targets 90%+)
-  Keyword matching with job descriptions
-  Action verb suggestions
-  Metrics encouragement for quantified achievements
-  Skill density analysis
-  Format validation and warnings

### User Experience
-  Sidebar form inputs with live preview
-  Add, edit, delete, reorder sections
-  Multiple ATS-friendly templates
-  Job description upload for keyword optimization
-  Auto-save to LocalStorage
-  Professional, minimal UI with smooth animations

## Tech Stack

- **Frontend**: React 18 + TailwindCSS
- **Animations**: Framer Motion
- **PDF Export**: jsPDF
- **DOCX Export**: docx library
- **File Handling**: file-saver
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Storage**: LocalStorage

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Fill Resume Sections**: Use the sidebar to input your information across all sections
2. **Add Job Description**: Paste a job description for keyword optimization
3. **Monitor ATS Score**: Watch your score improve in real-time as you add content
4. **Export Resume**: Download as PDF or DOCX in ATS-friendly format
5. **Save Drafts**: Your progress is automatically saved to browser storage

## ATS Scoring Criteria

The application scores resumes based on:

- **Contact Information** (15 points): Complete contact details
- **Professional Summary** (10 points): Compelling summary with keywords
- **Skills Section** (20 points): Relevant technical and soft skills
- **Work Experience** (25 points): Detailed experience with action verbs and metrics
- **Education** (10 points): Academic background
- **Projects** (10 points): Relevant projects demonstrating skills
- **Keyword Matching** (10 points): Alignment with job description
- **Format Compliance** (5 points): ATS-friendly formatting

## Export Features

- **PDF**: ATS-optimized with proper font embedding
- **DOCX**: Fully editable Microsoft Word format
- **Naming**: Files saved as "YourName_ATS.pdf/docx"
- **Compatibility**: Works with all major ATS systems

## Best Practices Implemented

- Single-column layout for optimal ATS parsing
- Standard section headings recognized by ATS
- Consistent date formatting
- No graphics or complex formatting
- Keyword optimization suggestions
- Action verb recommendations
- Quantified achievement prompts

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
