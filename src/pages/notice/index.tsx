import { useState, useEffect } from 'react';

// daisyui
import { Badge, Button, Modal } from 'react-daisyui';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import useLogout from '@/hooks/useLogout';

// store
import { noticeActions } from '@/store/notice';

import { format } from 'date-fns';

import DocumentTable from '@/components/DocumentTable';
import DocumentPagination from '@/components/DocumentPagination';
import { getTotalPageCount } from '@/utils/paginationUtils';
import { PaginationParams } from '@/store/types';

import { Notice } from '@/store/notice/types';

// actions
const { requestSearchNotice, requestReadNotice, requestGetNotice } =
  noticeActions;

const headers = [
  // {
  //   id: 'id',
  //   value: '공지 번호',
  // },
  {
    id: 'title',
    value: '제목',
    parse: (input: string, row: Notice) => (
      <span>
        <span className="pr-2">{input}</span>
        {!row.isRead && <Badge color="secondary">new</Badge>}
      </span>
    ),
  },
  {
    id: 'createdDate',
    value: '공지 날짜',
    parse: (input: Date) => format(new Date(input), 'yyyy-MM-dd hh:mm:ss'),
  },
];

export default function Notice() {
  // hooks
  const logout = useLogout();

  // store
  const dispatch = useAppDispatch();
  const { searchParams, contents, detail } = useAppSelector(
    (state) => state.notice,
  );

  // state
  const [showNoticeDetail, setShowNoticeDetail] = useState<boolean>(false);
  const [searchNoticeParams, setSearchNoticeParams] =
    useState<PaginationParams>({
      page: 0,
      size: 10,
    });

  // useEffect

  useEffect(() => {
    handleSearchRequest();
  }, [searchNoticeParams]);

  useEffect(() => {
    setSearchNoticeParams(searchParams);
  }, [searchParams]);

  // handle
  const handleSearchRequest = () => {
    dispatch(
      requestSearchNotice({
        params: searchNoticeParams,
        exceptionHandle: {
          handleAuthError: logout,
        },
      }),
    );
  };

  const handleReadNotice = (id: string) => {
    dispatch(
      requestReadNotice({
        id,
        exceptionHandle: {
          handleAuthError: logout,
        },
      }),
    );

    dispatch(
      requestGetNotice({
        id,
        exceptionHandle: {
          handleAuthError: logout,
        },
        handleAfter: () => {
          setShowNoticeDetail(true);
        },
      }),
    );
  };

  return (
    <>
      <main className="w-full h-full">
        <div className="grid grid-cols-1 gap-8">
          <div className="my-4">
            <h2 className="text-2xl font-bold">공지</h2>
          </div>
          <div className="bg-base-100 shadow-xl overflow-auto border rounded-xl">
            <DocumentTable
              headers={headers}
              dataList={contents.content}
              onRowClick={(id: string) => handleReadNotice(id)}
            />
          </div>
          <div className="flex justify-center">
            <DocumentPagination
              total={getTotalPageCount(contents.total, contents.pageable.size)}
              current={contents.pageable.page + 1}
              onPrev={() =>
                setSearchNoticeParams({
                  ...searchNoticeParams,
                  page: searchNoticeParams.page - 1,
                })
              }
              onNext={() =>
                setSearchNoticeParams({
                  ...searchNoticeParams,
                  page: searchNoticeParams.page + 1,
                })
              }
            />
          </div>
        </div>
      </main>
      <Modal
        className="w-11/12 max-w-5xl"
        open={showNoticeDetail}
        onClickBackdrop={() => setShowNoticeDetail(false)}
      >
        <Modal.Header>
          <div className="flex gap-2 justify-between">
            <div className="font-bold">{detail?.title}</div>
            <div className="font-thin text-sm">
              {detail &&
                format(new Date(detail.createdDate), 'yyyy-MM-dd HH:mm:ss')}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <pre>{detail?.description}</pre>
        </Modal.Body>
        <Modal.Actions>
          <Button color="primary" onClick={() => setShowNoticeDetail(false)}>
            확인
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
