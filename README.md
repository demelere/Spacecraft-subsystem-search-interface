### To replicate: 
* This project requires Node >= 16.0.0 to run tests properly with [Create React App](https://github.com/facebook/create-react-app/issues/11792).  Install and use Node Version Manager (NVM) to [properly install and change Node versions](https://heynode.com/tutorial/install-nodejs-locally-nvm/).
    * Run `node -v` from terminal to check version
    * If NVM is installed and Node is outdated, run `nvm install --lts` to install and use latest.
    * If NVM is installed and you have a version > 16.0.0, run `nvm use <#>`
* From root directory `frontend`: 
    * Run `npm i` to install dependencies upon first downloading project directory
    * Run `npm start` to run application
    * Run `npm test` to run tests

### Demo:
<div style="text-align: center">
  <img src="./public/frontend.gif" alt="frontend-demo" height="500"/>
</div>


### Updates and Notes:
To do:
* I didn't use a library to mock HTTP requests (e.g. JSON server, Axios mock adapter, Mirage JS, Mockoon).  Instead, I implemented my own mock data access class by seeding the data with a JS object that is similar to the JSON format that would be expected from a real backend, and using the `.catch` statement of the `fetch` request to stub out API responses.  
* Deleting certain nodes can cause a bug that deletes all other nodes that share the same name.  This is due to limited support for natively comparing unique node ids and branch paths.  If I were to revisit this, I would explore passing ids and paths from a top-level component to both the custom node and the click handler, or using a DOM-based approach as a last resort.  

Next steps for a production environment:
* Making API calls on every keypress is an I/O bound process.  If storing the entire object is not prohibitively large, I would fetch it up front, cache it, and then run queries against that object in-memory.  I would also explore debouncing or throttling my API requests.  
* Users need better visual feedback while typing in order to differentiate between their intent to query vs confirm that new nodes should be added to the tree.  A grouped or flattened data structure wouldn't be appropriate for this use case.  I would add an autocomplete feature that checks if each element in the input string exists along the node path.  It would return existing nodes as options at each nested level, and a "add __" message when not find an existing node.   