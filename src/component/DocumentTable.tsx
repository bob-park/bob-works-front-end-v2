// daisyui
import { ChangeEvent } from 'react';
import { Table, Checkbox } from 'react-daisyui';

type DocumentTableHeader = {
  id: string;
  value: string;
  checkbox?: boolean;
  parse?: (input: any) => any;
};

type DocumentTableProps = {
  firstCheckbox?: boolean;
  headers: DocumentTableHeader[];
  dataList?: ({ id: number } & any)[];
  checkedList?: number[];
  onRowClick?: () => void;
  onChecked?: (id: number, checked: boolean) => void;
  onCheckedAll?: (checked: boolean) => void;
};

export default function DocumentTable({
  firstCheckbox = false,
  headers,
  dataList = [],
  checkedList = [],
  onRowClick,
  onChecked,
  onCheckedAll,
}: DocumentTableProps) {
  const heads = headers.slice();

  if (firstCheckbox) {
    heads.unshift({
      id: 'checkbox',
      value: 'checkbox',
      checkbox: true,
    });
  }

  // handle
  const handleRowClick = () => {
    onRowClick && onRowClick();
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    onChecked && onChecked(id, e.target.checked);
  };

  const handleCheckedAll = (e: ChangeEvent<HTMLInputElement>) => {
    onCheckedAll && onCheckedAll(e.target.checked);
  };

  return (
    <Table className="rounded-box relative">
      <Table.Head className="sticky top-0">
        {heads.map((head) =>
          head.checkbox ? (
            <Checkbox
              key={head.id}
              checked={dataList.length === checkedList.length}
              indeterminate={
                dataList.length !== checkedList.length && checkedList.length > 0
              }
              onChange={handleCheckedAll}
            />
          ) : (
            <span key={head.id}>{head.value}</span>
          ),
        )}
      </Table.Head>
      <Table.Body className="">
        {dataList?.map((data) => (
          <Table.Row key={`data_${data.id}`} hover onClick={handleRowClick}>
            {heads.map((head) =>
              head.checkbox ? (
                <Checkbox
                  key={`${head.id}_${data.id}`}
                  checked={checkedList.some((item) => item === data.id)}
                  onChange={(e) => handleChecked(e, data.id)}
                />
              ) : (
                <span key={`${head.id}_${data.id}`}>
                  {head.parse ? head.parse(data[head.id]) : data[head.id]}
                </span>
              ),
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
