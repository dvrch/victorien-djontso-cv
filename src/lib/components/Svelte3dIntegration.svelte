<script>
  import * as THREE from 'three';
  import { onMount, tick } from 'svelte';
  import { base } from '$app/paths';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  let container;
  let camera, scene, renderer, controls;
  let spaceship;

  onMount(async () => {
    await tick(); // Wait for CSS to be applied and container to have a size
    init();
    animate();

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  });

  function init() {
    // Use container dimensions, not window
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 1000);
    camera.position.z = 15;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      `/victorien-djontso-cv/models/spaceship.glb`,
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
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
  }

  function onWindowResize() {
    if (!container || !renderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    if (spaceship) {
      spaceship.rotation.y += 0.005;
    }
    
    if (controls) {
      controls.update();
    }
    
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }
</script>

<div bind:this={container} class="viewer-container"></div>

<style>
  .viewer-container {
    width: 100%;
    height: 80vh;
    border: 1px solid #ccc;
  }
</style>
