# Install Laravel on shared hosting environment

In order to get Laravel set up, you'll need to install Compas on your server. This process will be different per hosting provider so look at their documentation in order to install it.
[Instructions for installing Compasshere](https://laravel.com/docs/5.4/installation#installing-laravel)

Once Composer is installed I find the easiest way to set up a Laravel project is to use the following command:
```ssh
composer create-project --prefer-dist laravel/laravel blog
```
#### To get our Laravel install up and running we'll have to move some files around.
1. Inside of your laravel project, create a folder named ```laravel```
2. Select everything except for the ```laravel and public``` directories and move all of the content into the new laravel directory
3. Inside of the public folder, select the ```.htaccess, favicon.ico, index.php, and robots.txt``` and pull them back into your project root
4. Rename the public folder to ```assets```
5. In your laravel project root, open up the ```index.php``` and change the directory path
```php
require __DIR__.'/../bootstrap/autoload.php';
```
to
```php
require __DIR__.'/laravel/bootstrap/autoload.php';
```

#### Your laravel server should be up and running. There are a few files we need to alter to get it ready for our API calls
1. Go into your ```laravel/config``` folder and we'll open the ```database.php```
Depending on what type of SQL your database is using you'll have to add your parameters accordingly

2. Hop back into your project root and go to ```laravel/app/Http/routes.php```
In this file you can create a simple laravel route, or an API. If you wish to see a demonstration, you can look at the file located
[here](https://github.com/gst4158/laravel_angular2_app/blob/master/laravel/app/Http/routes.php)

### That's it! You should have a laravel backend up and running ready for some API fun.
