<script>
  import * as THREE from "three";
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

  let container;
  let error = "";
  let loading = true;

  onMount(() => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x90EE90 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("resize", onWindowResize);
    animate();

    const loader = new GLTFLoader();
    loader.load(
      `${base}/models/spaceship.glb`,
      (gltf) => {
        scene.add(gltf.scene);
        loading = false;
      },
      undefined,
      (err) => {
        error = err.message;
        loading = false;
      }
    );

    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  });
</script>

<div class="viewer-wrapper">
  <div bind:this={container} class="viewer-container">
    {#if error}
      <div class="error-message">
        <h3>Erreur WebGL</h3>
        <p>{error}</p>
      </div>
    {/if}
    {#if loading && !error}
      <div class="loading-message">
        Chargement du modèle 3D...
      </div>
    {/if}
  </div>
</div>

<style>
  .viewer-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .viewer-container {
    width: 100%;
    height: 80vh;
    background-color: #87CEEB;
    position: relative;
  }

  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 0, 0, 0.9);
    color: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: left;
  }

  .loading-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 1rem 2rem;
    border-radius: 4px;
  }
</style>
