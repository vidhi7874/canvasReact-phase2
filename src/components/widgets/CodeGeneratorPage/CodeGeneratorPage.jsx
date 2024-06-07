'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import laptopImg from '../../../assets/images/laptopMainPage.svg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setData, setFigmaLinkUrl } from '@/src/redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CodeGeneratorPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [figmaLink, setFigmaLink] = useState('');
  const [isValidLink, setIsValidLink] = useState(true);

  const handleInputChange = (event) => {
    const link = event.target.value;
    setFigmaLink(link);
    setIsValidLink(isValidFigmaLink(link));
  };

  const isValidFigmaLink = (link) => {
    return link.startsWith('https://www.figma.com/');
  };

  const fetchCode = async () => {
    setIsLoading(true);

    try {
      const body = {
        figma_url: figmaLink,
      };
      const response = await axios.post(`${apiUrl}/gen_nodes`, body);
      console.log('response123 -->', response);
      dispatch(setData(response?.data));

      toast.success('Code generated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.push('/code-generator-success');
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(true);

      toast.error('Error generating code. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = () => {
    if (isValidFigmaLink(figmaLink)) {
      // setIsValidLink(true);
      dispatch(setFigmaLinkUrl(figmaLink)); // Reset validation state
      router.push('/code-generator-success');
      //fetchCode();
    } else {
      setIsValidLink(false);
    }
  };

  return (
    <div className="mx-0 my-0 md:mx-12 lg:mx-16 md:my-6 lg:my-10 h-vh">
      <div className="flex justify-between lg:flex-row flex-col">
        <div className="lg:w-[50%]">
          <h4 className="text-4xl mt-10 text-black-100 font-poppins font-semibold">We Build Code</h4>
          <p className="mt-5 text-xl text-gray-100/80 font-poppins font-normal">
            Streamlining the implementation process{' '}
          </p>

          <div className={`flex flex-col lg:w-80 mt-6 ${!isValidLink ? 'border-red-500' : ''}`}>
            <label className="text-gray-100 font-poppins font-normal">Paste Figma Link Here</label>
            <input
              type="url"
              placeholder="https://www.figma.com"
              value={figmaLink}
              onChange={handleInputChange}
              className={`border mt-2 rounded-lg py-2 text-gray-100 px-3 ${
                !isValidLink ? 'border-red-500' : 'border-primary-600'
              }`}
            />
            {!isValidLink && <p className="text-red-500 text-sm mt-2">Please enter a valid Figma link.</p>}
          </div>

          <button
            onClick={handleGenerateCode}
            disabled={isLoading}
            className={`mt-4 border font-poppins border-primary-600 w-full lg:w-80 rounded-lg py-2 text-white bg-indigo-900 font-semibold ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Generating Code...' : 'Generate Code'}
          </button>
        </div>

        <div className="hidden lg:block flex justify-center lg:w-[50%]">
          <Image src={laptopImg} alt="laptopImg" width={520} className="hidden sm:block" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
