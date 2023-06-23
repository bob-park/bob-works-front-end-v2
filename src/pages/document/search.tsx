// react
import { FormEvent, useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// react-icons
import { BiSearch } from 'react-icons/bi';
import { GrPowerCycle } from 'react-icons/gr';

// daisyui
import { Breadcrumbs, Form, Card, Select, Button } from 'react-daisyui';

// hooks
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';

// store
import { documentActions } from '@/store/document';

type SelectValue = {
  id: string;
  name: string;
};

// actions
const { requestGetDocumentType } = documentActions;

const documentStatus: SelectValue[] = [
  {
    id: 'ALL',
    name: '전체',
  },
  {
    id: 'WAITING',
    name: '대기',
  },
  {
    id: 'PROCEEDING',
    name: '진행',
  },
  {
    id: 'APPROVE',
    name: '승인',
  },
  {
    id: 'REJECT',
    name: '반려',
  },
  {
    id: 'CANCEL',
    name: '취소',
  },
];

export default function DocumentList() {
  // next
  const router = useRouter();

  // store
  const dispatch = useAppDispatch();
  const { types, isLoading } = useAppSelector((state) => state.document);

  // useEffect
  useEffect(() => {
    dispatch(
      requestGetDocumentType({
        handleAuthError: handleLogout,
      }),
    );
  }, []);

  // handle
  const handleLogout = () => {
    router.push('/api/logout');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-1 gap-8">
        <Breadcrumbs>
          <Breadcrumbs.Item>대시보드</Breadcrumbs.Item>
          <Breadcrumbs.Item>문서 결재</Breadcrumbs.Item>
          <Breadcrumbs.Item>결재 신청 목록</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-bold">결재 신청 목록</h2>
      </div>

      {/* contents */}
      <div className="grid grid-cols-1 gap-8">
        {/* 검색 조건  */}
        <Card className="bg-base-100">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-5 gap-10">
                <div className="col-span-1 text-center pt-2">
                  <span className="">문서 종류</span>
                </div>
                <div className="col-span-1">
                  <Select color="primary">
                    {new Array({ id: -1, name: '전체' })
                      .concat(types)
                      .map((type) => (
                        <Select.Option
                          key={`documentType_${type.id}`}
                          value={type.id}
                        >
                          {type.name}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
                <div className="col-span-1 text-center pt-2">
                  <span className="">결재 상태</span>
                </div>
                <div className="col-span-1">
                  <Select color="primary">
                    {documentStatus.map((type) => (
                      <Select.Option
                        key={`documentStatus_${type.id}`}
                        value={type.id}
                      >
                        {type.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="col-span-1"></div>

                <div className="col-span-5">
                  <div className="flex justify-end gap-5">
                    <Button className="w-52" type="button">
                      <GrPowerCycle className="w-5 h-5" />
                      초기화
                    </Button>
                    <Button className="w-52" type="submit" color="primary">
                      <BiSearch className="w-5 h-5" />
                      조회
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <div>
          <div>{`총 ${0} 개`}</div>
        </div>

        <Card className="bg-base-100"></Card>
      </div>
    </main>
  );
}
