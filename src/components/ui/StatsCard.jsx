import clsx from 'clsx';
import useCountUp from '../../hooks/useCountUp';

function StatsCard({ label, value, icon: Icon, color = 'brand', sublabel }) {
  const animated = useCountUp(value);

  const colors = {
    brand:  { icon: 'bg-brand-50 text-brand-600 border-brand-200',  bar: 'bg-brand-600'  },
    blue:   { icon: 'bg-blue-50 text-blue-600 border-blue-200',     bar: 'bg-blue-500'   },
    yellow: { icon: 'bg-yellow-50 text-yellow-600 border-yellow-200', bar: 'bg-yellow-500' },
    green:  { icon: 'bg-green-50 text-green-600 border-green-200',  bar: 'bg-green-500'  },
    red:    { icon: 'bg-red-50 text-red-600 border-red-200',        bar: 'bg-red-500'    },
  };

  const c = colors[color] || colors.brand;

  return (
    <div className="card group hover:border-gray-300 transition-all duration-300
                    hover:-translate-y-0.5 cursor-default">
      <div className="flex items-start justify-between mb-3">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
        <div className={clsx(
          'w-8 h-8 rounded-lg border flex items-center justify-center',
          'transition-transform duration-200 group-hover:scale-110',
          c.icon
        )}>
          <Icon size={15} />
        </div>
      </div>

      <p className="text-4xl font-bold text-gray-900 tracking-tight animate-count">
        {animated}
      </p>

      {sublabel && (
        <p className="text-gray-400 text-xs mt-1">{sublabel}</p>
      )}

      {/* Bottom accent bar */}
      <div className="mt-4 h-0.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-1000', c.bar)}
          style={{ width: value > 0 ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}

export default StatsCard;