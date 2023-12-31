import { createContext, useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [product, setProduct] = useState([]);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true); // Initialize loading as true

	// Determine whether the user is authenticated or not
	const isAuthenticated = !!profile; // Assuming a user is authenticated if a profile exists

	// Load user profile
	useEffect(() => {
		// setLoading(true);
		const admin = JSON.parse(localStorage.getItem('admin'));
		setProfile(admin);
	}, []);

	const authInfo = {
		profile,
		loading,
		setLoading,
		setProfile,
		product,
		isAuthenticated, // Include the isAuthenticated property
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
