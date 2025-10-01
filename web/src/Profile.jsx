import React, { useEffect } from 'react';

import { Mail, User, LogOut } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';

const Profile = () => {
  const { user, logout   } = useAuthStore();


  

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            No user data available
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
       
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
         
          <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          
       
          <div className="relative px-6 pb-8">
           
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative">
                <img
                  src={user?.picture || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
                  alt={user?.name}
                  onError={(e) => { e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'; }}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {user?.email}
              </p>
              
            
              <button
                onClick={logout}
                className="inline-flex cursor-pointer items-center gap-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Card */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 border border-cyan-100 dark:border-gray-600">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Email Address
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 border border-purple-100 dark:border-gray-600">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Display Name
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user?.name}
                    </p>
                  </div>
                </div>
              </div>


            </div>

          
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;