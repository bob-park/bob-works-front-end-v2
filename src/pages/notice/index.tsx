import { useState, useEffect } from 'react';

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

// actions
const { requestSearchNotice } = noticeActions;

const headers = [
  // {
  //   id: 'id',
  //   value: '공지 번호',
  // },
  {
    id: 'title',
    value: '제목',
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
  const { searchParams, contents } = useAppSelector((state) => state.notice);

  // state
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

  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-1 gap-8">
        <div className="my-4">
          <h2 className="text-2xl font-bold">공지</h2>
        </div>
        <div className="bg-base-100 shadow-xl overflow-auto border rounded-xl">
          <DocumentTable headers={headers} dataList={contents.content} />
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
  );
}
