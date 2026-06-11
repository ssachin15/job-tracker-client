import {
  Sparkles, Code2, Briefcase, GraduationCap,
  Lightbulb, RefreshCw, Calendar,
} from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { resumeAPI } from '../../api/resume';
import Button from '../ui/Button';

function Section({ icon: Icon, title, children }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-brand-600" />
        <h4 className="text-gray-900">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function AnalysisResult({ resume, analysis }) {
  const queryClient = useQueryClient();

  const reanalyzeMutation = useMutation({
    mutationFn: () => resumeAPI.reanalyze(resume._id),
    onSuccess:  (res) => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast.success('Resume re-analyzed successfully');
    },
    onError: () => toast.error('Re-analysis failed'),
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-brand-600" />
          <h3>AI Analysis</h3>
        </div>
        <div className="flex items-center gap-3">
          {analysis.analyzedAt && (
            <span className="text-gray-400 text-xs flex items-center gap-1">
              <Calendar size={11} />
              {new Date(analysis.analyzedAt).toLocaleDateString()}
            </span>
          )}
          <Button
            variant="secondary"
            onClick={() => reanalyzeMutation.mutate()}
            loading={reanalyzeMutation.isPending}
          >
            <RefreshCw size={14} />
            Re-analyze
          </Button>
        </div>
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="p-4 bg-brand-50 border border-brand-200 rounded-xl">
          <p className="text-gray-700 text-sm leading-relaxed">
            {analysis.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {analysis.skills?.length > 0 && (
        <Section icon={Code2} title={`Skills (${analysis.skills.length})`}>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 border border-gray-200
                           rounded-full text-xs text-gray-700 font-medium
                           hover:border-brand-300 hover:text-brand-600
                           transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Experience */}
      {analysis.experience?.length > 0 && (
        <Section icon={Briefcase} title="Experience">
          <div className="space-y-3">
            {analysis.experience.map((exp, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50
                           rounded-lg border border-gray-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200
                                flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Briefcase size={14} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-medium">
                    {exp.role}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {exp.company}
                  </p>
                  {exp.duration && (
                    <p className="text-gray-400 text-xs mt-0.5">
                      {exp.duration}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {analysis.education?.length > 0 && (
        <Section icon={GraduationCap} title="Education">
          <div className="space-y-3">
            {analysis.education.map((edu, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50
                           rounded-lg border border-gray-200"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200
                                flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap size={14} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-medium">
                    {edu.degree}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {edu.institution}
                  </p>
                  {edu.year && (
                    <p className="text-gray-400 text-xs mt-0.5">
                      {edu.year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Suggestions */}
      {analysis.suggestions?.length > 0 && (
        <Section icon={Lightbulb} title="Suggestions">
          <div className="space-y-2">
            {analysis.suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-yellow-50
                           border border-yellow-200 rounded-lg"
              >
                <div className="w-5 h-5 rounded-full bg-yellow-600/20
                                flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-600 text-xs font-bold">
                    {i + 1}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

export default AnalysisResult;