import React from 'react';
import { FontFamily, FontSize, MarginSize, LineSpacing, ResumeCustomization } from '../types/resume';

export function getFontFamilyClass(font: FontFamily): string {
  switch (font) {
    case 'merriweather':
      return 'font-serif';
    case 'garamond':
      return 'font-garamond';
    case 'roboto':
      return 'font-roboto';
    case 'mono':
      return 'font-mono';
    case 'lato':
      return 'font-sans';
    case 'inter':
    default:
      return 'font-sans';
  }
}

export function getFontSizeClasses(size: FontSize) {
  switch (size) {
    case 'compact':
      return {
        name: 'text-2xl font-bold',
        title: 'text-xs uppercase tracking-wider',
        sectionHeader: 'text-xs font-bold uppercase tracking-wider',
        subHeader: 'text-[11px] font-semibold',
        body: 'text-[10px] leading-tight',
        bullet: 'text-[10px] leading-tight',
        meta: 'text-[9.5px]'
      };
    case 'spacious':
      return {
        name: 'text-3xl font-extrabold',
        title: 'text-sm uppercase tracking-wide',
        sectionHeader: 'text-base font-bold uppercase tracking-wide',
        subHeader: 'text-[13.5px] font-semibold',
        body: 'text-[12px] leading-relaxed',
        bullet: 'text-[12px] leading-relaxed',
        meta: 'text-[11px]'
      };
    case 'normal':
    default:
      return {
        name: 'text-2xl font-bold',
        title: 'text-xs uppercase tracking-wider',
        sectionHeader: 'text-sm font-bold uppercase tracking-wider',
        subHeader: 'text-[12px] font-semibold',
        body: 'text-[11px] leading-normal',
        bullet: 'text-[11px] leading-normal',
        meta: 'text-[10px]'
      };
  }
}

export function getMarginClass(margin: MarginSize): string {
  switch (margin) {
    case 'compact':
      return 'p-6 sm:p-8';
    case 'spacious':
      return 'p-10 sm:p-14';
    case 'normal':
    default:
      return 'p-8 sm:p-10';
  }
}

export function getLineSpacingClass(spacing: LineSpacing): string {
  switch (spacing) {
    case 'compact':
      return 'space-y-2';
    case 'relaxed':
      return 'space-y-4';
    case 'normal':
    default:
      return 'space-y-3';
  }
}

export function formatUrlForDisplay(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
