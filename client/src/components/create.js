import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Select from "react-select";

const options = [
  { value: "Traditionnel", label: "Traditionnel" },
  { value: "Réaliste", label: "Réaliste" },
  { value: "Blackwork", label: "Blackwork" },
  { value: "Dotwork", label: "Dotwork" },
  { value: "Géométrique", label: "Géométrique" },
  { value: "Biomechanical", label: "Biomechanical" },
  { value: "Celtique", label: "Celtique" },
  { value: "Polynésien", label: "Polynésien" },
  { value: "Minimaliste", label: "Minimaliste" },
  { value: "Abstrait", label: "Abstrait" },
  { value: "Mandala", label: "Mandala" },
  { value: "Black & Grey", label: "Black & Grey" },
  { value: "Old School", label: "Old School" },
  { value: "Maori", label: "Maori" },
  { value: "Pointillisme", label: "Pointillisme" },
  { value: "Japonais", label: "Japonais" },
  { value: "Neo traditionnel", label: "Neo traditionnel" },
  { value: "Trash Polka", label: "Trash Polka" },
  { value: "Sketch", label: "Sketch" },
  { value: "Linework", label: "Linework" },
  { value: "Surréaliste", label: "Surréaliste" },
  { value: "Portrait", label: "Portrait" },
  { value: "Tribal", label: "Tribal" },
  { value: "Aquarelle", label: "Aquarelle" },
  { value: "Horreur", label: "Horreur" },
  { value: "Lettering", label: "Lettering" },
];

export default function Create() {
  // Notez que l'état initial pour styleId est maintenant un tableau
  const [form, setForm] = useState({
    userName: "",
    password: "",
    address: "",
    website: "",
    tattooStyle: "",
  });
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [userData, setUserData] = useState();
  useEffect(() => {
    const data = localStorage.getItem("userData");
    const storageData = JSON.parse(data);
    setUserData(storageData);
  }, []);

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  // Cette fonction est mise à jour pour gérer les multiples sélections

  const handleStyleChange = (e) => {
    const selectedValue = e.target.value;
    setForm((prevForm) => ({
      ...prevForm,
      tattooStyle: selectedValue,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newPerson = {
      userName: loginData?.userName,
      password: loginData?.password,
    };

    try {
      const response = await fetch("http://localhost:3001/artist/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userData?.data?.token}`,
        },
        body: JSON.stringify(newPerson),
      });
      const responseData = await response.json();
      if (responseData.statusCode === 200) {
        const response = await fetch("http://localhost:3001/user/user-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${userData?.data?.token}`,
          },
          body: JSON.stringify(newPerson),
        });
        const responseData = await response.json();
        if (responseData.statusCode === 200) {
          localStorage.setItem("userData", JSON.stringify(responseData));

          navigate("/");
        }
      } else {
        window.alert(responseData?.message);
      }
      setLoginData({ userName: "", password: "" });
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  };

  const onSubmitArtist = async (e) => {
    e.preventDefault();

    const newPerson = { ...form };

    try {
      const response = await fetch(
        "http://localhost:3001/artist/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        }
      );
      const responseData = await response.json();

      if (responseData.statusCode === 200) {
        const atristLogin = {
          userName: form?.userName,
          password: form?.password,
        };
        const response = await fetch(
          "http://localhost:3001/artist/artist-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(atristLogin),
          }
        );
        const responseData = await response.json();
        if (responseData.statusCode === 200) {
          localStorage.setItem("userData", JSON.stringify(responseData));

          navigate("/");
        }
      } else {
        window.alert(responseData?.message);
      }
      setForm({
        userName: "",
        password: "",
        address: "",
        website: "",
        tattooStyle: "",
      });
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  };

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <div id="container" class="d-flex">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="row border rounded-3 p-3 bg-white shadow box-area">
            <ul
              className="nav nav-pills nav-justified mb-3"
              id="ex1"
              role="tablist"
            >
              <div
                className="nav-link p-3 mb-2 bg-dark text-white "
                id="tab-login"
                data-mdb-pill-init
                href="#pills-login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                {" "}
                UTILISATEUR
              </div>
            </ul>
            <form onSubmit={onSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="username">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={loginData.userName}
                  onChange={(e) =>
                    setLoginData({ ...loginData, userName: e?.target?.value })
                  }
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="usernamepassword">
                  Mot de passe
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usernamepassword"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e?.target?.value })
                  }
                />
              </div>
              <div className="form-outline mb-4 d-flex justify-content-center ">
                <input type="submit" value="Créer" className="btn btn-dark" />
              </div>
            </form>
          </div>
        </div>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="row border rounded-3 p-3 bg-white shadow box-area">
            <ul
              className="nav nav-pills nav-justified mb-3"
              id="ex1"
              role="tablist"
            >
              <div
                className="nav-link p-3 mb-2 bg-dark text-white"
                id="tab-login"
                data-mdb-pill-init
                href="#pills-login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                TATOUEUR
              </div>
            </ul>
            <form onSubmit={onSubmitArtist}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">
                  Nom de tatoueur
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm({ userName: e.target.value })}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Mot de passe
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  value={form.password}
                  onChange={(e) => updateForm({ password: e.target.value })}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="address">
                  Adresse
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={form.address}
                  onChange={(e) => updateForm({ address: e.target.value })}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="website">
                  Site web
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  value={form.website}
                  onChange={(e) => updateForm({ website: e.target.value })}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="style">
                  Style de Tatouage
                </label>
                <div>
                  <select
                    value={form?.tattooStyle}
                    onChange={handleStyleChange}
                    style={{
                      height: "40px",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  >
                    <option value="">Select a style</option>
                    {options.map((data) => (
                      <option
                        key={data.value}
                        value={data.value}
                        style={{ height: "40px", borderRadius: "14px" }}
                      >
                        {data.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-outline mb-4 d-flex justify-content-center ">
                <input type="submit" value="Créer" className="btn btn-dark" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
