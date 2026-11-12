import React, { useRef, useEffect } from 'react';

interface Props {
  value: string;
  onSave: (val: string) => void;
  isEditable?: boolean;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
  style?: React.CSSProperties;
}

export const InlineEditable: React.FC<Props> = ({
  value,
  onSave,
  isEditable = true,
  className = '',
  placeholder = 'Click to edit...',
  multiline = false,
  as: Component = 'span',
  style
}) => {
  const ref = useRef<HTMLElement>(null);

  // Sync internal text with value prop
  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value || '';
    }
  }, [value]);

  if (!isEditable) {
    return (
      <Component className={className} style={style}>
        {value || (placeholder ? <span className="opacity-40 italic">{placeholder}</span> : '')}
      </Component>
    );
  }

  const handleBlur = () => {
    if (ref.current) {
      const text = ref.current.innerText;
      if (text !== value) {
        onSave(text);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  const isEmpty = !value || value.trim().length === 0;

  return (
    <Component
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={style}
      data-placeholder={placeholder}
      className={`relative cursor-text rounded transition-all duration-150 outline-none
        hover:bg-sky-50/70 hover:ring-1 hover:ring-sky-300 focus:bg-sky-50 focus:ring-2 focus:ring-sky-500
        print:hover:bg-transparent print:hover:ring-0 print:focus:ring-0
        ${isEmpty ? 'italic text-slate-400 min-w-[60px] inline-block' : ''}
        ${className}
      `}
    >
      {value || (isEmpty ? placeholder : '')}
    </Component>
  );
};
