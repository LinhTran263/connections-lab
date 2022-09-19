window.addEventListener('load', ()=>{

    let button = document.getElementById('enter');
    button.addEventListener('click',()=>{
        let inputBox1 = document.getElementById("input_box1").value;
        let inputBox2 = document.getElementById("input_box2").value;
        console.log(inputBox1);
        console.log(inputBox2);

        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': '44bf61127cmsh02e181e7fe4cefap17dba7jsn75daeac38e78',
                'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
            }
        };
        
        fetch('https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign='+inputBox1+'&day='+inputBox2, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .then(data => {
            console.log(data);
            console.log(data.color);
            
            let color = document.getElementById('pcolor');
            color.innerHTML = data.color;
            console.log(color.innerHTML);

            let compat = document.getElementById('pcompatibility');
            compat.innerHTML = data.compatibility;
            console.log(compat.innerHTML);

            let current = document.getElementById('pcurrent_date');
            current.innerHTML = data.current_date;

            let range = document.getElementById('pdate_range');
            range.innerHTML = data.date_range;

            let desc = document.getElementById('pdescription');
            desc.innerHTML = data.description;

            let lucky = document.getElementById('plucky_number');
            lucky.innerHTML = data.lucky_number;

            let luck_time = document.getElementById('plucky_time');
            luck_time.innerHTML = data.lucky_time;

            let moodd = document.getElementById('pmood');
            moodd.innerHTML = data.mood;
            })
            .catch(err => console.error(err));
        })
})

    // .finally(function(){
    //     console.log("run")
    // })

