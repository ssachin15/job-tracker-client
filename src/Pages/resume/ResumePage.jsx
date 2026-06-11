import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FileText, Trash2, Sparkles,
  CheckCircle, Clock, AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { resumeAPI } from '../../api/resume';
import UploadZone    from '../../components/resume/UploadZone';
import AnalysisResult from '../../components/resume/AnalysisResult';
import Button         from '../../components/ui/Button';

function ResumePage() {
  const [selectedFile,    setSelectedFile]    = useState(null);
  const [activeResumeId,  setActiveResumeId]  = useState(null);
  const queryClient = useQueryClient();

  // Fetch all resumes
  const { data: resumesData, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn:  () => resumeAPI.getAll().then((r) => r.data),
  });

  const resumes = resumesData?.resumes || [];

  // Active resume with full analysis
  const { data: activeData } = useQuery({
    queryKey: ['resume', activeResumeId],
    queryFn:  () => resumeAPI.getById(activeResumeId).then((r) => r.data.resume),
    enabled:  !!activeResumeId,
  });

  const activeResume = activeData || resumes.find((r) => r._id === activeResumeId);

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: (file) => resumeAPI.upload(file),
    onSuccess:  (res) => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast.success('Resume uploaded successfully');
      setSelectedFile(null);
      setActiveResumeId(res.data.resume.id);
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || 'Upload failed'),
  });

  // Analyze mutation
  const analyzeMutation = useMutation({
    mutationFn: (id) => resumeAPI.analyze(id),
    onSuccess:  (res, id) => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume', id] });
      toast.success('Analysis complete!');
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || 'Analysis failed'),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => resumeAPI.delete(id),
    onSuccess:  (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      if (activeResumeId === id) setActiveResumeId(null);
      toast.success('Resume deleted');
    },
    onError: () => toast.error('Failed to delete resume'),
  });

  const handleUpload = () => {
    if (!selectedFile) return;
    uploadMutation.mutate(selectedFile);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1>Resume</h1>
        <p className="text-gray-500 text-sm mt-1">
          Upload your resume for AI-powered analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — upload + resume list */}
        <div className="space-y-4">

          {/* Upload card */}
          <div className="card">
            <h3 className="mb-4">Upload resume</h3>
            <UploadZone
              onFileSelect={setSelectedFile}
              uploading={uploadMutation.isPending}
            />
            {selectedFile && (
              <Button
                fullWidth
                className="mt-3"
                loading={uploadMutation.isPending}
                onClick={handleUpload}
              >
                <FileText size={15} />
                Upload PDF
              </Button>
            )}
          </div>

          {/* Resume list */}
          {isLoading ? (
            <div className="card flex items-center justify-center h-24">
              <div className="spinner w-6 h-6" />
            </div>
          ) : resumes.length === 0 ? (
            <div className="card text-center py-8">
              <FileText size={24} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No resumes uploaded yet</p>
            </div>
          ) : (
            <div className="card">
              <h3 className="mb-3">Your resumes</h3>
              <div className="space-y-2">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    onClick={() => setActiveResumeId(resume._id)}
                    className={clsx(
                      'flex items-center justify-between p-3 rounded-lg',
                      'border cursor-pointer transition-all',
                      activeResumeId === resume._id
                        ? 'border-brand-300 bg-brand-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText
                        size={16}
                        className={
                          activeResumeId === resume._id
                            ? 'text-brand-600'
                            : 'text-gray-400'
                        }
                      />
                      <div className="min-w-0">
                        <p className="text-gray-900 text-xs font-medium truncate">
                          {resume.originalName}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {resume.isAnalyzed ? (
                            <span className="text-green-600 text-xs
                             flex items-center gap-1">
                              <CheckCircle size={10} /> Analyzed
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs
                             flex items-center gap-1">
                              <Clock size={10} /> Not analyzed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(resume._id, resume.originalName);
                      }}
                      className="text-gray-400 hover:text-red-600
                                 transition-colors p-1 flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — analysis panel */}
        <div className="lg:col-span-2">
          {!activeResumeId ? (
            <div className="card flex flex-col items-center justify-center
                            h-96 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center
                              justify-center mb-4">
                <Sparkles size={24} className="text-gray-400" />
              </div>
              <h3 className="text-gray-600 mb-2">No resume selected</h3>
              <p className="text-gray-400 text-sm">
                Upload a resume or select one from the list
              </p>
            </div>
          ) : (
            <div className="card space-y-4">
              {/* Resume header */}
              <div className="flex items-center justify-between
                              pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-600/10 border border-brand-600/20
                                  rounded-xl flex items-center justify-center">
                    <FileText size={18} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">
                      {activeResume?.originalName}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {activeResume?.isAnalyzed
                        ? 'Analysis ready'
                        : 'Not analyzed yet'}
                    </p>
                  </div>
                </div>

                {!activeResume?.isAnalyzed && (
                  <Button
                    onClick={() => analyzeMutation.mutate(activeResumeId)}
                    loading={analyzeMutation.isPending}
                  >
                    <Sparkles size={15} />
                    Analyze with AI
                  </Button>
                )}
              </div>

              {/* Analysis loading */}
              {analyzeMutation.isPending && (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="spinner w-10 h-10" />
                  <p className="text-gray-500 text-sm">
                    AI is analyzing your resume...
                  </p>
                  <p className="text-gray-400 text-xs">This may take 10-20 seconds</p>
                </div>
              )}

              {/* Analysis result */}
              {activeResume?.isAnalyzed && activeResume?.aiAnalysis && (
                <AnalysisResult
                  resume={activeResume}
                  analysis={activeResume.aiAnalysis}
                />
              )}

              {/* Not analyzed state */}
              {!activeResume?.isAnalyzed && !analyzeMutation.isPending && (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <AlertCircle size={32} className="text-gray-400" />
                  <p className="text-gray-500 text-sm">
                    Click "Analyze with AI" to extract skills and experience
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePage;