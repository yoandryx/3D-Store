import gsap from '/js/node_modules/gsap/gsap-core.js';
import {ScrollTrigger} from "/js/node_modules/gsap/ScrollTrigger.js";
// import { OrbitControls } from '/js/three.js-master/examples/jsm/controls/OrbitControls.js';


function init(){


    // -------------------------- THREE.WebGL Render ----------------------------- //
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    var resizeTm;
    
    window.addEventListener('resize', function(){
        resizeTm = clearTimeout(resizeTm);
        resizeTm = setTimeout(onWindowResize, 200);
    });
    // -------------------------- End of THREE.WebGL Render ----------------------------- //


  
    // ---------------------------  Camera --------------------------- //
    var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000 );
    // camera.position.set(0, -5, -18);
    camera.position.set(0, 3, 12);
    camera.updateProjectionMatrix();
    var scene = new THREE.Scene();
    scene.add(camera);
    // ---------------------------  End of Camera -------------------- //



    // ----------------------  Helpers  --------------------- //
    const size = 40;
    const divisions = 40;

    const gridHelper = new THREE.GridHelper( size, divisions );
    // scene.add( gridHelper );

    const axesHelper = new THREE.AxesHelper( 5 );
    // scene.sadd( axesHelper );
    // ----------------------  End of Helpers  --------------------- //



    // ----------------------  Main Lights --------------------- //
    const hemiLight = new THREE.HemisphereLight( 0xf5ffff, 0x080820, 2 );
    scene.add( hemiLight );

    var bgLight = new THREE.PointLight( 0xffffff, 1, 50);

    if(window.innerWidth <= 700){
        var bgLight = new THREE.PointLight( 0xffffff, 1, 15);
    }

    bgLight.position.set( 0, -5, -19);
    camera.lookAt(bgLight.position);
    scene.add(bgLight);
    
    var innerVaseLight = new THREE.PointLight( 0xE4BCFF, 4, 3);
    var leftLight = new THREE.PointLight( 0xffffff, 5, 3.3);
    var rightLight = new THREE.PointLight( 0xffffff, 5, 3.3);

    var bleftLight = new THREE.PointLight( 0xffffff, 4, 3.3);
    var brightLight = new THREE.PointLight( 0xffffff, 4, 3.3);

    var b2leftLight = new THREE.PointLight( 0xffffff, 5, 3.3);
    var b2rightLight = new THREE.PointLight( 0xffffff, 5, 3.3);

    var middleLight = new THREE.PointLight( 0xE4BCFF, 4, 4);
    var middleLight2 = new THREE.PointLight( 0xffffff, 4, 4);

    innerVaseLight.position.set( 0, -10.5, 0);

    leftLight.position.set( -2.3, -10.5, 4);
    rightLight.position.set( 2.3, -10.5, 4);

    bleftLight.position.set( -2.3, -10.5, 2);
    brightLight.position.set( 2.3, -10.5, 2);

    b2leftLight.position.set( -2.3, -11.5, -1);
    b2rightLight.position.set( 2.3, -11.5, -1);

    middleLight.position.set( 0, 0, 4);
    middleLight2.position.set( 0, -13, 4);

    if(window.innerWidth <= 1000){
        var innerVaseLight = new THREE.PointLight( 0xE4BCFF, 4, 1.5);
        var leftLight = new THREE.PointLight( 0xffffff, 6, 5);
        var rightLight = new THREE.PointLight( 0xffffff, 6, 5);
        var innerVaseLight2 = new THREE.PointLight( 0x315BFF, 20, 1.2);
        var middleLight = new THREE.PointLight( 0xE4BCFF, 4, 4);


        innerVaseLight.position.set( 0, 0.5, 0);
        leftLight.position.set( -2.3, 10.2, -35);
        rightLight.position.set( 2.3, 10.2, -35);
        innerVaseLight2.position.set( 0, 11.5, -40);
        middleLight.position.set( 0, 0, 4);

    }

    scene.add(innerVaseLight);
    scene.add(leftLight);
    scene.add(rightLight);

    scene.add(bleftLight);
    scene.add(brightLight);

    scene.add(b2leftLight);
    scene.add(b2rightLight);

    scene.add(middleLight);
    // scene.add(middleLight2);

    // scene.add(innerVaseLight2);

    var sphereSize = 0.5;
    var pointLightHelper = new THREE.PointLightHelper( innerVaseLight, sphereSize );
    var pointLightHelper1 = new THREE.PointLightHelper( rightLight, sphereSize );
    var pointLightHelper2 = new THREE.PointLightHelper( leftLight, sphereSize );
    var pointLightHelper3 = new THREE.PointLightHelper( middleLight, sphereSize );
    var pointLightHelper10 = new THREE.PointLightHelper( middleLight2, sphereSize );
    var pointLightHelper4 = new THREE.PointLightHelper( brightLight, sphereSize );
    var pointLightHelper5 = new THREE.PointLightHelper( bleftLight, sphereSize );
    var pointLightHelper6 = new THREE.PointLightHelper( b2rightLight, sphereSize );
    var pointLightHelper7 = new THREE.PointLightHelper( b2leftLight, sphereSize );

    // scene.add(pointLightHelper);
    // scene.add(pointLightHelper1);
    // scene.add(pointLightHelper2);
    // scene.add(pointLightHelper3);
    // scene.add(pointLightHelper4);
    // scene.add(pointLightHelper5);
    // scene.add(pointLightHelper6);
    // scene.add(pointLightHelper7);
    // ----------------------  End of Main Lights --------------------- //
    



    //--------------- Background Plane -------------//
    const pgeometry = new THREE.PlaneGeometry( 200, 205.5);

    const pmaterial = new THREE.MeshStandardMaterial({
        // color: 0xDFB0FF,
        // color: 0xE4BBFF,
        color: 0xE4BCFF, // remember its this one
        // color: 0xD0D0D0,
        // color: 0xDADFF1,
        // color: 0xFFFFFF,
        // color: 0xF1CA89,
        side: THREE.DoubleSide,
    });

    const p2material = new THREE.MeshStandardMaterial({
        metalness: 0,  
        roughness: 1,
        color: 0x323232,
        side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh( pgeometry, pmaterial );
    const lplane = new THREE.Mesh( pgeometry, p2material );

    plane.position.set(0,0,-20);
    lplane.position.set(0,-200,-18);


    scene.add( plane );
    scene.add( lplane );

    //--------------- Background Plane -------------//





    // ---------------------------  GLTF Vase Model Loader --------------------------- //
    
    var loadingManager = new THREE.LoadingManager();
    var loader = new THREE.GLTFLoader(loadingManager);
    const loadingScreen = document.getElementById('loadingScreen');

    var vase;
    var layers;
    var hands;

    loadingManager.onStart = function (url, loaded,total) {
        // console.log( 'Started loading file: ' + url + '.\nLoaded ' + loaded + ' of ' + total + ' files.' );
        console.log( '\nStarted loading 3D model: \nBooty Vase.');
    };

    loader.load( '/assets/3dmodels/bVase.glb' , function(glb) {
        vase = glb.scene;
        // vase.position.set(0,10,-40);
        vase.position.set(0,0,0);
        vase.rotation.x = 0.009;
        // vase.scale.set(0.5,0.5,0.5);

        if(window.innerWidth <= 1000){
            vase.scale.set(0.52,0.52,0.52);
        }

        scene.add(vase);
    });

    loader.load( '/assets/3dmodels/layers2.glb' , function(glb) {
        layers = glb.scene;

        layers.position.set(0,-6,0);
        layers.scale.set(1.2,1.2,1.2);

        layers.rotation.x = 1.25;

        if(window.innerWidth <= 1000){
            layers.scale.set(0.5,0.5,0.5);
        }

        scene.add(layers);
    });

    loader.load( '/assets/3dmodels/layers3.glb' , function(glb) {
        hands = glb.scene;

        hands.position.set(0,0,0);
        hands.scale.set(1.5,1.5,1.5);

        // hands.rotation.y = 1;

        if(window.innerWidth <= 1000){
            hands.scale.set(0.6,0.6,0.6);
        }

        scene.add(hands);
    });

    // const logoLight = new THREE.PointLight( 0xffffff, 1, 0.5);
    // logoLight.position.set( 0, -19, 12);
    // scene.add(logoLight);

    const logosLight = new THREE.PointLight( 0xE4BCFF, 1, 5);
    logosLight.position.set( 0, 1.5, 3);
    scene.add(logosLight);

    var pointLightHelper10 = new THREE.PointLightHelper( logosLight, sphereSize );

    // scene.add( pointLightHelper10 );

    

    // loadingManager.onProgress = function(url,loaded,total) {
    //     progressBar.value = (loaded / total) * 100;
    //     console.log('\nLoading Progress: \n' + (progressBar.value) + '%');
    // };

    let vaseLoaded = new Boolean;

    loadingManager.onLoad = function () {
        setTimeout(() => {loadingScreen.style.display = "none";}, 1000);
        console.log('\n3D Model Successfully Loaded.');
        vaseLoaded = true;
    };

    
    // ---------------------------  End of GLTF Vase Model Loading --------------------------- //


    // --------------------- Particle Generator ---------------------- //
    var meshGroup2 = new THREE.Object3D();
  
    function mathRandom(num = 1) {
        var setNumber = - Math.random() * num + Math.random() * num;
        return setNumber;
    }
        
    function generateParticle(num, amp = 1) {
      
        for (var i = 1; i < num; i++) {
            // var gmaterial = new THREE.MeshLambertMaterial({color: 0xBD83E4, side:THREE.DoubleSide, opacity: 0.4, transparent: true});
            var gmaterial = new THREE.MeshLambertMaterial({color: 0xDDE1E7, side:THREE.DoubleSide, opacity: 0.4, transparent: true});
            var gparticular = new THREE.CircleGeometry(6, 6);
            var particular = new THREE.Mesh(gparticular, gmaterial);

            var pscale = 0.001 + Math.abs(mathRandom(0.001));
                
            particular.position.set(mathRandom(amp),mathRandom(amp),mathRandom(amp));
            particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
            particular.scale.set(pscale,pscale,pscale);
            particular.speedValue = mathRandom(1);
            meshGroup2.position.set(0, 0, 0);
            meshGroup2.add(particular);
        }
      
    }
    
    var particals = new THREE.Mesh(generateParticle(200, 6));
    
    meshGroup2.add(particals);

    if(window.innerWidth >= 1000){
        scene.add(meshGroup2);
    }
    // scene.add(meshGroup2);
    // ------------------- End of Particle Generator ----------------- //



    //------------------ Particle Animation Function ------------------//

    function particleRotate() {
      
        for (var i = 0, l = meshGroup2.children.length; i < l; i++) {
            var newObject = meshGroup2.children[i];
            newObject.rotation.x += newObject.speedValue / 10;
            newObject.rotation.z += newObject.speedValue / 10;
        };
            
        meshGroup2.rotation.y -= 0.0008;
    }

    //--------------- End of Particle Animation Function -------------//

    

    // const tl = gsap.timeline();
    const tl = gsap.timeline({ paused: true, reversed: true });
    const tl2 = gsap.timeline({ paused: true, reversed: true });
    const tl3 = gsap.timeline({ paused: true, reversed: true });

    // var duration;
    if(window.innerWidth <= 1000){
        var duration = 1;
    } else {
        var duration = 0.5;
    }

    const ease = 'ease-in-out';
    let animationDone = false;
    gsap.registerPlugin(ScrollTrigger);

    function animations() {

        if(!animationDone) {

            animationDone = true;

            
            tl.to(vase.position, { // VASE ANIMATION START
                if (){
                    vase.position.y = -10;
                },
                z: 0,
                y: 0,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".first-move",
                    start: "top center",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            .to(vase.position,{
                if (){
                    vase.position.y = 0;
                },
                z: 0,
                y: 10,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".third-move",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            },"same")
            if(window.innerWidth >= 1000){ // THIS MOVES VASE TO THE RIGHT WHEN INFO-BTN CLICKED
                tl2.to(vase.position, {
                    if(){
                        vase.position.x = 0;
                    },
                    x: 3.8,
                    duration,
                    ease,
                },"same")
            } // END OF VASE ANIMATION
            tl.to(hands.position,{ // HANDS ANIMATION START
                if (){
                    hands.position.y = -10;
                },
                z: 0,
                y: 0,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".t-move",
                    start: "top 95%",
                    end: "bottom bottom",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            },"same")
            .to(hands.position, {
                if (){
                    hands.position.z = 0;
                },
                z: 10,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".fourth-margin",
                    start: "top 85%",
                    end: "bottom top",
                    scrub: 0.2,
                },
            })
            .to(hands.scale, { // THIS SCALES THE HANDS MODEL
                if (){
                },
                x: -2,
                y: -2,
                z: -2,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".fourth-margin",
                    start: "top 85%",
                    end: "bottom top",
                    scrub: 0.2,
                },
            })
            if(window.innerWidth >= 1000){// THIS MOVES HANDS TO THE RIGHT WHEN INFO-BTN CLICKED
                tl3.to(hands.position,{
                    if (){
                        hands.position.x = 0;
                    },
                    x: 4,
                    duration,
                    ease,
                },"same")
            } // END OF HAND ANIMATION
            if(window.innerWidth <= 1000){ // INNER VASE LIGHT MOBILE ANIMATION
                tl.to(innerVaseLight.position, {
                    if (){
                        innerVaseLight.position.y = -10.5;
                    },
                    y: 0.5,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".first-move",
                        start: "top center",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                    onComplete: () => ScrollTrigger.refresh()
                }, "same")
                .to(innerVaseLight.position, {
                    if (){
                        innerVaseLight.position.y = 0.5;
                    },
                    y: 10.5,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".third-move",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                    onComplete: () => ScrollTrigger.refresh(),
                }, "same")
            } else { // INNER VASE LIGHT DESKTOP ANIMATION
                tl2.to(innerVaseLight.position, {
                    if (){
                        innerVaseLight.position.y = -10.5;
                    },
                    y: 1,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".first-move",
                        start: "top center",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                    onComplete: () => ScrollTrigger.refresh(),
                }, "same")
                .to(innerVaseLight.position, {
                    if (){
                        innerVaseLight.position.y = 1;
                    },
                    y: 10.5,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".third-move",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                    onComplete: () => ScrollTrigger.refresh(),
                }, "same")
            }
            tl.to(leftLight.position, {
                if(){
                    leftLight.position.y = -11.5;
                },
                y: 1.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".first-move",
                    start: "top center",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            .to(leftLight.position, {
                if (){
                    leftLight.position.y = 1.5;
                },
                y: 11.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".third-move",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.2
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            if(window.innerWidth >= 1000){
                tl2.to(leftLight.position, {
                    if (){
                        leftLight.position.y = 1.5;
                    },
                    x: 1.5,
                    duration,
                    ease,
                }, "same")
            }
            tl.to(rightLight.position, {
                if(){
                    rightLight.position.y = -11.5;
                },
                y: 1.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".first-move",
                    start: "top center",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            .to(rightLight.position, {
                if (){
                    rightLight.position.y = 1.5;
                },
                y: 11.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".third-move",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.2
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            if(window.innerWidth >= 1000){
                tl2.to(rightLight.position, {
                    if (){
                        rightLight.position.y = 1.5;
                    },
                    x: 6.1,
                    duration,
                    ease,
                }, "same")
            }
            tl.to(bleftLight.position, {
                if(){
                    bleftLight.position.y = -11.5;
                },
                y: -1.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".first-move",
                    start: "top center",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            .to(bleftLight.position, {
                if(){
                    bleftLight.position.y = -1.5;
                },
                y: 11.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".third-move",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            if(window.innerWidth >= 1000){
                tl2.to(bleftLight.position, {
                    if(){
                        bleftLight.position.y = -1.5;
                    },
                    x: 1.5,
                    duration,
                    ease,
                }, "same")
            }
            tl.to(brightLight.position, {
                if(){
                    brightLight.position.y = -11.5;
                },
                y: -1.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".first-move",
                    start: "top center",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            .to(brightLight.position, {
                if (){
                    brightLight.position.y = -1.5;
                },
                y: 10.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".third-move",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            if(window.innerWidth >= 1000){
                tl2.to(brightLight.position, {
                    if (){
                        brightLight.position.y = -1.5;
                    },
                    x: 6.1,
                    duration,
                    ease,
                }, "same")
            }
            tl.to(b2leftLight.position, {
                if(){
                    b2leftLight.position.y = -11.5;
                },
                y: 1.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".first-move",
                    start: "top center",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            .to(b2leftLight.position, {
                if(){
                    b2leftLight.position.y = 1.5;
                },
                y: 11.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".third-move",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            if(window.innerWidth >= 1000){
                tl2.to(b2leftLight.position, {
                    if(){
                        b2leftLight.position.y = 1.5;
                    },
                    x: 1.5,
                    duration,
                    ease,
                }, "same")
            }
            tl.to(b2rightLight.position, {
                if () {
                    b2rightLight.position.y = -11.5;
                },
                y: 1.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".first-move",
                    start: "top center",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            .to(b2rightLight.position, {
                if (){
                    b2rightLight.position.y = 1.5;
                },
                y: 11.5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".third-move",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.2,
                },
                onComplete: () => ScrollTrigger.refresh(),
            }, "same")
            if(window.innerWidth >= 1000){
                tl2.to(b2rightLight.position, {
                    if (){
                        b2rightLight.position.y = 1.5;
                    },
                    x: 6.1,
                    duration,
                    ease,
                }, "same")
            }
            if(window.innerWidth <= 1000){ // MIDDLE LIGHT ANIMATION
                tl2.to(middleLight.position, {
                    if (){
                        middleLight.position.y = -13;
                    },
                    y: 0,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".first-move",
                        start: "top center",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                    onComplete: () => ScrollTrigger.refresh(),
                }, "same")
                .to(middleLight.position, {
                    if (){
                        middleLight.position.y = 0;
                    },
                    y: 13,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".third-move",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                    onComplete: () => ScrollTrigger.refresh(),
                }, "same")
            } else {
                tl.to(middleLight.position, {
                    if () {
                        middleLight.position.y = -13;
                    },
                    y: 3,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".first-move",
                        start: "top center",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                    onComplete: () => ScrollTrigger.refresh(),
                }, "same")
                .to(middleLight.position, {
                    if (){
                        middleLight.position.y = 3;
                    },
                    y: 13,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".third-move",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                    onComplete: () => ScrollTrigger.refresh(),
                }, "same")
            } // MIDDLE LIGHT ANIMATION END
            if(window.innerWidth <= 1000){ // LOGOS LIGHT ANIMATION
                tl2.to(logosLight.position, {
                    if (){
                        logosLight.position.y = 1.5;
                    },
                    x: 3.8,
                    duration,
                    ease,
                    scrollTrigger:{
                        trigger:".first-move",
                        start: "top center",
                        end: "bottom top",
                        scrub: 0.2,
                    },
                }, "same")
            }
            if(window.innerWidth >= 1000){
                tl3.to(logosLight.position, {
                    if (){
                        logosLight.position.y = 1.5;
                    },
                    x: 3.8,
                    duration,
                    ease,
                }, "same")
            } // LOGOS LIGHT ANIMATION END
            tl.to(layers.position, {
                if () {
                    vase.position.y = -10;
                    innerVaseLight.position.y = -10.5;
                    leftLight.position.y = -11.5;
                    rightLight.position.y = -11.5;
                    bleftLight.position.y = -11.5;
                    brightLight.position.y = -11.5;
                    b2rightLight.position.y = -11.5;
                    b2leftLight.position.y = -11.5;
                    middleLight.position.y = -13;
                    hands.position.y = -10;
                },
                y: 5,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".second-move",
                    start: "top center",
                    end: "bottom 5%",
                    scrub: 0.2,
                },
            }, "same")
            .to(lplane.position, {
                y:105,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".second-move",
                    start: "top center",
                    end: "bottom 0%",
                    scrub: 0.2,
                },
            }, "same")
            .to(lplane.position, {
                if () {
                    lplane.position.y = 105;
                },
                y:0,
                duration,
                ease,
                scrollTrigger:{
                    trigger:".third-move",
                    start: "top 20%",
                    end: "bottom top",
                    scrub: 0.2,
                },
            }, "same") 

        }

    }
    

    function eventListeners(){
        animations();
    }

    document.getElementsByClassName('vase-info-btn')[0].addEventListener('click', function () {
        if (tl2.reversed()) {
            tl2.play();
        } else {
            tl2.reverse();
        }
    })

    document.getElementsByClassName('cart-btn')[0].addEventListener('click', function () {
        if (tl2.reversed() & vase.position.x == 3.8) {
            tl2.play();
        } else {
            tl2.reverse();
        }

    })

    document.getElementsByClassName('second-model-info-btn')[0].addEventListener('click', function () {
        if (tl3.reversed()) {
            tl3.play();
        } else {
            tl3.reverse();
        }
    })
        
    // -----------------------  Orbit Controller --------------------- //


    // OrbitControls setup (will be activated by the button click)
    // OrbitControls setup (will be activated by the button click)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smoother control
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 5; // Min camera distance to object
    controls.maxDistance = 50; // Max zoom-out distance
    controls.maxPolarAngle = Math.PI / 2; // Restrict the vertical angle
    controls.enabled = false; // Initially disabled

    const transformControls = new THREE.TransformControls(camera, renderer.domElement);

    // Set up drag controls for moving the vase and hands
    const dragControls = new THREE.DragControls([vase], camera, renderer.domElement);
    const dragControls2 = new THREE.DragControls([hands], camera, renderer.domElement);
    dragControls.enabled = false; // Initially disabled
    dragControls2.enabled = false; // Initially disabled

    // Variables to track touch state
    let isTouching = false;
    let previousTouchPosition = new THREE.Vector2();
    let currentModel = null; // Define currentModel here

    // Function to prevent default scrolling behavior
    function preventScroll(event) {
        event.preventDefault();
    }

    // Toggle controls and scroll state
    const vaseOrbitButton = document.querySelector('.vase-orbit');
    const handsOrbitButton = document.querySelector('.hands-orbit');
    let controlsEnabled = false; // Keep track of whether controls are enabled

    function toggleControls(isVaseButton) {
        controlsEnabled = !controlsEnabled; // Toggle control state

        if (controlsEnabled) {
            currentModel = isVaseButton ? vase : hands; // Set the current model to vase or hands

            controls.enabled = true; // Enable OrbitControls
            if (isVaseButton) {
                dragControls.enabled = true; // Enable DragControls for vase
                dragControls2.enabled = false; // Ensure hands drag controls are disabled
            } else {
                dragControls.enabled = false; // Disable vase drag controls
                dragControls2.enabled = true; // Enable DragControls for hands
            }

            // Disable scrolling
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });

            console.log(`Controls enabled for ${isVaseButton ? 'vase' : 'hands'}, scrolling disabled`);
        } else {
            // Disable OrbitControls and DragControls
            controls.enabled = false;
            dragControls.enabled = false;
            dragControls2.enabled = false;
            currentModel = null; // Clear current model when controls are disabled

            // Re-enable scrolling
            document.body.style.overflow = '';
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);

            console.log("Controls disabled, scrolling enabled");
        }
    }

    // Button event listeners
    if (vaseOrbitButton) {
        vaseOrbitButton.addEventListener('click', function () {
            toggleControls(true); // Toggle controls for vase
        });
    }

    if (handsOrbitButton) {
        handsOrbitButton.addEventListener('click', function () {
            toggleControls(false); // Toggle controls for hands
        });
    }

    // Add touchstart event to track when the user touches the screen
    window.addEventListener('touchstart', function (event) {
        if (controls.enabled && currentModel) { // Only activate touch controls if OrbitControls are enabled
            isTouching = true;

            // Get the touch position
            const touch = event.touches[0];
            previousTouchPosition.x = (touch.clientX / window.innerWidth) * 2 - 1;
            previousTouchPosition.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        }
    });

    // Add touchmove event to rotate the currently active model
    window.addEventListener('touchmove', function (event) {
        if (isTouching && controls.enabled && currentModel) {
            const touch = event.touches[0];

            // Calculate the new touch position
            const touchPosition = new THREE.Vector2(
                (touch.clientX / window.innerWidth) * 2 - 1,
                (touch.clientY / window.innerHeight) * 2 + 1
            );

            // Calculate the change in touch position
            const deltaX = touchPosition.x - previousTouchPosition.x;
            const deltaY = touchPosition.y - previousTouchPosition.y;

            // Rotate the current model based on touch movement
            currentModel.rotation.y += deltaX * Math.PI; // Adjust sensitivity by changing the multiplier
            currentModel.rotation.x += deltaY * Math.PI; // Adjust sensitivity by changing the multiplier

            // Update previous touch position
            previousTouchPosition.copy(touchPosition);
        }
    });

    // Add touchend event to track when the user releases the touch
    window.addEventListener('touchend', function () {
        isTouching = false;
    });

    // Add TransformControls to the scene
    scene.add(transformControls);





    // ---------------------  End of Orbit Controller ---------------- //
    




    // -------------------------- Lerping Effect --------------------- //
    var lerp = {
        current: 0,
        target: 0,
        ease: 0.5
    };
    
    function onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            var vyrotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            lerp.target = vyrotation * 0.50;
        });
    }

    function vaselerp () {

        lerp.current = gsap.utils.interpolate(
            lerp.current,
            lerp.target,
            lerp.ease
        );

        vase.rotation.y = lerp.current;
        layers.rotation.z = -lerp.current;
        hands.rotation.y = lerp.current;
    }

    // -------------------- End of Lerping effect -------------------- //

    
    //------------------------- RENDER LOOP ---------------------------//
    function render() {
        
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.render(scene,camera);
    }
    //----------------------- END OF RENDER LOOP  ----------------------//
  
    
  
    //--------------------------- ANIMATION ----------------------------//
    function animate() {
        requestAnimationFrame(animate);

        particleRotate();
        onMouseMove();
        controls.update();

        if(vaseLoaded == true){
            if(window.innerWidth >= 1000){
                vaselerp();
            }
            eventListeners();
        }

        renderer.render( scene, camera );
    }
    //---------------------- END OF ANIMATION -------------------------//
  
    
    render();
    animate();
  
}


init();

  
  