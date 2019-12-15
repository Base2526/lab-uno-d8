FROM drupal:8.7.10

COPY ./modules /var/www/html/sites/default/modules
COPY ./themes /var/www/html/sites/default/themes

EXPOSE 80