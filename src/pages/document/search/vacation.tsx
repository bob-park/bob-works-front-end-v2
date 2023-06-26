// react
import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/router';

// react-icons
import { IoChevronBackSharp } from 'react-icons/io5';
import { FiPrinter, FiDownload } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';

// daisyui
import { Button, Modal, Card } from 'react-daisyui';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { documentActions } from '@/store/document';
import { DocumentsStatus } from '@/store/document/types';
import VacationDocument from '@/components/document/VacationDocument';

// utils
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// actions
const { requestGetVacationDocument, requestCancelDocument } = documentActions;

function checkDisabledBtn(status?: DocumentsStatus): boolean {
  if (!status) {
    return false;
  }

  return status === 'CANCEL' || status === 'REJECT';
}

export default function VacationDetail() {
  // router
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { vacationDetail } = useAppSelector((state) => state.document);
  const {
    document: documents,
    lines,
    useAlternativeVacations,
  } = vacationDetail;

  // state
  const [showConfirmCancel, setShowConfirmCancel] = useState<boolean>(false);

  // useEffect
  useEffect(() => {
    const { id } = router.query;

    if (!id) {
      return;
    }

    const documentId = Number(id);

    dispatch(
      requestGetVacationDocument({
        id: documentId,
        exceptionHandle: {
          handleAuthError: handleLogout,
        },
      }),
    );
  }, [router.query.id]);

  // handle
  const handleLogout = () => {
    router.push('/api/logout');
  };

  const handlePrint = () => {};

  const handleCapture = () => {
    if (!documents) {
      return;
    }

    const docElement = document.getElementById('vacationDocument');
    if (!docElement) {
      return;
    }
    html2canvas(docElement).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas, 'JPEG', 0, 0, 210, 297);
      pdf.save(`${documents.id}_${documents.writer.name}.pdf`);
    });
  };

  const handleCancel = () => {
    if (!documents) {
      return;
    }

    setShowConfirmCancel(false);

    dispatch(
      requestCancelDocument({
        id: documents.id,
        afterHandle: () => router.push('/document/search'),
        exceptionHandle: {
          handleAuthError: handleLogout,
        },
      }),
    );
  };

  const handleBackDrop = () => {
    router.back();
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="grid grid-cols-1 gap-10">
          {/* title */}
          <div>
            <div className="inline-block">
              <Button color="ghost" onClick={handleBackDrop}>
                <IoChevronBackSharp className="w-5 h-5" />
              </Button>
              <span className="text-xl font-semibold ml-2">상세</span>
            </div>
          </div>

          {/* buttons */}
          <div>
            <div className="grid grid-cols-3 gap-10 mt-3 justify-end">
              <Button color="accent" onClick={handlePrint} disabled>
                <FiPrinter className="mr-2 h-5 w-5" size="" />
                인쇄
              </Button>

              <Button
                onClick={handleCapture}
                disabled={checkDisabledBtn(documents?.status)}
              >
                <FiDownload className="mr-2 h-5 w-5" />
                PDF 다운로드
              </Button>

              <Button
                onClick={() => setShowConfirmCancel(true)}
                color="error"
                disabled={checkDisabledBtn(documents?.status)}
              >
                <MdOutlineCancel className="mr-2 h-5 w-5" />
                취소
              </Button>
            </div>
          </div>

          {/* contents */}
          <Card className="bg-base-100 shadow-sm overflow-auto">
            <Card.Body>
              <VacationDocument
                document={documents}
                lines={lines}
                useAlternativeVacations={useAlternativeVacations}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* 취소 modal */}
      <Modal
        open={showConfirmCancel}
        onClickBackdrop={() => setShowConfirmCancel(false)}
      >
        <Modal.Header className="font-bold">취소 할꺼야?</Modal.Header>
        <Modal.Actions>
          <Button onClick={() => setShowConfirmCancel(false)}>안할꺼야</Button>
          <Button color="primary" onClick={handleCancel}>
            할꺼야
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
