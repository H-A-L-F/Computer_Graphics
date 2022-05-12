import * as THREE from './three.js/build/three.module.js'
import { OBJLoader } from './three.js/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'

/* #region  Inits */
var scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
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

var currCam = camera;
/* #endregion */

/* #region  Plane */
var createPlane = () => {
    var planeGeometry = new THREE.PlaneGeometry(40, 40)
    var planeMaterial = new THREE.MeshStandardMaterial({
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

/* #region  Reactor */
var createBase = (x, y, h) => {
    const geometry = new THREE.CylinderGeometry(1, 1, h, 32);
    const material = new THREE.MeshNormalMaterial({
        flatShading: true
    });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.castShadow = true;
    cylinder.position.x = x;
    cylinder.position.y = y;
    scene.add(cylinder);
}

var createBotHolder = (x, y, p) => {
    const geometry = new THREE.ConeGeometry(1, 2, 10);
    const material = new THREE.MeshNormalMaterial({
        wireframe: true,
        color: 0x0066CC,
    });
    const cone = new THREE.Mesh(geometry, material);
    cone.castShadow = true;
    cone.position.x = x;
    cone.position.y = y;
    cone.rotation.z = p;
    scene.add(cone);
}

var createCore = (x, y) => {
    const geometry = new THREE.IcosahedronGeometry(0.4, 0);
    const material = new THREE.MeshToonMaterial({color: 0x263194,})
    const core = new THREE.Mesh(geometry, material);
    core.castShadow = true;
    core.position.x = x;
    core.position.y = y;
    scene.add(core);
}

var createLight = (x, y, z) => {
    const light = new THREE.PointLight(0xff0000, 1, 5);
    light.castShadow = true;
    light.position.set(x, y, z);
    var helper = new THREE.PointLightHelper(light);
    scene.add(light);
    // scene.add(helper);
}

var createCase = (x, y, z) => {
    const geometry = new THREE.BoxGeometry(1.2, 10, 1.2);
    var material = new THREE.MeshPhysicalMaterial({
        transmission: 1,
        color: 0xffffff,
        clearcoat: 0.1,
        ior: 1.3,
        thickness: 3
    })
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    scene.add(cube);
}

var createRing = (x, y, z) => {
    const geometry = new THREE.RingGeometry( 6, 8, 8 );
    const material = new THREE.MeshLambertMaterial( { color: 0x263194, side: THREE.DoubleSide } );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.rotation.y = 1.55;
    mesh.position.set(x, y, z);
    scene.add( mesh );
}

createBase(10, 0, 2);
createBotHolder(10, 1, 0);
// createCore(10, 2.5);
createBotHolder(10, 4, 3.1);
createBase(10, 4.5, 1);
createLight(12, 2.5, 0);
createLight(8, 2.5, 0);
createLight(10, 2.5, 2);
createLight(10, 2.5, -2);
// createCase(10, 0, 0);
// createRing(10, 0, 0);

const ringGeo = new THREE.RingGeometry( 6, 8, 8);
const ringMat = new THREE.MeshLambertMaterial( { color: 0x263194, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( ringGeo, ringMat );
mesh.castShadow = true;
mesh.rotation.y = 1.55;
mesh.position.set(10, 0, 0);
scene.add( mesh );

const geometry = new THREE.IcosahedronGeometry(0.4, 0);
const material = new THREE.MeshStandardMaterial({ color: 0xa30018, roughness: 0.5 });
const core = new THREE.Mesh(geometry, material);
core.castShadow = true;
core.position.x = 10;
core.position.y = 2.5;
scene.add(core);
/* #endregion */

/* #region  Objects */
const objLoader = new OBJLoader();
objLoader.load(
    './assets/objects/alien_11.obj',
    (object) => {
        object.scale.set(0.3, 0.3, 0.3);
        object.rotation.set(1.2, 0.8, 2);
        object.position.set(0.5, 2.5, 0.5);

        object.traverse((child) => {
            if (!child.isMesh) return;
            var prevMaterial = child.material;
            child.material = new THREE.MeshStandardMaterial({ color: 0xa30018, roughness: 0.5 });
            THREE.MeshStandardMaterial.prototype.copy.call(child.material, prevMaterial);
        });

        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

// objLoader.load(
//     './assets/objects/11070_astronaut_v4.obj',
//     (object) => {
//         scene.add(object)
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//     },
//     (error) => {
//         console.log(error)
//     }
// )
/* #endregion */

/* #region  GLTF */
var gltfLoader = new GLTFLoader()
gltfLoader.load('./assets/objects/scene.gltf',
    (object) => {
        object.rotation.set(1.2, 0.8, 2);
        object.position.set(0.5, 2.5, 0.5);

        object.traverse((child) => {
            if (!child.isMesh) return;
            var prevMaterial = child.material;
            child.material = new THREE.MeshStandardMaterial({ color: 0xa30018, roughness: 0.5 });
            THREE.MeshStandardMaterial.prototype.copy.call(child.material, prevMaterial);
        });

        scene.add(object)
    }, undefined, function (error) {
        console.error(error);
    })
/* #endregion */

/* #region  SecondLight  */
var createSceneLight = (x, y, z) => {
    const light = new THREE.DirectionalLight("#27b044", 0.2)
    light.position.set(x, y, z);
    light.castShadow = true
    var helper = new THREE.DirectionalLightHelper(light);
    scene.add(light);
    scene.add(helper);
}

createSceneLight(0.5, 3, 0.5);

var createLightPoint = (x, y, z) => {
    const light = new THREE.PointLight(0xff0000, 1, 5);
    light.castShadow = true;
    light.position.set(x, y, z);
    var helper = new THREE.PointLightHelper(light);
    scene.add(light);
    scene.add(helper);
}

createLightPoint(1, 3, 0.5);
/* #endregion */

/* #region  Raycast */
var mouse, raycaster;
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);

function hoverItem() {
    raycaster.setFromCamera(mouse, currCam);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.transparent = true;
        intersects[i].object.material.opacity = 0.5;
    }
}

function hoverItemOut() {
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].material) {
            scene.children[i].material.opacity = 1;
        }
    }
}
/* #endregion */

/* #region  GodCam */
var godCam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

var switchCam = (e) => {
    godCam.lookAt(core.position);
    godCam.position.y += 0.5;

    if (e.keyCode == 32) {
        if (currCam == camera) currCam = godCam;
        else currCam = camera;
    }
}

window.addEventListener('keydown', switchCam);

var orbitRadius = 10;
var date;

var orbit = () => {
    date = Date.now() * 0.0001;
    godCam.position.set(
        Math.cos(date) * orbitRadius,
        1,
        Math.sin(date) * orbitRadius
    );
    godCam.lookAt(core.position);
}
/* #endregion */

currCam.position.z = 5;

var render = () => {
    requestAnimationFrame(render);
    controls.update();
    hoverItemOut();
    hoverItem();
    renderer.render(scene, currCam);

    core.rotation.x += 0.01;
    core.rotation.y += 0.01;

    mesh.rotation.x += 0.01;

    orbit();
}

render();