import React from 'react';
import { BellIcon, UserCircleIcon, MapIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* <Link href="/" legacyBehavior>
              <a className="flex-shrink-0 text-white text-xl font-bold">
                MyLogo
              </a>
            </Link> */}
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-white">
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-white">
                <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
              <MapIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
