import React from "react";
import styled from "styled-components";

const InputComp = ({
    id,
    type = "text",
    placeholder = "placeholder",
    callback,
}) => {
    return (
        <Container>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={callback}
            />
        </Container>
    );
};

const Container = styled.div``;
const Input = styled.input`
    width: 50%;
    height: 3rem;
    font-size: 1rem;
    padding: 0 1.25rem 0 1.25rem;
    border-radius: 0.5rem;
    border: 1px solid;
    border-color: black;
    ::placeholder {
        color: gray;
    }
    :focus {
    }
`;

export default InputComp;
