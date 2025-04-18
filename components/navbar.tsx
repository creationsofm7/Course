import Link from 'next/link';
import Image from 'next/image';
import { CircleUserRound} from 'lucide-react';
const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 w-full bg-gray-700 shadow-sm z-10">
            <Link href="/" className="flex items-center">
                <Image
                    src="/next.svg" // Make sure to add your logo file in the public folder
                    alt="Logo"
                    width={120}
                    height={40}
                    priority
                />
            </Link>
            
            <div className="flex items-center gap-4">
                
                <Link href="/settings" className="flex items-center ml-4 hover:opacity-80 transition-opacity">
                    <CircleUserRound size={28} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;