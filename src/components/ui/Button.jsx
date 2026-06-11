import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

function Button({
  children,
  variant  = 'primary',
  loading  = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    danger:    'btn-danger',
    ghost:     'btn-ghost',
  };

  return (
    <button
      className={clsx(
        variants[variant],
        fullWidth && 'w-full',
        'flex items-center justify-center gap-2',
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <Loader2 size={16} className="animate-spin" />
      )}
      {children}
    </button>
  );
}

export default Button;
