/* GLOBAL VARIABLES */
var scene, 
cameraFrontal, cameraLateral, cameraTopo, cameraOrtogonal, cameraPerspectiva, 
renderer, 
activeCamera;

/* CREATE SCENE(S) */
function createScene() {
    'use strict';
    scene = new THREE.Scene();

    // Set the background color of the scene
    scene.background = new THREE.Color(0x78d6ff);

    // Add scene elements, such as objects, lights, etc.

    // Robot
    var top, bottom;

    //head (sphere)
    var headGeometry = new THREE.BoxGeometry(80, 80, 80);
    var headMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0,125,0);
    //ADICIONAR ANTENAS
    var antenasGeometry = new THREE.CylinderGeometry(10,10,70);
    var antenasMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var antenas1 = new THREE.Mesh(antenasGeometry, antenasMaterial);
    var antenas2 = new THREE.Mesh(antenasGeometry, antenasMaterial);
    antenas1.position.set(50,140,0);
    antenas2.position.set(-50,140,0);

    //abdomen (cube)
    var abdomenGeometry = new THREE.BoxGeometry(100, 50, 100); //largura altura profundidade
    var abdomenMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var abdomen = new THREE.Mesh(abdomenGeometry, abdomenMaterial);
    abdomen.position.set(0,-125,0);

    // torso (Cube)
    var torsoGeometry = new THREE.BoxGeometry(300, 150, 150);
    var torsoMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var torso = new THREE.Mesh(torsoGeometry, torsoMaterial);

    //ADD TO TOP
    var top = new THREE.Object3D();
    top.add(head);
    top.add(antenas1);
    top.add(antenas2);
    top.add(abdomen);
    top.add(torso);

    var fullArm1, fullArm2;
    //forearm1 (cube)
    var forearmGeometry = new THREE.BoxGeometry(100, 150, 100);
    var forearmMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var forearm1 = new THREE.Mesh(forearmGeometry, forearmMaterial);
    forearm1.position.set(-200,0,-25);
    //forearm2 (cube)
    var forearm2 = new THREE.Mesh(forearmGeometry, forearmMaterial);
    forearm2.position.set(200,0,-25);
    //arm1 (cube)
    var armGeometry = new THREE.BoxGeometry(100, 100, 150);
    var armMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var arm1 = new THREE.Mesh(armGeometry, armMaterial);
    arm1.position.set(-200,-125,0);
    //arm2 (cube)
    var arm2 = new THREE.Mesh(armGeometry, armMaterial);
    arm2.position.set(200,-125,0);
    //FAZERTUBOS DE ESCAPE E DPS ADD.(TUBOSDEESCAPE)
    fullArm1 = new THREE.Object3D();
    fullArm1.add(arm1);
    fullArm1.add(forearm1);
    fullArm2 = new THREE.Object3D();
    fullArm2.add(arm2);
    fullArm2.add(forearm2);

    //ADD TO TOP
    top.add(fullArm1);
    top.add(fullArm2);
    //TOP COMPLETE


    var fullWaist;
    //waist (cube)
    var waistGeometry = new THREE.BoxGeometry(300, 100, 150);
    var waistMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var waist = new THREE.Mesh(waistGeometry, waistMaterial);
    waist.position.set(0,-225,0);
    //wheel1 (cylinder)
    var wheelGeometry = new THREE.CylinderGeometry(50, 50, 50);
    var wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel1.rotation.z += 77;
    wheel1.position.set(-175,-225,0);
    //wheel2 (cylinder)
    var wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel2.rotation.z += 77;
    wheel2.position.set(175,-225,0);
   
    fullWaist = new THREE.Object3D();
    fullWaist.add(waist);
    fullWaist.add(wheel1);
    fullWaist.add(wheel2);

    var fullLeg1, fullLeg2; //ADICIONAR COXAAAA
    //leg1 (cube)
    var legGeometry = new THREE.BoxGeometry(50, 300, 150);
    var legMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var leg1 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(-200,-225,0);
    //leg2 (cube)
    var leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg2.position.set(-200,-225,0);
    //foot1 (cube)
    var footGeometry = new THREE.BoxGeometry(300, 100, 150);
    var footMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff  });
    var foot1 = new THREE.Mesh(footGeometry, footMaterial);
    foot1.position.set(0,-225,0);
    //foot2 (cube)
    var foot2 = new THREE.Mesh(footGeometry, footMaterial);
    foot2.position.set(0,-225,0);

    fullLeg1 = new THREE.Object3D();
    fullLeg1.add(leg1);
    fullLeg1.add(foot1);
    fullLeg2 = new THREE.Object3D();
    fullLeg2.add(leg2);
    fullLeg2.add(foot2);

    //ADD TO BOTTOM
    var bottom = new THREE.Object3D();
    bottom.add(fullWaist);
    bottom.add(fullLeg1);
    bottom.add(fullLeg2);
    //BOTTOM COMPLETE

   //add hierarchies (ou la como se escreve)
    scene.add(top);
    scene.add(bottom);

}

/* CREATE CAMERA(S) */
function createCameras() {
    'use strict';
    // Frontal camera
    cameraFrontal = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 1000);
    cameraFrontal.position.set(0, 0, 500);
    cameraFrontal.lookAt(scene.position);

    // Lateral camera
    cameraLateral = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 1000);
    cameraLateral.position.set(500, 0, 0);
    cameraLateral.lookAt(scene.position);

    // Topo camera
    cameraTopo = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 0.1, 1000);
    cameraTopo.position.set(0, 500, 0);
    cameraTopo.lookAt(scene.position);

    // Orthogonal isometric camera
    cameraOrtogonal = new THREE.OrthographicCamera(-500, 500, 500, -500, 0.1, 1000);
    cameraOrtogonal.position.set(500, 500, 500);
    cameraOrtogonal.lookAt(scene.position);

    // Perspective isometric camera
    cameraPerspectiva = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraPerspectiva.position.set(500, 500, 500);
    cameraPerspectiva.lookAt(scene.position);

    // Set the initial active camera
    activeCamera = cameraFrontal;
}

/* SWITCH ACTIVE CAMERA */
function switchCamera(camera) {
    'use strict';
    activeCamera = camera;
}

/* UPDATE */
function update() {
    'use strict';
    // Update scene elements, animations, etc.
}

/* RENDER */
function render() {
    'use strict';
    renderer.render(scene, activeCamera);
}

/* INITIALIZE ANIMATION CYCLE */
function init() {
    'use strict';
    createScene();
    createCameras();

    // Initialize renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Call the animate function to start the animation loop
    animate();
}

/* ANIMATION CYCLE */
function animate() {
    'use strict';
    requestAnimationFrame(animate);

    update();
    render();
}

/* RESIZE WINDOW CALLBACK */
function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update camera aspect ratios if necessary
    cameraFrontal.aspect = window.innerWidth / window.innerHeight;
    cameraFrontal.updateProjectionMatrix();

    cameraLateral.aspect = window.innerWidth / window.innerHeight;
    cameraLateral.updateProjectionMatrix();

    cameraTopo.aspect = window.innerWidth / window.innerHeight;
    cameraTopo.updateProjectionMatrix();

    cameraOrtogonal.aspect = window.innerWidth / window.innerHeight;
    cameraOrtogonal.updateProjectionMatrix();

    cameraPerspectiva.aspect = window.innerWidth / window.innerHeight;
    cameraPerspectiva.updateProjectionMatrix();
}

/* KEY DOWN CALLBACK */
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49: // Numeric key 1
            switchCamera(cameraFrontal);
            break;
        case 50: // Numeric key 2
            switchCamera(cameraLateral);
            break;
        case 51: // Numeric key 3
            switchCamera(cameraTopo);
            break;
        case 52: // Numeric key 4
            switchCamera(cameraOrtogonal);
            break;
        case 53: // Numeric key 5
            switchCamera(cameraPerspectiva);
            break;
        case 54: // Numeric key 6
            toggleWireframe();
            break;
        default:
            break;
    }
}

function toggleWireframe() {
    // Toggle wireframe mode for all objects in the scene
    scene.traverse(function (object) {
      if (object instanceof THREE.Mesh) {
        object.material.wireframe = !object.material.wireframe;
      }
    });
  }

/* ADD EVENT LISTENERS */
window.addEventListener('resize', onResize, false);
window.addEventListener('keydown', onKeyDown, false);

// Start the initialization process
init();
