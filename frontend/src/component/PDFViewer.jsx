import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useState } from "react";

// Set up the worker source (important!)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(0.5);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {pdfFile ? (
        <>
          {/* Controls */}

          {/* Zoom */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setScale((prev) => Math.max(prev - 0.25, 0.5))}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              -
            </button>
            <span>Zoom: {(scale * 100).toFixed(0)}%</span>
            <button
              onClick={() => setScale((prev) => prev + 0.25)}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              +
            </button>
          </div>

          {/* Download */}
          <a
            href={pdfFile}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded mt-2"
          >
            Download PDF
          </a>

          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Loading PDF..."
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="pdf-page mb-4">
                <Page
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        </>
      ) : (
        <p>No PDF file selected</p>
      )}
    </div>
  );
};

export default PDFViewer;
