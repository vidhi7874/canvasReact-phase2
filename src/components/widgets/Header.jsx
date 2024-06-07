'use client';
import React from 'react';
import Image from 'next/image';
import logo from '../../assets/images/canvas-logo.svg';

function Header() {
  return (
    <div className="flex justify-center  md:justify-start">
      <Image src={logo} alt="logo" className="w-24 sm:24 md:24 lg:w-28 xl:w-28" />
    </div>
  );
}

export default Header;
