// react
import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/router';

import { IoChevronBackSharp } from 'react-icons/io5';

// daisyui
import { Button, Modal } from 'react-daisyui';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { documentActions } from '@/store/document';
import { DocumentsStatus } from '@/store/document/types';

import VacationDocument from '@/components/document/VacationDocument';

// actions
const {} = documentActions;

function checkDisabledBtn(status?: DocumentsStatus): boolean {
  if (!status) {
    return false;
  }

  return status === 'CANCEL' || status === 'REJECT';
}

export default function ApprovalVacation() {
  // router
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { vacationDetail } = useAppSelector((state) => state.document);

  // useEffect
  useEffect(() => {
    const { approvalId } = router.query;

    if (!approvalId) {
      return;
    }
  }, [router.query.approvalId]);

  // handle
  const handleLogout = () => {
    router.push('/api/logout');
  };

  const handleBackDrop = () => {
    router.back();
  };

  return (
    <>
      <main className="w-full h-full">
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
            <Button color="error">반려</Button>
            <Button color="primary">승인</Button>
          </div>
        </div>
      </main>
    </>
  );
}
