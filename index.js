
// const Memcached = require('memcached');
const Memcached = require('memcached-elasticache');

const _ = require('lodash');
const configs = require('./config/config.json');


const getPhrases = (portal) => new Promise((resolve, reject) => {
  const memcachedUrl = _.get(configs, 'api-node-dynamic-sort.elasticache.server.host') + ':' + _.get(configs, 'api-node-dynamic-sort.elasticache.server.port');
  const key = `${portal}-rules`;
  console.log('connecting server: ', memcachedUrl);
  const memcached = new Memcached(memcachedUrl);
  memcached.on('autoDiscover', () => {
    memcached.get(key, (err, data) => {
      if (err){
        reject(err);
      } else {
        resolve(_.get(data, 'live', undefined));
      }
    });
  });
});

console.log('STARTING');

getPhrases('boattrader')
  .then((data) => {
    console.log('data:', JSON.stringify(data, null, 4));
  })
  .catch((err) => {
    console.log('err:', err);
    
  }) 
