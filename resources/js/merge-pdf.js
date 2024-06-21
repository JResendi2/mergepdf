import jQuery from 'jquery';

document.addEventListener("DOMContentLoaded", () => {



    window.$ = jQuery;
    let array_order_PDFs = [];
    let num_files = 0;
    let last_position = 0;
    let section = "upload-pdf";

    const dropArea = $('#drop-area').get(0);
    const $fileMerge = $('#input-files');
    const $btnUnirPdf = $('#btn-unir-pdf');
    const $formFiles = $('#form-files');
    const $dropTitle = $('#drop-title');

    const $btnAddPdf = $('#btn-add-pdf');
    const $fileAdd = $('#input-add-files');

    const $contanier_1 = $('#container-1');
    const $contanier_2 = $('#container-2');
    const $contanier_3 = $('#container-3');

    const $item_1 = $('#item-1');
    const $item_2 = $('#item-2');
    const $item_3 = $('#item-3');

    const $framePdf = $('#frame-pdf');
    const $btnDownload = $('#btn-download');

    const $pdfContainer = $('#container-pdf');
    let position = parseInt(0);
    let aux_pdf = parseInt(0);

    let dataTransfer = new DataTransfer();


    $item_1.click((e) => {
        if (section === "upload-pdf") {
            $fileMerge.get(0).click();
        } else if (section === "order-pdf") {
            $contanier_1.removeClass("d-none");
            $contanier_2.addClass("d-none");
            $item_1.addClass("active");
            $item_2.removeClass("active");
            section = "upload-pdf";
        } else if (section === "download-pdf") {
            $contanier_3.addClass("d-none");
            $contanier_1.removeClass("d-none");
            $item_3.removeClass("active");
            $item_1.addClass("active");
            section = "upload-pdf";
        }
    });
    $item_2.click((e) => {
        if (section === "upload-pdf") {
            dropArea.classList.add("drop-area-animation");
            dropArea.addEventListener('transitionend', function() {
                dropArea.classList.remove('drop-area-animation');
              }, { once: true });
        } else if (section === "download-pdf") {
            $contanier_3.addClass("d-none");
            $contanier_2.removeClass("d-none");
            $item_3.removeClass("active");
            $item_2.addClass("active");
            section = "order-pdf";
        }
    });
    $item_3.click((e) => {
        if (section === "upload-pdf") {
            dropArea.classList.add("drop-area-animation");
            dropArea.addEventListener('transitionend', function() {
                dropArea.classList.remove('drop-area-animation');
              }, { once: true });
        } else if (section === "download-pdf") {
            $btnDownload.get(0).click();
        }
    });

    dropArea.addEventListener("click", () => $fileMerge.get(0).click());

    $btnAddPdf.click((e) => {
        e.preventDefault();
        $fileAdd.get(0).click();
    });

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        $dropTitle.get(0).innerHTML = "Suelta para suvir los archivos";
        dropArea.classList.add("drop-area-active");
    })

    dropArea.addEventListener("dragleave", (e) => {
        e.preventDefault();
        $dropTitle.get(0).innerHTML = "Arastra y suelta los archivos";
        dropArea.classList.remove("drop-area-active");

    })

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        let files = e.dataTransfer.files;
        showFiles(files);
        $dropTitle.get(0).innerHTML = "Arastra y suelta los archivos";
        dropArea.classList.remove("drop-area-active");
    })

    /* Seleccionar e importar los archivos pdf*/
    $fileMerge.change(function () {
        const files = this.files;
        last_position = 0;
        num_files = files.length;
        array_order_PDFs = [];
        dataTransfer = new DataTransfer();
        $pdfContainer.html("");

        Array.from(files).forEach((file) => {
            dataTransfer.items.add(file);
        });

        showFiles(files);
    });

    /* Agregar mas archivos */
    $fileAdd.change(function () {
        const files = this.files;

        Array.from(files).forEach((file) => {
            dataTransfer.items.add(file);
        });
        num_files += files.length;
        appendPdf(files);
    });

    /* Mostrar los primeros archivos */
    function showFiles(files) {
        console.log('Numero de archivos .pdf seleccionados: ' + num_files);
        if (num_files == 1) {
            alert("Selecciona más de un archivo");
        } else if (num_files > 1) {
            orderFiles(files);
        }
    }


    $btnUnirPdf.click(() => {
        $fileMerge.get(0).files = dataTransfer.files;
        let campos = new FormData($formFiles.get(0));
        if (num_files === 1) {
            alert("Selecciona más de un archivo");
            return;
        }

        console.log('Union del pdf en proceso');
        array_order_PDFs.forEach((i) => {
            campos.append('order[]', i);
        });
        $("#div-loading").removeClass("d-none");
        fetch(
            $formFiles.attr("action"),
            {
                method: $formFiles.attr("method"),
                body: campos
            }
        )

            .then((response) => response.json())
            .then((filename) => {
                fetch(route("get-pdf", filename))
                .then(file => {
                        console.log(file.url);
                        $framePdf.attr("src", file.url + "#toolbar=0");
                        $btnDownload.attr("href", route("download-pdf", filename));
                        $contanier_2.addClass("d-none");
                        $contanier_3.removeClass("d-none");
                        $item_2.removeClass("active");
                        $item_3.addClass("active");
                        section = "download-pdf";
                        $("#div-loading").addClass("d-none");
                    })
                    .catch(error => {
                        console.error('Hubo un problema con la petición Fetch:', error);
                    });
            })
            .catch(error => {
                console.error('Hubo un problema con la petición Fetch:', error);
            });
    });

    /* Visualizacion de la seccion para ordenar los pdf */
    function orderFiles(files) {
        appendPdf(files);
        $contanier_1.addClass("d-none");
        $contanier_2.removeClass("d-none");
        $item_1.removeClass("active");
        $item_2.addClass("active");
        section = "order-pdf";
        console.log('Visualizacion correcta del modal para ordenar archivos pdf');
    }

    /* Funcion para agregar pdfs a la seccion de ordenar los pdfs*/
    function appendPdf(files) {
        Array.from(files).forEach((file) => {
            let div_pdf = '<div id="pdf-' + last_position + '">';
            div_pdf += '<div class="border-solid border border-primary p-3 rounded position-relative d-flex flex-column align-items-center" style="background-color: #b8d4fe">';
            div_pdf += '<button class="btn btn-close d-flex align-items-center justify-content-center p-0 me-1  border border-primary btn-pdf-delete position-absolute top-0 end-0 bg-white" style="opacity: 1; width:25px; height: 25px; border-radius: 50px; font-size:12px" data-pdf-id="' + last_position + '">';
            div_pdf += '</button>';
            div_pdf +=
                '<p class="text-center fw-bold" style="width:120px; font-size:12px; white-space: nowrap; overflow: hidden;  text-overflow: ellipsis;">' +
                file.name +
                '</p>';
            div_pdf += '<div class="border rounded p-2 shadow-sm bg-white" style="width:150px; height: 200px;">';
            div_pdf += '<div class="text-center img-fluid">';
            div_pdf +=
                '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed">';
            div_pdf +=
                '<path d="M338.54-433.78h39.05v-83.76h46.48q16.29 0 28.16-11.5 11.88-11.5 11.88-27.55v-45.71q0-16.3-11.88-28.17-11.87-11.88-28.16-11.88h-85.53v208.57Zm39.05-122.81v-45.71h46.48v45.71h-46.48Zm128.08 122.81h83.94q16.35 0 28.49-11.23 12.14-11.22 12.14-27.82V-602.3q0-16.3-12.28-28.17-12.28-11.88-27.88-11.88h-84.41v208.57Zm39.05-39.05V-602.3h45.48v129.47h-45.48ZM676-433.78h39.04v-83.76h47.2v-39.05h-47.2v-45.71h47.2v-40.05H676v208.57ZM269.78-187.39q-31.05 0-54.17-23.45-23.13-23.44-23.13-53.86v-558.73q0-30.51 23.13-54.03 23.12-23.52 54.17-23.52h558.74q30.51 0 53.91 23.52 23.4 23.52 23.4 54.03v558.73q0 30.42-23.4 53.86-23.4 23.45-53.91 23.45H269.78Zm0-77.31h558.74v-558.73H269.78v558.73ZM132.48-50.09q-31.15 0-54.23-23.39-23.08-23.4-23.08-53.91v-636.04h77.31v636.04h636.04v77.3H132.48Zm137.3-773.34v558.73-558.73Z" /></svg>';
            div_pdf += '</div>';
            div_pdf += '</div>';
            div_pdf += '</div>';
            div_pdf += '<p class="m-0 text-center" style="font-size:12px">Cambiar de posición</p>';
            div_pdf += '<div class="w-100 d-flex justify-content-around pb-1">';
            div_pdf +=
                '<button class="btn fw-bold btn-pdf-prev pdf-' +
                last_position +
                ' rounded bg-success" data-pdf-id="' +
                last_position +
                '" data-container="pdf-' +
                last_position +
                '" style="border:height: 30px; padding: 0 10px"><<</button>';
            div_pdf +=
                '<button class="btn fw-bold btn-pdf-next rounded bg-success" data-pdf-id="' +
                last_position +
                '" data-container="pdf-' +
                last_position +
                '" style="border:height: 30px; padding: 0 10px">>></button>';
            div_pdf += '</div>';
            div_pdf += '</div>';

            $pdfContainer.append(div_pdf);
            array_order_PDFs.push(last_position);

            $('.btn-pdf-next')[last_position].addEventListener("click", pdfNext);
            $('.btn-pdf-prev')[last_position].addEventListener("click", pdfPrev);
            $('.btn-pdf-delete')[last_position].addEventListener("click", deletePDF);
            last_position++;
        });

        if (array_order_PDFs.length < 2) {
            $('.btn-pdf-delete').addClass("d-none");
        } else {
            $('.btn-pdf-delete').removeClass("d-none");
        }
    }


    // Mover un pdf a la derecha
    function pdfNext(e) {

        const btn = e.target;
        const id = btn.getAttribute('data-pdf-id');
        position = array_order_PDFs.indexOf(parseInt(id)); // Buscar la posicion dentro del arreglo

        if (position < num_files - 1) {
            const next_id = array_order_PDFs[position + 1];
            const currentPDF_id = '#pdf-' + id;
            const nextPDF_id = '#pdf-' + next_id;

            let currentPDF = $(currentPDF_id); // almacenar el contenido del pdf actual
            let nextPDF = $(nextPDF_id); // obtener el contenido del siguiente pdf

            /* Cambiar posiciones */
            aux_pdf = currentPDF.html();
            currentPDF.html(nextPDF.html());
            nextPDF.html(aux_pdf);

            currentPDF.attr('id', 'pdf-' + next_id);
            nextPDF.attr('id', 'pdf-' + id);

            array_order_PDFs[position] = next_id;
            array_order_PDFs[position + 1] = parseInt(id);

            $(currentPDF_id + ' .btn-pdf-next').click(pdfNext);
            $(currentPDF_id + ' .btn-pdf-prev').click(pdfPrev);
            $(currentPDF_id + ' .btn-pdf-delete').click(deletePDF);
            $(nextPDF_id + ' .btn-pdf-next').click(pdfNext);
            $(nextPDF_id + ' .btn-pdf-prev').click(pdfPrev);
            $(nextPDF_id + ' .btn-pdf-delete').click(deletePDF);
        }
        console.log(array_order_PDFs);

    }

    // Mover un pdf a la izquierda
    function pdfPrev(e) {
        const btn = e.target;
        const id = btn.getAttribute('data-pdf-id');
        position = array_order_PDFs.indexOf(parseInt(id)); // Buscar la posicion dentro del arreglo

        if (position > 0) {
            const prev_id = array_order_PDFs[position - 1];
            const currentPDF_id = '#pdf-' + id;
            const prevPDF_id = '#pdf-' + prev_id;

            let currentPDF = $(currentPDF_id); // almacenar el contenido del pdf actual
            let prevPDF = $(prevPDF_id); // obtener el contenido del anterior pdf

            /* Cambiar posiciones */
            aux_pdf = currentPDF.html();
            currentPDF.html(prevPDF.html());
            prevPDF.html(aux_pdf);

            currentPDF.attr('id', 'pdf-' + prev_id);
            prevPDF.attr('id', 'pdf-' + id);

            array_order_PDFs[position] = prev_id;
            array_order_PDFs[position - 1] = parseInt(id);

            $(currentPDF_id + ' .btn-pdf-next').click(pdfNext);
            $(currentPDF_id + ' .btn-pdf-prev').click(pdfPrev);
            $(currentPDF_id + ' .btn-pdf-delete').click(deletePDF);
            $(prevPDF_id + ' .btn-pdf-next').click(pdfNext);
            $(prevPDF_id + ' .btn-pdf-prev').click(pdfPrev);
            $(prevPDF_id + ' .btn-pdf-delete').click(deletePDF);
        }
    }

    // Evento para eliminar un pdf
    function deletePDF(e) {
        const btn = e.target;
        let pdf_id = btn.getAttribute('data-pdf-id');
        let pdf = btn.parentNode.parentNode;
        let position = array_order_PDFs.indexOf(parseInt(pdf_id));
        pdf.style.display = 'none';
        array_order_PDFs.splice(position, 1);
        num_files--;
        if (array_order_PDFs.length < 2) {
            $('.btn-pdf-delete').addClass("d-none");
        }
    }

})

