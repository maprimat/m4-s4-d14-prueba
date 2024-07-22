function cargarGrafico(datos = [], name) {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadísticas de ${name}`,
            fontFamily: "Bangers"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: datos
        }]
    });
    chart.render();
};

function obtenerData(id) {
    let url = "https://www.superheroapi.com/api.php/4905856019427443/" + id;

    $.ajax(url)
        .done(function (datos) {
            let { powerstats } = datos;
            let dataPoints = [];
            for (const [key, value] of Object.entries(powerstats)) {
                //{label: "texto", y: 50}
                let dato = {
                    label: key,
                    y: value
                }

                dataPoints.push(dato);
            }
            cargarGrafico(dataPoints, datos.name);
            cargarCard(datos);
        })
        .fail(function () {
            alert("error");
        })
}

$("form").on("submit", function (event) {

    event.preventDefault();
    const id = $("#formSuperhero").val()
    if (isNaN(id) || id < 1 || id > 732) {
        alert("¡Ingresa un número que esté entre 1 y 732!")
    }
    else {
        obtenerData(id);
    }

});

function cargarCard(superhero) {
    $("#cardContainer").html(
        `<div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${superhero.image.url}" class="img-fluid rounded-start h-100 object-fit-cover" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title pt-2 text-danger">${superhero.name}</h4>
                        <h6 class="card-subtitle pb-4 text-danger-emphasis">${superhero.biography["full-name"]}</h6>
                        <p class="mb-1">Género: <span class="text-body-secondary">${superhero.appearance["gender"]}</span></p>
                        <p class="mb-1">Ocupación: <span class="text-body-secondary">${superhero.work["occupation"]}</span></p>
                        <p class="mb-1">Primera aparición: <span class="text-body-secondary">${superhero.biography["first-appearance"]}</span></p>
                        <p class="mb-4">Editorial: <span class="text-body-secondary">${superhero.biography["publisher"]}</span></p>
                        <p class="small"><small class="text-secondary">Actualizado por última vez hace 5 minutos</small></p>
                    </div>
                </div>
            </div>
        </div>`
    )
}



