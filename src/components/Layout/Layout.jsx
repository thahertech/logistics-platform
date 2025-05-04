import React from 'react';
import '@/app/globals.css';
import styles from '@/app/Styles/Layout.module.css';
import { GoogleTagManager } from '@next/third-parties/google';
// import ChatToggle from '@/components/ui/ChatToggle';
import TopHeader from './TopHeader';
import MainHeader from './MainHeader';
import BottomFooter from './BottomFooter';
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import 'react-toastify/dist/ReactToastify.css';
import useUser  from '@/lib/hooks/useUser';

export default function Layout({ children }) {
  const { user, loading, error } = useUser();  // Destructure the values
  return (
   <>
   
         {/* <GoogleTagManager gtmId="GTM-T7GRXLNQ" /> */}
      <main className={styles.mainContent}>
              <TopHeader />
              {/* <header className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
  
      </header> */}
              
<MainHeader />
        {children}
        {/* <ChatToggle
              roomName="support-room"
              username={user?.full_name || user?.email}
              onMessage={(msgs) => {
                console.log('New message:', msgs);
              }
              }
              onError={(error) => {
                console.error('Error:', error);
              }}
              onConnect={() => {
                console.log('Connected to chat');
              }}
              onDisconnect={() => {
                console.log('Disconnected from chat');
              }}
              onTyping={(typing) => {
                console.log('User is typing:', typing);
              }}
              onRead={(read) => {
                console.log('Message read:', read);
              }}
              onTypingStop={() => {
                console.log('User stopped typing');
              }}
              >
    
              </ChatToggle> */}
      </main>
      
      <footer className={styles.footer} />
  <BottomFooter />
  </>
  )
}
