import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += 1234567890;
    if (charAllowed) str += "!@#$%^&*()_+{}[]~";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,9);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="bg-black min-h-screen py-10">
      <div className="text-orange-500 min-w-fit max-w-lg m-auto bg-slate-900 p-10 rounded-lg flex flex-col items-center gap-5 ">
        <h1 className="font-bold text-center text-2xl">Password Generator</h1>
        <div>
          <input
            type="text"
            value={password}
            readOnly
            placeholder="password"
            ref={passwordRef}
            className="p-2 rounded-s-lg outline-none font-medium"
          />
          <button
            className="bg-blue-600 p-2 rounded-e-lg text-white hover:bg-blue-700"
            onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className="flex gap-5 font-medium min-w-full">
          <div className="flex gap-3 min-w-fit">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Chacacter</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
