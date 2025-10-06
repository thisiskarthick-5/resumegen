import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

export const exportToPDF = (resumeData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Set ATS-friendly font
  pdf.setFont('helvetica');
  
  let yPosition = 20;
  const lineHeight = 5;
  const pageHeight = 297;
  const margin = 20;

  // Helper function to add text with word wrapping
  const addText = (text, fontSize = 11, isBold = false, isHeading = false) => {
    if (yPosition > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    if (isHeading && text) {
      pdf.text(text.toUpperCase(), margin, yPosition);
      yPosition += lineHeight + 2;
      // Add underline for headings
      pdf.line(margin, yPosition - 2, margin + 50, yPosition - 2);
      yPosition += 3;
    } else {
      const lines = pdf.splitTextToSize(text, 170);
      pdf.text(lines, margin, yPosition);
      yPosition += lines.length * lineHeight;
    }
    yPosition += 2;
  };

  // Contact Information
  const { personalInfo } = resumeData;
  addText(personalInfo.fullName || 'Your Name', 16, true);
  
  const contactLine = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location
  ].filter(Boolean).join(' | ');
  
  if (contactLine) addText(contactLine, 11);
  
  if (personalInfo.linkedin || personalInfo.github) {
    const linksLine = [personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ');
    addText(linksLine, 11);
  }
  
  yPosition += 5;

  // Professional Summary
  if (resumeData.summary) {
    addText('PROFESSIONAL SUMMARY', 14, true, true);
    addText(resumeData.summary, 11);
  }

  // Skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    addText('SKILLS', 14, true, true);
    addText(resumeData.skills.join(', '), 11);
  }

  // Work Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    addText('WORK EXPERIENCE', 14, true, true);
    resumeData.experience.forEach(exp => {
      addText(`${exp.title} | ${exp.company}`, 12, true);
      if (exp.startDate || exp.endDate) {
        addText(`${exp.startDate || ''} - ${exp.endDate || 'Present'}`, 11);
      }
      if (exp.description) {
        addText(exp.description, 11);
      }
      yPosition += 3;
    });
  }

  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    addText('EDUCATION', 14, true, true);
    resumeData.education.forEach(edu => {
      addText(`${edu.degree} | ${edu.institution}`, 12, true);
      if (edu.graduationDate) {
        addText(edu.graduationDate, 11);
      }
      if (edu.gpa) {
        addText(`GPA: ${edu.gpa}`, 11);
      }
      yPosition += 3;
    });
  }

  // Projects
  if (resumeData.projects && resumeData.projects.length > 0) {
    addText('PROJECTS', 14, true, true);
    resumeData.projects.forEach(proj => {
      addText(proj.name, 12, true);
      if (proj.description) {
        addText(proj.description, 11);
      }
      if (proj.technologies) {
        addText(`Technologies: ${proj.technologies}`, 11);
      }
      yPosition += 3;
    });
  }

  // Certifications
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    addText('CERTIFICATIONS', 14, true, true);
    resumeData.certifications.forEach(cert => {
      addText(`${cert.name} - ${cert.issuer}`, 11);
      if (cert.date) {
        addText(cert.date, 11);
      }
      yPosition += 2;
    });
  }

  pdf.save(`${personalInfo.fullName || 'Resume'}_ATS.pdf`);
};

export const exportToDocx = async (resumeData) => {
  const { personalInfo } = resumeData;
  
  const children = [];

  // Contact Information
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.fullName || 'Your Name',
          bold: true,
          size: 32
        })
      ],
      alignment: 'center'
    })
  );

  const contactInfo = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location
  ].filter(Boolean).join(' | ');

  if (contactInfo) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: contactInfo, size: 22 })],
        alignment: 'center'
      })
    );
  }

  if (personalInfo.linkedin || personalInfo.github) {
    const links = [personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ');
    children.push(
      new Paragraph({
        children: [new TextRun({ text: links, size: 22 })],
        alignment: 'center'
      })
    );
  }

  // Professional Summary
  if (resumeData.summary) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'PROFESSIONAL SUMMARY', bold: true, size: 28 })],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 }
      }),
      new Paragraph({
        children: [new TextRun({ text: resumeData.summary, size: 22 })],
        spacing: { after: 120 }
      })
    );
  }

  // Skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'SKILLS', bold: true, size: 28 })],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 }
      }),
      new Paragraph({
        children: [new TextRun({ text: resumeData.skills.join(', '), size: 22 })],
        spacing: { after: 120 }
      })
    );
  }

  // Work Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'WORK EXPERIENCE', bold: true, size: 28 })],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 }
      })
    );

    resumeData.experience.forEach(exp => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${exp.title} | ${exp.company}`, bold: true, size: 24 })
          ],
          spacing: { after: 60 }
        })
      );

      if (exp.startDate || exp.endDate) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${exp.startDate || ''} - ${exp.endDate || 'Present'}`, size: 22 })
            ],
            spacing: { after: 60 }
          })
        );
      }

      if (exp.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: exp.description, size: 22 })],
            spacing: { after: 120 }
          })
        );
      }
    });
  }

  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'EDUCATION', bold: true, size: 28 })],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 }
      })
    );

    resumeData.education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${edu.degree} | ${edu.institution}`, bold: true, size: 24 })
          ],
          spacing: { after: 60 }
        })
      );

      if (edu.graduationDate) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: edu.graduationDate, size: 22 })],
            spacing: { after: 60 }
          })
        );
      }

      if (edu.gpa) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: `GPA: ${edu.gpa}`, size: 22 })],
            spacing: { after: 120 }
          })
        );
      }
    });
  }

  // Projects
  if (resumeData.projects && resumeData.projects.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'PROJECTS', bold: true, size: 28 })],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 }
      })
    );

    resumeData.projects.forEach(proj => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: proj.name, bold: true, size: 24 })],
          spacing: { after: 60 }
        })
      );

      if (proj.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: proj.description, size: 22 })],
            spacing: { after: 60 }
          })
        );
      }

      if (proj.technologies) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: `Technologies: ${proj.technologies}`, size: 22 })],
            spacing: { after: 120 }
          })
        );
      }
    });
  }

  // Certifications
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: 'CERTIFICATIONS', bold: true, size: 28 })],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 }
      })
    );

    resumeData.certifications.forEach(cert => {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `${cert.name} - ${cert.issuer}`, size: 22 })],
          spacing: { after: 60 }
        })
      );

      if (cert.date) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: cert.date, size: 22 })],
            spacing: { after: 120 }
          })
        );
      }
    });
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${personalInfo.fullName || 'Resume'}_ATS.docx`);
};