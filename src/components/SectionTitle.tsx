import type { ReactNode } from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children?: ReactNode;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = true,
  children,
}: SectionTitleProps) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
