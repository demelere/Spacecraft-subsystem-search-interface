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

### Rationale behind tools, languages, and frameworks
* I chose to not use a library to mock HTTP requests, because I interpreted the requirements as excluding all backend services including backend _mocking_ services (e.g. JSON server, Axios mock adapter, Mirage JS, Mockoon).  Instead, I implemented my own mock data access class by seeding the data with a JS object that is similar to the JSON format that would be expected from a real backend, and using the `.catch` statement of the `fetch` request to stub out API responses.  If I were to adapt this for a real backend and database, I would include newly added node properties within the body of the POST request, as well as use the `.then` statement of the request to return the data.
* I used react-d3-tree to visualize the data because plain D3.js and React don't work well together due to different ways of controlling the DOM.  
* I implemented my own helper functions to traverse the nested tree object, because helper libraries are large and I only needed a few methods tailored for my data.
* I installed moment.js to diff current vs created DateTimes, because it involves significantly less code than DateTime manipulation with native JS methods.
* React and MUI are popular UI libraries and helped me bootstrap the project quickly.

### Key challenges
* I found that react-d3-tree has limited support for deleting nodes and rendering custom nodes.  To resolve this, I referenced the source code to implement custom rendering logic (e.g. buttons within nodes, conditional text colors).  I implemented a workaround for deletion by passing the id to react synthetic events, comparing, using the getAttribute to grab the id on the other end. 
* There were some ambiguous situations regarding when and how frequently GET vs POST requests should be made in response to user inputs.  For example, a user might expect to continuously query with GET requests while typing mid-word ("Rocket/Sta"), but not to prematurely submit a POST request before confirmation that “Rocket/Stage3” is actually the resource they want.  To address this, I chose to query the data upon each keypress, but only add a new node and property after user confirmation.  This approach was a good middle ground that satisfied the functional reqs and also made sense from a UX standpoint.

### Deviations, caveats, and limitations
* I used hooks instead of a class component to create a data access component because modern React applications have moved towards hooks over classes after React 16.8.  While this differs from the instructions, this still satisfies the functional requirements while having less code and better readability.  
* Deleting certain nodes can cause a bug that deletes all other nodes that share the same name.  This is due to limited support for natively comparing unique node ids and branch paths.  If I were to revisit this, I would explore passing ids and paths from a top-level component to both the custom node and the click handler, or using a DOM-based approach as a last resort.  

### Next steps for a production environment
* Making API calls on every keypress may cause higher latency at scale.  If storing the entire object is not prohibitively large, I would fetch it up front, cache it, and then run queries against that object in-memory.  I would also explore debouncing or throttling my API requests.  
* Users need better visual feedback while typing in order to differentiate between their intent to query vs confirm that new nodes should be added to the tree.  A grouped or flattened data structure wouldn't be appropriate for this use case.  I would add an autocomplete feature that checks if each element in the input string exists along the node path.  It would return existing nodes as options at each nested level, and a "add __" message when not find an existing node.   
* I chose not to render how long ago items were created with a separate handler because react-d3-tree renders attributes natively.  Also, adding this would have meant refactoring the data structure and the query logic.  If I were to iterate on this, ideally the time of creation would be timestamped by the backend when a record is successfully created in a database.  I would store this as a key value pair along with every single node or attribute, and then diff it against the current DateTime on the client at the time of render.  
* If I had the time, I would also introduce some form of type checking via the PropTypes library or TypeScript.  
