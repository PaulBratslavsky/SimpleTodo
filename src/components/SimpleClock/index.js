import React from 'react';
import styled from 'styled-components'

const SimpleClockStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    background: ${({backgroundColor}) => backgroundColor && backgroundColor};
    color: ${({color}) => color && color};
    font-size: ${({fontSize}) => fontSize && fontSize};
    font-weight: bolder;
    padding: 0.5rem 1rem;

    span {
        display: inline-block;
    }

    span:first-child {
        margin-right: ${props => (props.time && props.date) && '1rem' };  
    }
`;

const initialState = {time: 'Loading...', date: 'Loading...'};

const SimpleClock = (props) => {
    const [ time, setTime ] = React.useState(initialState);

    // Clock Tick
    React.useEffect(() => {
        const interval = setInterval(() => setTime({
            time: new Date().toLocaleString().slice(10,21),
            date: new Date().toLocaleString().slice(0,9)
        }), 1000);
        return () => clearInterval(interval);
    })

    return <SimpleClockStyled {...props} >
        {(props.time === undefined && props.date === undefined) && "Need To Pass Prop"}
        {props.time && <span>{time.time}</span>}
        {' '}
        {props.date && <span>{time.date}</span>}
    </SimpleClockStyled>
}

export default SimpleClock;