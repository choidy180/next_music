import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const TestStyle = styled.div`
    width: 300px;
    height: auto;
    margin: 10px;
    color: white;

    p {
        font-size: 1.2rem;
        color: #141414;
    }
`

const TestComp = (prop:any) => {
    return (
        <TestStyle>
            <Image
                src={prop.imgSrc}
                width={300}
                height={300}
                alt={prop.imgAlt}
            />
            <p>{prop.artist}</p>
        </TestStyle>
    )
}

export default TestComp;