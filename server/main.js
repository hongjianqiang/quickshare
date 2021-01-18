import http from 'http'
import tryUsePort from '../shared/tryUsePort'
import { LOCALHOSTS, HOST, PORT, CHARSET, ROOT_DIR } from './config'

tryUsePort(PORT, port => {
  (() => {
    console.clear();
    console.log('=================================================\n');
    console.log('You can now view this app in the browser.\n');
    console.log(`  Local:            http://127.0.0.1:${port}\n`);
  
    for (const localhost of LOCALHOSTS) {
        if (localhost !== '127.0.0.1') {
            console.log(`  On Your Network:  http://${localhost}:${port}\n`);
        }
    }
  
    console.log('The service is running.\n');
    console.log('=================================================\n');
  })()
})
