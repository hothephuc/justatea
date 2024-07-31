import { signOutUser } from "./auth";

export function validateEmail(email) 
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

export function validatePassword(password) 
{
    const minLength = 6;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    return (
      password.length >= minLength &&
      hasNumber.test(password) &&
      hasUpperCase.test(password)
    );
}

let timeoutID; // Variable to store the timeout ID

// Function to start the timeout
export function startUserActivityTimeout() 
{
    const TIMEOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes in milliseconds
  
    // Clear previous timeout if exists
    clearTimeout(timeoutID);
  
    // Start new timeout
    timeoutID = setTimeout(async () => {
      try {
        await signOutUser(); // Call your signOutUser function here
        console.log("User signed out due to inactivity");
        // You can also redirect the user to a sign-in page or display a message
      } catch (error) {
        console.error("Error signing out due to inactivity:", error);
      }
    }, TIMEOUT_DURATION_MS);
}

// Call this function whenever there is user activity (e.g., user interaction)
function onUserActivity() {
  startUserActivityTimeout();
  // Additional actions on user activity can be added here
}


