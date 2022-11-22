const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// let imageLink1 = 'one.png';
// let imageLink2 = 'one.png';
// let imageLink3 = 'one.png';
// let imageLink4 = 'one.png';
// let imageLink = 'one.png';
// let imageLink = 'one.png';

let imageLoader =  new THREE.TextureLoader();
// let imageTexture =  imageLoader.load(imageLink);
//Now we can pass the texture onto the material
// let material = new THREE.MeshBasicMaterial( { map: imageTexture} );
let rotateSpeed = 0.1;
let button = document.getElementById("flip");
button.addEventListener("click", ()=>{
    rotateSpeed = 0.1;
})

let buttonStop = document.getElementById("noflip");
buttonStop.addEventListener("click", ()=>{
    rotateSpeed = 0;
})

const cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: imageLoader.load('one.png'),transparent:true, side:THREE.DoubleSide }), //right side
    new THREE.MeshBasicMaterial({ map: imageLoader.load('two.png'),transparent:true, side:THREE.DoubleSide}), //left side
    new THREE.MeshBasicMaterial({ map: imageLoader.load('three.png'),transparent:true, side:THREE.DoubleSide}), //top side
    new THREE.MeshBasicMaterial({ map: imageLoader.load('four.png'),transparent:true, side:THREE.DoubleSide}), //bottom side
    new THREE.MeshBasicMaterial({ map: imageLoader.load('five.png'),transparent:true, side:THREE.DoubleSide}), //front side
    new THREE.MeshBasicMaterial({ map: imageLoader.load('six.png'),transparent:true, side:THREE.DoubleSide}), //back side
];


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

let container = document.getElementById("container");
container.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(2, 2, 2);
// const material = new THREE.MeshBasicMaterial( {map: imageTexture} );
const cube = new THREE.Mesh( geometry, cubeMaterials );
scene.add( cube );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += rotateSpeed;
    cube.rotation.y += rotateSpeed;

    renderer.render( scene, camera );
};

animate();

