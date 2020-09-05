# [ResumeBook](https://shpe-utdallas.github.io/ResumeBook/)

Stable/Master Branch Build: https://shpe-utdallas.github.io/ResumeBook/

Dev Build: https://resumebook.netlify.app/

A serverless web application to help recruiters get in contact with SHPE UT Dallas members. Built with: React, React Router, and Redux for the Front End and Node.js +Express with Firebase's Cloud Firestore as a database for the Backend. Hosted on Netlify

<p align="center">
  <img src="https://i.imgur.com/RL7rd9X.gif" />
</p>

## Getting ResumeBook Setup for Local Development

1. Ensure you are a member of the SHPE-UTDallas GitHub organization. (Or Fork the project and follow the rest of the steps. I will not be covering this in-depth and will assume you know what you're doing)
1. Clone the repository: `git clone https://github.com/SHPE-UTDallas/ResumeBook.git`
1. Make sure you have version 12 of node.js installed `node -v`
   - You shoud see v12.x.x printed out, if not install the latest version of node.js 12 here: https://nodejs.org/en/
1. Install the Netlify CLI `npm install netlify-cli -g`
   - More info avaliable here: https://docs.netlify.com/cli/get-started/#installation
1. Install Yarn (our package manager) `npm install yarn -g`
1. Install dependencies for the front end (React) `cd ResumeBook && yarn`
1. Install dependencies for the back end (Node.js) `cd src/functions && yarn`
1. Create a netlify account on https://www.netlify.com/
   1. Go to the main page and click "New site from Git" in the top right-hand corner
   1. Under the "Continuous Deployment" heading choose GitHub
   1. You should see your GitHub username and an arrow next to it. Click on it and select SHPE-UTDallas from the dropdown
   1. Select the "ResumeBook" repository from the list
   1. Select which branch you want the the build to deploy from (I would choose dev for now but once you have started contributing I would have it build and deploy from the branch you are working in)
   1. Click deploy site (Don't worry about the build command and publish directory - that's taken care of by our netlify.toml config file)
   1. Go to the dashboard for your site. You should see should see Overview, Deploys, Plugins, Functions, etc. tabs at the top of the page. Click on Deploys
   1. Click on "Deploy settings"
   1. Click on "Environment", located on the left-hand side underneath the "Build & Deploy" heading
   1. Click on "Edit variables", located underneath the "Environment variables" heading
   1. Input the environment variables I provided you to setup your test environment and then hit Save
1. Go to the root directory of the ResumeBook repository on your computer.
   1. If you've been following along exactly with this tutorial then entering `cd ../..` should put you the root directory
1. Create a file called `.env` in the root directory
   1. Inside that file input `NODE_ENV=development`
1. Run the command `netlify login` and login to your netlify account
1. Run the command `netlify link` and select `Use current git remote origin`
   1. This step will allow you to link your project to your netlify account and makes sure the environment variables you just set are injected into your environment
1. Run the command `netlify dev` in your terminal
1. The ResumeBook web application should now be running on your local machine!
