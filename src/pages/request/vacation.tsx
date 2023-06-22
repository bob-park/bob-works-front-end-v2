// react
import { FormEvent, useState } from 'react';

// daisyui
import {
  Breadcrumbs,
  Form,
  Radio,
  Select,
  Input,
  Button,
  Modal,
} from 'react-daisyui';

// react icons
import { ImCancelCircle } from 'react-icons/im';
import { BsFileArrowUp } from 'react-icons/bs';

// datepicker
import Datepicker from 'react-tailwindcss-datepicker';

type VacationSelect = {
  id: string;
  name: string;
};

type VacationDate = {
  startDate: Date;
  endDate: Date;
};

const vacationTypes: VacationSelect[] = [
  {
    id: 'GENERAL',
    name: '연차',
  },
  {
    id: 'ALTERNATIVE',
    name: '대체휴가',
  },
];

const vacationSubTypes: VacationSelect[] = [
  {
    id: 'ALL',
    name: '종일',
  },
  {
    id: 'AM',
    name: '오전',
  },
  {
    id: 'PM',
    name: '오후',
  },
];

export default function VacationRequest() {
  //state
  const [selectVacationType, setSelectVacationType] = useState<VacationSelect>(
    vacationTypes[0],
  );
  const [selectVacationSubType, setSelectVacationSubType] =
    useState<VacationSelect>(vacationSubTypes[0]);
  const [dateValue, setDateValue] = useState<VacationDate>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [reason, setReason] = useState<string>('개인 사유');
  const [openSelectAlternative, setOpenSelectAlternative] =
    useState<boolean>(false);

  // handle
  const hadleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="w-full h-full">
      <div className="grid grid-cols-1 gap-8">
        {/* refactoring 이 필요해 보이는 군 */}
        <Breadcrumbs>
          <Breadcrumbs.Item>대시보드</Breadcrumbs.Item>
          <Breadcrumbs.Item>문서 신청</Breadcrumbs.Item>
          <Breadcrumbs.Item>휴가계 신청</Breadcrumbs.Item>
        </Breadcrumbs>

        <div>
          <h2 className="text-2xl font-bold">휴가계 신청</h2>
        </div>

        <div className="">
          <Form onSubmit={hadleSubmit}>
            <div className="grid grid-cols-5 gap-10">
              <div className="col-span-1 text-center pt-2">
                <span className="">휴가 종류</span>
              </div>
              <div className="col-span-1">
                {vacationTypes.map((vacationType) => (
                  <Form.Label key={vacationType.id} title={vacationType.name}>
                    <Radio
                      color="primary"
                      name="vacationType"
                      value={vacationType.id}
                      defaultChecked={selectVacationType.id === vacationType.id}
                      onChange={(e) =>
                        setSelectVacationType(
                          vacationTypes.find(
                            (item) => item.id == e.target.value,
                          ) || vacationTypes[0],
                        )
                      }
                    />
                  </Form.Label>
                ))}
              </div>
              <div className="col-span-1 text-center pt-2">
                <span className="">휴가 종류</span>
              </div>
              <div className="col-span-1">
                <Select
                  color="primary"
                  defaultValue={selectVacationSubType.id}
                  onChange={(e) =>
                    setSelectVacationSubType(
                      vacationSubTypes.find(
                        (item) => item.id === e.target.value,
                      ) || vacationSubTypes[0],
                    )
                  }
                >
                  <Select.Option value="ALL">종일</Select.Option>
                  <Select.Option value="AM">오전</Select.Option>
                  <Select.Option value="PM">오후</Select.Option>
                </Select>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1 text-center pt-2">
                <span className="">휴가일</span>
              </div>
              <div className="col-span-2">
                <Datepicker
                  placeholder="날짜 선택"
                  minDate={new Date(new Date().getFullYear(), 1, 1)}
                  maxDate={new Date(new Date().getFullYear(), 11, 31)}
                  value={dateValue}
                  showFooter
                  onChange={(value) => setDateValue(value as VacationDate)}
                  i18n="ko"
                  configs={{
                    footer: {
                      cancel: '취소',
                      apply: '적용',
                    },
                  }}
                />
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-5">
                {selectVacationType.id === 'ALTERNATIVE' && (
                  <div className="grid grid-cols-5 gap-10">
                    <div className="col-span-1 text-center pt-2">
                      <span className="">대체 휴가 선택</span>
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="outline"
                        color="primary"
                        onClick={() => setOpenSelectAlternative(true)}
                      >
                        선택
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-1 text-center pt-2">
                <span className="">사유</span>
              </div>
              <div className="col-span-3">
                <Input
                  className="w-full"
                  required
                  bordered
                  color="primary"
                  placeholder="사유"
                  defaultValue={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="col-span-5">
                <div className="flex justify-end gap-5">
                  <Button className="w-52" type="button">
                    <ImCancelCircle className="w-5 h-5" />
                    취소
                  </Button>
                  <Button className="w-52" type="submit" color="primary">
                    <BsFileArrowUp className="w-5 h-5" />
                    신청
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Modal
        open={openSelectAlternative}
        onClickBackdrop={() => setOpenSelectAlternative(false)}
      >
        <Modal.Header className="font-bold">대체 휴가 선택</Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Actions>
          <Button onClick={() => setOpenSelectAlternative(false)}>취소</Button>
          <Button color="primary">완료</Button>
        </Modal.Actions>
      </Modal>
    </main>
  );
}
