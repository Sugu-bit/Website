import React from 'react';
import { FaFacebookMessenger} from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const ConnectWidget = () => {
    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-3 z-40">
            <a
                href="https://zalo.me/0911936588"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
                title="Chat qua Zalo"
            >
                <SiZalo size={24} />
            </a>
            <a
                href="https://m.me/an.nguyenxuan.739978"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
                title="Chat qua Messenger"
            >
                <FaFacebookMessenger size={24} />
            </a>
        </div>
    );
};

export default ConnectWidget;
