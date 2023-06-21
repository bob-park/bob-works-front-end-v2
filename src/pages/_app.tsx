import '@/styles/globals.css';

import { useLayoutEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { wrapper } from '@/store/store';
import { userActions } from '@/store/user';

// react-icon
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import {
  GrDocumentTime,
  GrDocumentUpdate,
  GrNotification,
} from 'react-icons/gr';
import { MdOutlineHolidayVillage } from 'react-icons/md';
import { AiOutlineUnorderedList, AiOutlineSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

// daisyui
import {
  Navbar,
  Dropdown,
  Button,
  Indicator,
  Badge,
  Menu,
  Avatar,
  Drawer,
  Divider,
  Tooltip,
} from 'react-daisyui';

// user actions
const { requestGetUser } = userActions;

function App({ Component, pageProps }: AppProps) {
  // state
  const [visible, setVisible] = useState<boolean>(false);

  // router
  const router = useRouter();

  // store
  const { isLoading, isLoggedIn, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // use effect
  useLayoutEffect(() => {
    dispatch(
      requestGetUser({
        exceptionHandle: () =>
          router.push('/api/oauth2/authorization/bob-works'),
      }),
    );
  }, []);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const activeMenuItem = (menuPath: string): string => {
    if (router.pathname !== menuPath) {
      return '';
    }

    return 'active';
  };

  return (
    <>
      <Head>
        <title>Bob Works</title>
      </Head>

      <Drawer
        className="lg:drawer-open h-screen"
        side={
          <aside className="w-80 h-full">
            <div className="bg-opacity-90 px-4 py-2 backdrop-blur flex justify-center bg-base-100 shadow-sm h-[78px]">
              <a className="btn btn-ghost normal-case px-2 mx-2 text-2xl font-bold">
                Bob Works
              </a>
            </div>

            <Menu className="h-full bg-base-100 w-80 p-2" compact="md">
              <Menu.Item>
                <a className={activeMenuItem('/')}>
                  <LuLayoutDashboard />
                  대시보드
                </a>
              </Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Title>
                <h2>문서 결재</h2>
              </Menu.Title>
              <Menu.Item>
                <a>
                  <AiOutlineUnorderedList />
                  결재 신청 목록
                </a>
              </Menu.Item>
              <Menu.Item>
                <a>
                  <GrDocumentTime />
                  결재 대기 목록
                </a>
              </Menu.Item>
              <Menu.Item></Menu.Item>
              <Menu.Title>
                <h2>문서 신청</h2>
              </Menu.Title>
              <Menu.Item>
                <a>
                  <GrDocumentUpdate />
                  휴가계 신청
                </a>
              </Menu.Item>
              <Menu.Item>
                <a>
                  <MdOutlineHolidayVillage />
                  휴일 근무 보고서 신청
                </a>
              </Menu.Item>
            </Menu>
          </aside>
        }
        open={visible}
        onClickOverlay={toggleVisible}
      >
        <Navbar className="bg-base-100 shadow-sm">
          <Navbar.Start className="flex-none lg:hidden">
            <div className="flex-none lg:hidden">
              <Button shape="square" color="ghost" onClick={toggleVisible}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
            <div className="flex-1 px-2 mx-2 lg:hidden text-2xl font-bold">
              Bob Works
            </div>
          </Navbar.Start>
          <Navbar.End>
            <Dropdown className="mr-10" hover end>
              <Avatar
                src="http://localhost:8081/user/avatar/1"
                size="sm"
                shape="circle"
                online
              />
              <Dropdown.Menu className="w-48 bg-base-100 shadow-xl">
                <Dropdown.Item>
                  <GrNotification />
                  공지 <Badge color="primary">new</Badge>
                </Dropdown.Item>
                <hr />
                <Dropdown.Item>
                  <CgProfile />
                  프로필
                </Dropdown.Item>
                <Dropdown.Item>
                  <AiOutlineSetting />
                  설정
                </Dropdown.Item>
                <hr />
                <Dropdown.Item>
                  <LuLogOut />
                  로그아웃
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.End>
        </Navbar>
        <div className="flex items-center justify-center m-10">
          <Component {...pageProps} />
        </div>

        <div className="absolute bottom-10 right-10">
          <Tooltip message="무엇을 도와드릴까요?">
            <Avatar
              className=""
              size="sm"
              shape="circle"
              src="/customer_service_center.png"
              border
              color="ghost"
            />
          </Tooltip>
        </div>
      </Drawer>
    </>
  );
}

export default wrapper.withRedux(App);
