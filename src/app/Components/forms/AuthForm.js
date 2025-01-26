import React from 'react';

const FormFields = ({ isLogin, formData, setFormData, error, isLoading, setIsLoading, handleForgotPassword }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {!isLogin && (
        <>
          <div className="mb-1">
            <input
              type="text"
              name="name"
              placeholder="Etunimi"
              value={formData.name}
              onChange={handleChange}
              className={`text-black w-full p-2 mb-2 border rounded`}
              required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              name="lastName"
              placeholder="Sukunimi"
              value={formData.lastName}
              onChange={handleChange}
              className={`text-black w-full p-2 mb-2 border rounded`}
              required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              name="yTunnus"
              placeholder="Y tunnus"
              value={formData.yTunnus}
              onChange={handleChange}
              className={`text-black w-full p-2 mb-2 border rounded`}
              required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              name="phone"
              placeholder="Puhelinnumero"
              value={formData.phone}
              onChange={handleChange}
              className={`text-black w-full p-2 mb-2 border rounded`}
              required
            />
          </div>
          <div className="mb-1">
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="text-gray-600 w-full p-1 mb-2 border rounded h-10"
                required
            >
                <option value="">Valitse rooli</option>
                <option value="kuljettaja">Kuljettaja</option>
                <option value="lähettäjä">Lähettäjä</option>
            </select>
            </div>
        </>
      )}

      <div className="mb-4 mt-12">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Sähköposti"
          className={`text-black border border-gray-300 p-2 w-full rounded`}
          required
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Salasana"
          className={`text-black border border-gray-300 p-2 w-full rounded`}
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full bg-[#003366] text-white py-2 rounded hover:bg-[#002244] transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : (isLogin ? 'Kirjaudu' : 'Luo Käyttäjä')}
      </button>
      {isLogin && (
  <p className="mt-6 text-right text-gray-300">
    <button
      type="button"
      className="text-white-200 underline"
      onClick={handleForgotPassword}
    >
      Unohditko salasanan?
    </button>
  </p>
)}

{error && (
  <div className="text-white-500 mt-8 text-center">
    <p>{error}</p>
  </div>
      )}
    </>
  );
};

export default FormFields;