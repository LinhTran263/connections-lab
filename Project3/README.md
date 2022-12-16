# Building the town. Send your messages.

## Idea
I want this to be a place people can interact in a more visualized zone rather than a simple 2D UI. My intinital idea was having a 3 dimensional town that people can walk around and send mails to the house they wanted. However, since the implementation is quite difficult, I changed it so that every house represents every users and they can send the messages to everyone in the community. In other words, everyone that visits the website can read the motivational quotes/a wish/ anything from strangers. By this, I want to create a community sense on the internet without people actually talking to each other.

## Implementation
My application contains 3 main page: The welcome page, the building page and the 3D town.

### The welcome page
The welcome page simply contains 2 buttons. One button will lead the users to the main town if they do not want to create a new house. Another button will lead to a page that allow the users to build their house that can appear in the town later on.

#### Code Snippet
Below is the code snippets for the design and interactivity of the page. Basically, there are two button. After the event clicking, the page will load to the desired page.
```
    <div class="buttons">
        <button id="house">Make your house.</button>
        <button id="town">Visit the town.</button>    
    </div>

    <script type="text/javascript">
        document.getElementById("house").onclick = function () {
            location.href = "building/index.html";
        };
        document.getElementById("town").onclick = function () {
            location.href = "building/public/index.html";
        };

    </script>
```

For the design of the page, I used the tag ```marquee``` to have a cloud-like shape html element.

```
    <div id="my-clouds">
        <marquee behavior="scroll" direction="right" scrollamount="15">
            <i class="fa fa-cloud" style="color:white;font-size:40px"></i>
        </marquee>
        <marquee behavior="scroll" direction="left" scrollamount="10">
            <i class="fa fa-cloud" style="color:white;font-size:60px"></i>
        </marquee>
        <marquee behavior="scroll" direction="right" scrollamount="5">
            <i class="fa fa-cloud" style="color:white;font-size:90px"></i>
        </marquee>
    </div> 
```
#### Illustration
<img src="welcome.PNG">

### The building page
This page is using the cooperation of the database and input boxes from html. To allow the users with the most freedom of their buildings, users are allowed to choose which house they wanted. Most of the option is the preloaded 3D models that they can use it without modifying. One of the option is to build their own house. This option allows users to choose the colors of different parts of the house (base and the roof).

Beside making the house, users will also have to enter their name and their messages. Users can also choose the color of the messages that they want. All if these information will be displayed visually in the white canvas by using p5.js.

#### Code Snippet
The section below is used to display input boxes.
```
    <div class="container" id="container1">
        <section class="input-box">
            <form class="inputspc">
                <p>Enter your name: </p>
                <input type="text" placeholder="name" id="name" required>
            </form>
            <form class="inputspc">
                <p>Enter your message: </p>
                <input type="text" placeholder="message" id="msg" required>
            </form>

            <div class="inputspc">
                <p>Choose the color for your message: </p>
                <input type="color" name="inputspc" id="colormsg">
            </div>

            <div class="inputspc" id="dropdown">
                <label for="zodiac-select" style="margin-right: 10px;">Choose a house type:</label>
    
                <select name="pets" id="zodiac-select">
                    <option value="default">--Please choose a house type--</option>
                    <option value="#slumhouse">Slum House</option>
                    <option value="#guesthouse">Guest house</option>
                    <option value="#redhouse">Red House</option>
                    <option value="#bluehouse">Blue House</option>
                    <option value="#hauntedhouse">Haunted House</option>
                    <option value="#designhouse">Design your house</option>
                </select>
            </div>

            <div class="inputspc" id="colorbase">
                <p>Choose the color of your house: </p>
                <input type="color" name="inputspc" id="color-base">
            </div>
            <div class="inputspc" id="colorroof">
                <p>Choose the color of the roof: </p>
                <input type="color" id="color-roof">
            </div>
            <div class="inputspc" id="colorroof">
                <button type="submit" id="main-button">Main</button>
                <button type="submit" id="submit-button">Visit the town.</button>
            </div>
        </section>
```
Then, I connect with the database and pass all of the users' into a JSON so that I can push it into the database in the server side.
```
        let houseObj = {
            "name": name_input,
            "type": building_type,
            "baseColor": house_color,
            "roofColor": roof_color,
            "msg": msg_input,
            "msgColor": messColor
        };

        let houseObjJSON = JSON.stringify(houseObj);
        console.log(houseObjJSON);


        fetch('/houses',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: houseObjJSON
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
```
On the server side, along with pushing the data into the database, I also created a random position that the new houses can spawn everytime a new user joins. I made a 2D array that initially contains all 0s. Then, everytime a house is inputed, the position in the array will be generated randomly without collisions. When this happens, the value of that position will be updated to 1. The position data is also pushed into the database.
```
app.post("/houses", (req,res) => {
    let randW = Math.floor(Math.random() * 7);
    let randH = Math.floor(Math.random() * 7);
    do{
        randW = Math.floor(Math.random() * 7);
        randH = Math.floor(Math.random() * 7);
        if (housePos[randW][randH] == 0) break;
        console.log(randW,randH);
    }
    while(housePos[randW][randH] != 0);
    housePos[randW][randH] = 1;
    let obj = {
        house: req.body,
        posX: randW,
        posY: randH
    }
    db.push("userHouses", obj);
    db.get("userHouses").then(houseData =>{
        console.log(houseData);
    })
})
```

Finally, the preview is coded by using p5.js. Everytime the users changing colors, they can see what a preview of the colors they have chose on a white background.
```
//collecting input of colors
    let inputColor = document.getElementById("color-base");
    inputColor.addEventListener("change", ()=>{
        house_color = document.getElementById("color-base").value;
    })

    let roofColor = document.getElementById("color-roof");
    roofColor.addEventListener("change", ()=>{
        roof_color = document.getElementById("color-roof").value;
    })

    let msgColor = document.getElementById("colormsg");
    msgColor.addEventListener("change", ()=>{
        messColor = document.getElementById("colormsg").value;
    })

```
