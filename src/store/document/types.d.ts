export type DocumentType = 'VACATION' | 'HOLIDAY_WORK';

export type DocumentsState = {
  isLoading: boolean;
  types: DocumentsType[];
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
