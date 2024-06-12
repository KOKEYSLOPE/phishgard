// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Register User
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (phoneNumber.startsWith('+63') && phoneNumber.length === 13) {
        firebase.database().ref('users/' + phoneNumber).set({
            phoneNumber: phoneNumber
        });
        alert('Registered successfully');
        document.getElementById('register').style.display = 'none';
        document.getElementById('scanMessages').style.display = 'block';
    } else {
        alert('Please enter a valid Philippines mobile number starting with +63');
    }
});

// Scan Messages Function
document.getElementById('scanButton').addEventListener('click', function() {
    // Simulate scanning messages
    const suspiciousKeywords = ['phishing', 'scam', 'password', 'bank', 'urgent'];
    let messages = ["This is a phishing attempt", "Hello, how are you?", "Your bank needs your password"];

    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    messages.forEach(message => {
        let isSuspicious = false;
        suspiciousKeywords.forEach(keyword => {
            if (message.toLowerCase().includes(keyword)) {
                isSuspicious = true;
            }
        });
        let result = document.createElement('div');
        result.textContent = message;
        if (isSuspicious) {
            result.classList.add('suspicious');
        }
        resultsDiv.appendChild(result);
    });
});
