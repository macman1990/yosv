import { AvailabilityStatus, AvailabilityStatusValue, Language, LocalizedString } from '../types/portfolio';

const stateCopy: Record<AvailabilityStatusValue, LocalizedString> = {
  available: {
    en: 'Available for projects and partnerships',
    ar: 'متاح للمشاريع والشراكات',
  },
  limited: {
    en: 'Limited availability',
    ar: 'التوفر محدود',
  },
  booked: {
    en: 'Currently unavailable',
    ar: 'غير متاح حالياً',
  },
};

export interface AvailabilityPresentation {
  status: AvailabilityStatusValue;
  label: string;
  description: string;
  tone: 'available' | 'limited' | 'booked';
}

export const getAvailabilityPresentation = (
  availability: AvailabilityStatus | undefined,
  language: Language,
): AvailabilityPresentation => {
  const status = availability?.status || 'available';
  const fallback = stateCopy[status];
  const localized = (value?: LocalizedString) => value?.[language] || value?.en || '';

  return {
    status,
    label: fallback[language],
    description: localized(availability?.description) || localized(availability?.label) || fallback[language],
    tone: status,
  };
};
