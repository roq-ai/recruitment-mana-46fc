import { FeedbackInterface } from 'interfaces/feedback';
import { CandidateInterface } from 'interfaces/candidate';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InterviewInterface {
  id?: string;
  interview_date?: any;
  interview_time?: string;
  interview_type?: string;
  interview_status?: string;
  candidate_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  feedback?: FeedbackInterface[];
  candidate?: CandidateInterface;
  user?: UserInterface;
  _count?: {
    feedback?: number;
  };
}

export interface InterviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  interview_time?: string;
  interview_type?: string;
  interview_status?: string;
  candidate_id?: string;
  user_id?: string;
}
