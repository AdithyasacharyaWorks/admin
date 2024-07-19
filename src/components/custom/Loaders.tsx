import React from 'react';

const Loaders: React.FC = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};

export default Loaders;