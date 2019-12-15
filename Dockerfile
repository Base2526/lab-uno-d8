FROM drupal:8.7.10

# install memcached
RUN apt-get update
RUN apt-get install -y git libmemcached-dev wget unzip
RUN apt-get install --no-install-recommends -y libzip-dev zlibc zlib1g
RUN docker-php-ext-configure zip --with-libzip
RUN docker-php-ext-install zip

RUN mkdir -p /usr/src/php/ext/memcached
WORKDIR /usr/src/php/ext/memcached
RUN wget https://github.com/php-memcached-dev/php-memcached/archive/v3.1.3.zip; unzip /usr/src/php/ext/memcached/v3.1.3.zip
RUN mv /usr/src/php/ext/memcached/php-memcached-3.1.3/* /usr/src/php/ext/memcached/

RUN docker-php-ext-configure memcached && docker-php-ext-install memcached 
# install memcached

COPY ./modules /var/www/html/sites/default/modules
COPY ./themes /var/www/html/sites/default/themes

EXPOSE 80