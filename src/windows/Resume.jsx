import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { Document, Page, pdfjs } from 'react-pdf';
import { Download } from "lucide-react";
import { useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const [numPages, setNumPages] = useState(2);

  return (
    <>
        <div id = "window-header">
            <WindowControls target = "resume"/>
            <h2>Resume.pdf</h2>
            <a href="files/resume2.pdf"
                download  className ="cursor-pointer"
                title ="Download Resume">
                    <Download className ="icon"/>

            </a>

        </div>

        <div className="flex-1 min-h-0 max-h-[75vh] overflow-y-auto">
          <Document
            file="files/resume2.pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <Page
                key={i + 1}
                pageNumber={i + 1}
                renderTextLayer
                renderAnnotationLayer
              />
            ))}
          </Document>
        </div>
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;