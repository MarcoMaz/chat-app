# Chat Application
This is a simple chat application built with React and Node.js. It allows two users to chat with each other using a web browser.

## Installation
Clone the repository: `git clone https://github.com/your-username/chat-app.git`

## Install and run the server
1. Navigate with a terminal to the server directory: `cd chat-app/server`.
2. Install the dependencies: `yarn`.
3. Run the server: `yarn start`.

## Install and run the client
1. Navigate with another terminal to the client directory: `cd chat-app/client`.
2. Install the dependencies: `yarn`.
3. Run the client: `yarn start`.
4. Open your web browser and navigate to `http://localhost:3000` to access the application.
5. Open a second tab with also the address `http://localhost:3000`.

## Usage
Once you have the application running, you can start chatting with another user. The chat window will be displayed in the browser.

## Chat commands
- /nick <name> - sets your name for the chat and it will appear at the top of the chat window on the other​ person's browser.
- /think <message> - makes the text appear in dark grey, instead of black.
- /oops - removes the last message sent.
- /fadelast - fades out the last message to 10% visibility.
- /highlight <message> - makes the font of the message 10% bigger, and the background 10% darker.
- /countdown <number> <url> - starts a visible countdown on the other persons browser, and at the end of the countdown redirect them to the URL specified.
- (smile) - produces a smiley face.
- (wink) - produces a winking face

## Chat UX
- When the user is typing it is shown to the other user.
- When a new message arrives, it slides in, and the messages above slides up.

## Notes
I did not add any webpack configurations due to time constraints, and I also refrained from modifying the `react eject` process for safety reasons.

However, one approach I would have explored to improve the application's performance is to use a tool like [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) together with a custom Webpack config.