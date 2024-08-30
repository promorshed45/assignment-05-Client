import { useAppSelector } from '@/redux/hook';
import ThemeToggle from '../ui/ThemeToggle';
import UserDropDown from './UserDropDown';

const Header = () => {
  const { user } = useAppSelector((state) => state.user);



  return (
    <nav className="top-0 w-full border-b border-gray-200  dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
              <span className="self-center text-md font-semibold whitespace-nowrap dark:text-white">
                Welcome Back, <span className='text-rose-400'>{user.name}</span>
              </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div className='flex gap-2'>
                <ThemeToggle/>
                <UserDropDown/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
