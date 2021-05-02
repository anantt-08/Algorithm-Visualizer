import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const motionPlayer = (props) => keyframes`
    0% {
        top: ${props.left ? 0 : props.size / 3.5}${props.sizeUnit};
    }
    50% {
        top: ${props.left ? props.size / 3.5 : 0}${props.sizeUnit};
    }
    100% {
        top: ${props.left ? 0 : props.size / 3.5}${props.sizeUnit};
    }
`;

const motionBall = (props) => keyframes`
    0% {
        top: ${props.size / 3.5 - props.size / 8}${props.sizeUnit};
        left: ${props.size / 12}${props.sizeUnit};
    }
    25% {
        top: ${props.size / 3.5}${props.sizeUnit};
        left: ${props.size - props.size / 8}${props.sizeUnit}; 
    }
    50% {
        top: ${props.size / 1.75 - props.size / 8}${props.sizeUnit};
        left: ${props.size / 12}${props.sizeUnit}; 
    }
    75% {
        top: ${props.size / 3.5}${props.sizeUnit};
        left: ${props.size - props.size / 8}${props.sizeUnit};
    }
    100% {
        top: ${props.size / 3.5 - props.size / 8}${props.sizeUnit};
        left: ${props.size / 12}${props.sizeUnit}; 
    }
`;

const Spinner = ({ size, color, loading, sizeUnit }) => {
    return (
        <Container>
            <Wrapper size={size} sizeUnit={sizeUnit}>
                <Player
                    left={true}
                    color={color}
                    size={size}
                    sizeUnit={sizeUnit}
                />
                <Ball color={color} size={size} sizeUnit={sizeUnit} />
                <Player
                    right={true}
                    color={color}
                    size={size}
                    sizeUnit={sizeUnit}
                />
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    position: relative;
    width: ${(props) => `${props.size}${props.sizeUnit}`};
    height: ${(props) => `${props.size / 1.75}${props.sizeUnit}`};
`;

const Ball = styled.div`
    position: absolute;
    width: ${(props) => `${props.size / 8}${props.sizeUnit}`};
    height: ${(props) => `${props.size / 8}${props.sizeUnit}`};
    border-radius: 50%;
    background-color: #2200e2;
    animation: ${(props) => motionBall(props)} 2s linear infinite;
`;

const Player = styled.div`
    position: absolute;
    width: ${(props) => `${props.size / 12}${props.sizeUnit}`};
    height: ${(props) => `${props.size / 3}${props.sizeUnit}`};
    background-color: #2200e2;
    left: ${(props) => (props.left ? 0 : props.size)};
    right: ${(props) => (props.right ? 0 : props.size)};
    border-radius: 4px;
    animation: ${(props) => motionPlayer(props)} 2s linear infinite;
`;

Spinner.defaultProps = {
    loading: true,
    size: 100,
    color: "#0bceaf",
    sizeUnit: "px",
};

Spinner.propTypes = {
    loading: PropTypes.bool,
    size: PropTypes.number,
    color: PropTypes.string,
    sizeUnit: PropTypes.string,
};

export default Spinner;