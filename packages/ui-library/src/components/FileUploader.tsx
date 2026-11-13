import React, { useRef, useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';

interface FileUploaderProps { 
  label: string; 
  onUpload: (file: File) => void; 
  accept?: string; 
}

export const FileUploader: React.FC<FileUploaderProps> = ({ label, onUpload, accept = "image/*" }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div 
        onClick={() => inputRef.current?.click()} 
        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden ${preview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
      >
        {preview ? (
          <div className="flex flex-col items-center gap-2">
            <img src={preview} alt="Preview" className="h-24 object-contain rounded-md" />
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
              <CheckCircle size={16} /> Uploaded
            </span>
          </div>
        ) : (
          <>
            <UploadCloud className="text-gray-400 mb-2" size={32} />
            <span className="text-sm text-gray-600 font-medium">{label}</span>
          </>
        )}
        <input type="file" ref={inputRef} className="hidden" accept={accept} onChange={handleFileChange} />
      </div>
    </div>
  );
};