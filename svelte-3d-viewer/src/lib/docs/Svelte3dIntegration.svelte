<script>
  import * as THREE from 'three';
  import { onMount } from 'svelte';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  let container;
  let camera, scene, renderer, controls;
  let spaceship;

  onMount(() => {
    init();
    animate();
  });

  function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.z = 50;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '/models/spaceship.glb',
      function (gltf) {
        spaceship = gltf.scene;
        scene.add(spaceship);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    if (spaceship) {
      spaceship.rotation.y += 0.005;
    }
    
    controls.update();
    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} style="width: 100%; height: 400px;"></div>

<style>
  div {
    border: 1px solid #ccc;
  }
</style>