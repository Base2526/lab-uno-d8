FROM drupal:8.7.10

# install memcached [>> docker exec -it container_id bash >> service memcached restart >> ok]
RUN apt-get update
RUN apt-get install -y git libmemcached-dev wget unzip curl
RUN apt-get install --no-install-recommends -y libzip-dev zlibc zlib1g
RUN docker-php-ext-configure zip --with-libzip
RUN docker-php-ext-install zip
RUN mkdir -p /usr/src/php/ext/memcached
WORKDIR /usr/src/php/ext/memcached
RUN wget https://github.com/php-memcached-dev/php-memcached/archive/v3.1.3.zip; unzip /usr/src/php/ext/memcached/v3.1.3.zip
RUN mv /usr/src/php/ext/memcached/php-memcached-3.1.3/* /usr/src/php/ext/memcached/
RUN docker-php-ext-configure memcached && docker-php-ext-install memcached 

RUN apt-get update -y
RUN apt install memcached -y
COPY ./config/memcached.conf /etc/memcached.conf
# RUN service memcached restart
# install memcached

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    ln -s /root/.composer/vendor/bin/drush /usr/local/bin/drush

# Install Drush
RUN composer global require drush/drush && \
    composer global update

# Clean repository
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

COPY ./modules /var/www/html/sites/default/modules
COPY ./themes /var/www/html/sites/default/themes

RUN mkdir -p /var/www/html/sites/default/files
RUN chmod 777 -R /var/www/html/sites/default/files

EXPOSE 80