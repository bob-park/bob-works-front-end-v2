import { PayloadAction } from '@reduxjs/toolkit';
import { ExceptionHandle } from '@/store/types';
import { DocumentsState, DocumentsType } from './types';

const reducers = {
  // get document type
  requestGetDocumentType: (
    state: DocumentsState,
    action: PayloadAction<ExceptionHandle>,
  ) => {
    state.isLoading = true;
  },
  successGetdocumentType: (
    state: DocumentsState,
    action: PayloadAction<DocumentsType[]>,
  ) => {
    state.isLoading = false;
    state.types = action.payload;
  },
  failureGetDocumentType: (state: DocumentsState) => {
    state.isLoading = false;
  },
};

export default reducers;
