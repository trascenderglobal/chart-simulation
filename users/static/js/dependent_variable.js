var i = 0;

function increase(){ 
   if(i < 5){
    i = i + 1; 
    let cant = document.getElementById("quantity"); 
    cant.value = i;
    let container = document.getElementById("cont5")
    let createDiv = document.createElement("div")
    createDiv.id = `divInterno`
    let index = document.createElement('div')
    let contentIndex = document.createTextNode(cant.value + "."); 
    let contentInput1 = document.createElement('input')
    contentInput1.type = 'text'
    contentInput1.id = 'var_dependent'+ cant.value
    contentInput1.className = 'input_content'
    contentInput1.setAttribute("placeholder", "Variable Name")
    let contentInput = document.createElement('input')
    contentInput.type = 'text'
    contentInput.id = 'eq'+cant.value
    contentInput.className = 'input_content'
    contentInput.setAttribute("placeholder", "Introduce fórmulas")
    container.appendChild(createDiv)
    createDiv.appendChild(index)
    createDiv.appendChild(contentInput1)
    createDiv.appendChild(contentInput)
    index.appendChild(contentIndex)
    document.querySelector('#select-dependent-variable').setAttribute('placeholder','$awsdasd');
   }
}
function decrease(){ 
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

function save_vars_dependents(){

    var match = /[A-Za-z]+/g
    var vars_dependents = []
    var vars_array = []
    var form = ''
    var vars = JSON.parse(sessionStorage.getItem('vars'))    
    var data_points = JSON.parse(sessionStorage.getItem('data_points'))
    var matrix = JSON.parse(sessionStorage.getItem('matrix'))
    var aux_matrix = JSON.parse(sessionStorage.getItem('matrix'))
    var operations = []
    var array_relations = {}
    var array_rel_var = {}

    for(var x=1; x<=i; x++){

        vars_dependents.push([$('#var_dependent'+x).val() , $('#eq'+x).val()])    
        vars.push($('#var_dependent'+x).val())           
        vars_array = $('#eq'+x).val().match(match)
        var match_result =  /[^\[|\]]+/g
        var match_eval = /[^\"]+/g

        for(var index_dp in data_points){   

            form = $('#eq'+x).val()
                         
            for(var index_vars in vars_array){      
                        
                form = form.replace(new RegExp(vars_array[index_vars],'gi'),matrix[vars_array[index_vars]][data_points[index_dp]])                
                                          
            }

            form += '-x'  
            operations.push([$('#var_dependent'+x).val(),form,data_points[index_dp]])              
                        
        } 
    }
    for(var index_var in vars){        

        for(var index_dependent in vars_dependents){

            vars_form = vars_dependents[index_dependent][1].match(match)
            console.log(vars_form)
            exist = vars_form.indexOf(vars[index_var]) 
            
            if(exist > -1){           
                array_rel_var[vars_dependents[index_dependent][0]] = 1   
            }else{
                array_rel_var[vars_dependents[index_dependent][0]] = 0      
            }
        }

        array_relations[vars[index_var]] = array_rel_var
        array_rel_var = {}    

    }
    
    $.ajax({
        type: 'GET',
        url: '/api/solve_equation',
        data: {
            'operations' : JSON.stringify(operations),
            'matrix' : JSON.stringify(matrix),
            'number_dp' : data_points.length
        },
        dataType: 'json',
        success: function (data) {
            console.log(data.matrix)

            matrix = data.matrix
            for(var index_vars in vars_dependents){
                for(var index in matrix[vars_dependents[index_vars][0]]){
                    matrix[vars_dependents[index_vars][0]][index] = eval(matrix[vars_dependents[index_vars][0]][index].match(match_result)[0])
                }
            }
            
            aux_matrix = matrix
            console.log(JSON.stringify(array_relations))
            sessionStorage.setItem('vars',JSON.stringify(vars))
            sessionStorage.setItem('array_relations',JSON.stringify(array_relations))
            sessionStorage.setItem('vars_dependents',JSON.stringify(vars_dependents))
            sessionStorage.setItem('matrix',JSON.stringify(matrix))
            sessionStorage.setItem('aux_matrix',JSON.stringify(aux_matrix))
            window.location = 'http://localhost:8000/api/upload_new_data/'
        }
    });    
    
}