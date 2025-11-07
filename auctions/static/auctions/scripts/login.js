document.addEventListener('DOMContentLoaded', function() {

    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', async function() {
            loginBtn.disabled = true; // Disable the button to prevent multiple clicks

            const username = document.getElementById('username');
            const password = document.getElementById('password');
            const redirectInput = document.getElementById('redirect');
            const redirect = redirectInput ? redirectInput.value : null;

            if (!username || !password) {
                alert('Please enter both username and password.');
                loginBtn.disabled = false; // Re-enable the button
                return;
            }

            const csrfTokenElement = document.querySelector('input[name="csrfmiddlewaretoken"]');

            const request = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfTokenElement.value //getCookie('csrftoken') // Function to get CSRF token from cookies
                },
                body: JSON.stringify({ username: username.value, password: password.value })
            });

            const response = await request.json();

            // console.log("Response from server:", response);

            if (!request.ok) {
                alert('Login failed. Please check your credentials and try again.');
                loginBtn.disabled = false; // Re-enable the button
                return;
            }

            console.log("Login successful. Now logging in to Zendesk...");

            // No need to login to messaging if redirect to another site. Check if redirect is jwt sso request
            if( redirect && redirect.includes("jwt") ) {
                console.log("Redirect URL contains JWT SSO. Skipping Zendesk messaging login.");
                // Redirect to the specified URL on successful login
                host = window.location.origin;
                console.log("Host:", host);
                const jwtRedirect = `${host}${encodeURIComponent(redirect)}`;
                console.log("Redirecting to:", jwtRedirect);    
                window.location.href = jwtRedirect;
                return;
            }


            window.zE('messenger', 'loginUser', function(callback) {
                callback(response.token);
            }, function loginCallback(error) {
                    if (error) {
                        const { type, reason, message } = error
                        console.error(`Error during Zendesk login: Type: ${type}, Reason: ${reason}, Message: ${message}`);
                    }else {
                        console.log(`${error}`);
                        console.log("Zendesk login successful.");
                    }
                }
            );

            console.log("Completed whatever with Zendesk messaging login.");
            username.value = '';
            password.value = '';
            loginBtn.disabled = false; // Re-enable the button


            // Redirect to the specified URL on successful login
            if(redirect )
                window.location.href = redirect;
            else
                window.location.href = '/';
            
        });
    }
    
    
});

