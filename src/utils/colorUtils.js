const COLORS = [
  { bg: 'bg-blue-900/40',   text: 'text-blue-300',   border: 'border-blue-800/40'   },
  { bg: 'bg-purple-900/40', text: 'text-purple-300', border: 'border-purple-800/40' },
  { bg: 'bg-green-900/40',  text: 'text-green-300',  border: 'border-green-800/40'  },
  { bg: 'bg-orange-900/40', text: 'text-orange-300', border: 'border-orange-800/40' },
  { bg: 'bg-pink-900/40',   text: 'text-pink-300',   border: 'border-pink-800/40'   },
  { bg: 'bg-cyan-900/40',   text: 'text-cyan-300',   border: 'border-cyan-800/40'   },
  { bg: 'bg-yellow-900/40', text: 'text-yellow-300', border: 'border-yellow-800/40' },
  { bg: 'bg-red-900/40',    text: 'text-red-300',    border: 'border-red-800/40'    },
];

export function getCompanyColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}