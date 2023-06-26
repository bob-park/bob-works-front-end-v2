// react
import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/router';

import { IoChevronBackSharp } from 'react-icons/io5';

// daisyui
import { Button, Modal, Input } from 'react-daisyui';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { documentActions } from '@/store/document';
import { DocumentsStatus } from '@/store/document/types';

import VacationDocument from '@/components/document/VacationDocument';

// actions
const {
  requestApprovalDocument,
  requestGetVacationDocument,
  requestProceedApprovalDocument,
} = documentActions;

function checkDisabledBtn(status?: DocumentsStatus): boolean {
  if (!status) {
    return false;
  }

  return status === 'CANCEL' || status === 'REJECT' || status === 'APPROVE';
}

export default function ApprovalVacation() {
  // router
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { vacationDetail, approvalDetail } = useAppSelector(
    (state) => state.document,
  );

  // useState
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);

  const [rejectReason, setRejectReason] = useState<string>('');

  // useEffect
  useEffect(() => {
    const { approvalId } = router.query;

    if (!approvalId) {
      return;
    }

    dispatch(
      requestApprovalDocument({
        approvalId: Number(approvalId),
        exceptionHandle: {
          handleAuthError: handleLogout,
        },
      }),
    );
  }, [router.query.approvalId]);

  useEffect(() => {
    if (!approvalDetail) {
      return;
    }

    dispatch(
      requestGetVacationDocument({
        id: approvalDetail.document.id,
        exceptionHandle: {
          handleAuthError: handleLogout,
        },
      }),
    );
  }, [approvalDetail]);

  // handle
  const handleLogout = () => {
    router.push('/api/logout');
  };

  const handleBackDrop = () => {
    router.back();
  };

  const handleReject = () => {
    if (!approvalDetail) {
      return;
    }

    handleProceedApprove(approvalDetail.id, 'REJECT', rejectReason);

    setOpenRejectModal(false);
  };

  const handleApprove = () => {
    if (!approvalDetail) {
      return;
    }

    handleProceedApprove(approvalDetail.id, 'APPROVE');

    setOpenApproveModal(false);
  };

  const handleProceedApprove = (
    approvalId: number,
    status: DocumentsStatus,
    reason?: string,
  ) => {
    dispatch(
      requestProceedApprovalDocument({
        approvalId,
        body: {
          status,
          reason,
        },
        afterHandle: () => {
          router.push('/document/approve/search');
        },
        exceptionHandle: {
          handleAuthError: handleLogout,
        },
      }),
    );
  };

  return (
    <>
      <main className="w-full h-full">
        <div className="grid grid-cols-1 gap-10">
          {/* title */}
          <div>
            <div className="inline-block">
              <Button color="ghost" onClick={handleBackDrop}>
                <IoChevronBackSharp className="w-5 h-5" />
              </Button>
              <span className="text-xl font-semibold ml-2">결재</span>
            </div>
          </div>

          {/* buttons */}
          <div>
            <div className="grid grid-cols-2 gap-10 mt-3 justify-end">
              <Button
                color="error"
                disabled={checkDisabledBtn(approvalDetail?.status)}
                onClick={() => setOpenRejectModal(true)}
              >
                반려
              </Button>
              <Button
                color="primary"
                disabled={checkDisabledBtn(approvalDetail?.status)}
                onClick={() => setOpenApproveModal(true)}
              >
                승인
              </Button>
            </div>
          </div>

          {/* contents */}
          {vacationDetail && (
            <div className="bg-base-100 shadow-lg overflow-auto border rounded-xl">
              <VacationDocument
                document={vacationDetail.document}
                lines={vacationDetail.lines}
                useAlternativeVacations={vacationDetail.useAlternativeVacations}
              />
            </div>
          )}
        </div>
      </main>
      {/* 반려 modal */}
      <Modal
        open={openRejectModal}
        onClickBackdrop={() => setOpenRejectModal(false)}
      >
        <Modal.Header className="font-bold">반려</Modal.Header>
        <Modal.Body>
          <Input
            className="w-full"
            placeholder="반려 사유"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={() => setOpenRejectModal(false)}>취소</Button>
          <Button color="error" onClick={handleReject}>
            반려 처리
          </Button>
        </Modal.Actions>
      </Modal>
      {/* 승인 modal */}
      <Modal
        open={openApproveModal}
        onClickBackdrop={() => setOpenApproveModal(false)}
      >
        <Modal.Header className="font-bold">승인</Modal.Header>
        <Modal.Actions>
          <Button onClick={() => setOpenApproveModal(false)}>취소</Button>
          <Button color="primary" onClick={handleApprove}>
            승인 처리
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
