import React, { useReducer } from 'react';
import './Form.css';

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    value: action.value
                }
            };
        case 'SET_ERROR':
            return {
                ...state,
                [action.field]: {
                    ...state[action.field],
                    error: action.error
                }
            };
        default:
            return state;
    }
};

const Form = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const emailValidation = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const formValidation = (event) => {
        event.preventDefault();
        const isValidEmail = emailValidation(state.email.value);
        if (!isValidEmail) {
            dispatch({ type: 'SET_ERROR', field: 'email', error: 'Invalid email' });
        } else {
            console.log('Form submitted:', state);
        }
    };

    const handleChange = (field, value) => {
        dispatch({ type: 'SET_VALUE', field, value });
    };

    return (
        <div className='Form'>
            <form onSubmit={formValidation}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id='firstName'
                    name="firstName"
                    value={state.firstName.value}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id='lastName'
                    name="lastName"
                    value={state.lastName.value}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id='email'
                    name="email"
                    value={state.email.value}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                {state.email.error && <div className="error">{state.email.error}</div>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
