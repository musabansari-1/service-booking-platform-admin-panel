import Link from 'next/link';
import { HomeIcon, ServerIcon, CogIcon , UserCircleIcon} from '@heroicons/react/24/outline';

export default function Sidebar() {
    return (
        <aside className="w-64 overflow-auto h-screen bg-gray-800 text-white flex flex-col">
            <div className="p-4">
                <h2 className="text-2xl font-bold">ATURSERVICE</h2>
            </div>
            <nav className="flex-1 mt-10">
                <ul>
                    <li className="px-4 py-2">
                        <Link href="/dashboard">
                            <div className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer">
                                <HomeIcon className="h-5 w-5 mr-2" />
                                Home
                            </div>
                        </Link>
                    </li>
                    <li className="px-4 py-2">
                        <Link href="/dashboard/profile">
                            <div className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer">
                                <UserCircleIcon className="h-5 w-5 mr-2" />
                                Profile
                            </div>
                        </Link>
                    </li>
                    <li className="px-4 py-2">
                        <Link href="/dashboard/settings">
                            <div className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer">
                                <CogIcon className="h-5 w-5 mr-2" />
                                Settings
                            </div>
                        </Link>
                    </li>
                    <li className="px-4 py-2">
                        <Link href="/services">
                            <div className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer">
                                <ServerIcon className="h-5 w-5 mr-2" />
                                Services
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="p-4">
                <button className="w-full py-2 px-4 bg-red-500 rounded hover:bg-red-600">
                    Log Out
                </button>
            </div>
        </aside>
    );
}