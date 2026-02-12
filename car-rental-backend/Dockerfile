FROM php:8.1-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql mysqli zip intl

# Enable Apache mod_rewrite and headers
RUN a2enmod rewrite headers

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install composer dependencies
RUN composer install --optimize-autoloader --no-dev || true

# Set DocumentRoot to public directory
RUN sed -i 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's#/var/www/#/var/www/html/public#g' /etc/apache2/apache2.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html/writable \
    && chmod -R 775 /var/www/html/writable

# Configure Apache to listen on PORT environment variable (default 8080)
RUN echo 'Listen ${PORT:-8080}' > /etc/apache2/ports.conf \
    && sed -i 's/:80/:${PORT:-8080}/g' /etc/apache2/sites-available/000-default.conf

# Expose port
EXPOSE 8080

# Start Apache
CMD ["apache2-foreground"]