export interface EducationItem {
  title: string;
  degree: string;
  place: string;
  start: Date;
  end: Date;
}

export interface ExperienceItem {
  company: string;
  position: string;
  start: Date;
  end: Date;
  employment: string;
  place: string;
  description: string;
}

export interface CreateResume {
  username: string;
  about?: string;
  skills?: string[];
  contact?: string;
  experience?: ExperienceItem[];
  education?: EducationItem[];
}
