import { useEffect, useState } from "react";
import "./App.css";
import { IoSwapVertical } from "react-icons/io5";
const App = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("AMD");
  const [to, setTo] = useState("GEL");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState();

  const apiKey = "e317010c950f7fdccaf4d346";

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          setOptions(data.supported_codes);
        }
      });
  }, [apiKey]);

  useEffect(() => {
    if (amount > 0) {
      fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.result === "success") {
            setOutput(parseFloat(data.conversion_result).toFixed(2));
          }
        });
    }
  }, [amount, from, to, apiKey]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="App">
      <div className="convertor">
        <h2>Currency Converter</h2>
        <div className="container">
          <div className="left">
            <h4>Amount</h4>
            <input type="number" onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="center">
            <h4>From</h4>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {options.map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[1]}
                </option>
              ))}
            </select>
          </div>
          <div className="swap">
            <IoSwapVertical onClick={handleSwap} />
          </div>
          <div className="right">
            <h4>To</h4>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {options.map((option) => (
                <option key={option[0]} value={option[0]}>
                  {option[1]}
                </option>
              ))}
            </select>
          </div>

          <div className="result">
            <h4>Converted Amount</h4>
            <h5>
              {amount} {from} = {output} {to}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
