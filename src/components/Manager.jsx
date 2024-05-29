import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("password");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  // password to text -> toggle functionality code
  const toggleFunc = () => {
    if (toggle === true) {
      return setToggle(false);
    } else {
      return setToggle(true);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // password save functionality code
  const collectData = () => {
    if (!data.site || !data.username || !data.password) {
      return toast.error("Please fill all the fields");
    }
    setPasswordArray([...passwordArray, { ...data, id: uuidv4() }]);
    localStorage.setItem(
      "password",
      JSON.stringify([...passwordArray, { ...data, id: uuidv4() }])
    );
    setData({ site: "", username: "", password: "" });
    toast.success("Password Saved Successfully!");
  };

  // copy to clipboard = function
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // edit functionality code
  const editFunc = (id) => {
    const password = passwordArray.filter((password) => {
      if (password.id === id) {
        return password;
      }
    });
    setData({
      site: password[0].site,
      username: password[0].username,
      password: password[0].password,
    });
    // Deleting an edited password row
    const deletePassword = passwordArray.filter((pass) => {
      if (pass.id !== id) {
        return pass;
      }
    });
    setPasswordArray(deletePassword);
  };

  // delete functionality code
  const deleteFunc = (id) => {
    const password = passwordArray.filter((password) => {
      if (password.id !== id) {
        return password;
      }
    });
    setPasswordArray(password);
    localStorage.setItem("password", JSON.stringify(password));
    toast.success("Password deleted successfully");
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="max-w-6xl mx-auto flex flex-col items-center pt-16">
        <h1 className="font-bold text-center text-2xl md:text-3xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">GUARD /&gt;</span>
        </h1>
        <p className="text-green-800 font-semibold">
          Your own Password Manager
        </p>
        <div className="pt-6 md:pt-16 w-[90%] md:w-full">
          <input
            type="text"
            className="w-full text-[0.80rem] md:text-[1rem] rounded-full px-5 py-1 border-2 border-green-600 transition-all"
            placeholder="Enter Website URL..."
            name="site"
            value={data.site}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-5 md:flex md:flex-row md:gap-8 md:items-center pt-5">
            <input
              type="text"
              className="w-full text-[0.80rem] md:text-[1rem] rounded-full px-5 py-1 border-2 border-green-600 transition-all"
              placeholder="Enter Username"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <div className="relative w-full">
              <input
                type={toggle ? "text" : "password"}
                className="w-full text-[0.80rem] md:text-[1rem] rounded-full px-5 py-1 border-2 border-green-600 transition-all"
                placeholder="Enter Password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <span className="absolute right-[8px] top-[6px] md:top-[8px] cursor-pointer">
                <img
                  src={toggle ? "icons/invisible.png" : "icons/eye.png"}
                  width={18}
                  onClick={toggleFunc}
                />
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={collectData}
          className="flex items-center gap-2 bg-green-600 py-2 px-6 ring-green-400 ring-1 rounded-full transition-all text-white font-medium border-2 hover:border-2 hover:border-green-600 hover:bg-white hover:text-green-600 mt-8"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>{" "}
          Save
        </button>
      </div>

      {/* your passwords sec */}
      {passwordArray.length > 0 ? (
        <div className="passwords w-[90%] md:max-w-6xl mx-auto flex flex-col pt-8 mb-6">
          <h1 className="text-[1.1rem] md:text-2xl font-bold py-3">
            Your Passwords
          </h1>
          <table className="table-auto w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="text-white bg-green-800">
                <th className="py-2 text-[0.70rem] md:text-[1rem]">Site</th>
                <th className="py-2 text-[0.70rem] md:text-[1rem]">Username</th>
                <th className="py-2 text-[0.70rem] md:text-[1rem]">Password</th>
                <th className="py-2 text-[0.70rem] md:text-[1rem]">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((curElem) => {
                return (
                  <tr key={curElem.id}>
                    <td className="py-2 text-[0.60rem] md:text-[1rem] text-center w-32">
                      <a href={curElem.site} target="_blank">
                        {curElem.site}
                      </a>
                    </td>
                    <td className="py-2 text-[0.60rem] md:text-[1rem] text-center w-32">
                      <span className="flex gap-2 items-center justify-center">
                        {curElem.username}
                        <span
                          className="cursor-pointer pt-2"
                          onClick={() => {
                            copyText(curElem.username);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: "25px" }}
                          ></lord-icon>
                        </span>
                      </span>
                    </td>
                    <td className="py-2 text-[0.60rem] md:text-[1rem] text-center w-32">
                      <span className="flex gap-2 items-center justify-center">
                        <input
                          className="outline-none bg-transparent w-[21%] text-xl"
                          readOnly
                          type="password"
                          value={curElem.password}
                        />
                        <span
                          className="cursor-pointer pt-2"
                          onClick={() => {
                            copyText(curElem.password);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{ width: "25px" }}
                          ></lord-icon>
                        </span>
                      </span>
                    </td>
                    <td className="py-2 text-[0.60rem] md:text-[1rem] text-center w-32">
                      <span
                        className="cursor-pointer"
                        onClick={() => editFunc(curElem.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer pl-4"
                        onClick={() => deleteFunc(curElem.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <h3 className="w-[90%] text-[1.1rem] md:text-2xl max-w-6xl mx-auto pt-8 font-bold">
            No Passwords
          </h3>
        </>
      )}
    </>
  );
};

export default Manager;
