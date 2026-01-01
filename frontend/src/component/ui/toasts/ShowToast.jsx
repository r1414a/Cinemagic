import { BiSolidErrorAlt } from "react-icons/bi";
import { IoCheckbox } from "react-icons/io5";

export default function ShowToast({type,message,closeToastFunction}) {
  return (
    <div
      id="toast-default"
      className="absolute right-0 bottom-10 md:right-10 z-30 flex items-center w-full max-w-xs p-3 md:p-4 text-black bg-white rounded-md shadow-sm animate-fadeIn"
      role="alert"
    >
      <div className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${type === 'success' ? 'text-green-600' : 'text-red-600'} bg-dyellow rounded-lg`}>
        {
          type === 'success'
          ?
          <IoCheckbox/>
          :
          <BiSolidErrorAlt/>
        }
      </div>
      <div className="ms-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        onClick={() => closeToastFunction(false)}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-600 hover:text-gray-900 rounded-md p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 cursor-pointer hover:rotate-180 transition-transform duration-500 ease-in-out"
        data-dismiss-target="#toast-default"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
