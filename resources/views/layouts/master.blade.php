<!DOCTYPE html>
<html lang="lang="{{ str_replace('_', '-', app()->getLocale()) }}"">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
      rel="stylesheet"
    />
    @vite(["resources/sass/app.scss", "resources/js/app.js"])
    @routes
    <title>{{env("APP_NAME")}}</title>
</head>
<body>
    <header class="header">
        <h4 class="text-white">UNIR PDF</h4>
    </header>
    <main class="container-lg">
        @yield('content')
    </main>

    <footer class="footer">

    </footer>
    
</body>
</html>