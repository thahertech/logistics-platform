import { FaUserCircle, FaBox, FaStar, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab, handleSignOut }) => {
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
        <FaBox className="mr-3 text-xl" /> Tilaukset
      </button>

      <button
        className={`py-3 px-6 rounded-lg flex items-center text-white transition duration-300 transform hover:bg-[#003366] hover:scale-105 ${
          activeTab === 'ratings' ? 'bg-[#003366]' : 'bg-transparent'
        }`}
        onClick={() => setActiveTab('ratings')}
      >
        <FaStar className="mr-3 text-xl" /> Arvostelut
      </button>

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