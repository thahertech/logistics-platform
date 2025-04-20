import { FaUserCircle, FaBox, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab, handleSignOut, userRole }) => {
  const ordersText = userRole === 'kuljettaja' ? 'Kuljetukset' : 'Tilauspyynnöt';

  return (
    <aside className="w-full bg-gradient-to-b from-[#003366] to-black-500 p-6 flex justify-center items-center space-x-6 shadow-lg">
      <button
        className={`py-3 px-6 rounded-lg flex items-center text-white transition duration-300 transform hover:bg-[#003366] hover:scale-105 ${
          activeTab === 'profile' ? 'bg-[#003366]' : 'bg-transparent'
        }`}
        onClick={() => setActiveTab('profile')}
      >
        <FaUserCircle className="mr-3 text-xl" /> Profiili
      </button>

      <button
        className={`py-3 px-6 rounded-lg flex items-center text-white transition duration-300 transform hover:bg-[#003366] hover:scale-105 ${
          activeTab === 'orders' ? 'bg-[#003366]' : 'bg-transparent'
        }`}
        onClick={() => setActiveTab('orders')}
      >
        <FaBox className="mr-3 text-xl" />  {ordersText}
      </button>

      <button
        className={`py-3 px-6 rounded-lg flex items-center text-white transition duration-300 transform hover:bg-[#003366] hover:scale-105 ${
          activeTab === 'purchase' ? 'bg-[#003366]' : 'bg-transparent'
        }`}
        onClick={() => setActiveTab('purchase')}
      >
        <FaBox className="mr-3 text-xl" />  Ostot
      </button>
      {/* <button
        className={`py-3 px-6 rounded-lg flex items-center text-white transition duration-300 transform hover:bg-[#003366] hover:scale-105 ${
          activeTab === 'orders' ? 'bg-[#003366]' : 'bg-transparent'
        }`}
        onClick={() => setActiveTab('invoices')}
      >
        <FaBox className="mr-3 text-xl" /> Käyttäjähallinta
      </button> */}

      <button
    className="py-3 px-6 rounded-lg bg-white hover:bg-gray-500 transition duration-300 flex items-center justify-center text-black"
    onClick={handleSignOut}
  >
    <FaSignOutAlt className="mr-3 text-xl" /> Kirjaudu ulos
  </button>
    </aside>
  );
};

export default Sidebar;