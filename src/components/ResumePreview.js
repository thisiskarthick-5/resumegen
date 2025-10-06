import React from 'react';

const ResumePreview = ({ resumeData }) => {
  const { personalInfo, summary, skills, experience, education, projects, certifications } = resumeData;

  return (
    <div className="p-8 bg-white">
      <div className="resume-preview max-w-4xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Contact Information */}
        <div className="contact-info text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          <div className="text-sm space-y-1">
            {(personalInfo?.email || personalInfo?.phone || personalInfo?.location) && (
              <p>
                {[personalInfo?.email, personalInfo?.phone, personalInfo?.location]
                  .filter(Boolean)
                  .join(' | ')}
              </p>
            )}
            {(personalInfo?.linkedin || personalInfo?.github) && (
              <p>
                {[personalInfo?.linkedin, personalInfo?.github]
                  .filter(Boolean)
                  .join(' | ')}
              </p>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {summary && (
          <div className="section mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase border-b border-black pb-1">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="section mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase border-b border-black pb-1">
              Skills
            </h2>
            <p className="text-sm">{skills.join(', ')}</p>
          </div>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <div className="section mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase border-b border-black pb-1">
              Work Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">
                    {exp.title} | {exp.company}
                  </h3>
                  <span className="text-sm text-gray-700">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm leading-relaxed mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="section mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase border-b border-black pb-1">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">
                    {edu.degree} | {edu.institution}
                  </h3>
                  <span className="text-sm text-gray-700">{edu.graduationDate}</span>
                </div>
                {edu.gpa && (
                  <p className="text-sm">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="section mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase border-b border-black pb-1">
              Projects
            </h2>
            {projects.map((proj, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-sm mb-1">{proj.name}</h3>
                {proj.description && (
                  <p className="text-sm leading-relaxed mb-1">{proj.description}</p>
                )}
                {proj.technologies && (
                  <p className="text-sm">
                    <span className="font-medium">Technologies:</span> {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div className="section mb-6">
            <h2 className="text-lg font-bold mb-3 uppercase border-b border-black pb-1">
              Certifications
            </h2>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm">
                    <span className="font-medium">{cert.name}</span> - {cert.issuer}
                  </p>
                  <span className="text-sm text-gray-700">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;