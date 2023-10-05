import { InterviewInterface } from 'interfaces/interview';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FeedbackInterface {
  id?: string;
  feedback_date?: any;
  feedback_notes?: string;
  rating?: number;
  interview_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  interview?: InterviewInterface;
  user?: UserInterface;
  _count?: {};
}

export interface FeedbackGetQueryInterface extends GetQueryInterface {
  id?: string;
  feedback_notes?: string;
  interview_id?: string;
  user_id?: string;
}
