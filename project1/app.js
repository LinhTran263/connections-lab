window.addEventListener('load', ()=>{
    console.log('loaded');
    function stars(){
        let count = 1000;
        let scene = document.getElementById("scene1");
        console.log(scene);
        let i=0;
        while (i<count){
            let star = document.createElement("i");
            // console.log(star);
            let x = Math.floor(Math.random()*scene.clientWidth);
            let y = Math.floor(Math.random()*scene.clientHeight);
            let duration = Math.random()*10;
            let size = Math.random()*2;

            star.style.left = x + 'px';
            star.style.top = y + 'px';
            star.style.width = 1+size+'px';
            star.style.height = 1+size+'px';

            star.style.animationDuration = 5+duration+'s';
            star.style.animationDelay = duration+'s';

            scene.appendChild(star);
            i++;
        }
    }
    stars();

    let arrayStar = ["virgo","gemini","capricorn","aries","sagittarius","libra","scorpio","taurus","pisces","leo","cancer"];
    let starCoord_x = [];
    let starCoord_y = [];

    function constellation (star){
        let scene = document.getElementById("scene1");
        let overlap = false;
        // let x=0;
        // let y=0;
        let x = Math.floor(Math.random()*(scene.clientWidth-document.getElementById(star).clientWidth));
        let y = Math.floor(Math.random()*(scene.clientHeight-document.getElementById(star).clientHeight- 400));

        starCoord_x.push(x);
        starCoord_y.push(y);
        document.getElementById(star).style.left = x + 'px';
        document.getElementById(star).style.top = y + 'px';}
  
    
    for (let i = 0; i< arrayStar.length; i++) {
      constellation(arrayStar[i]); 
    }




    let button = document.getElementById('enter');
    button.addEventListener('click',()=>{
        let inputBox1 = document.getElementById("zodiac-select").value;
        let inputBox2 = document.getElementById("day-select").value;
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
        .then(data => {
            console.log(data);
            // console.log(data.color);
            document.getElementById(inputBox1).scrollIntoView({behavior: 'smooth'});
            let dataName = [data.description,data.current_date,data.date_range,data.color,data.compatibility,data.lucky_number,data.lucky_time,data.mood];
            let tagName = ['pdescription','pcurrent_date','pdate_range','pcolor','pcompatibility','plucky_number','plucky_time','pmood']
            let tagString = ["Description: ","Current Date: ","Date Range: ","Color: ","Compatibility: ","Lucky Number: ","Lucky Time: ","Mood: "]

            
            function addInfo(zodiac){
                let newDiv = document.createElement("div");
                newDiv.className = 'text-hover';
                newDiv.id = 'text-'+zodiac;
                newDiv.style.position = 'absolute';
                newDiv.style.background = 'white';
                newDiv.style.zIndex = '1000';
                newDiv.style.opacity = '0';
                for (let i =0; i<arrayStar.length; i++){
                    if (inputBox1 == arrayStar[i]){
                        newDiv.style.left = starCoord_x[i] + 'px';
                        newDiv.style.top = (starCoord_y[i]+400)+'px';
                    }
                }
                document.body.appendChild(newDiv);
                for (let i = 0; i <tagName.length; i++){
                    let newPara = document.createElement('p');
                    newPara.id = tagName[i];
                    newPara.innerHTML = tagString[i] + dataName[i];
                    newDiv.appendChild(newPara);
                }
                console.log("div created")
            }
        
            
            let color = document.getElementById('pcolor');
            color.innerHTML = "Color: "+ data.color;
            // console.log(color.innerHTML);

            let compat = document.getElementById('pcompatibility');
            compat.innerHTML = "Compatibility: "+ data.compatibility;
            // console.log(compat.innerHTML);

            let current = document.getElementById('pcurrent_date');
            current.innerHTML = "Current Date: "+ data.current_date;

            let range = document.getElementById('pdate_range');
            range.innerHTML = "Date Range: " + data.date_range;

            let desc = document.getElementById('pdescription');
            desc.innerHTML =  data.description;

            let lucky = document.getElementById('plucky_number');
            lucky.innerHTML = "Lucky Number: " + data.lucky_number;

            let luck_time = document.getElementById('plucky_time');
            luck_time.innerHTML = "Lucky Time: " + data.lucky_time;

            let moodd = document.getElementById('pmood');
            moodd.innerHTML = "Mood: " + data.mood;

            document.getElementById('text-info').style.opacity = '1';

            let scene = document.getElementById("scene1");
            // let text_box = document.getElementsByClassName('text');
            scene.addEventListener('click',()=>{
                    document.getElementById('text-info').style.opacity = '0';
                    console.log('screen clicked')
            })

            document.body.onload = addInfo(inputBox1);

            function hovering(zodiac) {
                document.getElementById(zodiac).addEventListener('mouseenter',()=>{
                    document.getElementById("text-"+zodiac).style.opacity = '1';
                    document.getElementById("text-info").style.opacity = '0';
                })
                document.getElementById(zodiac).addEventListener('mouseleave',()=>{
                    document.getElementById("text-"+zodiac).style.opacity = '0';
                })
            }

            for (let i=0; i<arrayStar.length;i++){
                hovering(arrayStar[i]);
            }

            })
        .catch(err => console.error(err));


    console.log('finished');
})});