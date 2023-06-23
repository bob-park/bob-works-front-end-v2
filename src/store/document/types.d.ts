type DocumentType = 'VACATION' | 'HOLIDAY_WORK';

type DocumentsState = {
  isLoading: boolean;
  types: DocumentTypes[];
};

type DocumentTypes = {
  id: number;
  type: DocumentType;
  name: string;
  approvalLine?: DocumentApprovalLine;
};

type DocumentApprovalLine = {
  id: number;
  userId: number;
  teamId: number;
  next?: DocumentApprovalLine;
};
