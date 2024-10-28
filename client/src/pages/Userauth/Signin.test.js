// src/pages/Userauth/Signin.test.js
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signin from './Signin';
import theme from '../../theme';
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate and window.scrollTo
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));
const mockNavigate = useNavigate();
beforeAll(() => {
    window.scrollTo = jest.fn();
});

test('renders Signin component correctly', () => {
    render(
        <ThemeProvider theme={theme}>
            <Router>
                <Signin />
            </Router>
        </ThemeProvider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});
