import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

interface Props {
    isLoading: boolean;
}
function Loading({isLoading}: Props) {
    return (
        <ClipLoader
            color={"#ffffff"}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default Loading;