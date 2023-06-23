import {
  DocumentType,
  DocumentsStatus,
  DocumentsType,
} from '@/store/document/types';

export function getDocumentTypeId(
  types: DocumentsType[],
  typeName: DocumentType,
): number {
  const type = findDocumentType(types, typeName);

  return type.id;
}

export function findDocumentType(
  types: DocumentsType[],
  typeName: DocumentType,
) {
  const type = types.find((type) => type.type === typeName);

  if (!type) {
    throw new Error('No exist type.');
  }

  return type;
}

export function parseDocumentType(typeId: string) {
  let result = typeId;
  switch (typeId) {
    case 'VACATION':
      result = '휴가계';
      break;
    case 'HOLIDAY_WORK':
      result = '휴일 근무 보고서';
      break;
    default:
      break;
  }

  return result;
}

export function parseDocumentStatus(status: DocumentsStatus) {
  switch (status) {
    case 'WAITING':
      return '대기';
    case 'PROCEEDING':
      return '진행';
    case 'APPROVE':
      return '승인';
    case 'REJECT':
      return '반려';
    case 'CANCEL':
      return '취소';
  }
}
