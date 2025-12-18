import React from 'react';
import useAdminStore from '../../../store/adminStore';
import Ascanlog from './AscanLog/Ascanlog';
import TofPage from './TofPage/TofPage';

const MasterParent = () => {
  const SubChildSidebar = useAdminStore((s) => s.SubChildSidebar);
  const resetState = useAdminStore((s) => s.resetState);

  const renderPage = () => {
    resetState();
    switch (SubChildSidebar) {
      case "1":
        return <Ascanlog />;
      case "2":
        return <TofPage />;
      default:
        return (
          <div className="h-full w-full flex items-center justify-center text-gray-500">
            Please select a page
          </div>
        );
    }
  };

  return <div className="h-[100%] w-[100%]">{renderPage()}</div>;
};

export default MasterParent;
