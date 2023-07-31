// importing react packages
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState();

    const navigate = useNavigate();

    const processRegistration = async (e) => {
        e.preventDefault();

        try {
            const registerData = {
                email,
                password,
                passwordVerify,
            };

            await axios
                // REFACTOR this to extract url if this page is still used
                .post("http://localhost:5000/auth/", registerData)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            navigate("/");

        } catch (err) {
            console.error(err);
        }
    };

    // button styling/CSS
    const buttonStyleDisabled = {
            color: "var(--saukko-main-white)",
            border: "var(--link-disabled)",
            background: "var(--link-disabled)",
        },
        buttonStyleEnabled = {
            color: "var(--saukko-main-white)",
            border: "var(--saukko-main-black)",
            background: "var(--saukko-main-black)",
        };

    useEffect(() => {
        setButtonDisabled(
            ![email, password, passwordVerify].every(
                (input) => input.length > 0
            )
        );
    }, [email, password, passwordVerify]);

    return (
        <main className="registerPage__wrapper">
            <WavesHeader title="Saukko" fill="#9fc9eb" />
            <section className="registerPage__container">
                <h2>Rekisteröidy</h2>

                <form onSubmit={processRegistration}>
                    <section className="registerPage__container--form-text">
                        <label htmlFor="">Sähköposti *</label>
                        <input
                            // ref={emailRef}
                            type="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Kirjoita sähköpostiosoitteesi."
                        />
                        <label htmlFor="">Salasana *</label>
                        <input
                            // ref={passwordRef}
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="Valitse salasanasi."
                        />
                        <input
                            value={passwordVerify}
                            type="password"
                            onChange={(e) => setPasswordVerify(e.target.value)}
                            placeholder="Kirjoita salasana uudelleen."
                        />
                        <p>
                            Jos sinulla on jo tili{" "}
                            <a href="/login">Kirjaudu sisään</a>
                        </p>
                    </section>
                </form>
            </section>
            <section className="registerPage__form--bottom">
                <Button
                    style={
                        buttonDisabled
                            ? buttonStyleDisabled
                            : buttonStyleEnabled
                    }
                    onClick={(e) =>
                        buttonDisabled
                            ? console.log("button disabled")
                            : processRegistration(e)
                    }
                    type="submit"
                    text="Luo tili"
                />{" "}
            </section>
        </main>
    );
};

export default RegisterPage;
