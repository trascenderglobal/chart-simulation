var i = 0; 
var colors = [
    'rgb(31,73,125)',
    'rgb(192,80,77)',
    'rgb(155,187,89)',
    'rgb(128,100,162)',
    'rgb(75,192,178 )',
    'rgb(247,150,70)',
    'rgb(64,64,64)',
    'rgb(128,128,128)',
    'rgb(79,129,189)',
    'rgb(255,255,0)',
    'rgb(148,138,84)',
    'rgb(29,27,16)'
]
// In the "dependent variable" view it displays the options when creating a new one
function countermore(){ 
   if(i < 5){
    i = i + 1; 
    let cant = document.getElementById("quantity"); 
    cant.value = i;
    let container = document.getElementById("cont5")
    let createDiv = document.createElement("div")
    createDiv.id = `divInterno`
    let select = document.createElement('select')
    let option = document.createElement('option')
    let option2 = document.createElement('option')
    let placeholder = document.createElement('option')
    let index = document.createElement('div')
    let contentIndex = document.createTextNode(cant.value + "."); 
    let contentInput = document.createElement('input')
    let contentInput2 = document.createElement('input')
    contentInput.type = 'text'
    contentInput2.type = 'text'
    contentInput.id = 'chart' + cant.value
    contentInput2.id = 'title-chart' + cant.value
    contentInput.className = 'input_content'
    contentInput2.className = 'title-chart'
    contentInput.setAttribute("placeholder", "Introduce Variables")
    contentInput2.setAttribute("placeholder", "Title of the graph")
    placeholder.setAttribute('disabled','disabled')
    placeholder.setAttribute('selected','selected')
    select.id = "select-dependent-variable" + cant.value
    option.text = "bar";
    placeholder.text = "Type of chart";
    option.value = "bar";
    option2.text = 'line'
    option2.value = 'line'
    container.appendChild(createDiv)
    createDiv.appendChild(index)
    createDiv.appendChild(select)
    createDiv.appendChild(contentInput)
    createDiv.appendChild(contentInput2)
    index.appendChild(contentIndex)
    select.appendChild(placeholder)
    select.appendChild(option)
    select.appendChild(option2)
    document.querySelector('#select-dependent-variable' + cant.value).setAttribute('placeholder','$awsdasd');
   }
}
// In the "dependent variable" view it deletes an already created variable
function counterless(){ 
    if(i>0){
        i = i - 1; 
        var cant = document.getElementById("quantity"); 
        cant.value = i;
        var element = document.getElementById('cont5');
        if(element.hasChildNodes()){
            element.removeChild(element.lastChild);
        }
    }
}

function get_colors(i){
    return colors[i]
}

function save_charts(){
    var charts = []
    var colors = []
    var number_vars = 0
    var cont = 0
    for(var x=1; x<=i; x++){
        number_vars = $('#chart'+x).val().split(',').length
        title = $('#title-chart'+x).val().length
        for(var y=0; y<number_vars; y++){
            colors.push(get_colors(cont))
            cont++
        }
        charts.push([ $('#select-dependent-variable'+x).val() , $('#chart'+x).val(), $('#title-chart'+x).val(), colors])
        colors = []
    }
    
    console.log(charts)
    sessionStorage.setItem('charts',JSON.stringify(charts))
    window.location = 'https://chart-simulation.herokuapp.com/api/upload_new_data/'
}