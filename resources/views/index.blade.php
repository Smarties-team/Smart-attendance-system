<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css">

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-kQtW33rZJAHjgefvhyyzcGF3C5TFyBQBA13V1RKPf4uH+bwyzQxZ6CmMZHmNBEfJ"
            crossorigin="anonymous"></script>


    <title>Attendance</title>
</head>
<body>

<div id="root">

</div>

{{--<div class="container-fluid">--}}


{{--    <div class="row">--}}

{{--        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">--}}
{{--            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">--}}
{{--                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>--}}
{{--                <span class="fs-4 text-danger">Smart classroom</span>--}}
{{--            </a>--}}
{{--            <hr>--}}
{{--            <ul class="nav nav-pills flex-column mb-auto">--}}
{{--                <li class="nav-item">--}}
{{--                    <a href="#" class="nav-link active" aria-current="page">--}}
{{--                        <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>--}}
{{--                        Home--}}
{{--                    </a>--}}
{{--                </li>--}}
{{--                <li>--}}
{{--                    <a href="#" class="nav-link link-dark">--}}
{{--                        <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>--}}
{{--                        Students--}}
{{--                    </a>--}}
{{--                </li>--}}
{{--                <li class="visually-hidden">--}}
{{--                    <a href="#" class="nav-link link-dark">--}}
{{--                        <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg>--}}
{{--                        Orders--}}
{{--                    </a>--}}
{{--                </li>--}}
{{--                <li class="visually-hidden">--}}
{{--                    <a href="#" class="nav-link link-dark">--}}
{{--                        <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>--}}
{{--                        Products--}}
{{--                    </a>--}}
{{--                </li>--}}
{{--                <li class="visually-hidden">--}}
{{--                    <a href="#" class="nav-link link-dark">--}}
{{--                        <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg>--}}
{{--                        Customers--}}
{{--                    </a>--}}
{{--                </li>--}}
{{--            </ul>--}}
{{--            <hr>--}}
{{--            <div class="dropdown visually-hidden">--}}
{{--                <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">--}}
{{--                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">--}}
{{--                    <strong>mdo</strong>--}}
{{--                </a>--}}
{{--                <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">--}}
{{--                    <li><a class="dropdown-item" href="#">New project...</a></li>--}}
{{--                    <li><a class="dropdown-item" href="#">Settings</a></li>--}}
{{--                    <li><a class="dropdown-item" href="#">Profile</a></li>--}}
{{--                    <li><hr class="dropdown-divider"></li>--}}
{{--                    <li><a class="dropdown-item" href="#">Sign out</a></li>--}}
{{--                </ul>--}}
{{--            </div>--}}
{{--        </div>--}}


        {{--    Form    --}}
{{--        <div class="col mt-5 ms-5">--}}
{{--            <form action="">--}}
{{--                  Name, National ID, Grade, Classroom, Address, Photo, Generate an ID      --}}
{{--                <h3>Add student</h3>--}}
{{--                <div class="row">--}}
{{--                    <input type="text" placeholder="Name" name="Name" class="w-25 form-control">--}}
{{--                </div>--}}
{{--                <div class="row mt-3">--}}
{{--                    <input type="text" placeholder="Address" name="Address" class="w-25 form-control">--}}
{{--                </div>--}}

{{--                <div class="row mt-3">--}}
{{--                    <input type="text" placeholder="National ID" name="NatID" class="w-25 form-control">--}}
{{--                </div>--}}

{{--                <div class="row mt-3">--}}
{{--                    <input type="text" placeholder="Grade" name="grade" class="w-25 form-control">--}}
{{--                </div>--}}

{{--                <div class="row mt-3">--}}
{{--                    <input type="text" placeholder="Classroom" name="c_room" class="w-25 form-control">--}}
{{--                </div>--}}

{{--                <div class="row mt-3">--}}
{{--                    <label>Photo: </label> <input type="file" name="file">--}}
{{--                </div>--}}
{{--                <div class="row mt-4">--}}
{{--                    <div class="col">--}}
{{--                        <button type="submit" class="btn btn-primary">Submit</button>--}}
{{--                    </div>--}}
{{--                </div>--}}

{{--            </form>--}}
{{--        </div>--}}




{{--    </div>--}}

{{--</div>--}}


<script src="{{ asset('js/app.js') }}" defer></script>

</body>
</html>
