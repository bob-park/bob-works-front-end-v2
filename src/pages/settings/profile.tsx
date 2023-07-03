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

// store
import { userActions } from '@/store/user';

// user action
const { requestUpdateUserAvatar } = userActions;

export default function Profile() {
  // router
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  // state
  const [userAvatarSrc, setUserAvatarSrc] = useState<string>(
    user?.avatar || '/default_avatar.jpg',
  );

  // ref
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // handle
  const handleLogout = () => {
    router.push('/api/logout');
  };

  const handleEditAvatar = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const avatarFile = files[0];

    // ? 확장자...확인 필요할까?

    const formData = new FormData();

    formData.append('avatar', avatarFile);

    dispatch(
      requestUpdateUserAvatar({
        formData,
        handleAfter: () => {
          const newAvatarSrc = URL.createObjectURL(avatarFile);
          setUserAvatarSrc(newAvatarSrc);
        },
        exceptionHandle: {
          handleAuthError: handleLogout,
        },
      }),
    );
  };

  return (
    <>
      <main className="grid grid-cols-3 gap-10 w-full h-full p-10 m-5">
        {/* title */}
        <div className="col-span-3">
          <h1 className="text-xl font-semibold">프로필</h1>
          <Divider />
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-10">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">팀</span>
              </label>
              <Input value={user?.team.name} disabled />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">직급</span>
              </label>
              <Input value={user?.position?.name} disabled />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">이름</span>
              </label>
              <Input value={user?.name} disabled />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-[256px] relative">
            <img
              className="w-[256px] h-[256px] border rounded-full"
              src={userAvatarSrc}
            />
            <input
              type="file"
              hidden
              ref={avatarInputRef}
              accept=".png,.jpg"
              onChange={handleAvatarChange}
            />
            <Button
              className="absolute bottom-0 border border-solid border-gray-300"
              animation
              color="ghost"
              onClick={handleEditAvatar}
            >
              <GrEdit />
              Edit
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
