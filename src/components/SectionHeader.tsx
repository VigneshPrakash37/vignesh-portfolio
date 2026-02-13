
import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<Props> = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      {subtitle && <p className="text-slate-500 text-lg max-w-2xl leading-relaxed mx-auto md:mx-0">{subtitle}</p>}
    </div>
  );
};
