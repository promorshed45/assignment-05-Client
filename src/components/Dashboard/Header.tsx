import UserDropDown from './UserDropDown';

const Header = () => {


  return (
    <nav className="top-0 w-full bg-[#111827] border-b border-gray-800 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                Welcome Back, 
              </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
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
