window.addEventListener('load',()=>{
    window.addEventListener('scroll', ()=>{
        console.log(window.scrollY, document.body.scrollHeight, window.innerWidth, window.innerHeight, window.scrollY*(window.innerWidth/window.innerHeight));
        let bus=document.getElementById("bus");
        bus.style.left = window.scrollY*(window.innerWidth/(document.body.clientHeight-window.innerHeight))+'px';
    })

    let souk= document.getElementById("central_souk");
    souk.addEventListener('mouseenter',()=>{
        console.log('mouse enter');
        document.getElementById("central").style.opacity = "1";
    })
    souk.addEventListener('mouseleave',()=>{
        console.log('mouse leave');
        document.getElementById("central").style.opacity = "0";
    })

    let wahdamall= document.getElementById("al_wahda");
    wahdamall.addEventListener('mouseenter',()=>{
        console.log('mouse enter');
        document.getElementById("wahda").style.opacity = "1";
    })
    wahdamall.addEventListener('mouseleave',()=>{
        console.log('mouse leave');
        document.getElementById("wahda").style.opacity = "0";
    })

    let galleriamall= document.getElementById("galleria");
    galleriamall.addEventListener('mouseenter',()=>{
        console.log('mouse enter');
        document.getElementById("gall").style.opacity = "1";
    })
    galleriamall.addEventListener('mouseleave',()=>{
        console.log('mouse leave');
        document.getElementById("gall").style.opacity = "0";
    })


    let bg = document.getElementById('change_bg');

    let count = 0;
    let color1 = '#4a4969 0%,#7072ab 50%,#cd82a0 100%';
    let color2 = '#071B26 0%,#071B26 30%,#8A3B12 80%,#240E03 100%';
    let color3 = '#82addb 0%,#ebb2b1 100%';
    let color4 = '#609fe7 0%,#576e71 30%,#e1c45e 70%,#b26339 100%';
    let color_ls = [color1,color2,color3,color4];

    function rotate () {
        if (count >= 3){
            count = 0;
        }
        else {
            count += 1;
        }
    }
    bg.addEventListener('click', () =>{
        rotate();
        document.body.style.background = 'linear-gradient(to bottom,'+color_ls[count]+')';
        console.log(count);
    })
})