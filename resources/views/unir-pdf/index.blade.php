@extends('layouts.master')

@section('content')
<div>
    <div class="nav">
        <li>
            <p id="item-1" class="nav-item active text-dark">
                Suvir PDF
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#000000">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
            </p>

        </li>
        <li>
            <p id="item-2" class="nav-item text-dark">
                Ordenar 
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#000000">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
            </p>
        </li>
        <li>
            <p id="item-3" class="nav-item text-dark">
                Descargar 
                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#000000">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
                </p>
        </li>
        <li class="last">
        </li>
    </div>

    <div id="container-1" class="my-container">
        <form id="form-files" action="{{route("merge")}}" enctype="multipart/form-data" method="POST">
            @csrf
            <h4 class="text-center py-5">Suvir archivos</h4>
            <div id="drop-area" class="drop-area">
                <h4 id="drop-title">Arastra y suelta los archivos</h4>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="100px" fill="#6990f2"><path d="M250-160q-86 0-148-62T40-370q0-78 49.5-137.5T217-579q20-97 94-158.5T482-799q113 0 189.5 81.5T748-522v24q72-2 122 46.5T920-329q0 69-50 119t-119 50H510q-24 0-42-18t-18-42v-258l-83 83-43-43 156-156 156 156-43 43-83-83v258h241q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-89-60.5-153T478-739q-89 0-150 64t-61 153h-19q-62 0-105 43.5T100-371q0 62 43.93 106.5T250-220h140v60H250Zm230-290Z"/></svg>
                </div>
                <h6 id="btn-suvir" class="btn-suvir">O has click aquí</h6>
                <input id="input-files" hidden name="files[]" type="file" accept=".pdf" multiple>
            </div>
        </form>
    </div>
    <div id="container-2" class="my-container d-none">
        <div class="d-flex justify-content-end align-items-center pe-4 py-5 gap-4">
            <h3 id="div-loading" class="text-danger d-none">Cargando...</h3>
            <button id="btn-add-pdf" class="btn d-flex align-items-center justify-content-center p-0 border border-warning">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FF0000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </button>
            <button class="btn btn-warning text-black fw-bold" id="btn-unir-pdf">Unir PDF</button>
        </div>

        <div id="container-pdf" class="d-flex gap-3 justify-content-center flex-wrap">

        </div>

        <input id="input-add-files" hidden name="files[]" type="file" accept=".pdf" multiple>
    </div>
    <div id="container-3" class="my-container d-none">
        <div class="d-flex justify-content-end align-items-center pe-4 py-5 gap-4">
        <a id="btn-download"><button class="btn btn-warning text-black fw-bold">Descargar</button></a>
        </div>
        <div class="d-flex justify-content-center">
            <iframe width="600" id="frame-pdf" frameborder="0"></iframe>
        </div>
    </div>

    
</div>

@endsection
