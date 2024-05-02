## Prerequisite Steps to Take before trying to compile our Program  1
Open your terminal and install homebrew https://brew.sh/  the installation command looks like this /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
when you finish installing it will prompt you to add homebrew to your path to do this we copy and paste the first line of code it gives starting with "echo 'eval'" 
The next line of code starts with "eval "$" 
once both these lines were entered successfully we can check to make sure we have installed homebrew successfully by closing the terminal and applying this command in the terminal brew --version if you installed it successfully it should tell you your version of homebrew

## Prerequisite Steps to Take before trying to Compile Our Program  2
Now that we have installed homebrew we need to install node so we will use the command brew install node in the terminal again after the installation finishes to make sure it was correctly installed we will need to do node --version again if we installed it successfully it should give you what version you have 
installing node also installs npm we can check that by doing npm --version again it should tell us in the terminal what version we have after that command 


## Prerequisite Steps to Take before trying to Compile Our Program  3
Now we should have node,npm, and homebrew we need to install watchman so in the terminal to install watchman run this line of code brew install watchman


## Prerequisite Steps To take before trying to compile our Program  4
Now we need to install ruby and Cocoapods to install ruby we type in our terminal brew install ruby to make sure it was correctly installed we will need to do the ruby --version  in the terminal 

Now we install cocoapods to install our code will look slightly different we want to type in on terminal sudo gem install -n /user/local/bin ffi cocoapods again to  make sure it was correctly installed we will need to do cocoapods --version  in the terminal 



## Prerequisite Steps to Take Before Trying to Compile Our Program  5
Now we have all the dependencies installed Congrats it's a lengthy process now we want to install react native to do this we go on our terminal and type in npx react-native init nameofproject if this is the first you run the command it will ask you if you want to install react native (also a flower should show up on your screen) select yes and it will install 



## Prerequisite Steps to Take Before Trying to Compile Our Program  6
Lastly, after you clone our repo while your in our  repos directory you  need to type this command on the terminal npm install react-router-dom axios 

## Helpfull links 
Youtube video explaining how to install https://youtu.be/MJEcookWYUI?feature=shared 

React Website https://reactnative.dev/docs/environment-setup?guide=native&os=macos


















































# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
