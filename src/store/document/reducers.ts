import { PayloadAction } from '@reduxjs/toolkit';
import { ExceptionHandle } from '@/store/types';
import {
  AddVacationRequest,
  Documents,
  DocumentsState,
  DocumentsStatus,
  DocumentsType,
} from './types';

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
  // add vacation document
  requestAddVacationDocument: (
    state: DocumentsState,
    action: PayloadAction<{
      body: AddVacationRequest;
      handleException: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successAddVacationDocumnet: (
    state: DocumentsState,
    action: PayloadAction<Documents | undefined>,
  ) => {
    state.isLoading = false;
  },
  failureAddVacationDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
};

export default reducers;
