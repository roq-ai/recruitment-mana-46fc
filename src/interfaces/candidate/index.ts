import { InterviewInterface } from 'interfaces/interview';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CandidateInterface {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  resume?: string;
  status?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  interview?: InterviewInterface[];
  user?: UserInterface;
  _count?: {
    interview?: number;
  };
}

export interface CandidateGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  resume?: string;
  status?: string;
  user_id?: string;
}
