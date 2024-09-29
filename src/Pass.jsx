import React, { useCallback, useState } from 'react';

function Pass() {
  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [capAllowed, setcapAllowed] = useState(false);
  const [smallAllowed, setsmallAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy');

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopyStatus('Copied!');
      setTimeout(() => {
        setCopyStatus('Copy');
      }, 2000);
    }
  };

  const generatePassword = useCallback(() => {
    let pass = '';
    let cap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let small = 'abcdefghijklmnopqrstuvwxyz';
    let num = '0123456789';
    let special = '!@#$%^&*()';
    let characterSet = '';

    if (numAllowed) characterSet += num;
    if (capAllowed) characterSet += cap;
    if (smallAllowed) characterSet += small;
    if (charAllowed) characterSet += special;

    if (characterSet.length === 0) {
      setPassword('Select at least one option!');
      return;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      pass += characterSet[randomIndex];
    }
    setPassword(pass);
  }, [length, numAllowed, capAllowed, smallAllowed, charAllowed]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", backgroundRepeat:'no-repeat' }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-lg w-full max-w-md">
        <h1 className="text-white text-center font-bold text-3xl sm:text-4xl my-6 sm:my-8">Random Password Generator</h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
          <input
            value={password}
            type="text"
            className="outline-none bg-slate-200 px-4 w-full sm:w-96 py-3 rounded-l font-semibold"
            placeholder="Generate Password"
            readOnly
          />
          <button
            className={`py-3 px-3 text-white font-semibold transition ease-in-out delay-100 duration-300 w-full sm:w-auto
            ${copyStatus === 'Copied!' ? 'bg-green-700' : 'bg-red-600'} 
            rounded-r `}
            onClick={handleCopy}
          >
            {copyStatus}
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center flex-col sm:flex-row">
          <input
            type="range"
            id="length"
            className="cursor-pointer w-full sm:w-auto"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length" className="text-blue-500 font-bold text-xl sm:text-3xl mx-5 mt-4 sm:mt-0">
            Length({length})
          </label>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="flex items-center">
            <input
              defaultChecked={numAllowed}
              onChange={() => setnumAllowed((prev) => !prev)}
              type="checkbox"
              id="Numbers"
              className="h-5 cursor-pointer rounded border shadow"
            />
            <label htmlFor="Numbers" className="ml-2 cursor-pointer text-white font-bold text-lg sm:text-xl">
              Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              defaultChecked={capAllowed}
              onChange={() => setcapAllowed((prev) => !prev)}
              type="checkbox"
              id="Caps"
              className="h-5 cursor-pointer rounded border shadow"
            />
            <label htmlFor="Caps" className="ml-2 cursor-pointer text-white font-bold text-lg sm:text-xl">
              ABC (Capital)
            </label>
          </div>
          <div className="flex items-center">
            <input
              defaultChecked={smallAllowed}
              onChange={() => setsmallAllowed((prev) => !prev)}
              type="checkbox"
              id="Small"
              className="h-5 cursor-pointer rounded border shadow"
            />
            <label htmlFor="Small" className="ml-2 cursor-pointer text-white font-bold text-lg sm:text-xl">
              abc (small)
            </label>
          </div>
          <div className="flex items-center">
            <input
              defaultChecked={charAllowed}
              onChange={() => setcharAllowed((prev) => !prev)}
              type="checkbox"
              id="Chars"
              className="h-5 cursor-pointer rounded border shadow"
            />
            <label htmlFor="Chars" className="ml-2 cursor-pointer text-white font-bold text-lg sm:text-xl">
              Characters(!@#)
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10">
          <button
            onClick={generatePassword}
            className="text-white cursor-pointer bg-red-700 font-bold px-4 py-3 rounded-xl hover:bg-red-600 transition ease-in-out delay-100 duration-300"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pass;
