import {
  CheckCircle,
  Code,
  Layers,
  LucideIcon,
  Pencil,
  Rocket,
  Search,
  Settings,
  Waypoints,
} from 'lucide-react';

export const PROCESS_STEP_ICON_KEYS = [
  'search',
  'waypoints',
  'pencil',
  'layers',
  'rocket',
  'code',
  'settings',
  'check-circle',
] as const;

export type ProcessStepIconKey = (typeof PROCESS_STEP_ICON_KEYS)[number];

export const processStepIconMap: Record<ProcessStepIconKey, LucideIcon> = {
  search: Search,
  waypoints: Waypoints,
  pencil: Pencil,
  layers: Layers,
  rocket: Rocket,
  code: Code,
  settings: Settings,
  'check-circle': CheckCircle,
};

const defaultIconsByIndex: ProcessStepIconKey[] = [
  'search',
  'waypoints',
  'pencil',
  'layers',
];

export function resolveProcessStepIcon(
  icon: string | undefined,
  index: number
): LucideIcon {
  if (icon && icon in processStepIconMap) {
    return processStepIconMap[icon as ProcessStepIconKey];
  }
  const fallback =
    defaultIconsByIndex[index % defaultIconsByIndex.length] ?? 'search';
  return processStepIconMap[fallback];
}
