'use client';
import React from 'react';
import Header from '../Header';
import uploadMan from '../../../assets/images/uploadMan.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import right from '../../../assets/images/right.svg';
import wrong from '../../../assets/images/wrong.svg';

export default function CodeGeneratorFaillingPage() {
  const showToast = () => {
    toast.error('This a error alert.', {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      style: {
        backgroundColor: '#E54545',
        color: '#FFFFFF',
      },
    });
  };

  return (
    <div className="mx-0 my-0 md:mx-12 lg:mx-16 md:my-6 lg:my-10 h-vh">
      <Header />

      <div className="flex flex-col md:flex-row mt-2  ">
        <div className="w-full">
          <Image src={uploadMan} alt={uploadMan} />
        </div>

        <div className="w-full flex flex-col justify-center px-3 md:px-0">
          <div className="flex justify-between mx-20 ">
            <p className="">Technical Jargon 1</p> <Image src={right} alt={right} />
          </div>
          <hr className="mt-2" />
          <div className="flex justify-between mx-20 mt-4 ">
            <p className="">Technical Jargon 2</p> <Image src={right} alt={right} />
          </div>
          <hr className="mt-2" />
          <div className="flex justify-between mx-20 mt-4 ">
            <p className="">Technical Jargon 3</p> <Image src={right} alt={right} />
          </div>
          <hr className="mt-2" />
          <div className="flex justify-between mx-20 mt-4 ">
            <p className="">Technical Jargon 4</p> <Image src={wrong} alt={wrong} />
          </div>
          <hr className="mt-2" />
          <div className="flex justify-between mx-20 mt-4 ">
            <p className="">Technical Jargon 5</p> <Image src={wrong} alt={wrong} />
          </div>
          <button className="bg-indigo-900 w-full text-white rounded-xl my-10 py-2" onClick={showToast}>
            Retry
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
