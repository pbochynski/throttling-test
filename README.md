# Installation

    npm install
    
# Run local server

    node server.js

# Stream data into local server

    node post-stream.js http://127.0.0.1:9090
    
# Stream data to remote server with host header overwrite

    node post-stream.js URL HOST_HEADER
        
Example:

    node post-stream.js http://10.10.100.50:7645 throttling-test.us-east.stage.cf.yaas.io:443
