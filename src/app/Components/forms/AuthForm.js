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
        <div className="flex-col">
          <label>Etunimi</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`text-white bg-transparent w-full mt-2 p-2 mb-4 border rounded-[12px] `}
              required
            />
          <label>Sukunimi</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`text-white w-full bg-transparent p-2 mt-2 mb-12 border rounded-[12px]`}
              required
            />
            <label>
              Käyttötarkoitus
            </label>
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="text-white mt-2 w-full border bg-transparent p-2 mb-4 rounded-[12px]"
                required>
                <option value="kuljettaja">Kuljettaja</option>
                <option value="lähettäjä">Lähettäjä</option>
            </select>
            <label>Yritys</label>
            <input
              type="text"
              name="yritys_nimi"
              value={formData.yritys_nimi}
              onChange={handleChange}
              className={`text-white bg-transparent w-full mt-2 p-2 mb-4 border rounded-[12px] `}
              required
            />
          <label>
            Y tunnus
          </label>
            <input
              type="text"
              name="yTunnus"
              value={formData.yTunnus}
              onChange={handleChange}
              className={`text-white mt-2 bg-transparent w-full p-2 mb-4 border rounded-[12px]`}
              required
            />
          <div className="mb-1">
            <label>
              Puhelinnumero
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`text-gray-300 mt-2 bg-transparent w-full p-2 mb-2 border rounded-[12px]`}
              required
            />
          </div>
          </div>
        </>
      )}

      <div className="mb-4 mt-12">
        <label>
          Sähköposti
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=""
          className={`text-white mt-2 bg-transparent border border-gray-300 p-2 w-full rounded-[12px]`}
          required
        />
      </div>
      <div className="mb-6">
      <label>
          Salasana
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder=""
          className={`text-white mt-2 border bg-transparent border-gray-300 p-2 w-full rounded-[12px]`}
          required
        />
      </div>
{!isLogin && (
  <div className="flex items-center mt-4 mb-6">
    <input
      type="checkbox"
      id="terms"
      name="terms"
      checked={formData.termsAccepted}
      onChange={(e) =>
        setFormData({ ...formData, termsAccepted: e.target.checked })
      }
      className="mr-2 ml-1"
    />
    <label htmlFor="terms" className="text-gray-300 text-ml">
      Hyväksyn{' '}
      <a
        href="/extras/ehdot"
        className="underline text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        käyttöehdot
      </a>
    </label>
  </div>
)}

<button
  type="submit"
  className={`w-full bg-[#003366] text-white py-2 rounded-[12px] hover:bg-[#002244] transition ${
  isLoading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
  disabled={isLoading}
>
  {isLoading ? 'Odota...' : isLogin ? 'Kirjaudu sisään' : 'Luo käyttäjä'}
</button>
    </>
  );
};

export default FormFields;