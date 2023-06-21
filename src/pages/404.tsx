export default function NotFound() {
  return (
    <div className="flex w-1/2 h-1/2 justify-center items-center">
      <div className="animate-bounce">
        <div className="grid grid-cols-2">
          <h3 className="font-extrabold text-xl text-right border-r-2 border-solid pr-5 mr-2">
            404
          </h3>
          <h4 className="ml-2">해당 페이지를 찾을 수 없습니다.</h4>
        </div>
      </div>
    </div>
  );
}
