import { PayloadAction } from '@reduxjs/toolkit';
import { ExceptionHandle } from '@/store/types';
import {
  AddVacationRequest,
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
    action: PayloadAction<AddVacationRequest>,
  ) => {
    state.isLoading = true;
  },
  successAddVacationDocumnet: (
    state: DocumentsState,
    action: PayloadAction<DocumentsStatus>,
  ) => {
    state.isLoading = false;
  },
  failureAddVacationDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
};

export default reducers;
