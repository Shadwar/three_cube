import {Scene, PerspectiveCamera, WebGLRenderer, Raycaster, Vector2} from 'three';
import Cube from './cube';



/* Класс приложения, отвечает за создание и отрисовку сцены, управление событиями */
export default class Application {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
    this.camera.position.z = 5;

    this.raycaster = new Raycaster()

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.addEventListener('click', (e) => this.onclick(e), true);


    this.populateScene();
  }

  /* Наполнение сцены кубами */
  populateScene() {
    let cubeCount = NaN;

    while (isNaN(cubeCount)) {
      cubeCount = parseInt(window.prompt('Number of cubes', '1'));
    }

    const rand = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < cubeCount; i++) {
      let cube = new Cube(rand(0.3, 1.0), [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0x333333, 0xCCCCCC]);
      cube.position.set(rand(-2.0, 2.0), rand(-2.0, 2.0), rand(-1.0, 1.0));
      cube.rotation.x = rand(0, 1.0);
      cube.rotation.y = rand(0, 1.0);
      this.scene.add(cube);
    }
  }

  /* Событие нажатия мышки. Сделать рейкаст по вершинам всех кубов в сцене */
  onclick(event) {
    const mouse = new Vector2(( event.clientX / this.width ) * 2 - 1, - ( event.clientY / this.height ) * 2 + 1)
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (let intersect of intersects) {
      if (intersect.object.name !== 'Vertex') continue;
      intersect.object.recolorEdges();
    }
  }

  /* Запуск приложения */
  run() {
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    }
    animate();
  }
}