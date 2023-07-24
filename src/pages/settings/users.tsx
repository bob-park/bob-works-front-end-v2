// react
import { ChangeEvent, useEffect, useRef, useState } from 'react';

// next
import { useRouter } from 'next/router';

// daisyui
import { Button, Modal, Input, Divider } from 'react-daisyui';

// react-icons
import { GrEdit } from 'react-icons/gr';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import useLogout from '@/hooks/useLogout';

// store
import { userActions } from '@/store/user';
import { commonActions } from '@/store/common';

// actions
const { requestGetUser, requestUpdateSignature } = userActions;
const { addAlert } = commonActions;

const UserSettings = () => {
  // router
  // const router = useRouter();
  // hooks
  const logout = useLogout();

  // store
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  // state
  const [userSignatureSrc, setUserSignatureSrc] = useState<string>(
    `/default-user-document-signature.png`,
  );

  // ref
  const signatureInputRef = useRef<HTMLInputElement>(null);

  // useEffect
  useEffect(() => {
    setUserSignatureSrc(`/api/user/${user?.id}/document/signature`);
  }, [user]);

  // handle
  if (!user) {
    return null;
  }

  // const handleLogout = () => {
  //   router.push('/api/logout');
  // };

  const handleEditClick = () => {
    signatureInputRef.current?.click();
  };

  const handleSignatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const signatureFile = files[0];

    const formData = new FormData();

    formData.append('signature', signatureFile);

    dispatch(
      requestUpdateSignature({
        id: user.id,
        formData,
        handleAfter: () => {
          const newSignatureSrc = URL.createObjectURL(signatureFile);
          setUserSignatureSrc(newSignatureSrc);

          dispatch(
            addAlert({
              level: 'info',
              message: '사용자 결재 서명이 변경되었습니다.',
              createAt: new Date(),
            }),
          );
        },
        exceptionHandle: {
          handleAuthError: logout,
        },
      }),
    );
  };

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
            <input
              type="file"
              hidden
              accept=".png,.jpg"
              ref={signatureInputRef}
              onChange={handleSignatureChange}
            />
            <div className="border border-gray-200 inline-block p-3 rounded-xl w-[256px]">
              <img
                className="w-[256px]"
                src={userSignatureSrc}
                onError={(e) =>
                  (e.currentTarget.src = '/default-user-document-signature.png')
                }
              />
            </div>

            <Button
              className="absolute bottom-0 -left-1 border border-solid border-gray-300"
              animation
              onClick={handleEditClick}
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
