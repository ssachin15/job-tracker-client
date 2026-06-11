import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Bell, BarChart3 } from 'lucide-react';

const actions = [
  {
    label:       'Add job',
    description: 'Track a new application',
    icon:        Plus,
    color:       'bg-brand-50 border-brand-200 text-brand-600',
    route:       '/jobs',
  },
  {
    label:       'Upload resume',
    description: 'AI-powered analysis',
    icon:        FileText,
    color:       'bg-blue-50 border-blue-200 text-blue-600',
    route:       '/resume',
  },
  {
    label:       'Set reminder',
    description: 'Follow up on time',
    icon:        Bell,
    color:       'bg-yellow-50 border-yellow-200 text-yellow-600',
    route:       '/reminders',
  },
  {
    label:       'View pipeline',
    description: 'Track your progress',
    icon:        BarChart3,
    color:       'bg-green-50 border-green-200 text-green-600',
    route:       '/jobs',
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3 className="mb-4">Quick actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, description, icon: Icon, color, route }) => (
          <button
            key={label}
            onClick={() => navigate(route)}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50
                       hover:bg-white border border-gray-200 hover:border-gray-300
                       transition-all text-left group"
          >
            <div className={`w-9 h-9 rounded-lg border flex items-center
                            justify-center flex-shrink-0 ${color}`}>
              <Icon size={17} />
            </div>
            <div>
              <p className="text-gray-900 text-sm font-medium">{label}</p>
              <p className="text-gray-400 text-xs mt-0.5">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;