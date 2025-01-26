import { FaTruck, FaClock, FaMapMarkedAlt } from 'react-icons/fa';

const TopBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full  bg-gradient-to-b from-[#003366] to-black-500 p-4 flex justify-center items-center space-x-6 shadow-lg">
      <button
        onClick={() => setActiveTab('map')}
        className={`py-3 px-6 rounded-lg flex items-center text-white transition duration-300 transform hover:bg-[#003366] hover:scale-105 ${
          activeTab === 'map' ? 'bg-[#003366]' : 'bg-transparent'
        }`}
      >
        <FaMapMarkedAlt className="mr-3 text-xl" />
        <span>Kuljetukset kartalta</span>
      </button>

      <button
        onClick={() => setActiveTab('asap')}
        className={`py-3 px-6 rounded-lg flex items-center text-white transition duration-300 transform hover:bg-[#003366] hover:scale-105 ${
          activeTab === 'asap' ? 'bg-[#003366]' : 'bg-transparent'
        }`}
      >
        <FaClock className="mr-3 text-xl" />
        <span>Asap kuljetukset</span>
      </button>

      <button
        onClick={() => setActiveTab('tracking')}
        className={`py-3 px-6 rounded-lg flex items-center text-white transition duration-300 transform hover:bg-[#003366] hover:scale-105 ${
          activeTab === 'tracking' ? 'bg-[#003366]' : 'bg-transparent'
        }`}
      >
        <FaTruck className="mr-3 text-xl" />
        <span>Ilmoitus seuranta</span>
      </button>
    </div>
  );
};

export default TopBar;