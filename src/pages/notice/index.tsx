import { format } from 'date-fns';

import DocumentTable from '@/components/DocumentTable';
import DocumentPagination from '@/components/DocumentPagination';

const headers = [
  {
    id: 'id',
    value: '공지 번호',
  },
  {
    id: 'title',
    value: '제목',
  },
  {
    id: 'createdDate',
    value: '업로드 날짜',
    parse: (input: Date) => format(new Date(input), 'yyyy-MM-dd hh:mm:ss'),
  },
];

const dummyDataList = [
  { id: 1, title: 'dummy notice 1', createdDate: new Date() },
];

export default function Notice() {
  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-1 gap-8">
        <div className="my-4">
          <h2 className="text-2xl font-bold">공지</h2>
        </div>
        <div className="bg-base-100 shadow-xl overflow-auto border rounded-xl">
          <DocumentTable headers={headers} dataList={dummyDataList} />
        </div>
        <div className="flex justify-center">
          <DocumentPagination total={2} current={1} />
        </div>
      </div>
    </main>
  );
}
