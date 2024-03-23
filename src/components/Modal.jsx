import React from "react";

const Modal = ({ product, change }) => {
  return (
    <>
      <div className="w-1/3 min-w-96 h-1/2 mx-auto relative flex items-center bg-white/75 shadow-xl ">
        <div className="mx-auto h-fit text-xl">
          {Object.keys(product).map((keyName) => {
            return (
              <dl key={keyName} className="grid grid-cols-2">
                <dt className="mr-2">{keyName.toUpperCase()}:</dt>
                <dd>{product[keyName]}</dd>
              </dl>
            );
          })}
        </div>
        <div
          className="absolute top-4 right-4 bg-slate-50 hover:bg-white cursor-pointer border border-black rounded-xl shadow-xl w-fit h-fit px-2"
          onClick={() => change(false)}>
          close
        </div>
      </div>
    </>
  );
};

export default Modal;
