/*  Description
    - useNewUrlParser {
        From Mongoose documentation: https://mongoosejs.com/docs/connections.html
        The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser. You should set useNewUrlParser: true unless that prevents you from connecting. Note that if you specify useNewUrlParser: true, you must specify a port in your connection string, like mongodb://localhost:27017/dbname. The new url parser does not support connection strings that do not have a port, like mongodb://localhost/dbname.
    }
    - useCreateIndex {
        From Mongoose documentation: https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set 
        This will use MongoDB's more updated createIndex() instead of the deprecated ensureIndex().
        'useCreateIndex': false by default. Set to true to make Mongoose's default index build use createIndex() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
    }
    - useFindAndModify { 
        This will get rid of the deprecation warning as well as changing it to use MongoDB's native findOneAndUpdate() rather than findAndModify().
        'useFindAndModify': true by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
    }
    - useUnifiedTopology {
        From Mongoose documentation: https://mongoosejs.com/docs/deprecations.html 
        Mongoose 5.7 uses MongoDB driver 3.3.x, which introduced a significant refactor of how it handles monitoring all the servers in a replica set or sharded cluster. In MongoDB parlance, this is known as server discovery and monitoring.

        To opt in to using the new topology engine, use the below line:
        mongoose.set('useUnifiedTopology', true);

        The useUnifiedTopology option removes support for several connection options that are no longer relevant with the new topology engine:
        autoReconnect
        reconnectTries
        reconnectInterval
        When you enable useUnifiedTopology, please remove those options from your mongoose.connect() or createConnection() calls.
    }
*/
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_RECIPE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})