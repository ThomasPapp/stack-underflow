const bodyy = (username, auth) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <style type="text/css">
    body {
        background-color: #F7F7F7;
        font-family: 'Open Sans', sans-serif;
    }

    .container {
        top: 25%;
        left: 0;
        right: 0;
        width: 600px;
        height: 450px;
        border-radius: 6px;
        margin: auto;
        background: white;
        position: fixed;

        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .text-container {
        width: 550px;
        margin-bottom: 4%;
        padding: 4%;
        line-height: 2;
    }

    .auth-button {
        text-align: center;
        text-decoration: none;
        border-radius: 4px;
        color: white;
        background: #4d90fe;
        border: none;

        width: 200px;
        height: 50px;

        font-size: 1.2em;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-button:hover {
        cursor: pointer;
        background: #357ae8;
    }
</style>
</head>
<body>
    <main class="container">
        <h1>Stack Underflow</h1>

        <div class="text-container">
            <h4>Welcome to Stack Underflow, ${username}!</h4>
            <p>
                We've finished setting up your account, however before
                you can get started we ask that you please verify your
                email address. Simply click the link below to get started!
            </p>
        </div>

        <a href="localhost:3000/verify?auth=${auth}" class="auth-button">Verify Account</a>
    </main>
</body>
</html>
`;

const body = (username, auth) => `
    <div>
        <center>
            <h4>Welcome to Stack Underflow, ${username}!</h4>
            </br>
            </br>
            <p>
                We've finished setting up your account, however before
                you can get started we ask that you please verify your
                email address. Simply click the link below to get started!
            </p>
            </br>
            </br>

            <a href="http://localhost:3000/verify?auth=${auth}" class="auth-button" style="text-align: center;text-decoration: none;border-radius: 4px;color: white;background: #4d90fe;border: none;padding: 8px;width: 300px;height: 100px;font-size: 1.2em;">Verify Account</a>
        </center>
    </div>
`;

module.exports = {
    body
}