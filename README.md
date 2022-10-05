# Orderbook Techical Analysis - Frontend (webapp)

This is the frontend webapp component/submodule of the [Orderbook Technical Analysis project](https://github.com/RT-Tap/OrderbookTechAnalysis-Integration) whose purpose is described in the first section of the [OrderbookTechAnalysis-Integration](https://github.com/RT-Tap/OrderbookTechAnalysis-Integration) repo. It is meant to be run as a container, a component of a service which is created (and described) by the [OrderbookTechAnalysis-Intefration](https://github.com/RT-Tap/OrderbookTechAnalysis-Integration) repo.


# Overview
Snowpack is being used as the build tool to provide a live server without needing to repackage after every change.  There are alternatives like vite but I have grown fond of snowpack, either way it shouldnt be too hard to adapt to whatever build tool you want.

Snowpack is also currently being used to bundle the project for "production", which is still far away. But it can be used as a refrence for others on how to bundle and deploy a react app quickly or is usefull for anyone interested in watching the progress of this project.  

### This component of the project was started after all other components were just about complete and therefore is still in the early stages of development.  There are some branches that can be usefull as templates for other projects if you like the movable boxes.
---

# Build for viewing/testing
## remotely 
    docker build https://github.com/RT-Tap/OrderbookTechAnalysis-Frontend -t ordbookfrontendtest 
    docker run -dit --name ordbookfrontendtest -p 8080:80 ordbookfrontendtest
## locally
    git clone https://github.com/RT-Tap/OrderbookTechAnalysis-Frontend 
    cd OrderbookTechAnalysis-Frontend 
    docker build . -t ordbookfrontendtest 
    docker run -dit --name ordbookfrontendtest -p 8080:80 ordbookfrontendtest

And the site/web app will be available at [http://localhost:8080](http://localhost:8080)

# Development
Again as snowpack is being used for development it is very easy to get started

    git clone https://github.com/RT-Tap/OrderbookTechAnalysis-Frontend
    cd OrderbookTechAnalysis-Frontend
    npm i
    npm run start
This will give you a live server at http://localhost:8080 or another port is 8080 is currently being used.

---

## Docker build issues
If you run into the issue of `failed to solve with frontend dockerfile.v0: failed to create LLB definition: pull access denied, repository does not exist or may require authorization: server message: insufficient_scope: authorization failed` when building please refer to [this guthub thread for fixes](https://github.com/docker/compose/issues/8449).  For me I had to turn buildkit off.