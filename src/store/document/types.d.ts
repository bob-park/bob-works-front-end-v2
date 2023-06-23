import { Pagable } from '@/store/types';

export type DocumentType = 'VACATION' | 'HOLIDAY_WORK';

export type DocumentsState = {
  isLoading: boolean;
  types: DocumentsType[];
  pageable: Pagable<Documents>;
};

export type DocumentsType = {
  id: number;
  type: DocumentType;
  name: string;
  approvalLine?: DocumentApprovalLine;
};

export type DocumentApprovalLine = {
  id: number;
  userId: number;
  teamId: number;
  next?: DocumentApprovalLine;
};

// documents
export type DocumentsStatus =
  | 'WAITING'
  | 'PROCEEDING'
  | 'APPROVE'
  | 'REJECT'
  | 'CANCEL';
export type Documents = {
  id: number;
  documentType: DocumentsType;
  writer: User;
  status: DocumentsStatus;
  createdDate: Date;
  createdBy: string;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
};

// add vacation request
export type VacationType = 'GENERAL' | 'HOLIDAY_WORK';
export type VacationSubType = 'AM' | 'PM';
export type AddVacationRequest = {
  typeId: number;
  vacationType: VacationType;
  vacationSubType?: VacationSubType | null;
  vacationDateFrom: Date;
  vacationDateTo: Date;
  reason: string;
  useAlternativeVacationIds?: number[];
};
