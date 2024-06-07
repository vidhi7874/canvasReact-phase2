'use client';
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Image from 'next/image';
import eye from '../../../assets/images/eye.svg';
import code from '../../../assets/images/code.svg';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Editor from '../../common/Editor';
import MainSideBar from '../../common/MainSideBar';
import { HiArrowRightCircle } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Loader from '../../atoms/Loader';

const notFound = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Not Found</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="text-center">
     
        <p class="mt-2 text-xl text-gray-800">oops code not found</p>
    </div>
</body>
</html>
`;

export default function CodePreview({ sidebarNodes }) {
  const nodeData = useSelector((state) => state?.data?.node_Data);
  console.log(nodeData);
  const [activeTab, setActiveTab] = useState('preview');
  const [html, setHtml] = useState(notFound);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null); // Initialize selectedNode state
  // !! build error commented code
  // const [onlineStatus, setOnlineStatus] = useState(typeof window !== 'undefined' ? window.navigator.onLine : false); // Initial internet connection status
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast();
  }

  function downloadCode(text, fileName) {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const showToast = () => {
    toast.success('Copied to clipboard!', {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      style: {
        backgroundColor: '#0F9918',
        color: '#ffffff',
      },
    });
  };
  useEffect(() => {
    const handleOnlineStatusChange = (status) => {
      setIsOnline(status);
    };

    // Listen for changes in online/offline status
    window.addEventListener('online', () => handleOnlineStatusChange(true));
    window.addEventListener('offline', () => handleOnlineStatusChange(false));

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', () => handleOnlineStatusChange(true));
      window.removeEventListener('offline', () => handleOnlineStatusChange(false));
    };
  }, []);

  // !! build error commented code
  // useEffect(() => {
  //   const handleOnlineStatusChange = () => {
  //     // setOnlineStatus(navigator?.onLine);
  //     setOnlineStatus(typeof window !== 'undefined' && window.navigator.onLine);
  //   };

  //   window.addEventListener('online', handleOnlineStatusChange);
  //   window.addEventListener('offline', handleOnlineStatusChange);

  //   return () => {
  //     window.removeEventListener('online', handleOnlineStatusChange);
  //     window.removeEventListener('offline', handleOnlineStatusChange);
  //   };
  // }, []);

  //this is for svg image of no internet
  // const generateOfflineSVG = () => {
  //   // Generate SVG code for offline status
  //   return ReactDOMServer.renderToString(

  //     <div className="flex justify-center h-full">
  //       <Image src={noInternetConnection} alt="noInternet" />
  //     </div>,
  //   );
  // };

  useEffect(() => {
    const srcDoc = nodeData;
    setHtml(srcDoc ? srcDoc : notFound);
    // setHtml(onlineStatus ? srcDoc || notFound : generateOfflineSVG());
  }, [nodeData]);

  useEffect(() => {
    // Set the selectedNode to the first node in the list when the component mounts
    if (sidebarNodes && sidebarNodes.length > 0) {
      setSelectedNode(sidebarNodes[0]);
    }
  }, [sidebarNodes]);

  return (
    <>
      <ToastContainer />
      <div className="mx-0 my-0 md:mx-12 lg:mx-16 md:my-6 lg:my-10 h-vh">
        <Header />
        <div className="relative mt-4 ">
          <div className="absolute top-0 left-0 h-10 w-full bg-[url('../../assets/images/bgCode.svg')] bg-cover bg-center bg-white dark:bg-gray-800 "></div>
          <div className="relative text-white pl-10 font-bold py-2">Code Review</div>
        </div>
        <div className="shadow-lg my-5">
          <div className="p-2 md:p-4">
            <div className="flex border  justify-between gap-2 md:gap-4 ">
              <div className="flex">
                <div
                  className={`cursor-pointer p-2 border ${activeTab === 'preview' ? 'bg-white' : 'bg-gray-200'}`}
                  onClick={() => handleTabClick('preview')}
                >
                  <div className="flex gap-1   md:gap-2 items-center">
                    <Image src={eye} alt={eye} />
                    <p>preview</p>
                  </div>
                </div>
                <div
                  className={`cursor-pointer p-2 border ${activeTab === 'code' ? 'bg-white' : 'bg-gray-200'}`}
                  onClick={() => handleTabClick('code')}
                >
                  <div className="flex  gap-2 items-center">
                    <Image src={code} alt={code} />
                    <p>code</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div>
                  <button
                    onClick={() => downloadCode(html, 'code.js')}
                    type="button"
                    className="flex items-center gap-3 rounded-lg px-6 pb-2 pt-2.5 bg-indigo-900 text-white"
                  >
                    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M25.2 10.6219C25.3922 10.1203 25.5 9.57187 25.5 9C25.5 6.51562 23.4844 4.5 21 4.5C20.0766 4.5 19.2141 4.78125 18.5016 5.25937C17.2031 3.00937 14.7797 1.5 12 1.5C7.85625 1.5 4.5 4.85625 4.5 9C4.5 9.12656 4.50469 9.25313 4.50937 9.37969C1.88437 10.3031 0 12.8062 0 15.75C0 19.4766 3.02344 22.5 6.75 22.5H24C27.3141 22.5 30 19.8141 30 16.5C30 13.5984 27.9375 11.175 25.2 10.6219ZM18.9703 14.7797L14.0297 19.7203C13.7391 20.0109 13.2609 20.0109 12.9703 19.7203L8.02969 14.7797C7.55625 14.3062 7.89375 13.5 8.55938 13.5H11.625V8.25C11.625 7.8375 11.9625 7.5 12.375 7.5H14.625C15.0375 7.5 15.375 7.8375 15.375 8.25V13.5H18.4406C19.1062 13.5 19.4438 14.3062 18.9703 14.7797Z"
                        fill="white"
                      />
                    </svg>
                    Download
                  </button>

                  {/* <button
                    onClick={() => downloadCode(html, 'code.js')}
                    className="bg-indigo-900  flex justify-center gap-2 text-white rounded-xl px-2 py-2 "
                  >
                    <Image src={download} alt={download} />
                    <p>Download</p>
                  </button> */}
                </div>
                <div className="flex  gap-2 items-center">
                  <div className="mx-2 cursor-pointer">
                    <Link href="/">
                      <HomeSvg />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full h-full mt-4 gap-2">
              <div className={`relative   w-full  ${!isOpen ? 'md:w-10 ' : 'md:w-1/4'}`}>
                {!isOpen && (
                  <div
                    className=" md:absolute  md:left-2 md:top-3 cursor-pointer  "
                    onClick={() => {
                      setIsOpen((prev) => !prev);
                    }}
                  >
                    <HiArrowRightCircle size={30} className="text-[#F7941D] " />
                  </div>
                )}

                <MainSideBar
                  list={sidebarNodes}
                  isOpen={isOpen}
                  toggleDrawer={toggleDrawer}
                  selectedNode={selectedNode} // Pass selectedNode as a prop to MainSideBar
                  setLoading={setIsLoading} // Pass setLoading to MainSideBar
                />
              </div>
              <div className={`h-full w-full md:w-4/5 ${!isOpen ? 'md:w-full' : 'md:w-3/4'}`}>
                {activeTab === 'preview' && (
                  <div>
                    <div className="my-2 h-[100vh] flex justify-center items-center">
                      {isOnline ? (
                        isLoading ? (
                          <Loader /> // Show loader if isLoading is true
                        ) : (
                          <iframe
                            srcDoc={html}
                            title="output"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                          />
                        )
                      ) : (
                        <NoInternetConnestion />
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="relative">
                    <div
                      onClick={() => copyToClipboard(html)}
                      className="absolute top-2 cursor-pointer text-center flex flex-col p-4 justify-center items-center  right-2 bg-white text-black-100 w-12 h-12 rounded-lg"
                    >
                      <div>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M13.401 14.7129C13.401 15.289 13.1721 15.8414 12.7648 16.2488C12.3575 16.6561 11.805 16.885 11.2289 16.885H3.62666C3.05059 16.885 2.49812 16.6561 2.09077 16.2488C1.68343 15.8414 1.45459 15.289 1.45459 14.7129V7.11065C1.45459 6.53459 1.68343 5.98211 2.09077 5.57477C2.49812 5.16743 3.05059 4.93858 3.62666 4.93858V6.02462C3.33863 6.02462 3.06239 6.13904 2.85872 6.34271C2.65505 6.54638 2.54063 6.82262 2.54063 7.11065V14.7129C2.54063 15.0009 2.65505 15.2772 2.85872 15.4808C3.06239 15.6845 3.33863 15.7989 3.62666 15.7989H11.2289C11.5169 15.7989 11.7932 15.6845 11.9969 15.4808C12.2005 15.2772 12.3149 15.0009 12.3149 14.7129H13.401Z"
                            fill="#4A3AFF"
                          />
                          <path
                            d="M6.88496 2.7665C6.59693 2.7665 6.32069 2.88093 6.11702 3.0846C5.91335 3.28827 5.79893 3.56451 5.79893 3.85254V11.4548C5.79893 11.7428 5.91335 12.0191 6.11702 12.2227C6.32069 12.4264 6.59693 12.5408 6.88496 12.5408H14.4872C14.7752 12.5408 15.0515 12.4264 15.2552 12.2227C15.4588 12.0191 15.5732 11.7428 15.5732 11.4548V3.85254C15.5732 3.56451 15.4588 3.28827 15.2552 3.0846C15.0515 2.88093 14.7752 2.7665 14.4872 2.7665H6.88496ZM6.88496 1.68047H14.4872C15.0633 1.68047 15.6158 1.90931 16.0231 2.31665C16.4304 2.724 16.6593 3.27647 16.6593 3.85254V11.4548C16.6593 12.0309 16.4304 12.5833 16.0231 12.9907C15.6158 13.398 15.0633 13.6269 14.4872 13.6269H6.88496C6.30889 13.6269 5.75642 13.398 5.34908 12.9907C4.94173 12.5833 4.71289 12.0309 4.71289 11.4548V3.85254C4.71289 3.27647 4.94173 2.724 5.34908 2.31665C5.75642 1.90931 6.30889 1.68047 6.88496 1.68047Z"
                            fill="#4A3AFF"
                          />
                        </svg>
                      </div>
                      <div className="text-sm">Copy</div>
                    </div>

                    <div>
                      <Editor language="xml" displayName="HTML" value={html} className="html" onChange={setHtml} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const HomeSvg = () => (
  <>
    <svg fill="#000000" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z" />
    </svg>
  </>
);

const NoInternetConnestion = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <p className=" font-bold text-2xl text-[#1f2937] ">Internet Connection not found</p>
      </div>
    </>
  );
};
