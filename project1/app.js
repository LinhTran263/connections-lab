let arrayStar = ["virgo","gemini","capricorn","aries","sagittarius","libra","scorpio","taurus","pisces","leo","cancer", "aquarius"];
let starCoord_x = [];
let starCoord_y = [];
let tagName = ['pdescription','pcurrent_date','pdate_range','pcolor','pcompatibility','plucky_number','plucky_time','pmood']
let tagString = ["Description: ","Current Date: ","Date Range: ","Color: ","Compatibility: ","Lucky Number: ","Lucky Time: ","Mood: "]
let scene = document.getElementById("scene1");
let inputBox1, inputBox2;


//take random coordinates of constellation and avoid overlay
function constellation (star){
    let scene = document.getElementById("scene1");
    let x = Math.floor(Math.random()*(scene.clientWidth-document.getElementById(star).clientWidth));
    let y = Math.floor(Math.random()*(scene.clientHeight-document.getElementById(star).clientHeight- 400));

    let distance = 450;
    do {
      x = Math.floor(Math.random()*(scene.clientWidth-document.getElementById(star).clientWidth));
      y = Math.floor(Math.random()*(scene.clientHeight-document.getElementById(star).clientHeight- 400));
      for(let i =0;i<starCoord_x.length;i++) {
        distance = Math.sqrt((x-starCoord_x[i])*(x-starCoord_x[i]) + (y-starCoord_y[i])*(y-starCoord_y[i]));
        console.log(distance);
        if(distance < 400) break;  
      }
    }
    while(distance < 400);

    starCoord_x.push(x);
    starCoord_y.push(y);
    document.getElementById(star).style.left = x + 'px';
    document.getElementById(star).style.top = y + 'px';
}

//create background with stars
function stars(){
    let count = 1000;
    let scene = document.getElementById("scene1");
    console.log(scene);
    let i=0;
    while (i<count){
        let star = document.createElement("i");
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



window.addEventListener('load', ()=>{
    console.log('loaded');
    stars();
    window.addEventListener('scroll', ()=>{
        console.log(window.scrollY)
    })

    //call the function to display constellations
    for (let i = 0; i< arrayStar.length; i++) {
      constellation(arrayStar[i]); 
    }

    //using data after clicking the enter button
    let button = document.getElementById('enter');
    button.addEventListener('click',()=>{
        inputBox1 = document.getElementById("zodiac-select").value;
        inputBox2 = document.getElementById("day-select").value;
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
            let dataName = [data.description,data.current_date,data.date_range,data.color,data.compatibility,data.lucky_number,data.lucky_time,data.mood];
            console.log(data);

            //add infomation to display while hovering, unable to make it outside since data cannot be retrieve.
            function addInfo(zodiac){
                let newDiv = document.createElement("div");
                newDiv.className = 'text-hover';
                newDiv.id = 'text-'+zodiac;
                newDiv.style.position = 'absolute';
                newDiv.style.background = 'white';
                newDiv.style.zIndex = '1000';
                newDiv.style.opacity = '0';
                for (let i =0; i<arrayStar.length; i++){
                    console.log("position: "+starCoord_x[i] + newDiv.clientWidth);
                    console.log("body: "+document.body.clientWidth)
                    if (inputBox1 == arrayStar[i]){
                        newDiv.style.left = (starCoord_x[i]-100) + 'px';
                        newDiv.style.top = (starCoord_y[i]+350)+'px';}
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
            document.getElementById(inputBox1).scrollIntoView({behavior: 'smooth'});

            //take data from API to display
            let color = document.getElementById('pcolor');
            color.innerHTML = "Color: "+ data.color;

            let compat = document.getElementById('pcompatibility');
            compat.innerHTML = "Compatibility: "+ data.compatibility;

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

            //when clicking anywhere on the screen the information box will disappear
            scene.addEventListener('click',()=>{
                    document.getElementById('text-info').style.opacity = '0';
                    console.log('screen clicked')
            })

            //move to the constellation when the zodiac sign is chosen
            document.body.onload = addInfo(inputBox1);

            //hovering the constellation to make it appear again
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


//drawing the moon
function setup() {
    let canvas = createCanvas(300,300);
    canvas.parent("moon1");
  }
  
function draw() {
  
    if (inputBox2 == "today"){
        noStroke();
        fill(230,230,180);
        ellipse(150,150,190,190);    
    }  

    else if (inputBox2 == "yesterday"){
        arc(150,150,190,190, radians(90), radians(270));
        noStroke();
        fill(230,230,180);    

        arc(150,150,190,190, radians(-90), radians(90));
        fill(0,26,51);    
    }

    else if (inputBox2 == "tomorrow"){
        arc(150,150,190,190, radians(90), radians(270));
        fill(0,26,51);   
        noStroke();

        arc(150,150,190,190, radians(-90), radians(90));
        fill(230,230,180);    
 

    }

    else {
        ellipse(150,150,190,190);    
        fill(0,26,51);
        noStroke();
    }    
  }
  