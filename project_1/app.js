window.addEventListener('load', ()=>{
    let inputBox1 = document.getElementById("input_box1");

    inputBox1.addEventListener('change', (e)=>{
        let star = e.target.value;
        console.log(star);
        let inputBox2 = document.getElementById("input_box2")
        inputBox2.addEventListener('change', (v)=>{
            let day = v.target.value;
            console.log(day);

            const options = {
                method: 'POST',
                headers: {
                    'X-RapidAPI-Key': '44bf61127cmsh02e181e7fe4cefap17dba7jsn75daeac38e78',
                    'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
                }
            };
            
            fetch('https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign='+star+'&day='+day, options)
                .then(response => response.json())
                .then(response => console.log(response))
                .then(data, ()=>{
                    console.log(data)
                })
                .catch(err => console.error(err));
            })
    })
})

    // .finally(function(){
    //     console.log("run")
    // })

