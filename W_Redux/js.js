

document.getElementById('button1').addEventListener(
    'click',getText
);




function getText(){
    fetch('customers.json').then(function(res){
        return res.json();
    }).then(
        function(data){

             const customers = data.map(function(d){
                document.getElementById('customers').innerHTML=
                `<ul>
                    <li>${d.company}</li>
                    <li>${d.name}</li>
                    <li>${d.phone}</li>
                </ul>
                `

            }) 
        }
    )
}


//http://localhost:8000/contacts