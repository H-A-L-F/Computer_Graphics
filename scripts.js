import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'

/* #region  Inits */
var scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
/* #endregion */

/* #region  Camera Control */
var controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.minPolarAngle = 0.8
controls.maxPolarAngle = 2.4
controls.dampingFactor = 0.07
controls.rotateSpeed = 1
/* #endregion */

/* #region  Plane */
var createPlane = () => {
    var planeGeometry = new THREE.PlaneGeometry(40, 40)
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x525154,
        side: THREE.DoubleSide,
        shininess: 1,
        specular: 0xffffff,
    })

    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    planeMesh.rotation.x = Math.PI / 2

    return planeMesh
}

var planeMesh = createPlane()
planeMesh.receiveShadow = true
planeMesh.position.y = 0;
scene.add(planeMesh)
/* #endregion */

/* #region  skybox */
var skyBoxGeometry = new THREE.BoxGeometry(100, 100, 100)
var textureLoader = new THREE.TextureLoader()
var skyBoxMaterials = [
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./assets/skybox/right.png'),
        side: THREE.BackSide
    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./assets/skybox/left.png'),
        side: THREE.BackSide

    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./assets/skybox/top.png'),
        side: THREE.BackSide

    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./assets/skybox/bottom.png'),
        side: THREE.BackSide

    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./assets/skybox/front.png'),
        side: THREE.BackSide

    }),
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./assets/skybox/back.png'),
        side: THREE.BackSide

    })
]

var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterials)
skyBox.name = "skybox"
scene.add(skyBox)
/* #endregion */

var createBase = (x, y) => {
    const geometry = new THREE.CylinderGeometry( 1, 1, 2, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.x = x;
    cylinder.position.y = y;
    scene.add( cylinder );
}

var createBotHolder = (x, y) => {
    const geometry = new THREE.ConeGeometry( 1, 2, 2 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const cone = new THREE.Mesh( geometry, material );
    cone.position.x = x;
    cone.position.y = y;
    scene.add( cone );
}

createBase(10, 0);
createBotHolder(10, 1);

camera.position.z = 5;

var render = () => {
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene, camera);
}

render();