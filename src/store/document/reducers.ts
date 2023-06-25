import { PayloadAction } from '@reduxjs/toolkit';
import { ExceptionHandle, Pageable, PaginationParams } from '@/store/types';
import {
  AddVacationRequest,
  Documents,
  DocumentsState,
  DocumentsStatus,
  DocumentsType,
  VacationDocumentDetail,
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
  // search document
  requestSearchDocument: (
    state: DocumentsState,
    action: PayloadAction<{
      params: PaginationParams;
      exceptionHandle: ExceptionHandle;
    }>,
  ) => {
    state.isLoading = true;
  },
  successSearchDocument: (
    state: DocumentsState,
    action: PayloadAction<Pageable<Documents> | undefined>,
  ) => {
    state.isLoading = false;

    if (action.payload) {
      state.pageable = action.payload;
    }
  },
  failureSearchDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },

  // get vacation detail
  requestGetVacationDocument: (
    state: DocumentsState,
    action: PayloadAction<{ id: number; exceptionHandle: ExceptionHandle }>,
  ) => {
    state.isLoading = true;
  },
  successGetVacationDocument: (
    state: DocumentsState,
    action: PayloadAction<VacationDocumentDetail | undefined>,
  ) => {
    state.isLoading = false;
    state.vacationDetail = action.payload;
  },
  failureGetVacationDocument: (state: DocumentsState) => {
    state.isLoading = false;
  },
};

export default reducers;
