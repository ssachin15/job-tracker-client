import { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import clsx from 'clsx';

function UploadZone({ onFileSelect, uploading }) {
  const [dragOver,   setDragOver]   = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB');
      return;
    }
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      <div
        onClick={() => !selectedFile && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={clsx(
          'border-2 border-dashed rounded-xl p-8 text-center transition-all',
          dragOver
            ? 'border-brand-500 bg-brand-600/5'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50',
          !selectedFile && 'cursor-pointer',
          uploading && 'opacity-50 pointer-events-none'
        )}
      >
        {selectedFile ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-brand-50 border border-brand-200
                            rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-brand-600" />
            </div>
            <div className="text-left">
              <p className="text-gray-900 text-sm font-medium">
                {selectedFile.name}
              </p>
              <p className="text-gray-500 text-xs">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); clearFile(); }}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center
                            justify-center mx-auto mb-3">
              <Upload size={22} className="text-gray-500" />
            </div>
            <p className="text-gray-900 text-sm font-medium mb-1">
              Drop your resume here
            </p>
            <p className="text-gray-400 text-xs">
              PDF only · Max 5MB
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

export default UploadZone;