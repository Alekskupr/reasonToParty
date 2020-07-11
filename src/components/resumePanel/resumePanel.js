import React, { useState, useEffect } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';

import './resumePanel.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResumePanel = () => {
  const [resume, setResume] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const resumeDocument = (
      <Document file="api/resume">
        <Page pageNumber={pageNumber} />
      </Document>
    );
    console.log(resumeDocument);

    setResume(resumeDocument);
  }, []);

  return <div>{resume}</div>;
};

export default ResumePanel;
