'use client';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Header from '../Header';
import uploadMan from '../../../assets/images/uploadMan.svg';
import Image from 'next/image';
import right from '../../../assets/images/right.svg';
import wrong from '../../../assets/images/wrong.svg';
import Loader from '../../atoms/Loader';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '@/src/redux/store';

export default function CodeGeneratorSuccessPage() {
  const errBgColor = 'bg-gradient-to-r from-red-500 to-red-400';
  const successBgColor = 'bg-gradient-to-r from-indigo-500 to-blue-500';
  const router = useRouter();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.data);
  console.log('allData===>', allData);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const figmaLink = allData?.figmaLink;

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isAnyErr, setIsAnyErr] = useState(false);
  const [bgColor, setBgColor] = useState(successBgColor);

  const STEPS = ['Parse Figma File', 'Translate Figma Design to HTML/CSS', 'Generate HTML Markup', 'Apply CSS Styling'];

  const fetchCode = async () => {
    setIsLoading(true);
    setIsAnyErr(false);

    try {
      const body = {
        figma_url: figmaLink,
      };
      const response = await axios.post(`${apiUrl}/gen_nodes`, body);
      dispatch(setData(response?.data));
    } catch (error) {
      setIsAnyErr(true);
      setBgColor(errBgColor);
      console.error('Error fetching data:', error);
      setIsLoading(true);

      toast.error('Error generating code. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
      // setIsAnyErr(false);
    }
  };

  const showToast = () => {
    if (!isAnyErr) {
      router.push('/code-preview');
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    if (currentStep < STEPS.length && progress < 100 && isAnyErr === false) {
      const intervalID = setInterval(
        () => {
          setProgress((prevProgress) => {
            const newProgress = prevProgress + Math.floor(Math.random() * (50 - 10 + 1));
            if (newProgress >= 100) {
              setCurrentStep(currentStep + 1);
              clearInterval(intervalID);
              setCompletedSteps([...completedSteps, currentStep]);
              return 0;
            }
            return newProgress;
          });
        },
        Math.floor(Math.random() * (500 - 300 + 1)) + 300,
      );

      return () => clearInterval(intervalID);
    } else if (progress === 100) {
      setProgress(0);
    }
  }, [currentStep, progress, completedSteps, STEPS.length]);

  useEffect(() => {
    fetchCode();
  }, []);

  return (
    <div className="mx-0 my-0 md:mx-12 lg:mx-16 md:my-6 lg:my-10 h-vh">
      <Header />
      <div className="flex flex-col md:flex-row justify-between">
        <Image src={uploadMan} alt={uploadMan} className="ml-0" />

        <div className="flex flex-col w-1/2  items-center justify-center h-screen">
          <div className="w-full max-w-md-e p-4  rounded-md">
            {STEPS.map((step, index) => (
              <div key={index} className="relative mb-4">
                <p className=" font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                  {step}
                </p>
                <div className="relative w-full h-6  text-center bg-gray-300 mt-2 rounded-full">
                  <div
                    className={`absolute h-full text-center bg-indigo-500-e ${bgColor} rounded-full transition-all duration-500 ease-in-out`}
                    style={{ width: `${index === currentStep ? progress : completedSteps.includes(index) ? 100 : 0}%` }}
                  ></div>
                  {completedSteps.includes(index) && isAnyErr === false && (
                    <Image
                      className="absolute right-0 mx-2 top-0 m-1 transform translate-x-2/2 -translate-y-1/2-e w-4 h-4"
                      src={right}
                      alt={'right_icon'}
                    />
                  )}

                  {isAnyErr && (
                    <Image
                      className="absolute right-0 mx-2 top-0 m-1 transform translate-x-2/2 -translate-y-1/2-e w-4 h-4"
                      src={wrong}
                      alt={'wrong_icon'}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            disabled={currentStep !== STEPS.length && !isAnyErr}
            className={`bg-indigo-900 w-full text-white rounded-xl my-10 py-2 ${
              currentStep === STEPS.length ? '' : isAnyErr ? '' : 'cursor-not-allowed'
            }`}
            onClick={() => showToast()}
          >
            {isLoading ? (
              <Loader />
            ) : currentStep !== STEPS.length ? (
              isAnyErr ? (
                'Go Home'
              ) : (
                ' Generating Code...'
              )
            ) : (
              'View Code'
            )}

            {/* {currentStep !== STEPS.length ? (isAnyErr ? 'Go Home' : ' Generating Code...') : 'View Code'} */}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
