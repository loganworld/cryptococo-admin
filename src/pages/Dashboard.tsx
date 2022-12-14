import { useMemo } from "react";
import {
    FaChartLine,
    FaChartBar,
    FaChartArea,
    FaChartPie,
} from "react-icons/fa";
import { useGlobalContext } from "../context";

export default function Dashboard() {
    const [state]: any = useGlobalContext();
    const saledNFTs = useMemo(() => {
        return state.allNFT.filter((item: any) => {
            return item.marketdata.price !== "";
        });
    }, [state.allNFT]);

    return (
        <div className="dashboard p2">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-xl-3 p1">
                        <div className="flex middle justify-between p2 bg-secondary round">
                            <span className="text-primary">
                                <FaChartLine />
                            </span>
                            <div>
                                <p className="text-light bolder">Total NFts</p>
                                <h5 className="m0">
                                    <b className="text-primary">
                                        {state.allNFT.length}
                                    </b>{" "}
                                    nfts
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3 p1">
                        <div className="flex middle justify-between p2 bg-secondary round">
                            <span className="text-primary">
                                <FaChartBar />
                            </span>
                            <div>
                                <p className="text-light bolder">
                                    Total Collections
                                </p>
                                <h5 className="m0">
                                    <b className="text-primary">
                                        {state.collectionNFT.length}
                                    </b>{" "}
                                    collections
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3 p1">
                        <div className="flex middle justify-between p2 bg-secondary round">
                            <span className="text-primary">
                                <FaChartArea />
                            </span>
                            <div>
                                <p className="text-light bolder">
                                    Total Sale NFTs
                                </p>
                                <h5 className="m0">
                                    <b className="text-primary">
                                        {saledNFTs.length}
                                    </b>{" "}
                                    nfts
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3 p1">
                        <div className="flex middle justify-between p2 bg-secondary round">
                            <span className="text-primary">
                                <FaChartPie />
                            </span>
                            <div>
                                <p className="text-light bolder">Total Users</p>
                                <h5 className="m0">
                                    <b className="text-primary">
                                        {Object.keys(state.usersInfo).length}
                                    </b>{" "}
                                    users
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
