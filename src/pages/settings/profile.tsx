// react
import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/router';

// daisyui
import { Button, Modal, Input } from 'react-daisyui';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { userActions } from '@/store/user';

// user action
const {} = userActions;

export default function Profile() {
  // router
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <main className="grid grid-cols-3 gap-10 w-full h-full p-10 m-5">
        {/* title */}
        <div className="col-span-3">
          <h1>프로필</h1>
        </div>
        <div className="col-span-2">name</div>
        <div className="col-span-1">profile</div>
      </main>
    </>
  );
}
