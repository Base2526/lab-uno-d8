# Dockerfile Drupal 8

# install Memcached in Dockerfile
Edit settings.php 
// Set’s Memcache key prefix for your site and useful in working sites with same memcache as backend.
$settings['memcache_storage']['key_prefix'] = '';
// Set’s Memcache storage server’s.
$settings['memcache_storage']['memcached_servers'] =  ['127.0.0.1:11211' => 'default'];
// Enables to display total hits and misses
$settings['memcache_storage']['debug'] = TRUE;

แล้วต้อง docker exec -it container_id bash เพือ เข้าไป restart memcached > service memcached restart