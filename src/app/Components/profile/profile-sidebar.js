import { FaUserCircle, FaBox, FaStar, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab, handleSignOut }) => {
  return (
    <aside className="w-64 bg-gray-800 p-6 space-y-4">
      <button
        className={`w-2/3 py-3 rounded ${activeTab === 'profile' ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => setActiveTab('profile')}
      >
        <FaUserCircle className="ml-2 flex w-full" /> Profiili
      </button>

      {/* <button
        className={`w-2/3 py-3 rounded ${activeTab === 'orders' ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => setActiveTab('orders')}
      >
        <FaBox className="mr-2 flex w-full" /> Tilaukset
      </button>

      <button
        className={`w-2/3 py-3 rounded ${activeTab === 'ratings' ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => setActiveTab('ratings')}
      >
        <FaStar className="mr-2 flex w-full" /> Arvostelut
      </button> */}

      {/* <button
        className={`w-2/3 py-3 rounded ${activeTab === 'map' ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => setActiveTab('map')}
      >
        <FaMapMarkerAlt className="mr-2 flex w-full" /> Käyttäjien kartta
      </button> */}

      <button
        className="w-2/3 py-3 mt-6 rounded bg-blue-900 hover:bg-blue-600 flex items-center justify-center"
        onClick={handleSignOut}
      >
        <FaSignOutAlt className="mr-2" /> Kirjaudu ulos
      </button>
    </aside>
  );
};

export default Sidebar;