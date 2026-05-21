import {
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandPhp,
  IconBrandReact,
  IconBrandVue,
  IconBrandAngular,
  IconBrandTailwind,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandFirebase,
  IconBrandSupabase,
  IconBrandVercel,
  IconBrandFlutter,
  IconCode,
  IconBrandNextjs,
} from '@tabler/icons-react';

export type TechIconType = 
  | 'brand-html5' 
  | 'brand-css3' 
  | 'brand-javascript' 
  | 'brand-typescript' 
  | 'brand-php' 
  | 'brand-react' 
  | 'brand-vue' 
  | 'brand-angular' 
  | 'brand-tailwind' 
  | 'brand-mongodb' 
  | 'brand-mysql' 
  | 'brand-firebase' 
  | 'brand-supabase' 
  | 'brand-vercel'
  | 'brand-flutter'
  | 'code'
  | 'brand-nextjs';

export type TechStackItem = {
  label: string;
  shortLabel: string;
  tone: string;
  icon: TechIconType;
};

export const techStack: TechStackItem[] = [
  { label: 'HTML5', shortLabel: 'H5', tone: '#E34F26', icon: 'brand-html5' },
  { label: 'CSS3', shortLabel: 'CSS', tone: '#1572B6', icon: 'brand-css3' },
  { label: 'JavaScript', shortLabel: 'JS', tone: '#F7DF1E', icon: 'brand-javascript' },
  { label: 'TypeScript', shortLabel: 'TS', tone: '#3178C6', icon: 'brand-typescript' },
  { label: 'PHP', shortLabel: 'PHP', tone: '#777BB4', icon: 'brand-php' },
  { label: 'React', shortLabel: 'React', tone: '#61DAFB', icon: 'brand-react' },
  { label: 'Vue', shortLabel: 'Vue', tone: '#4FC08D', icon: 'brand-vue' },
  { label: 'Angular', shortLabel: 'Ng', tone: '#DD0031', icon: 'brand-angular' },
  { label: 'TailwindCSS', shortLabel: 'TW', tone: '#38BDF8', icon: 'brand-tailwind' },
  { label: 'MongoDB', shortLabel: 'MDB', tone: '#47A248', icon: 'brand-mongodb' },
  { label: 'MySQL', shortLabel: 'SQL', tone: '#4479A1', icon: 'brand-mysql' },
  { label: 'Firebase', shortLabel: 'FB', tone: '#FFCA28', icon: 'brand-firebase' },
  { label: 'Supabase', shortLabel: 'Supa', tone: '#3ECF8E', icon: 'brand-supabase' },
  { label: 'Vercel', shortLabel: 'Ver', tone: '#000000', icon: 'brand-vercel' },
  { label: 'Flutter', shortLabel: 'Flu', tone: '#02569B', icon: 'brand-flutter' },
  { label: 'Dart', shortLabel: 'Dart', tone: '#00CC76', icon: 'code' },
  { label: 'Next.js', shortLabel: 'Next', tone: '#FFFFFF', icon: 'brand-nextjs' },
];

export const techStackIcons = {
  'brand-html5': IconBrandHtml5,
  'brand-css3': IconBrandCss3,
  'brand-javascript': IconBrandJavascript,
  'brand-typescript': IconBrandTypescript,
  'brand-php': IconBrandPhp,
  'brand-react': IconBrandReact,
  'brand-vue': IconBrandVue,
  'brand-angular': IconBrandAngular,
  'brand-tailwind': IconBrandTailwind,
  'brand-mongodb': IconBrandMongodb,
  'brand-mysql': IconBrandMysql,
  'brand-firebase': IconBrandFirebase,
  'brand-supabase': IconBrandSupabase,
  'brand-vercel': IconBrandVercel,
  'brand-flutter': IconBrandFlutter,
  'code': IconCode,
  'brand-nextjs': IconBrandNextjs,
};
