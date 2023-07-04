// react
import { ChangeEvent, useEffect, useRef, useState } from 'react';

// next
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

// daisyui
import { Button, Modal, Input, Divider } from 'react-daisyui';

// react-icons
import { GrEdit } from 'react-icons/gr';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { userActions } from '@/store/user';
import { commonActions } from '@/store/common';
import { wrapper } from '@/store/store';

// common
import { client } from '@/utils/common';

// actions
const { requestGetUser, requestUpdateUserAvatar } = userActions;
const { addAlert } = commonActions;

const UserSettings = () => {
  // router
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  // handle

  if (!user) {
    return null;
  }

  return (
    <main className="grid grid-cols-3 gap-10 w-full h-full p-10 m-5">
      {/* title */}
      <div className="col-span-3">
        <h1 className="text-xl font-semibold">사용자 설정</h1>
        <Divider />
      </div>

      {/* 문서 결재 서명 */}
      <div className="col-span-3">
        <div className="grid grid-cols-1 gap-5">
          <h2 className="text-lg font-semibold">결재 서명</h2>
          <div className="p-5 relative">
            <input type="file" hidden accept=".png,.jpg" />
            <div className="border border-gray-200 inline-block p-3 rounded-xl w-[256px] h-[256px]">
              <img
                className="w-[256px]"
                src={`/api/user/${user?.id}/document/signature`}
                onError={(e) =>
                  (e.currentTarget.src = '/default-user-document-signature.png')
                }
              />
            </div>

            <Button
              className="absolute bottom-0 -left-1 border border-solid border-gray-300"
              animation
            >
              <GrEdit className="w-5 h-5" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserSettings;
