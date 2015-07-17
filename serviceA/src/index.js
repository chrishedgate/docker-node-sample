var main = require('./server');

if (require.main === module) { 
    main.start();
}
else { 
    module.exports = main;
}
