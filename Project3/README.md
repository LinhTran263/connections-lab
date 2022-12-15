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
####Illustration
<img src="welcome.PNG">

### The building page
This page is using the cooperation of the database and 
