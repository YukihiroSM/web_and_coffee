export interface CreateProject {
  title: string;
  requirements: string[];
  description: string;
  how_to_apply: string;
}

export interface Feedback {
  score: number;
  comment?: string;
}
export interface Member {
  first_name: string;
  position: string;
}

export interface Project {
  id: string;
  admin: string;
  title: string;
  requirements: string[];
  feedback: Feedback[];
  status: string;
  members: Member[];
  rating: number;
  description: string;
  how_to_apply: string;
}
