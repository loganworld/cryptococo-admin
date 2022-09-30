import { FaInbox, FaPlusCircle } from "react-icons/fa";
import { useState, useLayoutEffect } from "react";
import ToggleButton from "../components/ToggleButton";
import Action from "../services";
import { useGlobalContext } from "../context";
import { Toast } from "../utils/message";
import { AnimatePresence, motion } from "framer-motion";
import { AuthObject } from "../components/interfaces";

export default function Alladmins() {
    const [state]: any = useGlobalContext();
    const [allAdmins, setAllAdmins] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useLayoutEffect(() => {
        (async () => {
            try {
                const { code, result } = await Action.GetAllAdmin();

                if (code === 200) setAllAdmins(result);
                else setAllAdmins([]);
            } catch (err: any) {
                console.log(err.message);
            }
        })();
    }, []);

    const HandleChange = async (item: any) => {
        try {
            const { code, result } = await Action.UpdateAllow({
                email: item.email,
                checked: !item.allow,
            });

            if (code === 200) {
                setAllAdmins(result);
            }
        } catch (err: any) {
            Toast("Failed allow", "error");
        }
    };

    const HandleRemoveAdmin = async (item: any) => {
        try {
            const { code, result } = await Action.RemoveAdmin({
                email: item.email,
            });

            if (code === 200 && result) {
                Toast("Successfully Removed", "success");
            }
        } catch (err: any) {
            Toast("Failed remove admin", "error");
        }
    };

    return (
        <>
            <div className="alladmin">
                <div>
                    <span></span>
                    <button onClick={() => setShowModal(!showModal)}>
                        <FaPlusCircle />
                        <span>Add admin</span>
                    </button>
                </div>
                <div className="admin_table">
                    <div>
                        {allAdmins.length === 0 ? (
                            <div className="not_exist">
                                <FaInbox />
                                <h3>Not exist admin data</h3>
                            </div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Allow</th>
                                        <th style={{ textAlign: "center" }}>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allAdmins.map(
                                        (item: any, index: number) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                {item.email !==
                                                    state.auth.email && (
                                                    <>
                                                        <td>
                                                            <ToggleButton
                                                                index={index}
                                                                item={item}
                                                                changeFunc={
                                                                    HandleChange
                                                                }
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <button
                                                                onClick={() =>
                                                                    HandleRemoveAdmin(
                                                                        item
                                                                    )
                                                                }
                                                                className="btnRemoveAdmin"
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <Modal modal={showModal} setModal={setShowModal} />
        </>
    );
}

const Modal = ({ modal, setModal }) => {
    const [loading, setLoading] = useState(false);
    const [authData, setAuthData] = useState<AuthObject>({
        name: "",
        email: "",
        password: "",
    });

    const init = () => {
        setAuthData({
            ...authData,
            name: "",
            email: "",
            password: "",
        });
    };

    const HandleAdd = async () => {
        try {
            if (authData.name?.trim() === "") {
                Toast("Fill out name field", "warn");
                return;
            }
            if (authData.email.trim() === "") {
                Toast("Fill out email field", "warn");
                return;
            }
            if (authData.password.trim() === "") {
                Toast("Fill out password field", "warn");
                return;
            }
            setLoading(true);
            let result: any = await Action.Admin_create({
                name: authData.name,
                email: authData.email,
                password: authData.password,
            });
            setLoading(false);

            switch (result.code) {
                case 200:
                    Toast("Successfully SignUp", "success");
                    init();
                    setModal(false);
                    break;
                case 303:
                    Toast("Email already exist", "warn");
                    break;
                case 500:
                    Toast("Server Error", "error");
                    break;
                default:
                    break;
            }
        } catch (err) {
            setLoading(false);
            Toast("Network Error", "error");
        }
    };

    return (
        <AnimatePresence>
            {modal && (
                <div className="admin_add_modal">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -50,
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.4,
                        }}
                    >
                        <button
                            className="exist"
                            onClick={() => setModal(!modal)}
                        >
                            &times;
                        </button>
                        <span>
                            <span>
                                <label htmlFor="name">Name: </label>
                                <input
                                    type={"text"}
                                    id="name"
                                    className="form-control"
                                    placeholder="enter admin name"
                                    value={authData.name}
                                    onChange={(e: any) =>
                                        setAuthData({
                                            ...authData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </span>
                            <span>
                                <label htmlFor="email">Email: </label>
                                <input
                                    type={"email"}
                                    id="email"
                                    className="form-control"
                                    placeholder="enter admin email"
                                    value={authData.email}
                                    onChange={(e: any) =>
                                        setAuthData({
                                            ...authData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </span>
                            <span>
                                <label htmlFor="password">Password: </label>
                                <input
                                    type={"password"}
                                    id="password"
                                    className="form-control"
                                    value={authData.password}
                                    onChange={(e: any) =>
                                        setAuthData({
                                            ...authData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </span>
                            <span className="spacer-half"></span>
                            {loading ? (
                                <button className="btn-primary">
                                    Submitting...
                                </button>
                            ) : (
                                <button
                                    className="btn-primary"
                                    onClick={HandleAdd}
                                >
                                    Submit
                                </button>
                            )}
                        </span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.2,
                        }}
                        onClick={() => setModal(!modal)}
                    />
                </div>
            )}
        </AnimatePresence>
    );
};
