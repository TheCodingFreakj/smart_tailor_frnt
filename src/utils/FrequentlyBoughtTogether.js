import React, { Fragment } from "react";
import InstallTrackingButton from "./InstallScript";
import ScriptRemovalButton from "./ScriptRemovalButton";
import { Typography } from "@mui/material";
import RemoveAll from "./RemoveAll";



const FrequentlyBoughtTogether = () => {


    return <Fragment>

        <Typography variant="h6" gutterBottom>
            Script Management
        </Typography>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>

            <div >
                <InstallTrackingButton shopId={localStorage.getItem("shopParams")} identifier={"fbought"} />
            </div>

            <div style={{ marginLeft: "20px" }}>
                <ScriptRemovalButton shopId={localStorage.getItem("shopParams")} identifier={"fbought"} />
            </div>

            <div style={{ marginLeft: "20px" }}>
                <RemoveAll shopId={localStorage.getItem("shopParams")} />
            </div>
        </div></Fragment>
}

export default FrequentlyBoughtTogether