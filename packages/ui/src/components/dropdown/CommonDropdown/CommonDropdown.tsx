export type CommonDropdownListItem = {
  label: string;
  value: string;
};

type CommonDropdownProps = {
  value?: string;
  list: CommonDropdownListItem[];
};

export default function CommonDropdown({
  value = '선택',
  list,
}: CommonDropdownProps) {
  return (
    <div>
      <div className="p-[8px] border border-solid border-gray rounded-[8px] w-[100px]">
        <p>{value}</p>
      </div>
      <div className="">
        {list.map((item) => (
          <p key={item.value}>{item.label}</p>
        ))}
      </div>
    </div>
  );
}
